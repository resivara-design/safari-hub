import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "./ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${site.name} team by email, WhatsApp or our contact form.`,
  alternates: { canonical: `${site.url}/contact` },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading
        eyebrow="Get in Touch"
        heading="Contact Us"
        subtext="Questions about an order, an ingredient, or anything else? We're happy to help."
        align="left"
      />

      <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-brown/10 bg-ivory p-6">
            <h2 className="font-heading text-xl text-ink">Email</h2>
            <a href={`mailto:${site.contactEmail}`} className="text-deep-green hover:underline">
              {site.contactEmail}
            </a>
          </div>
          <div className="rounded-2xl border border-brown/10 bg-ivory p-6">
            <h2 className="font-heading text-xl text-ink">Phone</h2>
            <a href={site.phoneLink} className="text-deep-green hover:underline">
              {site.phoneNumber}
            </a>
          </div>
          <div className="rounded-2xl border border-brown/10 bg-ivory p-6">
            <h2 className="font-heading text-xl text-ink">WhatsApp</h2>
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="text-deep-green hover:underline"
            >
              Chat with us: {site.whatsappNumber}
            </a>
          </div>
          <div className="rounded-2xl border border-brown/10 bg-ivory p-6">
            <h2 className="font-heading text-xl text-ink">Follow Us</h2>
            <div className="mt-2 flex gap-4 text-brown">
              <a href={site.social.instagram} className="hover:text-deep-green">Instagram</a>
              <a href={site.social.facebook} className="hover:text-deep-green">Facebook</a>
              <a href={site.social.tiktok} className="hover:text-deep-green">TikTok</a>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-brown/10 bg-ivory p-6">
          <h2 className="font-heading text-xl text-ink">Send a Message</h2>
          <div className="mt-4">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
