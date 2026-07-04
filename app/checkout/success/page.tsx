import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/format";
import { retrieveStripeSession, isStripeConfigured } from "@/lib/payments/stripe-provider";
import ClearCartOnMount from "./ClearCartOnMount";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  let orderId = `SH-${Date.now()}`;
  let customerEmail: string | null = null;
  let amountTotal: number | null = null;

  if (searchParams.session_id && isStripeConfigured()) {
    try {
      const session = await retrieveStripeSession(searchParams.session_id);
      orderId = session.id;
      customerEmail = session.customer_details?.email ?? session.customer_email ?? null;
      amountTotal = session.amount_total ? session.amount_total / 100 : null;
    } catch (error) {
      console.error("Failed to retrieve Stripe session:", error);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
      <ClearCartOnMount />
      <SectionHeading eyebrow="Order Confirmed" heading="Thank you for your order!" />
      <p className="mt-4 text-brown">
        {customerEmail
          ? `A confirmation has been sent to ${customerEmail}.`
          : "Your payment was successful and your order is being processed."}
      </p>
      {amountTotal !== null && (
        <p className="mt-2 font-heading text-xl text-deep-green">Total paid: {formatPrice(amountTotal)}</p>
      )}
      <p className="mt-1 text-sm text-brown/70">Order reference: {orderId}</p>
      <div className="mt-6">
        <Button href="/shop" variant="primary" size="lg">
          Continue Shopping
        </Button>
      </div>
      <div className="mt-8 rounded-2xl border border-brown/10 bg-ivory p-6 text-sm text-brown">
        <p className="font-heading text-base text-ink">Questions about your order?</p>
        <div className="mt-2 flex flex-col gap-1">
          <a href={`mailto:${site.contactEmail}`} className="text-deep-green hover:underline">
            {site.contactEmail}
          </a>
          <a href={site.phoneLink} className="text-deep-green hover:underline">
            {site.phoneNumber}
          </a>
          <a href={site.whatsappLink} target="_blank" rel="noreferrer" className="text-deep-green hover:underline">
            WhatsApp: {site.whatsappNumber}
          </a>
        </div>
      </div>
    </div>
  );
}
