"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative min-h-[420px] overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(92,58,26,0.35)] md:min-h-[520px]"
      >
        <Image
          src="/images/banner.jpg"
          alt="Safari Hub's full range of authentic African ingredients"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/40 to-transparent"
          aria-hidden="true"
        />

        <div className="relative z-10 flex h-full min-h-[420px] flex-col items-start justify-center gap-6 p-6 sm:p-10 md:min-h-[520px] md:p-16">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="max-w-2xl font-fancy text-3xl leading-tight text-cream sm:text-4xl md:text-6xl lg:text-7xl"
          >
            Authentic African Ingredients Delivered to Your Door
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="max-w-xl text-sm text-cream/85 sm:text-base md:text-lg"
          >
            Premium quality spices, herbs, and traditional ingredients for your authentic
            African dishes.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-deep-green px-8 py-4 text-lg font-semibold text-cream shadow-md transition-colors duration-200 hover:bg-deep-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Shop Now
            </Link>
            <Link
              href="/#categories"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/50 px-8 py-4 text-lg font-semibold text-cream transition-colors duration-200 hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
            >
              Explore Categories
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
