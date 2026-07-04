"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const trustItems = [
  { label: "Free UK delivery over £40", icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" },
  { label: "Quality guaranteed", icon: "M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z" },
  { label: "Secure checkout", icon: "M12 2l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" },
];

const botanicalMotifs = [
  {
    // stylised alligator-pepper pod cluster
    path: "M-4 40c8-18 22-30 40-32-4 10-2 20 6 28 8 8 18 10 28 6-2 18-14 32-32 40-10-20-24-32-42-42z",
    className: "left-[-4%] top-[8%] h-40 w-40 md:h-56 md:w-56 text-gold/[0.09]",
  },
  {
    // stylised bay-leaf sprig
    path: "M20 0C10 14 4 32 8 50c2 10 8 18 16 22 4-14 4-28-2-40C18 22 18 10 20 0z M8 50c-6-4-8-10-8-16",
    className: "right-[2%] top-[4%] h-32 w-32 md:h-48 md:w-48 text-gold/[0.08]",
  },
  {
    // stylised bitter-kola nut group
    path: "M10 30a20 16 0 1140 0 20 16 0 11-40 0zM46 34a12 10 0 1124 0 12 10 0 11-24 0z",
    className: "left-[38%] bottom-[2%] h-24 w-24 md:h-36 md:w-36 text-gold/[0.07]",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-deep-green via-brown to-charcoal text-cream">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          // warm African-sunset mixture: gold light + terracotta glow + bronze warmth, layered over the deep-green/brown/charcoal base, darkening at the far corner for text contrast
          background:
            "radial-gradient(110% 85% at 12% 0%, rgba(184,147,63,0.22), transparent 55%), radial-gradient(90% 70% at 82% 18%, rgba(193,80,46,0.28), transparent 58%), radial-gradient(80% 60% at 60% 85%, rgba(140,98,57,0.22), transparent 60%), radial-gradient(140% 100% at 100% 100%, rgba(0,0,0,0.4), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <pattern id="hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#hero-pattern)" className="text-gold" />
      </svg>

      {botanicalMotifs.map((motif, i) => (
        <svg
          key={i}
          viewBox="0 0 90 80"
          className={`pointer-events-none absolute ${motif.className}`}
          aria-hidden="true"
        >
          <path d={motif.path} fill="currentColor" />
        </svg>
      ))}

      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mb-10 w-full border-y-4 md:mb-14"
        style={{
          // thin wood-tone rule top and bottom, framing the full-bleed image without breaking the edge-to-edge width
          borderImage:
            "repeating-linear-gradient(90deg, rgba(90,58,26,0.9) 0px, rgba(90,58,26,0.9) 3px, rgba(62,39,26,0.9) 3px, rgba(62,39,26,0.9) 6px) 4",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-40 -translate-y-1/2 bg-gold/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="overflow-hidden shadow-[0_20px_50px_-20px_rgba(92,58,26,0.5)]">
          <Image
            src="/images/banner.jpg"
            alt="Safari Hub's full range of authentic African ingredients"
            width={1774}
            height={887}
            className="h-auto w-full"
            priority
            sizes="100vw"
          />
        </div>
      </motion.div>

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-7 px-4 py-24 md:px-6 md:py-32">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
          className="rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold ring-1 ring-gold/30"
        >
          Premium African Marketplace
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.22, ease: "easeOut" }}
          className="h-px w-16 origin-left bg-gradient-to-r from-gold to-transparent"
          aria-hidden="true"
        />
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="max-w-3xl font-fancy text-5xl leading-[1.05] text-cream md:text-7xl"
        >
          Authentic African Ingredients Delivered to Your Door
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.32, ease: "easeOut" }}
          className="max-w-xl text-lg text-cream/80"
        >
          From bitter kola to jollof rice kits, we bring carefully sourced, quality-checked
          ingredients straight from trusted growers to your kitchen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-4"
        >
          <Button href="/shop" variant="primary" size="lg">
            Shop Now
          </Button>
          <Button
            href="/#categories"
            variant="outline"
            size="lg"
            className="border-cream/40 text-cream hover:bg-cream/10 hover:text-cream focus-visible:ring-offset-deep-green"
          >
            Explore Categories
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2"
        >
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-cream/70">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-gold"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={item.icon} />
              </svg>
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
