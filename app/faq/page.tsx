import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { faqs } from "@/lib/faq";
import { site } from "@/lib/site";

const faqDescription = `Answers to common questions about ordering, delivery and ingredient sourcing at ${site.displayName}.`;

export const metadata: Metadata = {
  title: "FAQ",
  description: faqDescription,
  alternates: { canonical: `${site.url}/faq` },
  openGraph: {
    title: `FAQ | ${site.displayName}`,
    description: faqDescription,
    url: `${site.url}/faq`,
  },
};

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        eyebrow="Support"
        heading="Frequently Asked Questions"
        align="left"
      />

      <div className="mt-8 flex flex-col gap-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-xl border border-brown/10 bg-ivory/70 p-5 open:bg-ivory"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between font-heading text-lg text-ink">
              {faq.question}
              <span className="ml-4 shrink-0 text-brown/50 transition-transform duration-200 group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-brown">{faq.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
