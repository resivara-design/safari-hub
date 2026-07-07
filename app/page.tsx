import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSellers from "@/components/home/BestSellers";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import TrustBadgeBand from "@/components/home/TrustBadgeBand";
import WhyShopWith from "@/components/home/WhyShopWith";
import TrustSection from "@/components/home/TrustSection";
import Newsletter from "@/components/home/Newsletter";
import CategoryNavRow from "@/components/layout/CategoryNavRow";
import FadeInSection from "@/components/motion/FadeInSection";
import { site } from "@/lib/site";

const homeTitle = `${site.displayName} | ${site.tagline} UK`;
const homeDescription =
  "Shop authentic African foods, spices, herbs, snacks and meal kits online in the UK. Safari Hub Tastebuds sources premium, ethically-grown African ingredients and delivers them fresh to your door nationwide.";

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: site.url },
  openGraph: {
    title: homeTitle,
    description: homeDescription,
    url: site.url,
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

export default function HomePage() {
  return (
    <>
      <CategoryNavRow />
      <TrustBadgeBand />
      <Hero />
      <FadeInSection>
        <CategoryShowcase />
      </FadeInSection>
      <FadeInSection>
        <WhyShopWith />
      </FadeInSection>
      <FadeInSection>
        <FeaturedProducts />
      </FadeInSection>
      <FadeInSection>
        <BestSellers />
      </FadeInSection>
      <FadeInSection>
        <TrustSection />
      </FadeInSection>
      <FadeInSection>
        <Newsletter />
      </FadeInSection>
    </>
  );
}
