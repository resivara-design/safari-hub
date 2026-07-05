import Stripe from "stripe";
import { site } from "@/lib/site";
import type { CheckoutPayload } from "./types";

let stripeClient: Stripe | null = null;

function getStripeClient(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }
  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeClient;
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}

export async function createStripeCheckoutSession(payload: CheckoutPayload): Promise<{ url: string }> {
  const stripe = getStripeClient();

  const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = payload.items.map((item) => ({
    price_data: {
      currency: "gbp",
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items,
    customer_email: payload.customer.email,
    shipping_address_collection: { allowed_countries: ["GB"] },
    metadata: {
      fullName: payload.customer.fullName,
      phone: payload.customer.phone,
      addressLine1: payload.customer.addressLine1,
      addressLine2: payload.customer.addressLine2 || "",
      city: payload.customer.city,
      postcode: payload.customer.postcode,
    },
    success_url: `${site.url}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${site.url}/checkout/cancel`,
  });

  if (!session.url) {
    throw new Error("Stripe did not return a checkout URL");
  }

  return { url: session.url };
}

export async function retrieveStripeSession(sessionId: string) {
  const stripe = getStripeClient();
  return stripe.checkout.sessions.retrieve(sessionId);
}

export interface OrderLineItem {
  name: string;
  quantity: number;
  amountTotal: number;
}

export async function listStripeSessionLineItems(sessionId: string): Promise<OrderLineItem[]> {
  const stripe = getStripeClient();
  const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
  return lineItems.data.map((item) => ({
    name: item.description ?? "Item",
    quantity: item.quantity ?? 1,
    amountTotal: (item.amount_total ?? 0) / 100,
  }));
}

export function constructStripeWebhookEvent(payload: string, signature: string): Stripe.Event {
  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not configured");
  }
  const stripe = getStripeClient();
  return stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
}

// Idempotency for webhook-triggered order emails, without needing a database:
// Stripe delivers webhooks at-least-once, so the same event can arrive twice.
// The PaymentIntent behind a Checkout Session already exists and persists for
// the life of the order, so its metadata doubles as a durable "already sent" flag.
export async function hasOrderEmailBeenSent(paymentIntentId: string): Promise<boolean> {
  const stripe = getStripeClient();
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  return intent.metadata?.order_emails_sent === "true";
}

export async function markOrderEmailSent(paymentIntentId: string): Promise<void> {
  const stripe = getStripeClient();
  await stripe.paymentIntents.update(paymentIntentId, {
    metadata: { order_emails_sent: "true" },
  });
}
