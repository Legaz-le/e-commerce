"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCartItem(productId: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  const user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) return null;

  const cart = await prisma.cart.findUnique({ where: { userId: user.id } });

  if (!cart) return null;

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: { cartId: cart.id, productId },
    },
  });

  return cartItem;
}

export async function incrementAndDecrement(
  productId: string,
  action: "increment" | "decrement",
) {
  const cartItem = await getCartItem(productId);

  if (!cartItem) return { success: false, error: "Item not found" };

  try {
    if (action === "decrement" && cartItem.quantity === 1) {
      await prisma.cartItem.delete({
        where: { id: cartItem.id },
      });
    } else {
      await prisma.cartItem.update({
        where: { id: cartItem.id },
        data: {
          quantity:
            action === "increment" ? { increment: 1 } : { decrement: 1 },
        },
      });
    }

    revalidatePath("/basket");
    return { success: true };
  } catch (err) {
    console.log("Error:", err);
    return { success: false, error: "Failed to update quantity" };
  }
}
