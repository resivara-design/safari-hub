import { NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  constructStripeWebhookEvent,
  listStripeSessionLineItems,
} from "@/lib/payments/stripe-provider";
import { isResendConfigured, sendOrderNotificationEmail } from "@/lib/email/order-notification";

function formatShippingAddress(metadata: Stripe.Metadata | null): string {
  if (!metadata) return "n/a";
  const { addressLine1, addressLine2, city, postcode } = metadata;
  return [addressLine1, addressLine2, city, postcode].filter(Boolean).join(", ");
}

export async function POST(request: Request) {
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
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    try {
      if (!isResendConfigured()) {
        console.warn(`RESEND_API_KEY not configured — skipping order notification for ${session.id}`);
      } else {
        const items = await listStripeSessionLineItems(session.id);
        await sendOrderNotificationEmail({
          orderId: session.id,
          customerEmail: session.customer_details?.email ?? session.customer_email ?? null,
          customerName: session.metadata?.fullName ?? "Unknown customer",
          phone: session.metadata?.phone ?? "n/a",
          shippingAddress: formatShippingAddress(session.metadata ?? null),
          amountTotal: (session.amount_total ?? 0) / 100,
          items,
        });
      }
    } catch (error) {
      // Log loudly but still acknowledge the event so Stripe doesn't retry
      // (and potentially disable the endpoint) over an email-delivery issue.
      console.error(`Failed to send order notification email for session ${session.id}:`, error);
    }
  }

  return NextResponse.json({ received: true });
}
