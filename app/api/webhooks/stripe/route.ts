import { NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  constructStripeWebhookEvent,
  hasOrderEmailBeenSent,
  listStripeSessionLineItems,
  markOrderEmailSent,
} from "@/lib/payments/stripe-provider";
import {
  isResendConfigured,
  sendCustomerConfirmationEmail,
  sendOrderNotificationEmail,
} from "@/lib/email/order-notification";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

// Generous ceiling: legitimate Stripe traffic can burst (multiple events
// delivered in parallel), this just blunts a flood of forged/invalid requests.
const RATE_LIMIT = 60;
const RATE_LIMIT_WINDOW_MS = 60_000;

function formatShippingAddress(metadata: Stripe.Metadata | null): string {
  if (!metadata) return "n/a";
  const { addressLine1, addressLine2, city, postcode } = metadata;
  return [addressLine1, addressLine2, city, postcode].filter(Boolean).join(", ");
}

function resolvePaymentIntentId(session: Stripe.Checkout.Session): string | null {
  if (typeof session.payment_intent === "string") return session.payment_intent;
  return session.payment_intent?.id ?? null;
}

function maskEmail(email: string | null): string {
  if (!email) return "(none)";
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  return `${local[0] ?? "*"}***@${domain}`;
}

export async function POST(request: Request) {
  if (isRateLimited(`webhook:${getClientIp(request)}`, RATE_LIMIT, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error(
      "Stripe webhook received but STRIPE_WEBHOOK_SECRET is not set for this environment — check Vercel env vars (Production/Preview) for a typo or missing value."
    );
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = constructStripeWebhookEvent(body, signature);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
      console.warn(
        `checkout.session.completed for ${session.id} has payment_status="${session.payment_status}" — not sending order emails until payment is confirmed paid.`
      );
      return NextResponse.json({ received: true });
    }

    const paymentIntentId = resolvePaymentIntentId(session);

    if (paymentIntentId) {
      try {
        if (await hasOrderEmailBeenSent(paymentIntentId)) {
          console.log(`Order emails already sent for payment intent ${paymentIntentId} — skipping duplicate webhook delivery for session ${session.id}.`);
          return NextResponse.json({ received: true });
        }
      } catch (error) {
        // Fail open: idempotency is best-effort, not a correctness boundary.
        console.error(`Failed to check idempotency marker for ${session.id}:`, error instanceof Error ? error.message : error);
      }
    }

    if (!isResendConfigured()) {
      console.warn(`RESEND_API_KEY not configured — skipping order emails for ${session.id}`);
    } else {
      const payload = {
        orderId: session.id,
        customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
        customerName: session.metadata?.fullName ?? "Unknown customer",
        phone: session.metadata?.phone ?? "n/a",
        shippingAddress: formatShippingAddress(session.metadata ?? null),
        amountTotal: (session.amount_total ?? 0) / 100,
        items: await listStripeSessionLineItems(session.id),
      };

      console.log(
        `checkout.session.completed for ${session.id}: resolved customer email = ${maskEmail(payload.customerEmail)}`
      );

      // Send independently and log each outcome separately so a failure in
      // one (e.g. Resend rejecting an unverified customer domain) doesn't
      // silently swallow the other, and so Stripe still gets acknowledged.
      const results = await Promise.allSettled([
        sendOrderNotificationEmail(payload),
        sendCustomerConfirmationEmail(payload),
      ]);
      if (results[0].status === "rejected") {
        console.error(`Failed to send store notification email for session ${session.id}:`, results[0].reason instanceof Error ? results[0].reason.message : results[0].reason);
      }
      if (results[1].status === "rejected") {
        console.error(`Failed to send customer confirmation email for session ${session.id}:`, results[1].reason instanceof Error ? results[1].reason.message : results[1].reason);
      }

      if (paymentIntentId) {
        try {
          await markOrderEmailSent(paymentIntentId);
        } catch (error) {
          console.error(`Failed to mark order emails sent for ${session.id}:`, error instanceof Error ? error.message : error);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
