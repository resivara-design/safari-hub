import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductImage from "@/components/product/ProductImage";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import FreeDeliveryBadge from "@/components/ui/FreeDeliveryBadge";
import InStockBadge from "@/components/ui/InStockBadge";
import AddToCartButton from "@/components/product/AddToCartButton";
import RemindMeButton from "@/components/product/RemindMeButton";
import ShareButtons from "@/components/product/ShareButtons";
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

  const shareTitle = `${product.name} — ${formatPrice(product.price)} | ${site.displayName}`;
  const shareDescription = `${product.shortDescription} ${site.tagline} — shop authentic African foods at ${site.displayName}.`;
  const imageUrl = product.photo ? `${site.url}${product.photo}` : undefined;

  return {
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `${site.url}/product/${product.slug}` },
    openGraph: {
      title: shareTitle,
      description: shareDescription,
      url: `${site.url}/product/${product.slug}`,
      siteName: site.displayName,
      ...(imageUrl ? { images: [{ url: imageUrl, width: 788, height: 1400, alt: product.name }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description: shareDescription,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    // Open Graph's product extension — not universally rendered by link
    // previews, but picked up by platforms (Pinterest, some crawlers) that
    // do parse it, and costs nothing to include alongside the title/description
    // text that WhatsApp/Facebook/Twitter actually show.
    other: {
      "product:price:amount": product.price.toFixed(2),
      "product:price:currency": "GBP",
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
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0.00",
          currency: "GBP",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "GB",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 6,
            unitCode: "DAY",
          },
        },
      },
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

  const breadcrumbItems = [
    { name: "Shop", url: `${site.url}/shop` },
    ...(category ? [{ name: category.name, url: `${site.url}/shop?category=${category.slug}` }] : []),
    { name: product.name, url: `${site.url}/product/${product.slug}` },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <nav className="mb-6 text-sm text-brown/80">
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
          {product.weight && <span className="text-sm text-brown/80">{product.weight}</span>}
          {reviewCount > 0 && <StarRating rating={averageRating} count={reviewCount} size="md" />}
          <span className="font-heading text-2xl font-bold text-deep-green">
            {formatPrice(product.price)}
          </span>
          <p className="text-brown">{product.longDescription}</p>
          <div className="flex flex-wrap items-center gap-2">
            <FreeDeliveryBadge />
            {product.inStock ? <InStockBadge /> : <Badge tone="orange">Currently Out of Stock</Badge>}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <AddToCartButton product={product} />
            <RemindMeButton product={product} />
          </div>
          <div className="mt-2">
            <ShareButtons slug={product.slug} name={product.name} price={product.price} />
          </div>
        </div>
      </div>

      <section className="mt-16">
        <SectionHeading eyebrow="Know Before You Buy" heading="Product Details" align="left" />
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <ProductDetailCard label="Ingredients" value={product.ingredients} />
          <ProductDetailCard label="Allergens" value={product.allergens} />
          <ProductDetailCard label="Storage" value={product.storageInstructions} />
        </div>
        <p className="mt-4 text-sm text-brown/80">
          {site.displayName} retails this product as a packaged African food item — we do not
          manufacture it. Ingredients, allergens and storage details above are taken from the
          product packaging where available to us. Always check the label before consumption, and{" "}
          <Link href="/contact" className="text-deep-green underline">
            contact us
          </Link>{" "}
          before ordering if you need more detail — see our{" "}
          <Link href="/product-information" className="text-deep-green underline">
            Product Information
          </Link>{" "}
          page for full guidance.
        </p>
      </section>

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

function ProductDetailCard({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-brown/10 bg-ivory p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-burnt-orange">{label}</p>
      {value ? (
        <p className="mt-2 text-sm text-brown">{value}</p>
      ) : (
        <p className="mt-2 text-sm text-brown/80">
          Not listed for this product — please check the packaging or{" "}
          <Link href="/contact" className="text-deep-green underline">
            contact us
          </Link>{" "}
          before ordering.
        </p>
      )}
    </div>
  );
}
