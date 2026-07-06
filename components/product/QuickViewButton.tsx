"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import ProductImage from "./ProductImage";
import AddToCartButton from "./AddToCartButton";
import QuantitySelector from "./QuantitySelector";
import StarRating from "@/components/ui/StarRating";
import FreeDeliveryBadge from "@/components/ui/FreeDeliveryBadge";
import InStockBadge from "@/components/ui/InStockBadge";
import { formatPrice } from "@/lib/format";
import { getAverageRating, getReviewsBySlug } from "@/lib/reviews";
import type { Product } from "@/types/product";

export default function QuickViewButton({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const reviewCount = getReviewsBySlug(product.slug).length;
  const average = getAverageRating(product.slug);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-full border border-brown/20 px-4 py-2 text-xs font-semibold text-brown transition-colors hover:border-deep-green hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        Quick View
      </button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-ink/60"
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Quick view: ${product.name}`}
              className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-2xl bg-ivory p-6 shadow-2xl md:flex-row md:gap-6 md:p-8"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close quick view"
                className="absolute right-4 top-4 z-10 rounded-full bg-cream p-2 text-ink hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>

              <div className="w-full shrink-0 md:w-56">
                <ProductImage image={product.image} name={product.name} photo={product.photo} size="md" />
              </div>

              <div className="mt-5 flex flex-1 flex-col gap-3 md:mt-0">
                <div className="flex flex-wrap items-center gap-2">
                  <FreeDeliveryBadge />
                  <InStockBadge />
                </div>
                <h2 className="font-heading text-2xl text-ink">{product.name}</h2>
                {product.weight && <span className="text-sm text-brown/80">{product.weight}</span>}
                {reviewCount > 0 && <StarRating rating={average} count={reviewCount} />}
                <p className="text-sm text-brown/80">{product.shortDescription}</p>
                <span className="font-heading text-2xl font-bold text-deep-green">
                  {formatPrice(product.price)}
                </span>

                <div className="mt-2 flex items-center gap-3">
                  <QuantitySelector quantity={quantity} onChange={setQuantity} />
                  <AddToCartButton product={product} quantity={quantity} />
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  onClick={() => setOpen(false)}
                  className="mt-2 w-fit text-sm font-semibold text-deep-green underline-offset-2 hover:underline"
                >
                  View full details →
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
