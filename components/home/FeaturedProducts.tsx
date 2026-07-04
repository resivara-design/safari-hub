import SectionHeading from "@/components/ui/SectionHeading";
import PatternBackground from "@/components/ui/PatternBackground";
import ProductGrid from "@/components/product/ProductGrid";
import ProductCard from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/products";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <PatternBackground className="text-bronze/[0.06]" />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Customer Favourites"
          heading="Featured Products"
          subtext="A hand-picked selection of our most-loved ingredients and kits."
        />
        <div className="mt-10">
          <ProductGrid>
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </ProductGrid>
        </div>
      </div>
    </section>
  );
}
