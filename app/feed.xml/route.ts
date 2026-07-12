import { NextResponse } from "next/server";
import { products } from "@/lib/products";
import { site } from "@/lib/site";
import type { CategorySlug } from "@/types/product";

// Best-effort mapping to Google's product taxonomy (text form, which Google
// accepts as an alternative to the numeric ID). Re-check in Merchant Center
// if Google suggests a more specific category after the feed is submitted.
const googleProductCategory: Record<CategorySlug, string> = {
  "nuts-and-kola": "Food, Beverages & Tobacco > Food Items > Nuts & Seeds",
  "spices-and-seasoning": "Food, Beverages & Tobacco > Food Items > Herbs & Spices",
  "dried-leaves-and-herbs": "Food, Beverages & Tobacco > Food Items > Herbs & Spices",
  "meal-kits": "Food, Beverages & Tobacco > Food Items > Meal Kits",
  snacks: "Food, Beverages & Tobacco > Food Items > Snack Foods",
  "soup-ingredients": "Food, Beverages & Tobacco > Food Items > Cooking & Baking Ingredients",
};

function cdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = products
    .map((product) => {
      const link = `${site.url}/product/${product.slug}`;
      const imageLink = product.photo ? `${site.url}${product.photo}` : "";
      const availability = product.inStock ? "in_stock" : "out_of_stock";
      const category = googleProductCategory[product.category];

      return `  <item>
    <g:id>${escapeXml(product.slug)}</g:id>
    <title>${cdata(product.name)}</title>
    <description>${cdata(product.longDescription)}</description>
    <link>${escapeXml(link)}</link>
    <g:image_link>${escapeXml(imageLink)}</g:image_link>
    <g:availability>${availability}</g:availability>
    <g:price>${product.price.toFixed(2)} GBP</g:price>
    <g:condition>new</g:condition>
    <g:brand>${cdata(site.displayName)}</g:brand>
    <g:google_product_category>${escapeXml(category)}</g:google_product_category>
    <g:shipping>
      <g:country>GB</g:country>
      <g:service>Standard</g:service>
      <g:price>0.00 GBP</g:price>
    </g:shipping>
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>${escapeXml(site.displayName)} Product Feed</title>
  <link>${escapeXml(site.url)}</link>
  <description>${escapeXml(site.description)}</description>
${items}
</channel>
</rss>
`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=UTF-8",
    },
  });
}
