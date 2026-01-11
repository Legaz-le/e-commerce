"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

type guestCartItemsProps = {
  productId: string;
  quantity: number;
};

export async function mergeGuestCart(guestcartItems: guestCartItemsProps[]) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return { success: false, error: "Not signed in" };
  }

  const user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) {
    return { success: false, error: "User not found" };
  }

  let cart = await prisma.cart.findUnique({ where: { userId: user.id } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: user.id } });
  }

  for (const item of guestcartItems) {
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: item.productId,
        },
      },
    });

    if (existingItem) {
      await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + item.quantity },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }
  }
  return { success: true };
}
