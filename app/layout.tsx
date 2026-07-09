import type { Metadata } from "next";
import { Fraunces, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart/CartContext";
import JsonLd from "@/components/seo/JsonLd";
import GrainOverlay from "@/components/ui/GrainOverlay";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-fancy",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.displayName} | ${site.tagline}`,
    // Applies to every page that sets a plain string title (e.g. "Cart" ->
    // "Cart | Safari Hub Tastebuds"), so the marketing brand shows up
    // consistently across the whole site's tab titles and search results.
    // site.name ("Safari Hub") stays untouched here on purpose — it's still
    // used for feed.xml's g:brand, JSON-LD Organization, and emails, so it
    // can't silently drift from what's already on file with Merchant Center.
    template: `%s | ${site.displayName}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.displayName} | ${site.tagline}`,
    description: site.description,
    url: site.url,
    siteName: site.displayName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.displayName} | ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.contactEmail,
    telephone: site.phoneNumber,
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };

  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col font-body text-brown">
        <GrainOverlay />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal focus-visible:ring-offset-2"
        >
          Skip to main content
        </a>
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <CartProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
