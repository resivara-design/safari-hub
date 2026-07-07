export const site = {
  name: "Safari Hub",
  // Customer-facing marketing brand — kept distinct from `name` so the
  // legal/contact identity (feed.xml g:brand, JSON-LD Organization, emails)
  // stays exactly "Safari Hub" and doesn't drift out of sync with what's
  // already registered in Google Merchant Center.
  displayName: "Safari Hub Tastebuds",
  tagline: "Authentic African Foods & Ingredients",
  description:
    "Safari Hub is a premium online marketplace for authentic African food items and traditional cooking ingredients, sourced with care and delivered fresh.",
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
