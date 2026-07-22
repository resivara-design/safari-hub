import { Resend } from "resend";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/format";

// Deliberately a separate lazy Resend singleton from lib/email/order-notification.ts
// rather than importing/exporting from it — this feature must not touch the
// existing order/contact email-routing module.
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

export interface ProductReminderPayload {
  to: string;
  productName: string;
  productSlug: string;
  price: number;
  photo?: string;
  token: string;
}

export async function sendProductReminderEmail(payload: ProductReminderPayload): Promise<void> {
  const resend = getResendClient();

  const productUrl = `${site.url}/product/${payload.productSlug}`;
  const cancelUrl = `${site.url}/reminders/cancel?t=${payload.token}`;
  const imageUrl = payload.photo ? `${site.url}${payload.photo}` : undefined;
  const price = formatPrice(payload.price);

  const text = `Still thinking about ${payload.productName}?

You asked us to remind you about this product on ${site.displayName}. Here it is:

${payload.productName} — ${price}
${productUrl}

This is the only reminder we'll send about this product — we won't email you again.

Didn't mean to sign up, or already sorted? Cancel this reminder:
${cancelUrl}

— ${site.displayName}`;

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; max-width: 480px; margin: 0 auto; color: #2b2118;">
      <h1 style="font-size: 20px; margin-bottom: 16px;">Still thinking about ${escapeHtml(payload.productName)}?</h1>
      <p style="font-size: 15px; line-height: 1.5;">You asked us to remind you about this product on ${escapeHtml(site.displayName)}. Here it is:</p>
      ${imageUrl ? `<img src="${imageUrl}" alt="${escapeHtml(payload.productName)}" style="width: 100%; max-width: 320px; border-radius: 12px; display: block; margin: 16px 0;" />` : ""}
      <p style="font-size: 17px; font-weight: bold; margin: 8px 0 20px;">${escapeHtml(payload.productName)} — ${price}</p>
      <a href="${productUrl}" style="display: inline-block; background-color: #d4a017; color: #1f3d2b; font-weight: bold; text-decoration: none; padding: 12px 24px; border-radius: 999px;">Return to this product</a>
      <p style="font-size: 13px; color: #6b5a4a; margin-top: 28px;">
        This is the only reminder we'll send about this product — we won't email you again.
      </p>
      <p style="font-size: 13px; color: #6b5a4a;">
        Didn't mean to sign up, or already sorted? <a href="${cancelUrl}" style="color: #1f3d2b;">Cancel this reminder</a>.
      </p>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: `${site.displayName} <orders@safarihub.uk>`,
    to: payload.to,
    subject: `Still thinking about ${payload.productName}?`,
    text,
    html,
  });
  if (error) {
    throw new Error(`Resend rejected product reminder email: ${error.name} — ${error.message}`);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
