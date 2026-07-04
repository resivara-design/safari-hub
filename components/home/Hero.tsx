"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

const trustItems = [
  { label: "Free UK delivery over £40", icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" },
  { label: "Quality guaranteed", icon: "M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z" },
  { label: "Secure checkout", icon: "M12 2l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-darkred text-cream">
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
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-40 -translate-y-1/2 bg-cream/40 blur-3xl"
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
          className="rounded-full bg-deep-green px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-cream shadow-sm"
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
          <Button href="/shop" variant="secondary" size="lg">
            Shop Now
          </Button>
          <Button
            href="/#categories"
            variant="outline"
            size="lg"
            className="border-cream/40 text-cream hover:bg-cream/10 hover:text-cream focus-visible:ring-offset-darkred"
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
