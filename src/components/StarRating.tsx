import { Star } from "lucide-react";

type StarRatingProps = {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: number;
};

export function StarRating({
  rating,
  interactive,
  onRatingChange,
  size,
}: StarRatingProps) {
  const start = [1, 2, 3, 4, 5];
  return (
    <div className="flex">
      {start.map((item) => (
        <Star
          key={item}
          size={size || 20}
          fill={item <= rating ? "gold" : "none"}
          stroke={item <= rating ? "gold" : "gray"}
          onClick={() => interactive && onRatingChange?.(item)}
          className={interactive ? "cursor-pointer" : ""}
        />
      ))}
    </div>
  );
}
