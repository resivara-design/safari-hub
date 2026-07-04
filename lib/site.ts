export const site = {
  name: "Safari Hub",
  tagline: "Authentic African Ingredients Delivered to Your Door",
  description:
    "Safari Hub is a premium online marketplace for authentic African food items and traditional cooking ingredients, sourced with care and delivered fresh.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://safari-hub-sigma.vercel.app",
  contactEmail: "safarihubadmin@gmail.com",
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
