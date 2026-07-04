"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}

export default function MobileNav({ open, onClose, links }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-ink/50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col gap-1 bg-cream p-6 shadow-xl md:hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
          >
            <div className="mb-6 flex items-center justify-between">
              <span className="font-heading text-xl text-ink">Menu</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded p-2 text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-lg px-3 py-3 text-base font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
                    isActive ? "bg-deep-green/10 text-deep-green" : "text-brown"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
