import type { Metadata } from "next";
import CheckoutClient from "./CheckoutClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Checkout",
  description: `Enter your shipping details to complete your ${site.name} order securely.`,
  alternates: { canonical: `${site.url}/checkout` },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
