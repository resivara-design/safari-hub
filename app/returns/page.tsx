import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const returnsDescription = `${site.displayName}'s returns and refund policy for food products, in line with UK consumer law.`;

export const metadata: Metadata = {
  title: "Returns & Refund Policy",
  description: returnsDescription,
  alternates: { canonical: `${site.url}/returns` },
  openGraph: {
    title: `Returns & Refund Policy | ${site.displayName}`,
    description: returnsDescription,
    url: `${site.url}/returns`,
  },
};

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading eyebrow="Support" heading="Returns &amp; Refund Policy" align="left" />
      <p className="mt-2 text-sm text-brown/80">Last updated: July 2026</p>

      <div className="mt-10 flex flex-col gap-6 text-brown">
        <p>
          At {site.displayName}, we are committed to providing high-quality African food products.
          Due to the nature of the products we sell, our returns policy is designed to protect
          food safety while ensuring customers are treated fairly.
        </p>

        <h2 className="font-heading text-2xl text-ink">Food Products</h2>
        <p>Because our products are food items, we cannot accept returns once an order has been delivered.</p>

        <h2 className="font-heading text-2xl text-ink">Damaged, Incorrect or Faulty Items</h2>
        <p>If your order arrives:</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>Damaged</li>
          <li>Defective</li>
          <li>Incorrect</li>
          <li>Not as described</li>
        </ul>
        <p>please contact us within 48 hours of delivery.</p>
        <p>To help us resolve your request quickly, please include:</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>Your order number</li>
          <li>A description of the issue</li>
          <li>Clear photographs of the product and packaging</li>
        </ul>
        <p>After reviewing your claim, {site.displayName} will provide either:</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>A replacement product, or</li>
          <li>A full refund</li>
        </ul>
        <p>where appropriate.</p>

        <h2 className="font-heading text-2xl text-ink">Non-returnable Items</h2>
        <p>We cannot accept returns for:</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>Opened food products</li>
          <li>Perishable food items</li>
          <li>Products that have been used</li>
          <li>Change of mind purchases after delivery</li>
          <li>Items returned outside the reporting period</li>
        </ul>
        <p>unless required under UK consumer law.</p>

        <h2 className="font-heading text-2xl text-ink">Refunds</h2>
        <p>Approved refunds will be processed back to the original payment method.</p>
        <p>Processing times may vary depending on your payment provider.</p>

        <h2 className="font-heading text-2xl text-ink">Contact Us</h2>
        <p className="flex flex-col gap-1">
          <span>
            Email:{" "}
            <a href={`mailto:${site.contactEmail}`} className="text-deep-green underline">
              {site.contactEmail}
            </a>
          </span>
          <span>
            Phone:{" "}
            <a href={site.phoneLink} className="text-deep-green underline">
              {site.phoneNumber}
            </a>
          </span>
          <span>
            WhatsApp:{" "}
            <a href={site.whatsappLink} target="_blank" rel="noreferrer" className="text-deep-green underline">
              {site.whatsappNumber}
            </a>
          </span>
        </p>
        <p>Please contact us if you have any questions regarding your order.</p>
      </div>
    </div>
  );
}
