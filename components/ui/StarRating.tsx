interface StarRatingProps {
  rating: number;
  count?: number;
  size?: "sm" | "md";
}

export default function StarRating({ rating, count, size = "sm" }: StarRatingProps) {
  const stars = [1, 2, 3, 4, 5];
  const dimension = size === "sm" ? "w-4 h-4" : "w-5 h-5";

  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex">
        {stars.map((star) => {
          const filled = star <= Math.round(rating);
          return (
            <svg
              key={star}
              viewBox="0 0 20 20"
              className={`${dimension} ${filled ? "text-gold" : "text-brown/20"}`}
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85z" />
            </svg>
          );
        })}
      </div>
      {typeof count === "number" && (
        <span className="text-xs text-brown/80">({count})</span>
      )}
    </div>
  );
}
