import type { Metadata } from "next";
import CartClient from "./CartClient";
import { site } from "@/lib/site";

const cartDescription = `Review the items in your ${site.displayName} basket before checking out.`;

export const metadata: Metadata = {
  title: "Your Cart",
  description: cartDescription,
  alternates: { canonical: `${site.url}/cart` },
  robots: { index: false, follow: true },
  openGraph: {
    title: `Your Cart | ${site.displayName}`,
    description: cartDescription,
    url: `${site.url}/cart`,
  },
};

export default function CartPage() {
  return <CartClient />;
}
