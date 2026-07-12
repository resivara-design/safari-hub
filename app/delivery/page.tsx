import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { site } from "@/lib/site";
import { returnsPolicySummary } from "@/lib/returns-policy";

const deliveryDescription = `Free UK delivery on all ${site.displayName} orders — delivery zones and timeframes across the UK.`;

export const metadata: Metadata = {
  title: "Delivery",
  description: deliveryDescription,
  alternates: { canonical: `${site.url}/delivery` },
  openGraph: {
    title: `Delivery | ${site.displayName}`,
    description: deliveryDescription,
    url: `${site.url}/delivery`,
  },
};

const zones = [
  { zone: "London & South East", timeframe: "1-2 working days" },
  { zone: "Rest of England & Wales", timeframe: "2-4 working days" },
  { zone: "Scotland", timeframe: "3-5 working days" },
  { zone: "Northern Ireland", timeframe: "3-6 working days" },
];

export default function DeliveryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        eyebrow="Shipping"
        heading="Delivery Information"
        subtext="Free UK delivery on all orders, wherever you are in the UK."
        align="left"
      />

      <div className="mt-8 rounded-2xl border border-deep-green/20 bg-deep-green/5 p-6 text-center">
        <p className="font-heading text-xl text-deep-green">Free UK Delivery on All Orders</p>
        <p className="mt-1 text-sm text-brown">
          Delivery is included in every product&apos;s price — there are no separate shipping fees
          at checkout, regardless of order size.
        </p>
      </div>

      <div className="mt-10 overflow-x-auto rounded-2xl border border-brown/10 bg-ivory">
        <table className="w-full min-w-[380px] text-left text-sm">
          <thead>
            <tr className="border-b border-brown/10 text-brown/80">
              <th className="px-5 py-3 font-semibold">Zone</th>
              <th className="px-5 py-3 font-semibold">Timeframe</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone) => (
              <tr key={zone.zone} className="border-b border-brown/5 last:border-0">
                <td className="px-5 py-4 font-semibold text-ink">{zone.zone}</td>
                <td className="px-5 py-4 text-brown">{zone.timeframe}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex flex-col gap-6 text-brown">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Badge tone="green">Order Tracking</Badge>
          </div>
          <p>
            Once your order is dispatched, you&apos;ll receive an email confirmation with
            your order number. For any tracking questions, reach out via our{" "}
            <a href="/contact" className="text-deep-green underline">contact page</a>{" "}
            and we&apos;ll get you an update.
          </p>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Badge tone="gold">Freshness &amp; Returns</Badge>
          </div>
          <p>
            All our products are packed to preserve freshness in transit. {returnsPolicySummary}{" "}
            Full details are available in our{" "}
            <a href="/returns" className="text-deep-green underline">
              Returns &amp; Refund Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
