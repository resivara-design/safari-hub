interface FreeDeliveryBadgeProps {
  className?: string;
}

export default function FreeDeliveryBadge({ className = "" }: FreeDeliveryBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-deep-green px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-cream ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z" />
        <circle cx="6.5" cy="19" r="1.5" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="19" r="1.5" fill="currentColor" stroke="none" />
      </svg>
      Free UK Delivery
    </span>
  );
}
