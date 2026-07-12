import SectionHeading from "@/components/ui/SectionHeading";
import PatternBackground from "@/components/ui/PatternBackground";
import { site } from "@/lib/site";

const values = [
  {
    title: "Authentic Sourcing",
    description: "Every product is carefully sourced from trusted suppliers across Africa.",
    icon: "M12 2l3 6 6 1-4.5 4.4L18 20l-6-3.4L6 20l1.5-6.6L3 9l6-1z",
  },
  {
    title: "Quality Checked",
    description: "Each batch is inspected for freshness and quality before it ever reaches our warehouse.",
    icon: "M9 12l2 2 4-4M12 3l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V7z",
  },
  {
    title: "Fast Delivery",
    description: "Quick, careful dispatch so your ingredients arrive fresh and ready to cook.",
    icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  },
  {
    title: "Trusted by the Community",
    description: "Thousands of home cooks rely on us for the ingredients that make their dishes authentic.",
    icon: "M17 20c0-2.8-2.2-5-5-5s-5 2.2-5 5M12 12a3 3 0 100-6 3 3 0 000 6zM21 20c0-2-1.4-3.7-3.3-4.4M17 12a2.5 2.5 0 100-5",
  },
];

export default function WhyShopWith() {
  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20">
      <PatternBackground className="text-deep-green/[0.05]" />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading eyebrow={`Why ${site.displayName}`} heading="Why Shop With Us" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col items-center gap-3 rounded-2xl border border-brown/10 bg-ivory p-6 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-charcoal/10 text-charcoal">
                <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={value.icon} />
                </svg>
              </span>
              <h3 className="font-heading text-lg text-ink">{value.title}</h3>
              <p className="text-sm text-brown/80">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
