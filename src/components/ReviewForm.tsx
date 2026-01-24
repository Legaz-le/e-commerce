"use client";

import { useState } from "react";
import { StarRatingInteractive } from "./StarRatingInteractive";
import { createReviews } from "@/actions/reviews";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export function ReviewForm({ productId }: { productId: string }) {
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit() {
    setIsLoading(true);
    setIsError(false);
    const result = await createReviews(productId, star, comment);

    if (result.error) {
      setMessage(result.error);
      setIsError(true);
    } else {
      setMessage("Review submitted successfully!");
      setIsError(false);
      setStar(0);
      setComment("");
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-5 max-w-[500px]">
      <div className="flex flex-col gap-2">
        <label className="font-['Satoshi'] text-[14px] text-[#2A254B]">
          Your Rating
        </label>
        <StarRatingInteractive
          rating={star}
          onRatingChangeAction={setStar}
          size={28}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-['Satoshi'] text-[14px] text-[#2A254B]">
          Your Review (optional)
        </label>
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          className="min-h-[120px] font-['Satoshi'] text-[16px] border-gray-200 focus:border-[#2A254B] focus:ring-[#2A254B]"
        />
      </div>

      <Button
        onClick={handleSubmit}
        disabled={star === 0 || isLoading}
        className="w-fit bg-[#2A254B] hover:bg-[#2A254B]/90 text-white font-['Satoshi'] px-8 py-5"
      >
        {isLoading ? "Submitting..." : "Submit Review"}
      </Button>

      {message && (
        <p
          className={`font-['Satoshi'] text-[14px] ${
            isError ? "text-red-500" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
