"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart/use-cart";

export default function CartBadge() {
  const { itemCount } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Link href="/cart" aria-label="View cart" className="relative inline-flex items-center justify-center rounded p-2 text-ink hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white">
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="18" cy="21" r="1" />
        <path d="M2.5 3h2l2.6 12.4a2 2 0 002 1.6h7.8a2 2 0 002-1.6L21 7H6" />
      </svg>
      {mounted && itemCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-burnt-orange text-[10px] font-bold text-cream">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}
