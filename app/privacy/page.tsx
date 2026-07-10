import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

const privacyDescription = `How ${site.displayName} collects, uses and protects your personal data, in line with UK GDPR.`;

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: privacyDescription,
  alternates: { canonical: `${site.url}/privacy` },
  openGraph: {
    title: `Privacy Policy | ${site.displayName}`,
    description: privacyDescription,
    url: `${site.url}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading eyebrow="Legal" heading="Privacy Policy" align="left" />
      <p className="mt-2 text-sm text-brown/80">Last updated: July 2026</p>

      <div className="mt-10 flex flex-col gap-6 text-brown">
        <p>
          {site.displayName} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to
          protecting your privacy. This policy explains what personal data we collect when you
          use this website, why, how it&apos;s stored, and the rights you have over it under the
          UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
        </p>

        <h2 className="font-heading text-2xl text-ink">What data we collect</h2>
        <p>We only collect data you give us directly, at two points:</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>
            <strong>Checkout:</strong> full name, email address, phone number, and delivery
            address. Your card details are never seen or stored by us — they&apos;re entered
            directly on Stripe&apos;s own secure payment page.
          </li>
          <li>
            <strong>Contact form:</strong> your name, email address, and the message you send us.
          </li>
        </ul>
        <p>
          Items you add to your cart before checkout are stored only in your own browser (Local
          Storage) and are never sent to us until you complete an order. We do not use tracking or
          analytics cookies — see our{" "}
          <a href="/cookies" className="text-deep-green underline">
            Cookie Policy
          </a>{" "}
          for details.
        </p>

        <h2 className="font-heading text-2xl text-ink">How we use your data</h2>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>To process and take payment for your order, via Stripe</li>
          <li>To fulfil and deliver your order to the address you provide</li>
          <li>To send you an order confirmation email</li>
          <li>To respond to messages sent through our contact form</li>
        </ul>
        <p>We do not use your data for automated decision-making or profiling, and we do not sell your data to anyone.</p>

        <h2 className="font-heading text-2xl text-ink">Stripe payment processing</h2>
        <p>
          Card payments are processed entirely by{" "}
          <a href="https://stripe.com/gb/privacy" target="_blank" rel="noreferrer" className="text-deep-green underline">
            Stripe
          </a>
          , a PCI-DSS Level 1 certified payment provider. Stripe receives your name, email,
          delivery address and payment details directly in order to process the transaction and
          prevent fraud. We never receive or store your full card number.
        </p>

        <h2 className="font-heading text-2xl text-ink">Order fulfilment</h2>
        <p>
          Your name, delivery address and phone number are used by us directly to pack and ship
          your order. Order confirmation emails are sent via Resend, our transactional email
          provider, to the email address you provide at checkout.
        </p>

        <h2 className="font-heading text-2xl text-ink">How your data is stored securely</h2>
        <p>
          We do not operate our own customer database. Order and payment data lives within
          Stripe&apos;s systems, and email content passes through Resend to deliver order and
          contact-form emails — both are established providers with their own security and
          compliance programmes. This website is served entirely over HTTPS with modern
          encryption in transit. Because Stripe and Resend are US-headquartered with global
          infrastructure, your data may be processed outside the UK; both maintain safeguards
          (such as Standard Contractual Clauses) recognised under UK GDPR for these transfers.
        </p>
        <p>
          We retain order data for as long as necessary to fulfil your order and meet our legal
          and accounting obligations (in the UK, typically up to 6 years for tax records), after
          which retention is governed by Stripe&apos;s own policy as our payment processor.
        </p>

        <h2 className="font-heading text-2xl text-ink">Your rights</h2>
        <p>Under UK GDPR, you have the right to:</p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li><strong>Access</strong> — request a copy of the personal data we hold about you</li>
          <li><strong>Correction</strong> — ask us to correct inaccurate or incomplete data</li>
          <li><strong>Deletion</strong> — ask us to delete your data, where we&apos;re not required to keep it (e.g. for tax records)</li>
          <li><strong>Restriction</strong> — ask us to limit how we use your data</li>
          <li><strong>Portability</strong> — request your data in a portable format</li>
          <li><strong>Objection</strong> — object to how we&apos;re using your data</li>
        </ul>
        <p>
          To exercise any of these rights, email us at{" "}
          <a href={`mailto:${site.contactEmail}`} className="text-deep-green underline">
            {site.contactEmail}
          </a>
          . You also have the right to complain to the UK&apos;s data protection regulator, the{" "}
          <a href="https://ico.org.uk" target="_blank" rel="noreferrer" className="text-deep-green underline">
            Information Commissioner&apos;s Office (ICO)
          </a>
          , if you believe we&apos;ve mishandled your data.
        </p>

        <h2 className="font-heading text-2xl text-ink">Children</h2>
        <p>This website is not intended for children, and we do not knowingly collect data from anyone under 18.</p>

        <h2 className="font-heading text-2xl text-ink">Changes to this policy</h2>
        <p>We may update this policy from time to time. The &quot;Last updated&quot; date at the top will always reflect the latest version.</p>

        <h2 className="font-heading text-2xl text-ink">Contact us</h2>
        <p>
          For any privacy questions or to exercise your rights, email{" "}
          <a href={`mailto:${site.contactEmail}`} className="text-deep-green underline">
            {site.contactEmail}
          </a>{" "}
          or see our{" "}
          <a href="/contact" className="text-deep-green underline">
            Contact page
          </a>
          .
        </p>
      </div>
    </div>
  );
}
