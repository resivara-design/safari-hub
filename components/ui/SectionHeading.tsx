interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subtext?: string;
  align?: "left" | "center";
}

export default function SectionHeading({
  eyebrow,
  heading,
  subtext,
  align = "center",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <div className={`flex flex-col gap-5 ${alignClasses}`}>
      {eyebrow && (
        <div className={`flex flex-col gap-3 ${alignClasses}`}>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-burnt-orange">
            {eyebrow}
          </span>
          <span className="h-[2px] w-10 bg-gold" aria-hidden="true" />
        </div>
      )}
      <h2 className="font-heading text-3xl leading-[1.1] text-ink md:text-5xl">{heading}</h2>
      {subtext && (
        <p className="max-w-2xl text-base text-brown md:text-lg">{subtext}</p>
      )}
    </div>
  );
}
