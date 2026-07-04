export const site = {
  name: "Safari Hub",
  tagline: "Authentic African Ingredients Delivered to Your Door",
  description:
    "Safari Hub is a premium online marketplace for authentic African food items and traditional cooking ingredients, sourced with care and delivered fresh.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.safarihub.co.uk",
  contactEmail: "hello@safarihub.co.uk",
  whatsappNumber: "+44 7000 000000",
  get whatsappLink() {
    return `https://wa.me/${this.whatsappNumber.replace(/[^\d]/g, "")}`;
  },
  social: {
    instagram: "#",
    facebook: "#",
    tiktok: "#",
  },
};
