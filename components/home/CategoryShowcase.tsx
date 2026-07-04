import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import PatternBackground from "@/components/ui/PatternBackground";
import { categories } from "@/lib/categories";

const tileGradients: Record<string, string> = {
  "nuts-and-kola": "from-brown to-brown-dark",
  "spices-and-seasoning": "from-burnt-orange to-burnt-orange-dark",
  "dried-leaves-and-herbs": "from-deep-green to-deep-green-dark",
  "meal-kits": "from-gold to-burnt-orange-dark",
};

export default function CategoryShowcase() {
  return (
    <section id="categories" className="relative scroll-mt-20 overflow-hidden bg-white py-24 md:py-32">
      <PatternBackground className="text-gold/[0.05]" />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Browse"
          heading="Shop by Category"
          subtext="Find exactly what you need, from single spices to complete meal kits."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories
            .filter((category) => tileGradients[category.slug])
            .map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className={`group relative flex h-40 flex-col justify-end overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-cream transition-transform duration-200 hover:-translate-y-1 ${tileGradients[category.slug]}`}
            >
              <span className="font-heading text-lg leading-tight">{category.name}</span>
              <span className="text-xs text-cream/80">{category.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
