import Link from "next/link";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { categories } from "@/lib/categories";
import { products, getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import type { CategorySlug } from "@/types/product";

const representativeProduct: Record<CategorySlug, string> = {
  "nuts-and-kola": "bitter-kola",
  "spices-and-seasoning": "curry-powder",
  "dried-leaves-and-herbs": "dry-bitter-leaf",
  "meal-kits": "pepper-soup-kit",
  snacks: "kilishi",
  "soup-ingredients": "ground-egusi",
};

const smallTrustItems = [
  { label: "Fast UK Delivery", icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" },
  { label: "Secure Payment", icon: "M12 2l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" },
  { label: "Quality Guaranteed", icon: "M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z" },
  { label: "30-Day Returns", icon: "M4 4v6h6M4 10a8 8 0 1015.5-3" },
];

export default function CategoryShowcase() {
  return (
    <section id="categories" className="bg-cream py-10 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading heading="Shop Popular Categories" align="center" />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {categories.map((category) => {
            const categoryProducts = products.filter((p) => p.category === category.slug);
            const fromPrice = Math.min(...categoryProducts.map((p) => p.price));
            const slug = representativeProduct[category.slug];
            const featured = getProductBySlug(slug) ?? categoryProducts.find((p) => p.photo);

            return (
              <Link
                key={category.slug}
                href={`/shop?category=${category.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-ivory shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex w-full items-center justify-center overflow-hidden bg-cream p-2">
                  {featured?.photo && (
                    <Image
                      src={featured.photo}
                      alt={category.name}
                      width={788}
                      height={1400}
                      sizes="(min-width: 1024px) 180px, (min-width: 640px) 30vw, 45vw"
                      className="h-auto w-full object-contain object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-0.5 p-3 text-center">
                  <span className="line-clamp-2 min-h-[2.25rem] font-heading text-sm font-bold text-black md:text-base">
                    {category.name}
                  </span>
                  <span className="text-xs text-brown/70 md:text-sm">
                    From {formatPrice(fromPrice)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {smallTrustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-brown/70">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
