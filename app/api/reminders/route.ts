import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";
import { isRedisConfigured } from "@/lib/reminders/redis-client";
import { createReminder, findActiveReminderToken } from "@/lib/reminders/store";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const RATE_LIMIT = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_EMAIL_LENGTH = 320;

export async function POST(request: Request) {
  if (isRateLimited(`reminder:${getClientIp(request)}`, RATE_LIMIT, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  if (!isRedisConfigured()) {
    console.error("Reminder signup submitted but Upstash Redis is not configured.");
    return NextResponse.json(
      { error: "Reminders are temporarily unavailable. Please contact us to be notified instead." },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const { slug, email, consent } = (body ?? {}) as Record<string, unknown>;

  if (typeof slug !== "string" || !slug.trim()) {
    return NextResponse.json({ error: "Invalid product." }, { status: 400 });
  }
  const product = getProductBySlug(slug);
  if (!product) {
    return NextResponse.json({ error: "Product not found." }, { status: 404 });
  }

  if (typeof email !== "string" || !EMAIL_PATTERN.test(email) || email.length > MAX_EMAIL_LENGTH) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // Authoritative consent check — the client disables its submit button
  // without a ticked box, but that's UX only and must never be trusted alone.
  if (consent !== true) {
    return NextResponse.json({ error: "Please tick the consent checkbox to receive a reminder." }, { status: 400 });
  }

  try {
    const existingToken = await findActiveReminderToken(product.slug, email);
    if (existingToken) {
      return NextResponse.json(
        { error: "You already have a reminder pending for this product — check your inbox, or use the cancel link if you'd like to reset it." },
        { status: 409 }
      );
    }

    const record = await createReminder({
      productSlug: product.slug,
      productName: product.name,
      email: email.trim(),
    });

    return NextResponse.json({ token: record.token });
  } catch (error) {
    console.error("Failed to create product reminder:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
