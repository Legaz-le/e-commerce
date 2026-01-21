"use client";

import { useState } from "react";
import { StarRating } from "./StarRating";
import { createReviews } from "@/actions/reviews";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function ReviewForm({ productId }: { productId: string }) {
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    setIsLoading(true);
    const result = await createReviews(productId, star, comment);

    if (result.error) {
      setMessage(result.error);
    } else {
      setMessage("Review submitted!");
      setStar(0);
      setComment("");
    }
    setIsLoading(false);
  }
  return (
    <div className="space-y-4">
      <StarRating rating={star} interactive onRatingChange={setStar} />
      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
      />
      <Button onClick={handleSubmit} disabled={star === 0 || isLoading}>
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>
      {message && <p>{message}</p>}
    </div>
  );
}
