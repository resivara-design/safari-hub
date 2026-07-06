import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delivery",
  description: `Delivery zones, timeframes and fees for ${site.name} orders across the UK.`,
  alternates: { canonical: `${site.url}/delivery` },
};

const zones = [
  { zone: "London & South East", timeframe: "1-2 working days", fee: "£3.99 (free over £30)" },
  { zone: "Rest of England & Wales", timeframe: "2-4 working days", fee: "£4.99 (free over £30)" },
  { zone: "Scotland", timeframe: "3-5 working days", fee: "£5.99 (free over £15)" },
  { zone: "Northern Ireland", timeframe: "3-6 working days", fee: "£5.99 (free over £15)" },
];

export default function DeliveryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        eyebrow="Shipping"
        heading="Delivery Information"
        subtext="Where we deliver, how long it takes, and what it costs."
        align="left"
      />

      <div className="mt-10 overflow-x-auto rounded-2xl border border-brown/10 bg-ivory">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b border-brown/10 text-brown/80">
              <th className="px-5 py-3 font-semibold">Zone</th>
              <th className="px-5 py-3 font-semibold">Timeframe</th>
              <th className="px-5 py-3 font-semibold">Fee</th>
            </tr>
          </thead>
          <tbody>
            {zones.map((zone) => (
              <tr key={zone.zone} className="border-b border-brown/5 last:border-0">
                <td className="px-5 py-4 font-semibold text-ink">{zone.zone}</td>
                <td className="px-5 py-4 text-brown">{zone.timeframe}</td>
                <td className="px-5 py-4 text-brown">{zone.fee}</td>
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
            All our products are packed to preserve freshness in transit. As these are
            food items, we&apos;re unable to accept returns once delivered — but if
            anything arrives damaged or isn&apos;t as described, let us know within 48
            hours and we&apos;ll arrange a replacement or refund.
          </p>
        </div>
      </div>
    </div>
  );
}
