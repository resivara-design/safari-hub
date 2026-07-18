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
  slug: "bay-leaf",             // unique, used in the URL /product/bay-leaf
  name: "Bay Leaves",
  category: "spices-and-seasoning", // must match a slug in lib/categories.ts
  price: 2.99,                 // plain number, in GBP
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

Checkout uses Stripe Checkout (card, Apple Pay, Google Pay). The integration
lives in `lib/payments/`:

- `lib/payments/types.ts` — shared `CheckoutPayload` / `CheckoutResult` types
- `lib/payments/stripe-provider.ts` — Stripe client, checkout session
  creation, session/line-item retrieval, and webhook signature verification
- `lib/payments/mock-provider.ts` — unused fallback, kept as a reference seam

The checkout page (`app/checkout/CheckoutClient.tsx`) posts to
`/api/checkout/stripe`, which creates a Stripe Checkout Session and redirects
the customer to Stripe's hosted payment page.

### Order notifications (Stripe webhook + Resend)

Because a customer can close the tab after paying and before the
`/checkout/success` redirect completes, order notification doesn't rely on
that page alone. `app/api/webhooks/stripe/route.ts` listens for Stripe's
`checkout.session.completed` event and emails the shop's contact address
(`lib/site.ts` → `contactEmail`) with the order details, using
`lib/email/order-notification.ts` (Resend).

To wire this up in the Stripe Dashboard and Vercel:

1. Deploy so the webhook URL exists: `https://<your-domain>/api/webhooks/stripe`
2. Stripe Dashboard → Developers → Webhooks → Add endpoint → that URL,
   subscribed to `checkout.session.completed` — copy the signing secret
   (`whsec_...`) into `STRIPE_WEBHOOK_SECRET`
3. Resend Dashboard → API Keys → create a key → into `RESEND_API_KEY`
4. Add both to Vercel env vars (Production + Preview) and redeploy

See `.env.local.example` for the full variable list.

## Tech Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS v3
- Framer Motion for entrance and reveal animations
- Client-side cart with React Context + `localStorage` persistence
- SEO metadata, sitemap, robots.txt and JSON-LD structured data throughout
