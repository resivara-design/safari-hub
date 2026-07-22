import { getProductBySlug } from "@/lib/products";
import { sendProductReminderEmail } from "@/lib/email/product-reminder";
import { claimDueToken, getDueTokens, getReminder, markSent, markUnavailable } from "./store";

export interface ProcessDueResult {
  processed: number;
  sent: number;
  unavailable: number;
  failed: number;
}

export async function processDueReminders(nowMs: number): Promise<ProcessDueResult> {
  const tokens = await getDueTokens(nowMs);
  const result: ProcessDueResult = { processed: 0, sent: 0, unavailable: 0, failed: 0 };

  for (const token of tokens) {
    // ZREM first: if this returns false, another (retried/overlapping) cron
    // invocation already claimed this token — skip rather than risk a
    // duplicate send.
    if (!(await claimDueToken(token))) continue;

    const record = await getReminder(token);
    if (!record || record.status !== "pending") continue;

    result.processed++;

    const product = getProductBySlug(record.productSlug);
    if (!product || !product.inStock) {
      await markUnavailable(record);
      result.unavailable++;
      continue;
    }

    try {
      await sendProductReminderEmail({
        to: record.email,
        productName: product.name,
        productSlug: product.slug,
        price: product.price,
        photo: product.photo,
        token: record.token,
      });
      await markSent(record);
      result.sent++;
    } catch (error) {
      // Left "pending" so it isn't retried (a false-negative failure could
      // otherwise cause a duplicate send) — it simply expires unsent once
      // its retention TTL passes.
      console.error(`Failed to send product reminder email for token ${token}:`, error instanceof Error ? error.message : error);
      result.failed++;
    }
  }

  return result;
}
