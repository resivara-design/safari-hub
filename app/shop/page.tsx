import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "./ShopClient";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const shopDescription = `Browse the full ${site.displayName} range of authentic African food items and traditional cooking ingredients.`;

export const metadata: Metadata = {
  title: "Shop",
  description: shopDescription,
  alternates: { canonical: `${site.url}/shop` },
  openGraph: {
    title: `Shop | ${site.displayName}`,
    description: shopDescription,
    url: `${site.url}/shop`,
  },
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        eyebrow="Shop"
        heading="All Products"
        subtext="Search or filter by category to find exactly what your kitchen needs."
        align="left"
      />
      <div className="mt-8">
        <Suspense fallback={<div className="text-brown/80">Loading products...</div>}>
          <ShopClient />
        </Suspense>
      </div>
    </div>
  );
}
