import { Resend } from "resend";
import { site } from "@/lib/site";
import type { OrderLineItem } from "@/lib/payments/stripe-provider";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export interface OrderNotificationPayload {
  orderId: string;
  customerEmail: string | null;
  customerName: string;
  phone: string;
  shippingAddress: string;
  amountTotal: number;
  items: OrderLineItem[];
}

export async function sendOrderNotificationEmail(payload: OrderNotificationPayload): Promise<void> {
  const resend = getResendClient();

  const itemLines = payload.items
    .map((item) => `- ${item.name} x${item.quantity} — £${item.amountTotal.toFixed(2)}`)
    .join("\n");

  const text = `New order received on ${site.displayName}!

Order: ${payload.orderId}
Customer: ${payload.customerName}
Email: ${payload.customerEmail ?? "n/a"}
Phone: ${payload.phone}
Shipping address: ${payload.shippingAddress}

Items:
${itemLines}

Total paid: £${payload.amountTotal.toFixed(2)}`;

  const { error } = await resend.emails.send({
    from: `${site.displayName} Orders <onboarding@resend.dev>`,
    to: site.contactEmail,
    replyTo: payload.customerEmail ?? undefined,
    subject: `New order ${payload.orderId} — £${payload.amountTotal.toFixed(2)}`,
    text,
  });
  // The Resend SDK resolves (rather than rejects) on API-level failures, so
  // this must be checked explicitly or a bad send silently looks like success.
  if (error) {
    throw new Error(`Resend rejected store notification email: ${error.name} — ${error.message}`);
  }
}

export async function sendCustomerConfirmationEmail(payload: OrderNotificationPayload): Promise<void> {
  if (!payload.customerEmail) {
    console.warn(
      `No customer email on Stripe session for order ${payload.orderId} — skipping customer confirmation email.`
    );
    return;
  }

  const resend = getResendClient();

  const itemLines = payload.items
    .map((item) => `- ${item.name} x${item.quantity} — £${item.amountTotal.toFixed(2)}`)
    .join("\n");

  const text = `Hi ${payload.customerName},

Thanks for your order from ${site.displayName}! Here's a summary:

Order reference: ${payload.orderId}
Shipping to: ${payload.shippingAddress}

Items:
${itemLines}

Total paid: £${payload.amountTotal.toFixed(2)}

We'll be in touch once your order is on its way. If you have any questions,
just reply to this email or contact us at ${site.contactEmail}.

— ${site.displayName}`;

  const { error } = await resend.emails.send({
    from: `${site.displayName} <onboarding@resend.dev>`,
    to: payload.customerEmail,
    replyTo: site.contactEmail,
    subject: `Your ${site.displayName} order ${payload.orderId} is confirmed`,
    text,
  });
  if (error) {
    throw new Error(`Resend rejected customer confirmation email: ${error.name} — ${error.message}`);
  }
}

export interface ContactFormPayload {
  name: string;
  email: string;
  message: string;
}

export async function sendContactFormEmail(payload: ContactFormPayload): Promise<void> {
  const resend = getResendClient();

  const text = `New contact form submission on ${site.displayName}

Name: ${payload.name}
Email: ${payload.email}

Message:
${payload.message}`;

  const { error } = await resend.emails.send({
    from: `${site.displayName} Contact Form <onboarding@resend.dev>`,
    to: site.contactEmail,
    replyTo: payload.email,
    subject: `New contact form message from ${payload.name}`,
    text,
  });
  if (error) {
    throw new Error(`Resend rejected contact form email: ${error.name} — ${error.message}`);
  }
}
