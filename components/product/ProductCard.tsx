import Link from "next/link";
import ProductImage from "./ProductImage";
import AddToCartButton from "./AddToCartButton";
import QuickViewButton from "./QuickViewButton";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import FreeDeliveryBadge from "@/components/ui/FreeDeliveryBadge";
import InStockBadge from "@/components/ui/InStockBadge";
import { formatPrice } from "@/lib/format";
import { getAverageRating, getReviewsBySlug } from "@/lib/reviews";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  const reviewCount = getReviewsBySlug(product.slug).length;
  const average = getAverageRating(product.slug);

  return (
    <div className="group flex h-full flex-col gap-4 rounded-2xl bg-ivory p-5 shadow-[0_2px_12px_-4px_rgba(92,58,26,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(92,58,26,0.35)] md:p-6">
      <Link href={`/product/${product.slug}`} className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-xl">
          {product.bestSeller && (
            <Badge tone="green-solid" className="absolute left-2 top-2 z-10">
              Best Seller
            </Badge>
          )}
          {product.isNew && (
            <Badge tone="green-solid" className="absolute right-2 top-2 z-10">
              New
            </Badge>
          )}
          <div className="transition-transform duration-300 group-hover:scale-105">
            <ProductImage image={product.image} name={product.name} photo={product.photo} size="md" />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 min-h-[2.5rem] font-heading text-lg leading-tight text-black">{product.name}</h3>
            {!product.inStock && <Badge tone="orange">Sold Out</Badge>}
          </div>
          {product.weight && <span className="text-xs text-brown/80">{product.weight}</span>}
          <p className="text-sm text-brown/80 line-clamp-2">{product.shortDescription}</p>
          {reviewCount > 0 && <StarRating rating={average} count={reviewCount} />}
          <div className="flex flex-wrap items-center gap-2">
            <FreeDeliveryBadge />
            {product.inStock && <InStockBadge />}
          </div>
        </div>
      </Link>
      <div className="mt-auto flex flex-col gap-2 pt-1">
        <span className="font-heading text-xl font-bold text-deep-green">
          {formatPrice(product.price)}
        </span>
        <AddToCartButton product={product} rounded="lg" className="w-full" />
        <QuickViewButton product={product} />
      </div>
    </div>
  );
}
