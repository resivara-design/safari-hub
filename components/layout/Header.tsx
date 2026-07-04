"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartBadge from "@/components/cart/CartBadge";
import MobileNav from "./MobileNav";
import HeaderSearchBar from "./HeaderSearchBar";
import TopContactBar from "./TopContactBar";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 border-b border-brown/10 bg-cream text-ink transition-shadow duration-200 ${
        scrolled ? "shadow-lg shadow-brown/10" : ""
      }`}
    >
      <TopContactBar />

      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-4 md:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded font-fancy text-2xl tracking-wide text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
        >
          <Image src="/images/logo.png" alt="Safari Hub" width={40} height={40} priority className="rounded-full" />
          <span className="flex flex-col leading-tight">
            Safari Hub
            <span className="font-body text-xs font-normal normal-case tracking-normal text-brown/60">
              Authentic African Ingredients
            </span>
          </span>
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="w-full max-w-md">
            <HeaderSearchBar />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 md:ml-auto">
          <Link
            href="/contact"
            className="flex flex-col items-center gap-1 rounded p-2 text-ink hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.5-7 8-7s8 3 8 7" />
            </svg>
            <span className="text-[11px] font-semibold">Account</span>
          </Link>

          <CartBadge showLabel />

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="flex flex-col items-center gap-1 rounded p-2 text-ink hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <span className="text-[11px] font-semibold">Menu</span>
          </button>
        </div>
      </div>

      <div className="border-t border-brown/10 bg-cream/40 md:hidden">
        <div className="px-4 py-3">
          <HeaderSearchBar />
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </header>
  );
}
