import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const termsDescription = `The terms and conditions for shopping with ${site.displayName}.`;

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: termsDescription,
  alternates: { canonical: `${site.url}/terms` },
  openGraph: {
    title: `Terms & Conditions | ${site.displayName}`,
    description: termsDescription,
    url: `${site.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading eyebrow="Legal" heading="Terms &amp; Conditions" align="left" />
      <p className="mt-2 text-sm text-brown/80">Last updated: July 2026</p>

      <div className="mt-10 flex flex-col gap-6 text-brown">
        <p>
          These terms govern your use of {site.displayName} and any order you place with us. By
          using this website or placing an order, you agree to these terms.
        </p>

        <h2 className="font-heading text-2xl text-ink">About us</h2>
        <p>
          {site.displayName} is based in {site.address}. You can contact us at{" "}
          <a href={`mailto:${site.contactEmail}`} className="text-deep-green underline">
            {site.contactEmail}
          </a>{" "}
          or via our{" "}
          <a href="/contact" className="text-deep-green underline">
            Contact page
          </a>
          .
        </p>

        <h2 className="font-heading text-2xl text-ink">Our products</h2>
        <p>
          We are a retailer, not a manufacturer, of the food products we sell — see our{" "}
          <a href="/product-information" className="text-deep-green underline">
            Product Information
          </a>{" "}
          page for details on ingredients, allergens and storage. Product images and descriptions
          are as accurate as possible, but packaging and appearance may vary slightly from what&apos;s
          shown. Prices are in GBP and may change at any time; the price shown at checkout is what
          you&apos;ll be charged.
        </p>

        <h2 className="font-heading text-2xl text-ink">Orders &amp; payment</h2>
        <p>
          Placing an order is an offer to buy, which we accept once your payment is successfully
          processed by Stripe, our payment provider. We reserve the right to refuse or cancel an
          order — for example if an item is unexpectedly out of stock — in which case you&apos;ll
          be refunded in full.
        </p>

        <h2 className="font-heading text-2xl text-ink">Delivery</h2>
        <p>
          See our{" "}
          <a href="/delivery" className="text-deep-green underline">
            Delivery Information
          </a>{" "}
          page for zones, timeframes and fees.
        </p>

        <h2 className="font-heading text-2xl text-ink">Cancellation and returns</h2>
        <p>
          Under the Consumer Contracts Regulations 2013, online purchases normally carry a 14-day
          right to cancel — but food items that are sealed for health or hygiene reasons are
          exempt from this right once unsealed after delivery, given their perishable nature. Our
          full policy on damaged, defective, incorrect or not-as-described items — including how
          to make a claim — is set out in our{" "}
          <a href="/returns" className="text-deep-green underline">
            Returns &amp; Refund Policy
          </a>
          , which forms part of these terms.
        </p>

        <h2 className="font-heading text-2xl text-ink">Liability</h2>
        <p>
          We are not liable for any loss that wasn&apos;t reasonably foreseeable, or for any loss
          arising from your misuse of a product (for example, disregarding allergen information or
          storage instructions). Nothing in these terms limits our liability for death or personal
          injury caused by our negligence, fraud, or anything else that can&apos;t be limited or
          excluded under UK law.
        </p>

        <h2 className="font-heading text-2xl text-ink">Intellectual property</h2>
        <p>
          All content on this site — including text, images, logos and the {site.displayName}{" "}
          name — belongs to us or our licensors and may not be used without permission.
        </p>

        <h2 className="font-heading text-2xl text-ink">Governing law</h2>
        <p>These terms are governed by the laws of England and Wales.</p>

        <h2 className="font-heading text-2xl text-ink">Changes to these terms</h2>
        <p>We may update these terms from time to time. The &quot;Last updated&quot; date above always reflects the current version.</p>

        <h2 className="font-heading text-2xl text-ink">Contact us</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${site.contactEmail}`} className="text-deep-green underline">
            {site.contactEmail}
          </a>
          .
        </p>
      </div>
    </div>
  );
}
