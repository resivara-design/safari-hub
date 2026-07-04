"use client";

import { createContext, useEffect, useMemo, useReducer } from "react";
import {
  cartReducer,
  initialCartState,
  type CartAction,
  type CartItem,
} from "./cart-reducer";

const STORAGE_KEY = "safari-hub-cart-v1";

export interface CartContextValue {
  items: CartItem[];
  dispatch: React.Dispatch<CartAction>;
  itemCount: number;
  subtotal: number;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const items = JSON.parse(raw) as CartItem[];
        dispatch({ type: "HYDRATE", items });
      }
    } catch {
      // ignore malformed storage
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // ignore write failures (e.g. private browsing quota)
    }
  }, [state.items]);

  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    [state.items]
  );

  const value: CartContextValue = {
    items: state.items,
    dispatch,
    itemCount,
    subtotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
