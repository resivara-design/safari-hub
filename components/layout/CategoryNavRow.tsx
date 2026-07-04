import Link from "next/link";
import { categories } from "@/lib/categories";
import type { CategorySlug } from "@/types/product";

const categoryIcons: Record<CategorySlug, string> = {
  "nuts-and-kola": "M12 2c3 3 5 6.5 5 10a5 5 0 01-10 0c0-3.5 2-7 5-10z",
  "spices-and-seasoning": "M9 3c1.5 0 2 1 2 2 3-1 6 1 6 5 0 5-4 11-8 11S1 15 1 10c0-3 2-5 4-5 0-1 1.5-2 4-2z",
  "dried-leaves-and-herbs": "M4 20c8 0 16-8 16-16-8 0-16 8-16 16zm0 0c2-4 4-8 8-12",
  "meal-kits": "M4 9h16l-1.5 9a2 2 0 01-2 1.7H7.5a2 2 0 01-2-1.7L4 9zm2-4h12M12 5V2",
  snacks: "M8 3h8v3.5c1.2.6 2 1.9 2 3.5v9a2 2 0 01-2 2H8a2 2 0 01-2-2v-9c0-1.6.8-2.9 2-3.5V3z",
  "soup-ingredients": "M12 2c4 4 4 8 0 12-4-4-4-8 0-12zm0 10v10M8 15c1 1 2 1.5 4 1.5s3-.5 4-1.5",
};

export default function CategoryNavRow() {
  return (
    <div className="border-b border-brown/10 bg-ivory">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="scrollbar-hide flex items-center gap-6 overflow-x-auto py-3">
          <Link
            href="/shop"
            className="flex shrink-0 items-center gap-1.5 rounded font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="whitespace-nowrap text-sm">All Categories</span>
          </Link>

          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="flex shrink-0 items-center gap-1.5 rounded text-sm text-brown hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={categoryIcons[category.slug]} />
              </svg>
              <span className="whitespace-nowrap">{category.name}</span>
            </Link>
          ))}

          <Link
            href="/shop"
            className="shrink-0 whitespace-nowrap rounded text-sm font-semibold text-deep-green hover:text-deep-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-ivory"
          >
            More
          </Link>
        </div>
      </div>
    </div>
  );
}
