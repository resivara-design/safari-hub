import Link from "next/link";
import Image from "next/image";
import PatternDivider from "@/components/ui/PatternDivider";
import TrustBadges from "@/components/ui/TrustBadges";
import PaymentIcons from "@/components/ui/PaymentIcons";
import CookieSettingsLink from "@/components/cookies/CookieSettingsLink";
import { site } from "@/lib/site";

const linkClasses =
  "rounded text-sm text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green";

const iconLinkClasses =
  "rounded text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green";

const contactLinkClasses = `flex items-center gap-2 ${linkClasses}`;

export default function Footer() {
  return (
    <footer className="bg-deep-green text-cream">
      <div className="mx-auto max-w-6xl px-4 pt-6 md:px-6">
        <PatternDivider className="text-gold/50" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:grid-cols-2 md:grid-cols-4 md:px-6 md:py-20">
        <div className="flex flex-col gap-3">
          <span className="flex items-center gap-2 font-fancy text-2xl">
            <Image src="/images/logo.png" alt="" width={32} height={32} className="rounded-full" aria-hidden="true" />
            {site.displayName}
          </span>
          <p className="text-sm text-cream/70">
            {site.tagline}, carefully sourced and delivered fresh to your door.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <a href={site.social.facebook} aria-label="Facebook" className={iconLinkClasses}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M15 8h2V5h-2a4 4 0 00-4 4v2H9v3h2v6h3v-6h2.5l.5-3H14V9a1 1 0 011-1z" />
                </svg>
              </span>
            </a>
            <a href={site.social.instagram} aria-label="Instagram" className={iconLinkClasses}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </span>
            </a>
            <a href={site.whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp" className={iconLinkClasses}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.1-1.3A10 10 0 1012 2zm0 18.2a8.1 8.1 0 01-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.2.2-.3.2-.5.1a6.6 6.6 0 01-2-1.2 7.4 7.4 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4c.1-.2.2-.3.3-.5a.5.5 0 000-.5c-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2c0 1.3.9 2.6 1.1 2.8.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6a3.9 3.9 0 001.8.1c.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3z" />
                </svg>
              </span>
            </a>
            <a href={`mailto:${site.contactEmail}`} aria-label="Email" className={iconLinkClasses}>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Quick Links</span>
          <Link href="/about" className={linkClasses}>About Us</Link>
          <Link href="/shop" className={linkClasses}>Shop All Products</Link>
          <Link href="/delivery" className={linkClasses}>Delivery Information</Link>
          <Link href="/returns" className={linkClasses}>Returns &amp; Refund Policy</Link>
          <Link href="/terms" className={linkClasses}>Terms &amp; Conditions</Link>
          <Link href="/privacy" className={linkClasses}>Privacy Policy</Link>
          <Link href="/cookies" className={linkClasses}>Cookie Policy</Link>
          <CookieSettingsLink className={`${linkClasses} text-left`} />
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Customer Service</span>
          <Link href="/contact" className={linkClasses}>Contact Us</Link>
          <Link href="/faq" className={linkClasses}>FAQ</Link>
          <Link href="/contact" className={linkClasses}>Track Your Order</Link>
          <Link href="/delivery" className={linkClasses}>Delivery Information</Link>
          <Link href="/returns" className={linkClasses}>Returns &amp; Refund Policy</Link>
          <Link href="/product-information" className={linkClasses}>Product Information</Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Contact Us</span>
          <a href={site.phoneLink} className={contactLinkClasses}>
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 4h4l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v4a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-2z" />
            </svg>
            {site.phoneNumber}
          </a>
          <a href={site.whatsappLink} target="_blank" rel="noreferrer" className={contactLinkClasses}>
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.1-1.3A10 10 0 1012 2zm0 18.2a8.1 8.1 0 01-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.2.2-.3.2-.5.1a6.6 6.6 0 01-2-1.2 7.4 7.4 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4c.1-.2.2-.3.3-.5a.5.5 0 000-.5c-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2c0 1.3.9 2.6 1.1 2.8.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6a3.9 3.9 0 001.8.1c.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3z" />
            </svg>
            {site.whatsappNumber}
          </a>
          <a href={`mailto:${site.contactEmail}`} className={contactLinkClasses}>
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            {site.contactEmail}
          </a>
          <span className="flex items-center gap-2 text-sm text-cream/70">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 21s-6-5.6-6-10.5A6 6 0 0112 4a6 6 0 016 6.5C18 15.4 12 21 12 21z" />
              <circle cx="12" cy="10.5" r="2" />
            </svg>
            {site.address}
          </span>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-6">
          <TrustBadges tone="dark" className="justify-center md:justify-start" />
          <div className="flex flex-col items-center gap-4 border-t border-cream/10 pt-6 md:flex-row md:justify-between">
            <span className="text-xs text-cream/50">
              &copy; {new Date().getFullYear()} {site.displayName}. All rights reserved.
            </span>
            <PaymentIcons />
            <span className="text-xs text-cream/50">Website by {site.displayName}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
