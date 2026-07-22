"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Button from "@/components/ui/Button";
import FormField from "@/components/forms/FormField";
import type { Product } from "@/types/product";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  email?: string;
  consent?: string;
}

export default function RemindMeButton({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleOpen() {
    setEmail("");
    setConsent(false);
    setErrors({});
    setFormError(null);
    setToken(null);
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const nextErrors: FormErrors = {};
    if (!EMAIL_PATTERN.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!consent) {
      nextErrors.consent = "Please tick the box to receive a reminder.";
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setFormError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, email, consent }),
      });
      const data = await response.json();
      if (!response.ok) {
        setFormError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      setToken(data.token);
      setSubmitting(false);
    } catch {
      setFormError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button type="button" variant="outline" onClick={handleOpen}>
        Remind Me
      </Button>

      {mounted &&
        open &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-ink/60" onClick={() => setOpen(false)} aria-hidden="true" />
            <div
              role="dialog"
              aria-modal="true"
              aria-label={`Remind me about ${product.name}`}
              className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto rounded-2xl bg-ivory p-6 shadow-2xl md:p-8"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full bg-cream p-2 text-ink hover:text-deep-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>

              {token ? (
                <>
                  <h2 className="font-heading text-2xl text-ink">You&apos;re all set</h2>
                  <p className="mt-2 text-sm text-brown">
                    We&apos;ll email you one reminder about {product.name} in about a day. We won&apos;t send
                    anything else after that.
                  </p>
                  <Link
                    href={`/reminders/cancel?t=${token}`}
                    className="mt-4 w-fit text-sm font-semibold text-deep-green underline-offset-2 hover:underline"
                  >
                    Didn&apos;t mean to? Cancel this reminder
                  </Link>
                  <div className="mt-6">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      Close
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="font-heading text-2xl text-ink">Remind me about this item</h2>
                  <p className="mt-2 text-sm text-brown">
                    Leave your email and we&apos;ll send you one reminder about {product.name} in about a day.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                    <FormField
                      label="Email address"
                      name="reminder-email"
                      type="email"
                      value={email}
                      onChange={setEmail}
                      error={errors.email}
                      placeholder="you@example.com"
                      required
                    />

                    <div className="flex flex-col gap-1.5">
                      <label className="flex items-center gap-3 rounded-xl border border-brown/10 bg-cream p-4">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="h-5 w-5 shrink-0 accent-deep-green"
                        />
                        <span className="text-sm text-brown">Email me one reminder about this product.</span>
                      </label>
                      {errors.consent && <span className="text-xs text-burnt-orange-dark">{errors.consent}</span>}
                    </div>

                    {formError && (
                      <div className="rounded-xl border border-burnt-orange/30 bg-burnt-orange/10 p-3 text-sm text-burnt-orange-dark">
                        {formError}
                      </div>
                    )}

                    <Button type="submit" variant="primary" disabled={submitting}>
                      {submitting ? "Sending..." : "Send Me a Reminder"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
