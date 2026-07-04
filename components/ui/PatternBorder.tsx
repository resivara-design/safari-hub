interface PatternBorderProps {
  className?: string;
}

export default function PatternBorder({ className = "" }: PatternBorderProps) {
  return (
    <svg
      viewBox="0 0 120 6"
      preserveAspectRatio="xMidYMid meet"
      className={`w-full h-1.5 text-gold ${className}`}
      aria-hidden="true"
    >
      <g fill="currentColor">
        {Array.from({ length: 20 }).map((_, i) => (
          <rect key={i} x={i * 6} y={0} width="3" height="6" opacity={i % 2 === 0 ? 1 : 0.4} />
        ))}
      </g>
    </svg>
  );
}
