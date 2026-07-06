"use client";

import Link from "next/link";
import ProductImage from "@/components/product/ProductImage";
import QuantitySelector from "@/components/product/QuantitySelector";
import FreeDeliveryBadge from "@/components/ui/FreeDeliveryBadge";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/lib/cart/use-cart";
import type { CartItem } from "@/lib/cart/cart-reducer";
import type { ProductImagePlaceholder as ImagePlaceholderConfig } from "@/types/product";

export default function CartLineItem({ item }: { item: CartItem }) {
  const { dispatch } = useCart();

  return (
    <div className="flex items-center gap-4 border-b border-brown/10 py-4">
      <div className="w-20 shrink-0">
        <ProductImage
          image={{
            colorFrom: item.imagePlaceholder.colorFrom,
            colorTo: item.imagePlaceholder.colorTo,
            icon: item.imagePlaceholder.icon as ImagePlaceholderConfig["icon"],
          }}
          name={item.name}
          photo={item.photo}
          size="sm"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <Link href={`/product/${item.slug}`} className="font-heading text-lg text-ink hover:text-deep-green">
          {item.name}
        </Link>
        <span className="text-sm text-brown/80">{formatPrice(item.price)} each</span>
        <FreeDeliveryBadge className="w-fit" />
        <button
          type="button"
          onClick={() => dispatch({ type: "REMOVE_ITEM", slug: item.slug })}
          className="w-fit text-xs font-semibold text-burnt-orange-dark hover:underline"
        >
          Remove
        </button>
      </div>
      <QuantitySelector
        quantity={item.quantity}
        onChange={(quantity) => dispatch({ type: "UPDATE_QUANTITY", slug: item.slug, quantity })}
      />
      <span className="w-20 text-right font-heading text-lg font-bold text-deep-green">
        {formatPrice(item.price * item.quantity)}
      </span>
    </div>
  );
}
