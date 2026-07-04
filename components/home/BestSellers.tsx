import SectionHeading from "@/components/ui/SectionHeading";
import PatternBackground from "@/components/ui/PatternBackground";
import ProductGrid from "@/components/product/ProductGrid";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/products";

export default function BestSellers() {
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <PatternBackground className="text-bronze/[0.06]" />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Shopper Favourites"
          heading="Best Sellers"
          subtext="The ingredients our customers reorder again and again."
        />
        <div className="mt-10">
          <ProductGrid>
            {bestSellers.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </ProductGrid>
        </div>
      </div>
    </section>
  );
}
