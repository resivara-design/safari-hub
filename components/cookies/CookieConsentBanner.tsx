"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useCookieConsent } from "./CookieConsentContext";

export default function CookieConsentBanner() {
  const {
    consent,
    showBanner,
    showPreferences,
    acceptAll,
    rejectNonEssential,
    openPreferences,
    closePreferences,
    savePreferences,
  } = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const [analytics, setAnalytics] = useState(consent?.analytics ?? false);
  const [marketing, setMarketing] = useState(consent?.marketing ?? false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (showPreferences) {
      setAnalytics(consent?.analytics ?? false);
      setMarketing(consent?.marketing ?? false);
    }
  }, [showPreferences, consent]);

  useEffect(() => {
    if (!showPreferences) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closePreferences();
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [showPreferences, closePreferences]);

  if (!mounted) return null;

  return (
    <>
      {showBanner &&
        createPortal(
          <div
            role="region"
            aria-label="Cookie consent"
            className="fixed inset-x-0 bottom-0 z-[110] border-t border-brown/10 bg-ivory p-4 shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.15)] md:p-6"
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-sm text-brown">
                We use essential cookies to run this site, and would like your permission for
                analytics and marketing cookies too. See our{" "}
                <Link href="/cookies" className="text-deep-green underline">
                  Cookie Policy
                </Link>{" "}
                for details.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={rejectNonEssential}
                  className="rounded-full border border-brown/20 px-4 py-2 text-sm font-semibold text-brown transition-colors hover:border-deep-green hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={openPreferences}
                  className="rounded-full border border-brown/20 px-4 py-2 text-sm font-semibold text-brown transition-colors hover:border-deep-green hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  Manage Preferences
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-deep-green shadow-md transition-colors hover:bg-deep-green hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {showPreferences &&
        createPortal(
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-ink/60" onClick={closePreferences} aria-hidden="true" />
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Cookie preferences"
              className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-y-auto rounded-2xl bg-ivory p-6 shadow-2xl md:p-8"
            >
              <button
                type="button"
                onClick={closePreferences}
                aria-label="Close cookie preferences"
                className="absolute right-4 top-4 rounded-full bg-cream p-2 text-ink hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>

              <h2 className="font-heading text-2xl text-ink">Cookie Preferences</h2>
              <p className="mt-2 text-sm text-brown">
                Choose which categories of cookies we can use. You can change this at any time via
                &quot;Cookie Settings&quot; in the footer. See our{" "}
                <Link href="/cookies" className="text-deep-green underline">
                  Cookie Policy
                </Link>{" "}
                for full details.
              </p>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4 rounded-xl border border-brown/10 bg-cream p-4">
                  <div>
                    <p className="font-semibold text-ink">Essential</p>
                    <p className="text-sm text-brown">
                      Required for the site to function (e.g. keeping items in your cart). Always on.
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-brown/10 px-3 py-1 text-xs font-semibold text-brown">
                    Always on
                  </span>
                </div>

                <label className="flex items-center justify-between gap-4 rounded-xl border border-brown/10 bg-cream p-4">
                  <span>
                    <span className="block font-semibold text-ink">Analytics</span>
                    <span className="block text-sm text-brown">
                      Helps us understand how the site is used, so we can improve it.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="h-5 w-5 shrink-0 accent-deep-green"
                  />
                </label>

                <label className="flex items-center justify-between gap-4 rounded-xl border border-brown/10 bg-cream p-4">
                  <span>
                    <span className="block font-semibold text-ink">Marketing</span>
                    <span className="block text-sm text-brown">
                      Used for personalised offers and ads, if we add these in future.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={marketing}
                    onChange={(e) => setMarketing(e.target.checked)}
                    className="h-5 w-5 shrink-0 accent-deep-green"
                  />
                </label>
              </div>

              <div className="mt-6 flex flex-wrap justify-end gap-2">
                <button
                  type="button"
                  onClick={rejectNonEssential}
                  className="rounded-full border border-brown/20 px-4 py-2 text-sm font-semibold text-brown transition-colors hover:border-deep-green hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={() => savePreferences({ analytics, marketing })}
                  className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-deep-green shadow-md transition-colors hover:bg-deep-green hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
