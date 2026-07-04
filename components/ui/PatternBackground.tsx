interface PatternBackgroundProps {
  className?: string;
}

export default function PatternBackground({ className = "" }: PatternBackgroundProps) {
  // multiple instances render on one page, so the pattern id is derived from
  // className to stay unique per tint/opacity and avoid SVG id collisions
  const patternId = `section-pattern-${className.replace(/[^a-zA-Z0-9]/g, "") || "default"}`;

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <svg className={`h-full w-full ${className}`} preserveAspectRatio="xMidYMid slice">
        <defs>
          {/* same diamond + dot motif as PatternDivider/Hero, tiled full-bleed */}
          <pattern id={patternId} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="20" cy="20" r="3" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
