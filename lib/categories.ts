import type { CategorySlug } from "@/types/product";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
}

export const categories: Category[] = [
  {
    slug: "nuts-and-kola",
    name: "Nuts & Kola",
    description: "Traditional kola nuts and bitter pods for ceremony and everyday use.",
  },
  {
    slug: "spices-and-seasoning",
    name: "Spices & Seasoning",
    description: "Whole and ground spices that bring depth to every pot.",
  },
  {
    slug: "dried-leaves-and-herbs",
    name: "Dried Leaves & Herbs",
    description: "Sun-dried leaves for soups, stews and traditional remedies.",
  },
  {
    slug: "meal-kits",
    name: "Meal Kits",
    description: "Pre-measured kits for classic dishes, ready in minutes.",
  },
  {
    slug: "snacks",
    name: "Snacks",
    description: "Ready-to-eat bites and treats for on-the-go cravings.",
  },
  {
    slug: "soup-ingredients",
    name: "Soup Ingredients",
    description: "Ground seeds and staples that build the base of a great pot.",
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
