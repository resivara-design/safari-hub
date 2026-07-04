interface PatternDividerProps {
  className?: string;
}

export default function PatternDivider({ className = "" }: PatternDividerProps) {
  return (
    <svg
      viewBox="0 0 240 16"
      preserveAspectRatio="xMidYMid meet"
      className={`w-full h-4 text-gold ${className}`}
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {Array.from({ length: 12 }).map((_, i) => {
          const x = i * 20 + 10;
          return (
            <g key={i}>
              <path d={`M${x - 8} 8 L${x} 0 L${x + 8} 8 L${x} 16 Z`} />
              <circle cx={x} cy={8} r="1.5" fill="currentColor" stroke="none" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}
