import Image from "next/image";
import ProductImagePlaceholder from "./ProductImagePlaceholder";
import type { ProductImagePlaceholder as ImagePlaceholderConfig } from "@/types/product";

interface ProductImageProps {
  name: string;
  image: ImagePlaceholderConfig;
  photo?: string;
  size?: "sm" | "md" | "lg";
  showPattern?: boolean;
  priority?: boolean;
}

const roundedClasses: Record<NonNullable<ProductImageProps["size"]>, string> = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
};

export default function ProductImage({
  name,
  image,
  photo,
  size = "md",
  showPattern = false,
  priority = false,
}: ProductImageProps) {
  if (!photo) {
    return (
      <ProductImagePlaceholder image={image} name={name} size={size} showPattern={showPattern} />
    );
  }

  return (
    <div className={`flex w-full items-center justify-center overflow-hidden bg-cream p-2 ${roundedClasses[size]}`}>
      <Image
        src={photo}
        alt={name}
        width={788}
        height={1400}
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
        className="h-auto w-full object-contain object-center"
        priority={priority}
      />
    </div>
  );
}
