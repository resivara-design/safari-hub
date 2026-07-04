# Safari Hub

A premium marketplace for authentic African food items and traditional cooking
ingredients, built with Next.js 14 (App Router), TypeScript and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in values as needed (none are
required for local development — the site works fully out of the box with
mock checkout).

## Adding or Editing a Product

All product data lives in a single file: `lib/products.ts`. Each product is a
plain object — copy an existing entry and edit the fields:

```ts
{
  slug: "curry-powder",        // unique, used in the URL /product/curry-powder
  name: "Curry Powder",
  category: "spices-and-seasoning", // must match a slug in lib/categories.ts
  price: 4.79,                 // plain number, in GBP
  shortDescription: "...",     // one sentence, shown on product cards
  longDescription: "...",      // 2-3 sentences, shown on the product page
  inStock: true,
  featured: true,               // true to show on the homepage
  image: { colorFrom: "gold", colorTo: "burnt-orange", icon: "jar" },
}
```

To add a new product, add a new object to the `products` array in
`lib/products.ts` — that's it. It will automatically appear in the shop,
have a working product page, and be included in the sitemap.

Reviews live separately in `lib/reviews.ts`, keyed by `productSlug`, so you
can add or edit reviews without touching the product data.

Site-wide details (contact email, WhatsApp number, social links) live in
`lib/site.ts` — update them there and they'll update everywhere.

## Payments Integration

Checkout is fully wired up end to end, but currently uses a mock payment
provider that simulates a successful order. The integration seam lives in
`lib/payments/`:

- `lib/payments/types.ts` — shared `CheckoutPayload` / `CheckoutResult` types
- `lib/payments/mock-provider.ts` — current mock implementation
- `lib/payments/index.ts` — `processCheckout()`, the single entry point used
  by the checkout page

To add real payments, implement a `stripe-provider.ts` or `paypal-provider.ts`
with the same function signature as `mock-provider.ts`, then swap it in inside
`lib/payments/index.ts`. No page code needs to change.

## Tech Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS v3
- Framer Motion for entrance and reveal animations
- Client-side cart with React Context + `localStorage` persistence
- SEO metadata, sitemap, robots.txt and JSON-LD structured data throughout
