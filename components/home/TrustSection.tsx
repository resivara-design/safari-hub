import SectionHeading from "@/components/ui/SectionHeading";
import StarRating from "@/components/ui/StarRating";
import PatternBackground from "@/components/ui/PatternBackground";
import { getFeaturedReviews } from "@/lib/reviews";

const trustBadges = [
  { label: "Secure Checkout", icon: "M12 2l7 4v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" },
  { label: "Quality Guarantee", icon: "M9 12l2 2 4-4M12 22a10 10 0 100-20 10 10 0 000 20z" },
  { label: "Careful Delivery", icon: "M3 7h11v8H3zM14 10h4l3 3v2h-7z" },
];

export default function TrustSection() {
  const testimonials = getFeaturedReviews();

  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <PatternBackground className="text-bronze/[0.06]" />
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading eyebrow="Trusted" heading="What Our Customers Say" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((review) => (
            <div key={review.id} className="flex flex-col gap-3 rounded-2xl bg-cream p-5 shadow-sm">
              <StarRating rating={review.rating} />
              <p className="text-sm text-brown">&ldquo;{review.body}&rdquo;</p>
              <span className="text-xs font-semibold text-gold-dark">{review.author}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-brown/10 pt-8">
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-brown/80">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-deep-green" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d={badge.icon} />
              </svg>
              <span className="text-sm font-semibold">{badge.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
