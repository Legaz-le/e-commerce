"use client";

import { incrementAndDecrement } from "@/actions/cartQuantity";
import { useState, useTransition, useEffect } from "react";

export function QuantityControls({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const [isPending, startTransition] = useTransition();
  const [optimisticQuantity, setOptimisticQuantity] = useState(quantity);

  function handleIncrement() {
    setOptimisticQuantity((value) => value + 1);
    startTransition(async () => {
      await incrementAndDecrement(productId, "increment");
    });
  }

  function handleDecrement() {
    setOptimisticQuantity((value) => value - 1);
    startTransition(async () => {
      await incrementAndDecrement(productId, "decrement");
    });
  }
  
  useEffect(() => {
    setOptimisticQuantity(quantity)
  },[quantity])

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
