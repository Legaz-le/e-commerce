"use client";

import { useState } from "react";

export function ProductQuantitySelector({
  initialQuantity = 1,
  onChangeAction,
  max,
}: {
  initialQuantity: number;
  onChangeAction: (quantity: number) => void;
  max: number;
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  function handleDecrement() {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChangeAction(newQuantity);
    }
  }

  function handleIncrement() {
    if (quantity >= max) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChangeAction(newQuantity);
  }

  return (
    <div className="flex flex-row justify-between items-center px-4 py-3 gap-[33px] bg-brand-light h-[46px]">
      <button
        onClick={handleDecrement}
        disabled={quantity === 1}
        className="font-['Satoshi'] font-normal text-[16px] leading-[22px] text-[#CAC6DA] hover:text-brand cursor-pointer"
      >
        -
      </button>
      <span className="font-['Satoshi'] font-normal text-[16px] leading-[22px] text-brand">
        {quantity}
      </span>
      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className="font-['Satoshi'] font-normal text-[16px] leading-[22px] text-[#CAC6DA] hover:text-brand cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
