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

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
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
