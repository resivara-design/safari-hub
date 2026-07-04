import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/product/ProductImage";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import FreeDeliveryBadge from "@/components/ui/FreeDeliveryBadge";
import InStockBadge from "@/components/ui/InStockBadge";
import AddToCartButton from "@/components/product/AddToCartButton";
import ProductReviews from "@/components/product/ProductReviews";
import ProductGrid from "@/components/product/ProductGrid";
import ProductCard from "@/components/product/ProductCard";
import SectionHeading from "@/components/ui/SectionHeading";
import JsonLd from "@/components/seo/JsonLd";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";
import { getAverageRating, getReviewsBySlug } from "@/lib/reviews";
import { getCategoryBySlug } from "@/lib/categories";
import { formatPrice } from "@/lib/format";
import { site } from "@/lib/site";

interface ProductPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | ${site.name}`,
      description: product.shortDescription,
      ...(product.photo ? { images: [`${site.url}${product.photo}`] } : {}),
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const category = getCategoryBySlug(product.category);
  const relatedProducts = getRelatedProducts(product);
  const reviewCount = getReviewsBySlug(product.slug).length;
  const averageRating = getAverageRating(product.slug);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription,
    sku: product.slug,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${site.url}/product/${product.slug}`,
    },
    ...(reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: averageRating,
            reviewCount,
          },
        }
      : {}),
    ...(product.photo ? { image: `${site.url}${product.photo}` } : {}),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <JsonLd data={productJsonLd} />

      <nav className="mb-6 text-sm text-brown/60">
        <Link href="/shop" className="hover:text-deep-green">Shop</Link>
        {category && (
          <>
            {" / "}
            <Link href={`/shop?category=${category.slug}`} className="hover:text-deep-green">
              {category.name}
            </Link>
          </>
        )}
        {" / "}
        <span className="text-brown">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <ProductImage
          name={product.name}
          image={product.image}
          photo={product.photo}
          size="lg"
          showPattern
          priority
        />

        <div className="flex flex-col gap-4">
          {category && <Badge tone="green">{category.name}</Badge>}
          <h1 className="font-heading text-3xl text-ink md:text-4xl">{product.name}</h1>
          {product.weight && <span className="text-sm text-brown/60">{product.weight}</span>}
          {reviewCount > 0 && <StarRating rating={averageRating} count={reviewCount} size="md" />}
          <span className="font-heading text-2xl font-bold text-deep-green">
            {formatPrice(product.price)}
          </span>
          <p className="text-brown">{product.longDescription}</p>
          <div className="flex flex-wrap items-center gap-2">
            <FreeDeliveryBadge />
            {product.inStock ? <InStockBadge /> : <Badge tone="orange">Currently Out of Stock</Badge>}
          </div>
          <div className="mt-2">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      <section className="mt-16">
        <SectionHeading eyebrow="Reviews" heading="Customer Reviews" align="left" />
        <div className="mt-6">
          <ProductReviews slug={product.slug} />
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <SectionHeading eyebrow="You May Also Like" heading="Related Products" align="left" />
          <div className="mt-6">
            <ProductGrid>
              {relatedProducts.map((related) => (
                <ProductCard key={related.slug} product={related} />
              ))}
            </ProductGrid>
          </div>
        </section>
      )}
    </div>
  );
}
