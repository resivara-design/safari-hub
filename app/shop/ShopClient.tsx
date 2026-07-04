"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchBar from "@/components/product/SearchBar";
import CategoryFilter from "@/components/product/CategoryFilter";
import ProductGrid from "@/components/product/ProductGrid";
import ProductCard from "@/components/product/ProductCard";
import { products } from "@/lib/products";
import type { CategorySlug } from "@/types/product";

export default function ShopClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = (searchParams.get("category") as CategorySlug | null) || "all";
  const initialQuery = searchParams.get("q") || "";

  const [category, setCategory] = useState<CategorySlug | "all">(initialCategory);
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (query) params.set("q", query);
    const queryString = params.toString();
    router.replace(queryString ? `/shop?${queryString}` : "/shop", { scroll: false });
  }, [category, query, router]);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      const matchesQuery =
        query.trim().length === 0 ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(query.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="w-full md:max-w-sm">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <CategoryFilter active={category} onChange={setCategory} />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-brown/10 bg-ivory p-12 text-center">
          <p className="font-heading text-xl text-ink">No products found</p>
          <p className="mt-2 text-brown/70">
            Try a different search term or browse all categories.
          </p>
        </div>
      ) : (
        <ProductGrid>
          {filtered.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </ProductGrid>
      )}
    </div>
  );
}
