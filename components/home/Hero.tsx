"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-4 pt-6 md:px-6 md:pt-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl shadow-[0_20px_50px_-20px_rgba(92,58,26,0.35)]"
        >
          <Image
            src="/images/banner.jpg"
            alt="Safari Hub's full range of authentic African ingredients"
            width={1774}
            height={887}
            className="h-auto w-full"
            priority
            sizes="100vw"
          />
        </motion.div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 text-center md:px-6 md:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="font-fancy text-3xl leading-tight text-ink sm:text-4xl md:text-5xl"
        >
          Authentic African Ingredients Delivered to Your Door
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
          className="mx-auto mt-4 max-w-xl text-base text-brown sm:text-lg"
        >
          Premium quality spices, herbs, and traditional ingredients for your authentic
          African dishes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href="/shop"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-deep-green px-8 py-4 text-lg font-semibold text-cream shadow-md transition-colors duration-200 hover:bg-deep-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:w-auto"
          >
            Shop Now
          </Link>
          <Link
            href="/#categories"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-deep-green/50 px-8 py-4 text-lg font-semibold text-deep-green transition-colors duration-200 hover:bg-deep-green hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 sm:w-auto"
          >
            Explore Categories
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
