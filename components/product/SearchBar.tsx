"use client";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 24 24"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brown/50"
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="w-full rounded-full border border-brown/20 bg-ivory py-3 pl-11 pr-4 text-ink placeholder:text-brown/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      />
    </div>
  );
}
