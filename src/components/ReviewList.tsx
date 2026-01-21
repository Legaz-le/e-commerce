import { StarRating } from "./StarRating";

type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  user: { email: string };
};

export function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p>No reviews yet</p>;
  }
  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <p>{review.user.email}</p>
          <StarRating rating={review.rating} />
          <p>{review.comment}</p>
          <p>{review.createdAt.toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
