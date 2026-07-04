import Link from "next/link";
import PatternDivider from "@/components/ui/PatternDivider";
import TrustBadges from "@/components/ui/TrustBadges";
import PaymentIcons from "@/components/ui/PaymentIcons";
import { categories } from "@/lib/categories";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto max-w-6xl px-4 pt-6 md:px-6">
        <PatternDivider className="text-gold/50" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-4 md:px-6 md:py-20">
        <div className="flex flex-col gap-3">
          <span className="font-fancy text-2xl">Safari Hub</span>
          <p className="text-sm text-cream/70">
            A premium marketplace for authentic African food items and traditional
            cooking ingredients, sourced with care and delivered to your door.
          </p>
          <p className="text-sm text-cream/70">
            <Link href="/delivery" className="rounded font-semibold text-gold hover:text-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">
              Delivering across the UK →
            </Link>
          </p>
          <div className="mt-2 flex items-center gap-3">
            <a
              href={site.social.instagram}
              aria-label="Instagram"
              className="rounded text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={site.social.facebook}
              aria-label="Facebook"
              className="rounded text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M15 8h2V5h-2a4 4 0 00-4 4v2H9v3h2v6h3v-6h2.5l.5-3H14V9a1 1 0 011-1z" />
              </svg>
            </a>
            <a
              href={site.whatsappLink}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="rounded text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.1-1.3A10 10 0 1012 2zm0 18.2a8.1 8.1 0 01-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.2.2-.3.2-.5.1a6.6 6.6 0 01-2-1.2 7.4 7.4 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4c.1-.2.2-.3.3-.5a.5.5 0 000-.5c-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2c0 1.3.9 2.6 1.1 2.8.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6a3.9 3.9 0 001.8.1c.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3z" />
              </svg>
            </a>
            <a
              href={site.social.tiktok}
              aria-label="TikTok"
              className="rounded text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M14 4v10.5a3.5 3.5 0 11-3-3.46M14 4a5 5 0 005 5" />
              </svg>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Quick Links</span>
          <Link href="/shop" className="rounded text-sm text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">Shop</Link>
          <Link href="/about" className="rounded text-sm text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">About Us</Link>
          <Link href="/contact" className="rounded text-sm text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">Contact</Link>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Customer Care</span>
          <Link href="/faq" className="rounded text-sm text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">FAQ</Link>
          <Link href="/delivery" className="rounded text-sm text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">Delivery</Link>
          <Link href="/contact" className="rounded text-sm text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">Contact</Link>
          {categories.slice(0, 2).map((category) => (
            <Link
              key={category.slug}
              href={`/shop?category=${category.slug}`}
              className="rounded text-sm text-cream/70 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Stay in Touch</span>
          <p className="text-sm text-cream/70">
            New arrivals and seasonal offers, straight to your inbox.
          </p>
          <form className="flex gap-2" action="/contact">
            <input
              type="email"
              placeholder="you@example.com"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-full border border-cream/30 bg-cream/10 px-4 py-2 text-sm text-cream placeholder:text-cream/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
            >
              Join
            </button>
          </form>
          <div className="mt-2 flex flex-col gap-1 text-sm text-cream/70">
            <a href={`mailto:${site.contactEmail}`} className="rounded hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">{site.contactEmail}</a>
            <a href={site.phoneLink} className="rounded hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">
              {site.phoneNumber}
            </a>
            <a href={site.whatsappLink} target="_blank" rel="noreferrer" className="rounded hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal">
              WhatsApp: {site.whatsappNumber}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-6">
          <TrustBadges tone="dark" className="justify-center md:justify-start" />
          <div className="flex flex-col items-center gap-4 border-t border-cream/10 pt-6 md:flex-row md:justify-between">
            <span className="text-xs text-cream/50">
              &copy; {new Date().getFullYear()} Safari Hub. All rights reserved.
            </span>
            <PaymentIcons />
          </div>
        </div>
      </div>
    </footer>
  );
}
