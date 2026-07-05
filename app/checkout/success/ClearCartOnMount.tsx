"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart/use-cart";
import { CART_STORAGE_KEY } from "@/lib/cart/CartContext";

export default function ClearCartOnMount() {
  const { dispatch } = useCart();

  useEffect(() => {
    // Remove from storage first so CartProvider's own hydrate effect (which
    // runs after this one, since it's higher up the tree) has nothing stale
    // left to re-load on the full-page redirect back from Stripe/PayPal.
    try {
      window.localStorage.removeItem(CART_STORAGE_KEY);
    } catch {
      // ignore
    }
    dispatch({ type: "CLEAR_CART" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
