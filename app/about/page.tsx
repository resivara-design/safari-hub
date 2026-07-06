import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import PatternDivider from "@/components/ui/PatternDivider";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name}'s mission to bring authentic, ethically sourced African ingredients to kitchens across the UK.`,
  alternates: { canonical: `${site.url}/about` },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        eyebrow="Our Story"
        heading="About Safari Hub"
        subtext="Bringing the true taste of home to kitchens across the UK."
        align="left"
      />

      <div className="mt-10 flex flex-col gap-6 text-brown">
        <p>
          Safari Hub was founded on a simple idea: that authentic African ingredients
          shouldn&apos;t be hard to find. What started as a search for the same bitter kola
          and crayfish our own families grew up with became a mission to make those
          ingredients easy to access for everyone, wherever they call home.
        </p>
        <p>
          Today, we work directly with trusted growers and trader partners across West
          and East Africa to source spices, dried leaves, nuts and meal kits that carry
          real flavour and real heritage. Every batch is checked for freshness and
          quality before it reaches our warehouse, so what lands on your doorstep is as
          close as possible to what you&apos;d find at a market stall back home.
        </p>

        <PatternDivider className="my-4" />

        <h2 className="font-heading text-2xl text-ink">Our Mission</h2>
        <p>
          We believe good cooking starts with good ingredients. Our mission is to make
          authentic African food staples accessible, reliable and consistently fresh —
          without compromise, and without the guesswork.
        </p>

        <h2 className="font-heading text-2xl text-ink">Sourcing &amp; Authenticity</h2>
        <p>
          Every product in our catalogue is chosen for its quality and provenance. We
          prioritise relationships with growers and suppliers who share our standards,
          and we&apos;re always happy to talk through where a particular ingredient comes
          from — just get in touch.
        </p>
      </div>
    </div>
  );
}
