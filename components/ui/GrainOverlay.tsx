export default function GrainOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.025]" aria-hidden="true">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        {/* feTurbulence generates colorless noise; colorMatrix strips it to alpha-only so the grain never tints the page */}
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  );
}
