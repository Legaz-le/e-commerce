"use client";

import { incrementAndDecrement } from "@/actions/cartQuantity";
import { useTransition } from "react";

export function QuantityControls({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const [isPending, startTransition] = useTransition();

  function handleIncrement() {
    startTransition(async () => {
      await incrementAndDecrement(productId, "increment");
    });
  }

  function handleDecrement() {
    startTransition(async () => {
      await incrementAndDecrement(productId, "decrement");
    });
  }

  return (
    <div className="flex items-center justify-center gap-2">
      <button className="cursor-pointer" onClick={handleDecrement} disabled={isPending}> 
        -
      </button>
      <span>{quantity}</span>
      <button className="cursor-pointer" onClick={handleIncrement} disabled={isPending}>
        +
      </button>
    </div>
  );
}
