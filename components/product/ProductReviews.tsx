import StarRating from "@/components/ui/StarRating";
import { getAverageRating, getReviewsBySlug } from "@/lib/reviews";

export default function ProductReviews({ slug }: { slug: string }) {
  const productReviews = getReviewsBySlug(slug);
  const average = getAverageRating(slug);

  if (productReviews.length === 0) {
    return (
      <div className="text-brown/70">Be the first to review this product.</div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <StarRating rating={average} size="md" />
        <span className="font-heading text-2xl text-ink">{average}</span>
        <span className="text-brown/70">
          ({productReviews.length} review{productReviews.length !== 1 ? "s" : ""})
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {productReviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col gap-2 rounded-xl border border-brown/10 bg-cream p-5"
          >
            <StarRating rating={review.rating} />
            <p className="font-heading text-lg text-ink">{review.title}</p>
            <p className="text-sm text-brown">{review.body}</p>
            <span className="text-xs text-brown/50">
              {review.author} ·{" "}
              {new Date(review.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
