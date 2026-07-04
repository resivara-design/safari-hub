interface BadgeProps {
  children: React.ReactNode;
  tone?: "gold" | "green" | "orange" | "neutral" | "gold-solid" | "green-solid";
  className?: string;
}

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  gold: "bg-gold/15 text-gold-dark",
  green: "bg-black/10 text-black",
  orange: "bg-burnt-orange/10 text-burnt-orange-dark",
  neutral: "bg-brown/10 text-brown",
  "gold-solid": "bg-gold text-ink shadow-sm",
  "green-solid": "bg-black text-white shadow-sm",
};

export default function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
