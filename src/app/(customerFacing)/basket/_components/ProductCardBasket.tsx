"use client";

import { formatCurrency } from "@/lib/formater";
import Image from "next/image";
import { QuantityControls } from "./QuantityControls";
import { Trash2 } from "lucide-react";
import { cartCountAuth, deleteCartItem } from "@/actions/cartQuantity";
import { useTransition } from "react";
import { useUser } from "@clerk/nextjs";
import { useCartStore } from "@/store/cartStore";

export type ProductCardBasketProps = {
  id: string;
  cartItemId: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
  quantity: number;
};

export function ProductCardBasket({
  id,
  cartItemId,
  name,
  priceInCents,
  description,
  imagePath,
  quantity,
}: ProductCardBasketProps) {
  const { user } = useUser();
  const removeItem = useCartStore((state) => state.removeItem);
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!user) {
      removeItem(id);
    } else {
      startTransition(async () => {
        await deleteCartItem(cartItemId);
        const newCount = await cartCountAuth()
        useCartStore.getState().setAuthCount(newCount)
      });
    }
  }

  return (
    <div className="grid grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center w-full">
      <div className="flex space-x-5 ">
        <Image
          src={imagePath}
          width={109}
          height={139}
          alt={name}
          className="object-cover"
        />
        <div className="flex flex-col  justify-between">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <span className="text-sm">{formatCurrency(priceInCents / 100)}</span>
        </div>
      </div>
      <div className="text-center">
        <QuantityControls productId={id} quantity={quantity} />
      </div>

      <div className="text-right">
        <span className="font-semibold">
          {formatCurrency((priceInCents * quantity) / 100)}
        </span>
      </div>
      <button
        className="cursor-pointer"
        onClick={handleDelete}
        disabled={isPending}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
