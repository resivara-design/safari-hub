import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { site } from "@/lib/site";

const productInfoDescription = `Important information about the products ${site.displayName} sells, including allergens, ingredients and storage.`;

export const metadata: Metadata = {
  title: "Product Information",
  description: productInfoDescription,
  alternates: { canonical: `${site.url}/product-information` },
  openGraph: {
    title: `Product Information | ${site.displayName}`,
    description: productInfoDescription,
    url: `${site.url}/product-information`,
  },
};

export default function ProductInformationPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading eyebrow="Important" heading="Product Information" align="left" />

      <div className="mt-10 flex flex-col gap-6 text-brown">
        <p>
          {site.displayName} is a retailer of packaged African foods, spices, ingredients and
          snacks — we do not manufacture the products we sell.
        </p>

        <div className="rounded-2xl border border-burnt-orange/30 bg-burnt-orange/10 p-6">
          <div className="mb-2">
            <Badge tone="orange">Allergy &amp; Dietary Notice</Badge>
          </div>
          <p className="text-brown">
            Where available, we include ingredients, allergen information, weights and storage
            instructions taken directly from the product&apos;s packaging. However, packaging and
            formulations can change, and we cannot guarantee that the information on our website
            is always fully up to date.
          </p>
          <p className="mt-3 font-semibold text-ink">
            Always read the product label before consumption — especially if you have a food
            allergy, intolerance, or other dietary requirement. Do not rely solely on the
            information shown on this website.
          </p>
        </div>

        <h2 className="font-heading text-2xl text-ink">Where our information comes from</h2>
        <p>
          Ingredients, allergens, weights and storage instructions shown on our product pages are
          taken from the manufacturer or supplier&apos;s packaging where this information is
          available to us. If a product page doesn&apos;t show this information, it means we
          don&apos;t currently hold it — it does not mean the product is free from allergens.
        </p>

        <h2 className="font-heading text-2xl text-ink">Before you buy</h2>
        <p>
          If you need more detail than what&apos;s shown on a product page — for example, a full
          ingredients list, allergen advice, or nutritional information — please{" "}
          <a href="/contact" className="text-deep-green underline">
            contact us
          </a>{" "}
          before placing your order. We&apos;re happy to help wherever we can.
        </p>

        <h2 className="font-heading text-2xl text-ink">Storage &amp; use</h2>
        <p>
          Store products as instructed on the packaging, and always check the use-by or best-before
          date before consuming. Our{" "}
          <a href="/returns" className="text-deep-green underline">
            Returns &amp; Refund Policy
          </a>{" "}
          explains what to do if an item arrives damaged, defective, incorrect or not as described.
        </p>
      </div>
    </div>
  );
}
