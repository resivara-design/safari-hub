import { randomBytes, createHash } from "crypto";
import { getRedisClient } from "./redis-client";
import type { ReminderRecord, ReminderStatus } from "./types";

// How long a reminder record (and its consent evidence) is retained before
// Redis auto-expires it. This number is also stated in the Privacy Policy —
// keep both in sync if it ever changes.
export const RETENTION_TTL_SECONDS = 60 * 60 * 24 * 31; // 31 days

// Safety-net TTL on the active-signup dedupe key. Slightly longer than the
// ~24h send window so it always outlives a pending reminder; cleared
// explicitly on send/cancel/unavailable so it doesn't linger past that.
const ACTIVE_DEDUPE_TTL_SECONDS = 60 * 60 * 26;

const DUE_SET_KEY = "reminders:due";

function reminderKey(token: string): string {
  return `reminder:${token}`;
}

function hashEmail(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

function activeKey(productSlug: string, email: string): string {
  return `reminder:active:${productSlug}:${hashEmail(email)}`;
}

export interface CreateReminderInput {
  productSlug: string;
  productName: string;
  email: string;
}

export async function createReminder(input: CreateReminderInput): Promise<ReminderRecord> {
  const redis = getRedisClient();
  const token = randomBytes(24).toString("hex");
  const now = Date.now();
  const record: ReminderRecord = {
    token,
    productSlug: input.productSlug,
    productName: input.productName,
    email: input.email.trim(),
    consentAt: new Date(now).toISOString(),
    status: "pending",
    createdAt: new Date(now).toISOString(),
    dueAt: now + 24 * 60 * 60 * 1000,
  };

  await Promise.all([
    redis.set(reminderKey(token), record, { ex: RETENTION_TTL_SECONDS }),
    redis.zadd(DUE_SET_KEY, { score: record.dueAt, member: token }),
    redis.set(activeKey(input.productSlug, input.email), token, { ex: ACTIVE_DEDUPE_TTL_SECONDS }),
  ]);

  return record;
}

export async function findActiveReminderToken(productSlug: string, email: string): Promise<string | null> {
  const redis = getRedisClient();
  const token = await redis.get<string>(activeKey(productSlug, email));
  return token ?? null;
}

export async function getReminder(token: string): Promise<ReminderRecord | null> {
  const redis = getRedisClient();
  const record = await redis.get<ReminderRecord>(reminderKey(token));
  return record ?? null;
}

// Removes the token from the due sorted set and reports whether this call
// was the one that actually removed it. Lets the cron job safely no-op if a
// retried/overlapping invocation already claimed the same reminder.
export async function claimDueToken(token: string): Promise<boolean> {
  const redis = getRedisClient();
  const removed = await redis.zrem(DUE_SET_KEY, token);
  return removed > 0;
}

export async function getDueTokens(nowMs: number): Promise<string[]> {
  const redis = getRedisClient();
  return redis.zrange<string[]>(DUE_SET_KEY, 0, nowMs, { byScore: true });
}

async function updateStatus(record: ReminderRecord, status: ReminderStatus): Promise<void> {
  const redis = getRedisClient();
  const updated: ReminderRecord = {
    ...record,
    status,
    ...(status === "sent" ? { sentAt: new Date().toISOString() } : {}),
  };
  await Promise.all([
    redis.set(reminderKey(record.token), updated, { keepTtl: true }),
    redis.del(activeKey(record.productSlug, record.email)),
  ]);
}

export async function markSent(record: ReminderRecord): Promise<void> {
  await updateStatus(record, "sent");
}

export async function markUnavailable(record: ReminderRecord): Promise<void> {
  await updateStatus(record, "unavailable");
}

export type CancelOutcome = "cancelled" | "already_sent" | "already_cancelled" | "unavailable" | "not_found";

export async function cancelReminder(token: string): Promise<CancelOutcome> {
  const record = await getReminder(token);
  if (!record) return "not_found";
  if (record.status === "sent") return "already_sent";
  if (record.status === "cancelled") return "already_cancelled";
  if (record.status === "unavailable") return "unavailable";

  const redis = getRedisClient();
  await Promise.all([
    redis.zrem(DUE_SET_KEY, token),
    redis.set(reminderKey(token), { ...record, status: "cancelled" as ReminderStatus }, { keepTtl: true }),
    redis.del(activeKey(record.productSlug, record.email)),
  ]);
  return "cancelled";
}
