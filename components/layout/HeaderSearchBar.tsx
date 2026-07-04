"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface HeaderSearchBarProps {
  inputClassName?: string;
}

export default function HeaderSearchBar({
  inputClassName = "border border-brown/20",
}: HeaderSearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : "/shop");
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex w-full items-center">
      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute left-4 h-4 w-4 text-brown/50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for bitter kola, suya spice, egusi..."
        aria-label="Search products"
        className={`w-full rounded-full ${inputClassName} bg-ivory py-2.5 pl-11 pr-24 text-sm text-ink placeholder:text-brown/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2`}
      />
      <button
        type="submit"
        className="absolute right-1.5 rounded-full bg-deep-green px-4 py-1.5 text-sm font-semibold text-cream transition-colors hover:bg-deep-green-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      >
        Search
      </button>
    </form>
  );
}
