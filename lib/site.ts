export const site = {
  name: "Safari Hub",
  // Customer-facing marketing brand, used everywhere customer-facing
  // (feed.xml g:brand, JSON-LD Organization, emails, page titles) since the
  // Merchant Center misrepresentation fix — a split identity (feed/schema
  // saying "Safari Hub" while the site said "Safari Hub Tastebuds") was a
  // confirmed cause. `name` survives only as the short form in the mobile
  // header. Every other site-wide string (like `description` below) must
  // also say "Safari Hub Tastebuds", not just this field, or the same
  // split-identity problem reappears in the feed/JSON-LD description text.
  displayName: "Safari Hub Tastebuds",
  tagline: "Authentic African Foods & Ingredients",
  description:
    "Safari Hub Tastebuds is a premium online marketplace for authentic African food items and traditional cooking ingredients, sourced with care and delivered fresh.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.safarihub.uk",
  contactEmail: "safarihubadminemail@gmail.com",
  phoneNumber: "024 7644 5621",
  address: "Coventry, United Kingdom",
  get phoneLink() {
    return `tel:${this.phoneNumber.replace(/[^\d+]/g, "")}`;
  },
  whatsappNumber: "+44 7716 450930",
  get whatsappLink() {
    return `https://wa.me/${this.whatsappNumber.replace(/[^\d]/g, "")}`;
  },
  social: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
  },
};
