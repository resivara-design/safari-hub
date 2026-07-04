"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import PatternBackground from "@/components/ui/PatternBackground";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-deep-green to-charcoal py-12 text-center text-cream md:py-20">
      <PatternBackground className="text-gold/[0.08]" />
      <div className="relative mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="font-heading text-3xl text-cream">Join Our Newsletter</h2>
        <p className="mt-2 text-cream/75">
          Get new arrivals, recipe ideas and seasonal offers in your inbox.
        </p>
        {submitted ? (
          <p className="mt-6 rounded-lg bg-gold/15 px-4 py-3 text-gold-light">
            Thanks for subscribing! Keep an eye on your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                name="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full rounded-full border border-cream/30 bg-cream/10 px-4 py-3 text-cream placeholder:text-cream/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-deep-green"
              />
              {error && <span className="mt-1 block text-left text-xs text-gold-light">{error}</span>}
            </div>
            <Button type="submit" variant="primary" size="md">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
