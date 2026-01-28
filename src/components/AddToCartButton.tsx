"use client";

import { useTransition } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@clerk/nextjs";
import { addToCart } from "@/components/AddToCart";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function AddToCartButton({
  productId,
  quantity,
  stock,
}: {
  productId: string;
  quantity: number;
  stock: number;
}) {
  const [isPending, startTransition] = useTransition();
  const { isSignedIn } = useAuth();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = async () => {
    if (!isSignedIn) {
      addItem(productId, quantity);
      toast.success("Added to cart!");
      return;
    }

    startTransition(async () => {
      try {
        const result = await addToCart(productId, quantity);

        if (result.success) {
          toast.success("Added to cart!");
          useCartStore.getState().setAuthCount(useCartStore.getState().authCount + quantity)
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to add to cart");
        }
      }
    });
  };

  return (
    <div className="w-full">
      <Button
        onClick={handleAddToCart}
        disabled={isPending || stock <= 0}
        size="lg"
        className="w-full cursor-pointer"
      >
        {isPending ? "Adding..." : stock <= 0 ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}
