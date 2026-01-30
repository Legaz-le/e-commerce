"use client";

import { useState } from "react";
import { ProductQuantitySelector } from "./ProductQuantitySelector";
import { AddToCartButton } from "@/components/AddToCartButton";

export function ProductAction({
  productId,
  stock,
}: {
  productId: string;
  stock: number;
}) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-row items-center justify-between px-10 py-7 border-t border-gray-100">
      <div className="flex flex-row items-center gap-[22px]">
        <span className="font-['Clash_Display'] font-normal text-[16px] leading-5 text-brand">
          Amount:
        </span>
        <ProductQuantitySelector
          initialQuantity={1}
          onChangeAction={setQuantity}
          max={stock}
        />
      </div>
      <div className="w-fit">
        <AddToCartButton
          productId={productId}
          quantity={quantity}
          stock={stock}
        />
      </div>
    </div>
  );
}
