"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/format";

interface ShareButtonsProps {
  slug: string;
  name: string;
  price: number;
}

const iconButtonClasses =
  "flex h-11 w-11 items-center justify-center rounded-full border border-brown/15 bg-ivory text-ink transition-colors duration-200 hover:border-deep-green hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

const menuItemClasses =
  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-ink hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-inset";

export default function ShareButtons({ slug, name, price }: ShareButtonsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const productUrl = `${site.url}/product/${slug}`;
  const shareMessage = `Hi! I found this authentic African product on ${site.displayName}. I thought you might like it:\n${name}\n${productUrl}`;
  const shareTitle = `${name} — ${formatPrice(price)} | ${site.displayName}`;

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
  const facebookHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`;
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(productUrl)}`;
  const emailHref = `mailto:?subject=${encodeURIComponent(`Check out ${name} on ${site.displayName}`)}&body=${encodeURIComponent(shareMessage)}`;

  useEffect(() => {
    if (!menuOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  async function handleShareClick() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareMessage, url: productUrl });
      } catch {
        // User cancelled the native share sheet — nothing to do.
      }
      return;
    }
    setMenuOpen((open) => !open);
  }

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(productUrl);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setMenuOpen(false);
      }, 1500);
    } catch {
      // Clipboard access denied/unavailable — silently no-op.
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[#1DA851] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.1-1.3A10 10 0 1012 2zm0 18.2a8.1 8.1 0 01-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.2.2-.3.2-.5.1a6.6 6.6 0 01-2-1.2 7.4 7.4 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4c.1-.2.2-.3.3-.5a.5.5 0 000-.5c-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2c0 1.3.9 2.6 1.1 2.8.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6a3.9 3.9 0 001.8.1c.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3z" />
        </svg>
        Share on WhatsApp
      </a>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={handleShareClick}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          aria-label="Share this product"
          className={iconButtonClasses}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <path d="M8.6 10.5l6.8-3.9M8.6 13.5l6.8 3.9" />
          </svg>
        </button>

        {menuOpen && (
          <div
            role="menu"
            aria-label="Share options"
            className="absolute left-0 top-full z-20 mt-2 w-56 rounded-2xl border border-brown/10 bg-ivory p-2 shadow-xl"
          >
            <button type="button" role="menuitem" onClick={handleCopyLink} className={`${menuItemClasses} w-full text-left`}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 12a4 4 0 004 4l3-3a4 4 0 00-5.66-5.66l-1 1M15 12a4 4 0 00-4-4l-3 3a4 4 0 005.66 5.66l1-1" />
              </svg>
              <span aria-live="polite">{copied ? "Link copied" : "Copy Link"}</span>
            </button>
            <a href={whatsappHref} target="_blank" rel="noreferrer" role="menuitem" className={menuItemClasses}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden="true">
                <path d="M12 2a10 10 0 00-8.6 15.1L2 22l5.1-1.3A10 10 0 1012 2zm0 18.2a8.1 8.1 0 01-4.2-1.1l-.3-.2-3.1.8.8-3-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1s-.7.8-.9 1c-.2.2-.3.2-.5.1a6.6 6.6 0 01-2-1.2 7.4 7.4 0 01-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.4c.1-.2.2-.3.3-.5a.5.5 0 000-.5c-.1-.1-.6-1.5-.9-2-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2c0 1.3.9 2.6 1.1 2.8.1.2 2 3 4.7 4.2.7.3 1.2.5 1.6.6a3.9 3.9 0 001.8.1c.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3z" />
              </svg>
              WhatsApp
            </a>
            <a href={facebookHref} target="_blank" rel="noreferrer" role="menuitem" className={menuItemClasses}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <path d="M15 8h2V5h-2a4 4 0 00-4 4v2H9v3h2v6h3v-6h2.5l.5-3H14V9a1 1 0 011-1z" />
              </svg>
              Facebook
            </a>
            <a href={twitterHref} target="_blank" rel="noreferrer" role="menuitem" className={menuItemClasses}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 4l16 16M20 4L4 20" />
              </svg>
              X / Twitter
            </a>
            <a href={emailHref} role="menuitem" className={menuItemClasses}>
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              Email
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
