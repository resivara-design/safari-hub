"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart/use-cart";
import CartLineItem from "@/components/cart/CartLineItem";
import CartSummary from "@/components/cart/CartSummary";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CartClient() {
  const { items, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center md:px-6">
        <SectionHeading eyebrow="Your Cart" heading="Your cart is empty" />
        <p className="mt-4 text-brown/70">
          Looks like you haven&apos;t added anything yet. Explore the shop to find your
          next favourite ingredient.
        </p>
        <div className="mt-6">
          <Button href="/shop" variant="primary" size="lg">
            Browse the Shop
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading eyebrow="Your Cart" heading="Shopping Cart" align="left" />

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-3">
        <div className="md:col-span-2">
          {items.map((item) => (
            <CartLineItem key={item.slug} item={item} />
          ))}
          <Link href="/shop" className="mt-4 inline-block text-sm font-semibold text-deep-green hover:underline">
            ← Continue Shopping
          </Link>
        </div>
        <div>
          <CartSummary subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
