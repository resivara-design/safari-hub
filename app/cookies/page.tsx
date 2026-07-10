import type { Metadata } from "next";
import SectionHeading from "@/components/ui/SectionHeading";
import CookieSettingsLink from "@/components/cookies/CookieSettingsLink";
import { site } from "@/lib/site";

const cookiesDescription = `How ${site.displayName} uses cookies and similar storage, and how to manage your preferences.`;

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: cookiesDescription,
  alternates: { canonical: `${site.url}/cookies` },
  openGraph: {
    title: `Cookie Policy | ${site.displayName}`,
    description: cookiesDescription,
    url: `${site.url}/cookies`,
  },
};

const settingsLinkClasses =
  "inline-flex w-fit items-center justify-center rounded-full bg-gold px-6 py-3 text-base font-semibold text-deep-green shadow-md transition-colors duration-200 hover:bg-deep-green hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-24">
      <SectionHeading eyebrow="Legal" heading="Cookie Policy" align="left" />
      <p className="mt-2 text-sm text-brown/80">Last updated: July 2026</p>

      <div className="mt-10 flex flex-col gap-6 text-brown">
        <p>
          This policy explains what cookies and similar storage technologies (like browser Local
          Storage) {site.displayName} uses, why, and how you can control them. It should be read
          alongside our{" "}
          <a href="/privacy" className="text-deep-green underline">
            Privacy Policy
          </a>
          .
        </p>

        <h2 className="font-heading text-2xl text-ink">Essential (always on)</h2>
        <p>
          These are required for the site to work and can&apos;t be switched off. We currently
          use browser Local Storage (not a traditional cookie, but covered by the same rules) for:
        </p>
        <ul className="flex list-disc flex-col gap-1 pl-5">
          <li>Remembering the contents of your shopping cart between pages</li>
          <li>Remembering your cookie preference choice, so we don&apos;t ask you again every visit</li>
        </ul>
        <p>
          None of this identifies you personally, and nothing here is shared with third parties
          for advertising.
        </p>

        <h2 className="font-heading text-2xl text-ink">Analytics</h2>
        <p>
          We do not currently use any analytics cookies or tracking scripts (e.g. Google
          Analytics) on {site.displayName}. If we add analytics in future, it will only run after
          you&apos;ve given consent via the preferences below, and this policy will be updated to
          name the specific service and what it collects.
        </p>

        <h2 className="font-heading text-2xl text-ink">Marketing</h2>
        <p>
          We do not currently use any marketing or advertising cookies (e.g. Facebook Pixel). If
          we add these in future, the same rule applies: no marketing cookies will run without
          your consent, and this policy will be updated first.
        </p>

        <h2 className="font-heading text-2xl text-ink">Payments</h2>
        <p>
          When you check out, you&apos;re redirected to Stripe&apos;s own secure payment page to
          enter your card details. Stripe may set its own cookies there for fraud prevention and
          to process your payment — these are governed by{" "}
          <a
            href="https://stripe.com/gb/privacy"
            target="_blank"
            rel="noreferrer"
            className="text-deep-green underline"
          >
            Stripe&apos;s own privacy policy
          </a>
          , not ours, since we don&apos;t control that page.
        </p>

        <h2 className="font-heading text-2xl text-ink">Managing or withdrawing consent</h2>
        <p>
          You can change your cookie preferences at any time using the button below, or via the
          &quot;Cookie Settings&quot; link in the footer of every page. You can also clear cookies
          and site data at any time through your browser&apos;s own settings.
        </p>
        <CookieSettingsLink className={settingsLinkClasses} />
      </div>
    </div>
  );
}
