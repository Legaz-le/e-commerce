import { StarRating } from "./StarRating";

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: { email: string };
};

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="font-body text-[16px] text-brand-muted">
        No reviews yet. Be the first to review this product!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="border-b border-gray-100 pb-6 last:border-b-0"
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-display font-normal text-[14px] text-brand">
                {review.user.email.split("@")[0]}
              </span>
              <span className="font-body text-[14px] text-brand-muted">
                {review.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <StarRating rating={review.rating} size={16} />
            {review.comment && (
              <p className="font-body text-[16px] leading-[22px] text-brand-muted">
                {review.comment}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
