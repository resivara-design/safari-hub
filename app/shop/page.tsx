import type { Metadata } from "next";
import { Suspense } from "react";
import ShopClient from "./ShopClient";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop",
  description: `Browse the full ${site.name} range of authentic African food items and traditional cooking ingredients.`,
  openGraph: {
    title: `Shop | ${site.name}`,
    description: `Browse the full ${site.name} range of authentic African food items and traditional cooking ingredients.`,
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
        <Suspense fallback={<div className="text-brown/60">Loading products...</div>}>
          <ShopClient />
        </Suspense>
      </div>
    </div>
  );
}
