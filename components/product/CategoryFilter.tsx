"use client";

import { categories } from "@/lib/categories";
import type { CategorySlug } from "@/types/product";

interface CategoryFilterProps {
  active: CategorySlug | "all";
  onChange: (category: CategorySlug | "all") => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  const options: { slug: CategorySlug | "all"; name: string }[] = [
    { slug: "all", name: "All Products" },
    ...categories.map((c) => ({ slug: c.slug, name: c.name })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option.slug === active;
        return (
          <button
            key={option.slug}
            type="button"
            onClick={() => onChange(option.slug)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
              isActive
                ? "bg-black text-white"
                : "bg-ivory text-brown border border-brown/15 hover:border-black"
            }`}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
}
