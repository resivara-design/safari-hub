import PatternBorder from "@/components/ui/PatternBorder";
import type { ProductImagePlaceholder as ImagePlaceholderConfig } from "@/types/product";

interface ProductImagePlaceholderProps {
  image: ImagePlaceholderConfig;
  name: string;
  size?: "sm" | "md" | "lg";
  showPattern?: boolean;
}

const sizeClasses: Record<NonNullable<ProductImagePlaceholderProps["size"]>, string> = {
  sm: "aspect-square rounded-lg",
  md: "aspect-square rounded-xl",
  lg: "aspect-[4/3] rounded-2xl",
};

const iconSizeClasses: Record<NonNullable<ProductImagePlaceholderProps["size"]>, string> = {
  sm: "w-6 h-6 p-1",
  md: "w-8 h-8 p-1.5",
  lg: "w-10 h-10 p-2",
};

const iconPaths: Record<ImagePlaceholderConfig["icon"], string> = {
  seed: "M12 2c3 3 5 6.5 5 10a5 5 0 01-10 0c0-3.5 2-7 5-10z",
  leaf: "M4 20c8 0 16-8 16-16-8 0-16 8-16 16zm0 0c2-4 4-8 8-12",
  pepper: "M9 3c1.5 0 2 1 2 2 3-1 6 1 6 5 0 5-4 11-8 11S1 15 1 10c0-3 2-5 4-5 0-1 1.5-2 4-2z",
  pot: "M4 9h16l-1.5 9a2 2 0 01-2 1.7H7.5a2 2 0 01-2-1.7L4 9zm2-4h12M12 5V2",
  jar: "M8 3h8v3.5c1.2.6 2 1.9 2 3.5v9a2 2 0 01-2 2H8a2 2 0 01-2-2v-9c0-1.6.8-2.9 2-3.5V3z",
  grain: "M12 2c4 4 4 8 0 12-4-4-4-8 0-12zm0 10v10M8 15c1 1 2 1.5 4 1.5s3-.5 4-1.5",
};

export default function ProductImagePlaceholder({
  image,
  name,
  size = "md",
  showPattern = false,
}: ProductImagePlaceholderProps) {
  const initial = name.trim().charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-${image.colorFrom} via-ink/10 to-${image.colorTo} ${sizeClasses[size]}`}
      >
        <span
          className="absolute inset-0 flex items-center justify-center font-heading text-7xl text-cream/[0.06] select-none"
          aria-hidden="true"
        >
          {initial}
        </span>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)",
            backgroundSize: "10px 10px",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(130% 130% at 50% 15%, transparent 45%, rgba(0,0,0,0.32) 100%)",
          }}
          aria-hidden="true"
        />
        <div
          className={`absolute bottom-2 left-2 flex items-center justify-center rounded-full bg-charcoal/30 backdrop-blur-sm ring-1 ring-cream/20 ${iconSizeClasses[size]}`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-full w-full text-cream/90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={iconPaths[image.icon]} />
          </svg>
        </div>
      </div>
      {showPattern && <PatternBorder />}
    </div>
  );
}
