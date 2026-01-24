"use client";

import { Star } from "lucide-react";

type StarRatingInteractiveProps = {
  rating: number;
  onRatingChangeAction: (rating: number) => void;
  size?: number;
};

export function StarRatingInteractive({
  rating,
  onRatingChangeAction,
  size,
}: StarRatingInteractiveProps) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex">
      {stars.map((item) => (
        <Star
          key={item}
          size={size || 20}
          fill={item <= rating ? "gold" : "none"}
          stroke={item <= rating ? "gold" : "gray"}
          onClick={() => onRatingChangeAction(item)}
          className="cursor-pointer"
        />
      ))}
    </div>
  );
}
