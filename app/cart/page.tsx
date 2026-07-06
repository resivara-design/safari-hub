import type { Metadata } from "next";
import CartClient from "./CartClient";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your Cart",
  description: `Review the items in your ${site.name} basket before checking out.`,
  alternates: { canonical: `${site.url}/cart` },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartClient />;
}
