export type CategorySlug =
  | "nuts-and-kola"
  | "spices-and-seasoning"
  | "dried-leaves-and-herbs"
  | "meal-kits"
  | "snacks"
  | "soup-ingredients";

export interface ProductImagePlaceholder {
  colorFrom: string;
  colorTo: string;
  icon: "seed" | "leaf" | "pepper" | "pot" | "jar" | "grain";
}

export interface Product {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  shortDescription: string;
  longDescription: string;
  inStock: boolean;
  featured?: boolean;
  bestSeller?: boolean;
  isNew?: boolean;
  image: ProductImagePlaceholder;
  photo?: string;
  weight?: string;
  // Taken from product packaging where available — see /product-information.
  // Deliberately optional and NOT auto-filled: incorrect allergen data is a
  // real safety risk, so a missing value must render an explicit "check the
  // label" notice rather than silently omitting the section.
  ingredients?: string;
  allergens?: string;
  storageInstructions?: string;
}
