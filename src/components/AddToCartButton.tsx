"use client";

import { useState, useTransition } from "react";
import { useGuestCart } from "@/hooks/useGuestCart";
import { useAuth } from "@clerk/nextjs";
import { addToCart } from "@/components/AddToCart";
import { Button } from "./ui/button";

export function AddToCartButton({ productId, quantity }: { productId: string, quantity: number }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { isSignedIn } = useAuth();
  const { addItem } = useGuestCart();

  const handleAddToCart = async () => {
    setMessage(null);

    if (!isSignedIn) {
      addItem(productId, quantity)
      setMessage("Added to cart!");
      setTimeout(() => setMessage(null), 2000)
      return;
    }

    startTransition(async () => {
      try {
        const result = await addToCart(productId, quantity);

        if (result.success) {
          setMessage("Added to cart!");

          setTimeout(() => setMessage(null), 2000);
        }
      } catch (error) {
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage("Failed to add to cart");
        }
      }
    });
  };

  return (
    <div className="w-full">
      {message && (
        <p
          className={`text-sm mb-2 ${message.includes("sign in") ? "text-red-500" : "text-green-500"}`}
        >
          {message}
        </p>
      )}
      <Button
        onClick={handleAddToCart}
        disabled={isPending}
        size="lg"
        className="w-full cursor-pointer"
      >
        {isPending ? "Adding..." : "Add to Cart"}
      </Button>
    </div>
  );
}
