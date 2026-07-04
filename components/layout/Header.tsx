"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CartBadge from "@/components/cart/CartBadge";
import MobileNav from "./MobileNav";
import HeaderSearchBar from "./HeaderSearchBar";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/delivery", label: "Delivery" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
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
      className={`sticky top-0 z-30 border-b border-brown/10 bg-white text-ink transition-shadow duration-200 ${
        scrolled ? "shadow-lg shadow-brown/10" : ""
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 rounded font-fancy text-2xl tracking-wide text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <Image src="/images/logo.png" alt="Safari Hub" width={40} height={40} priority className="rounded-full" />
          Safari Hub
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`rounded text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                  isActive ? "text-deep-green" : "text-brown hover:text-deep-green"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <CartBadge />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="rounded p-2 text-ink hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white md:hidden"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className="border-t border-brown/10 bg-cream/40">
        <div className="mx-auto max-w-3xl px-4 py-3 md:px-6">
          <HeaderSearchBar />
        </div>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} links={navLinks} />
    </header>
  );
}
