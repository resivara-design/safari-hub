import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CategoryShowcase from "@/components/home/CategoryShowcase";
import WhyShopWith from "@/components/home/WhyShopWith";
import TrustSection from "@/components/home/TrustSection";
import Newsletter from "@/components/home/Newsletter";
import FadeInSection from "@/components/motion/FadeInSection";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} | ${site.tagline}`,
  description: site.description,
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FadeInSection>
        <FeaturedProducts />
      </FadeInSection>
      <FadeInSection>
        <CategoryShowcase />
      </FadeInSection>
      <FadeInSection>
        <WhyShopWith />
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
