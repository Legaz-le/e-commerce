"use client";

import { incrementAndDecrement } from "@/actions/cartQuantity";
import { useCartStore } from "@/store/cartStore";
import { useUser } from "@clerk/nextjs";
import { useState, useTransition, useEffect } from "react";

export function QuantityControls({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const { user } = useUser();
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const [isPending, startTransition] = useTransition();
  const [optimisticQuantity, setOptimisticQuantity] = useState(quantity);

  function handleIncrement() {
    if (!user) {
      setOptimisticQuantity((value) => value + 1);
      updateQuantity(productId, "increment");
    } else {
      startTransition(async () => {
        await incrementAndDecrement(productId, "increment");
      });
    }
  }

  function handleDecrement() {
    if (optimisticQuantity > 1) {
      if (!user) {
        setOptimisticQuantity((value) => value - 1);
        updateQuantity(productId, "decrement");
      } else {
        startTransition(async () => {
          await incrementAndDecrement(productId, "decrement");
        });
      }
    }
  }

  useEffect(() => {
    setOptimisticQuantity(quantity);
  }, [quantity]);

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className="cursor-pointer"
        onClick={handleDecrement}
        disabled={isPending}
      >
        -
      </button>
      <span>{optimisticQuantity}</span>
      <button
        className="cursor-pointer"
        onClick={handleIncrement}
        disabled={isPending}
      >
        +
      </button>
    </div>
  );
}
