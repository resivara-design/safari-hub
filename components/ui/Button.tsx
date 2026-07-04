import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-gold text-deep-green shadow-md hover:bg-deep-green hover:text-gold hover:shadow-lg",
  secondary: "bg-deep-green text-cream hover:bg-deep-green-light",
  outline:
    "bg-transparent border border-deep-green/60 text-deep-green hover:bg-deep-green hover:text-cream",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full font-body font-semibold transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

interface ButtonLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    ButtonStyleProps {
  href: string;
}

interface ButtonElementProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyleProps {
  href?: never;
}

interface ButtonStyleProps {
  variant?: Variant;
  size?: Size;
  className?: string;
}

type ButtonProps = ButtonLinkProps | ButtonElementProps;

export default function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "" } = props;
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, ...rest } = props;
    return (
      <Link href={href} className={classes} {...rest}>
        {props.children}
      </Link>
    );
  }

  const { variant: _variant, size: _size, className: _className, href: _href, ...rest } =
    props as ButtonElementProps;
  return (
    <button className={classes} {...rest}>
      {props.children}
    </button>
  );
}
