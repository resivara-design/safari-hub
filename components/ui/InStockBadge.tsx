interface InStockBadgeProps {
  className?: string;
}

export default function InStockBadge({ className = "" }: InStockBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold text-deep-green ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 6L9 17l-5-5" />
      </svg>
      In Stock
    </span>
  );
}
