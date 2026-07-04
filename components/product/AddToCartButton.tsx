"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/use-cart";
import Button from "@/components/ui/Button";
import type { Product } from "@/types/product";

interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({
  product,
  quantity = 1,
  className = "",
}: AddToCartButtonProps) {
  const { dispatch } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    dispatch({
      type: "ADD_ITEM",
      item: {
        slug: product.slug,
        name: product.name,
        price: product.price,
        imagePlaceholder: product.image,
        photo: product.photo,
      },
      quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <Button
      type="button"
      variant="secondary"
      onClick={handleAdd}
      disabled={!product.inStock}
      className={className}
    >
      {!product.inStock ? "Out of Stock" : added ? "Added ✓" : "Add to Cart"}
    </Button>
  );
}
