import { Button } from "@/components/ui/button";
import { ProductCardBasket } from "./ProductCardBasket";
import Link from "next/link";
import prisma from "@/lib/prisma";


async function getCart(userId: string) {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cart: {
        userId: userId,
      },
      product: {
        isAvailableForPurchase: true, 
      },
    },
    include: {
      product: true,
    },
    orderBy: {
      product: {
        name: "asc",
      },
    },
  });

  return cartItems;
}

export function Cart() {
  return (
    <div className="flex flex-col w-full space-y-5">
      <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 w-full font-semibold">
        <h1>Product</h1>
        <h2 className="text-center">Quantity</h2>
        <h3 className="text-right">Total</h3>
      </div>
      <div className="hidden md:flex border-b border-solid" />
      <div className="space-y-4">
        <ProductsSuspense />
      </div>
      <div className="hidden md:flex border-b border-solid" />
      <div className="self-end text-end space-y-3 mt-4">
        <div className="flex justify-end space-x-3">
          <span className="text-lg">Subtotal</span>
          <span className="text-lg font-semibold">$XXX.XX</span>
        </div>
        <p className="text-sm text-gray-600">
          Taxes and shipping are calculated at checkout
        </p>
        <Button asChild size="lg" className="">
          <Link href="/">Go to checkout</Link>
        </Button>
      </div>
    </div>
  );
}


async function ProductsSuspense() {
  const cartItem = await getCart();
  return cartItem.map((carItem) => (
    <ProductCardBasket key={carItem.id} {...carItem} />
  ));
}
