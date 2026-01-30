import { Section } from "../shared";
import { StarRating } from "@/components/StarRating";
import { ReviewList } from "@/components/ReviewList";
import { ReviewForm } from "@/components/ReviewForm";

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: Date;
  user: { email: string };
};

type AverageRating = {
  _avg: { rating: number | null };
  _count: { rating: number };
};

type CanReviewResult = {
  canReview: boolean;
  error: string | null;
  orderId?: string;
  userId?: string;
};

type ReviewsSectionProps = {
  productId: string;
  reviews: Review[];
  averageRating: AverageRating;
  canReview: CanReviewResult;
};

export function ReviewsSection({
  productId,
  reviews,
  averageRating,
  canReview,
}: ReviewsSectionProps) {
  const reviewCount = averageRating._count.rating;
  const avgRating = averageRating._avg.rating ?? 0;

  return (
    <Section background="white" className="py-12">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h2 className="font-['Clash_Display'] font-normal text-[24px] leading-8 text-brand">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-4">
            <StarRating rating={Math.round(avgRating)} size={24} />
            <span className="font-['Satoshi'] text-[16px] text-brand-muted">
              {avgRating.toFixed(1)} out of 5 ({reviewCount}{" "}
              {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>

        {canReview.canReview && (
          <div className="border-t border-gray-200 pt-8">
            <h3 className="font-['Clash_Display'] font-normal text-[18px] leading-6 text-brand mb-4">
              Write a Review
            </h3>
            <ReviewForm productId={productId} />
          </div>
        )}

        <div className="border-t border-gray-200 pt-8">
          <h3 className="font-['Clash_Display'] font-normal text-[18px] leading-6 text-brand mb-6">
            All Reviews
          </h3>
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </Section>
  );
}
