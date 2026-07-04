interface TrustBadgesProps {
  className?: string;
  tone?: "light" | "dark";
}

const badges = [
  {
    label: "Secure Checkout",
    icon: "M12 2l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z",
  },
  {
    label: "UK-Wide Delivery",
    icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7zM6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  },
  {
    label: "Quality Guaranteed",
    icon: "M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z",
  },
  {
    label: "Loved by 1,000+ Customers",
    icon: "M12 21s-7.5-4.6-10-9.3C.6 8.1 2.4 4.5 6 4.5c2 0 3.5 1 4 2.5.5-1.5 2-2.5 4-2.5 3.6 0 5.4 3.6 4 7.2C19.5 16.4 12 21 12 21z",
  },
];

export default function TrustBadges({ className = "", tone = "light" }: TrustBadgesProps) {
  const textColor = tone === "dark" ? "text-cream/80" : "text-brown/80";
  const iconColor = tone === "dark" ? "text-gold" : "text-deep-green";

  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${className}`}>
      {badges.map((badge) => (
        <div key={badge.label} className={`flex items-center gap-2 text-sm font-semibold ${textColor}`}>
          <svg
            viewBox="0 0 24 24"
            className={`h-5 w-5 shrink-0 ${iconColor}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={badge.icon} />
          </svg>
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
