"use client"; 

import { useState, useTransition } from "react";
import { addToCart } from "@/components/AddToCart";
import { Button } from "./ui/button";

export function AddToCartButton({ productId }: { productId: string }) {
  const [message, setMessage] = useState<string | null>(null); 
  const [isPending, startTransition] = useTransition(); 

  const handleAddToCart = async () => {
    setMessage(null);

    startTransition(async () => {
      try {
        const result = await addToCart(productId);

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
      <Button
        onClick={handleAddToCart} 
        disabled={isPending} 
        size="lg"
        className="w-full"
      >
        {isPending ? "Adding..." : "Add to Cart"}
      </Button>
      {message && (
        <p className={`text-sm mt-2 ${message.includes("sign in") ? "text-red-500" : "text-green-500"}`}>
          {message}
        </p>
      )}
    </div>
  );
}
