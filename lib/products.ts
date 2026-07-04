import type { Product } from "@/types/product";

/**
 * Product catalog — the single source of truth for everything sold on Safari Hub.
 *
 * Field guide (edit freely, just keep the shape):
 * - slug:              unique URL-safe id, e.g. "bitter-kola" -> /product/bitter-kola
 * - name:               display name shown on cards, titles and cart rows
 * - category:           one of the CategorySlug values in types/product.ts / lib/categories.ts
 * - price:              a plain number in GBP, e.g. 4.99 (formatted with lib/format.ts)
 * - weight:             optional display string, e.g. "100g" — omit for meal kits
 * - shortDescription:   one sentence, shown on product cards — keep it short
 * - longDescription:    2-3 sentences, shown on the product detail page
 * - inStock:            true/false, controls "Add to Cart" availability
 * - featured:           true to show the product in the homepage Featured section
 * - image:              placeholder tile config — colorFrom/colorTo are Tailwind
 *                        brand color tokens (gold, deep-green, burnt-orange, brown,
 *                        cream, each with optional -light/-dark), icon picks the
 *                        motif drawn on the tile
 *
 * Order below is grouped by packaging/product tone (brown, warm orange, green, gold)
 * so similar-looking items sit next to each other in the grid.
 */
export const products: Product[] = [
  {
    slug: "bitter-kola",
    name: "Bitter Kola",
    category: "nuts-and-kola",
    price: 6.99,
    weight: "80g",
    shortDescription: "Whole bitter kola nuts, prized for tradition and freshness.",
    longDescription:
      "Our bitter kola is hand-picked and carefully dried to preserve its distinctive sharp, bitter flavour. A staple at gatherings and ceremonies, it's sold whole and ready to share.",
    inStock: true,
    featured: true,
    image: { colorFrom: "brown", colorTo: "brown-dark", icon: "seed" },
    photo: "/images/products/bitter-kola.jpg",
  },
  {
    slug: "black-pepper",
    name: "Black Peppercorn",
    category: "spices-and-seasoning",
    price: 4.99,
    weight: "100g",
    shortDescription: "Whole black peppercorns with a sharp, warming bite.",
    longDescription:
      "Full-bodied and pungent, our whole black peppercorns are graded for size and freshness. Grind them fresh for the fullest flavour in any dish.",
    inStock: true,
    featured: false,
    image: { colorFrom: "brown", colorTo: "ink", icon: "pepper" },
    photo: "/images/products/black-pepper.jpg",
  },
  {
    slug: "kilishi",
    name: "Kilishi",
    category: "snacks",
    price: 7.99,
    weight: "100g",
    shortDescription: "Spiced, sun-dried beef strips with a bold peppery crust.",
    longDescription:
      "Kilishi is thinly sliced beef, marinated in a peanut and pepper spice paste, then sun-dried to a chewy, deeply savoury finish. A West African classic snack, best enjoyed straight from the pack or warmed through.",
    inStock: true,
    featured: true,
    bestSeller: true,
    image: { colorFrom: "brown", colorTo: "ink", icon: "seed" },
    photo: "/images/products/kilishi.jpg",
  },
  {
    slug: "ground-ogbono",
    name: "Ground Ogbono",
    category: "soup-ingredients",
    price: 7.99,
    weight: "250g",
    shortDescription: "Ground ogbono seeds for a rich, silky draw soup.",
    longDescription:
      "Milled from wild mango seeds, our ground ogbono releases a distinctive silky texture as it simmers, giving draw soup its signature body. A little goes a long way in building a rich, hearty pot.",
    inStock: true,
    image: { colorFrom: "brown-light", colorTo: "brown", icon: "grain" },
    photo: "/images/products/ground-ogbono.jpg",
  },
  {
    slug: "alligator-pepper",
    name: "Alligator Pepper",
    category: "nuts-and-kola",
    price: 8.99,
    weight: "100g",
    shortDescription: "Aromatic, peppery pods used in cooking and ceremony alike.",
    longDescription:
      "Alligator pepper brings a warm, peppery aroma with citrus undertones. Used whole or ground, it's a fixture in traditional cooking and celebration alike.",
    inStock: true,
    featured: false,
    image: { colorFrom: "burnt-orange", colorTo: "brown", icon: "seed" },
    photo: "/images/products/alligator-pepper.jpg",
  },
  {
    slug: "suya-spice",
    name: "Suya Spice Blend",
    category: "spices-and-seasoning",
    price: 4.99,
    weight: "100g",
    shortDescription: "Smoky peanut-based seasoning built for the grill.",
    longDescription:
      "Our suya spice blends roasted ground peanuts with a fiery mix of chillies and warming spices, just like the street-side grills back home. Rub it onto skewers or roasted vegetables for that unmistakable smoky heat.",
    inStock: true,
    featured: true,
    image: { colorFrom: "burnt-orange", colorTo: "brown-dark", icon: "jar" },
    photo: "/images/products/suya-spice.jpg",
  },
  {
    slug: "cayenne-pepper",
    name: "Cayenne Pepper",
    category: "spices-and-seasoning",
    price: 3.99,
    weight: "100g",
    shortDescription: "Ground cayenne with a clean, steady heat.",
    longDescription:
      "Our cayenne pepper is dried and finely ground for a clean, consistent heat that works into any dish. A pantry essential for seasoning, marinades and sauces.",
    inStock: true,
    isNew: true,
    image: { colorFrom: "burnt-orange-light", colorTo: "burnt-orange", icon: "pepper" },
    photo: "/images/products/cayenne-pepper.jpg",
  },
  {
    slug: "hibiscus-flower",
    name: "Hibiscus Organic Dried Flowers",
    category: "dried-leaves-and-herbs",
    price: 4.49,
    weight: "100g",
    shortDescription: "Organic dried hibiscus with a tangy, vibrant flavour.",
    longDescription:
      "Our organic hibiscus flowers are sun-dried to keep their deep colour and tangy, cranberry-like flavour. Steep for a refreshing zobo drink or hibiscus tea, hot or over ice.",
    inStock: true,
    isNew: true,
    image: { colorFrom: "burnt-orange-dark", colorTo: "brown", icon: "leaf" },
    photo: "/images/products/hibiscus.jpg",
  },
  {
    slug: "pepper-soup-kit",
    name: "Pepper Soup Kit",
    category: "meal-kits",
    price: 14.99,
    shortDescription: "Everything you need for a warming pot of pepper soup.",
    longDescription:
      "Our pepper soup kit brings together pre-measured spices and aromatics so you can go straight from pot to bowl. Just add your protein and vegetables of choice.",
    inStock: true,
    featured: true,
    image: { colorFrom: "burnt-orange", colorTo: "deep-green", icon: "pot" },
    photo: "/images/products/pepper-soup.jpg",
  },
  {
    slug: "dry-bitter-leaf",
    name: "Dry Bitter Leaf",
    category: "dried-leaves-and-herbs",
    price: 3.99,
    weight: "100g",
    shortDescription: "Sun-dried bitter leaf, washed and ready for your pot.",
    longDescription:
      "Sun-dried and cleaned to save you the work, our bitter leaf rehydrates beautifully for soups and stews. A little goes a long way, with that unmistakable earthy bite.",
    inStock: true,
    featured: true,
    image: { colorFrom: "deep-green", colorTo: "deep-green-dark", icon: "leaf" },
    photo: "/images/products/dry-bitter-leaf.jpg",
  },
  {
    slug: "bay-leaf",
    name: "Bay Leaves",
    category: "spices-and-seasoning",
    price: 2.99,
    weight: "20g",
    shortDescription: "Fragrant dried bay leaves for soups, stocks and stews.",
    longDescription:
      "These dried bay leaves release a subtle, herbal fragrance as they simmer. A quiet essential that rounds out the flavour of soups, rice dishes and slow-cooked stews.",
    inStock: true,
    featured: false,
    image: { colorFrom: "deep-green-light", colorTo: "deep-green", icon: "leaf" },
    photo: "/images/products/bay-leaf.jpg",
  },
  {
    slug: "curry-powder",
    name: "Curry Powder",
    category: "spices-and-seasoning",
    price: 2.99,
    weight: "100g",
    shortDescription: "A warm, balanced house blend of curry spices.",
    longDescription:
      "Our house curry powder blends warm spices in careful balance, built for depth rather than heat. A versatile everyday seasoning for rice, meat and vegetable dishes.",
    inStock: true,
    featured: true,
    image: { colorFrom: "gold", colorTo: "burnt-orange", icon: "jar" },
    photo: "/images/products/curry-powder.jpg",
  },
  {
    slug: "crayfish",
    name: "Crayfish",
    category: "spices-and-seasoning",
    price: 6.99,
    weight: "100g",
    shortDescription: "Ground smoked crayfish, a savoury base for soups and stews.",
    longDescription:
      "Smoked and finely ground, our crayfish adds deep umami richness to soups, stews and sauces. A pantry essential in West African cooking, measured for freshness.",
    inStock: true,
    featured: false,
    bestSeller: true,
    image: { colorFrom: "gold-dark", colorTo: "brown", icon: "jar" },
    photo: "/images/products/crayfish.jpg",
  },
  {
    slug: "jollof-rice-kit",
    name: "Jollof Rice Kit",
    category: "meal-kits",
    price: 12.99,
    shortDescription: "A complete kit for rich, smoky, party-style jollof rice.",
    longDescription:
      "Get that unmistakable smoky jollof flavour without the guesswork. This kit includes the seasoning blend and dried aromatics measured out for a perfect pot every time.",
    inStock: true,
    featured: true,
    bestSeller: true,
    image: { colorFrom: "gold", colorTo: "burnt-orange-dark", icon: "pot" },
    photo: "/images/products/jollof-rice-kit.jpg",
  },
  {
    slug: "ground-egusi",
    name: "Ground Egusi",
    category: "soup-ingredients",
    price: 8.99,
    weight: "500g",
    shortDescription: "Finely ground melon seeds, the protein-rich base of a great soup.",
    longDescription:
      "Ground egusi is milled from dried melon seeds into a fine, nutty powder that thickens and enriches soups as it cooks. A staple base for egusi soup, it's measured for freshness and ready straight from the pack.",
    inStock: true,
    featured: true,
    image: { colorFrom: "gold-light", colorTo: "gold-dark", icon: "grain" },
    photo: "/images/products/ground-egusi.jpg",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, limit);
}
