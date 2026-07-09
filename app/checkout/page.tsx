import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";
import { site } from "@/lib/site";

const checkoutDescription = `Enter your shipping details to complete your ${site.displayName} order securely.`;

export const metadata: Metadata = {
  title: "Checkout",
  description: checkoutDescription,
  alternates: { canonical: `${site.url}/checkout` },
  robots: { index: false, follow: false },
  openGraph: {
    title: `Checkout | ${site.displayName}`,
    description: checkoutDescription,
    url: `${site.url}/checkout`,
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
