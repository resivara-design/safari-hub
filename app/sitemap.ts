import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/delivery",
    "/returns",
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((product) => ({
    url: `${site.url}/product/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
