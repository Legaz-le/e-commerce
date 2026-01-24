"use client";

import { useState } from "react";

export function ProductQuantitySelector({
  initialQuantity = 1,
  onChangeAction,
}: {
  initialQuantity: number;
  onChangeAction: (quantity: number) => void;
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
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChangeAction(newQuantity);
  }

  return (
    <div className="flex flex-row justify-between items-center px-4 py-3 gap-[33px] bg-[#F9F9F9] h-[46px]">
      <button
        onClick={handleDecrement}
        disabled={quantity === 1}
        className="font-['Satoshi'] font-normal text-[16px] leading-[22px] text-[#CAC6DA] hover:text-[#2A254B] cursor-pointer"
      >
        -
      </button>
      <span className="font-['Satoshi'] font-normal text-[16px] leading-[22px] text-[#2A254B]">
        {quantity}
      </span>
      <button
        onClick={handleIncrement}
        className="font-['Satoshi'] font-normal text-[16px] leading-[22px] text-[#CAC6DA] hover:text-[#2A254B] cursor-pointer"
      >
        +
      </button>
    </div>
  );
}
