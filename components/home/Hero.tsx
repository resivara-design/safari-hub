"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const trustItems = [
  { label: "Free UK delivery over £40", icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" },
  { label: "Quality guaranteed", icon: "M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z" },
  { label: "Secure checkout", icon: "M12 2l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white text-black">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative mb-4 w-full border-y-4 md:mb-6"
        style={{
          // thin wood-tone rule top and bottom, framing the full-bleed image without breaking the edge-to-edge width
          borderImage:
            "repeating-linear-gradient(90deg, rgba(90,58,26,0.9) 0px, rgba(90,58,26,0.9) 3px, rgba(62,39,26,0.9) 3px, rgba(62,39,26,0.9) 6px) 4",
        }}
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-40 -translate-y-1/2 bg-gold/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="overflow-hidden shadow-[0_20px_50px_-20px_rgba(92,58,26,0.35)]">
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

      <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-7 px-4 pb-24 pt-2 md:px-6 md:pb-32 md:pt-4">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="max-w-3xl font-fancy text-5xl leading-[1.05] text-black md:text-7xl"
        >
          Authentic African Ingredients Delivered to Your Door
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="max-w-xl text-lg text-black/70"
        >
          From bitter kola to jollof rice kits, we bring carefully sourced, quality-checked
          ingredients straight from trusted growers to your kitchen.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-4"
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black bg-black px-8 py-4 text-lg font-semibold text-white shadow-md transition-colors duration-200 hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            Shop Now
          </Link>
          <Link
            href="/#categories"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-black/40 px-8 py-4 text-lg font-semibold text-black transition-colors duration-200 hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            Explore Categories
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2"
        >
          {trustItems.map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm text-black/70">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 shrink-0 text-black"
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
