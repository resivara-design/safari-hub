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

const photoSizeClasses: Record<NonNullable<ProductImageProps["size"]>, string> = {
  sm: "aspect-square rounded-lg",
  md: "aspect-[3/4] rounded-xl",
  lg: "aspect-[3/4] rounded-2xl",
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
    <div className={`relative overflow-hidden bg-cream ${photoSizeClasses[size]}`}>
      <Image
        src={photo}
        alt={name}
        fill
        sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
        className="object-contain p-2"
        priority={priority}
      />
    </div>
  );
}
