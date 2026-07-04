"use client";

import { useEffect } from "react";
import { useCart } from "@/lib/cart/use-cart";

export default function ClearCartOnMount() {
  const { dispatch } = useCart();

  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
