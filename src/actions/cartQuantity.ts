"use server";

import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCartItem(productId: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) return null;

  const cartItem = await prisma.cartItem.findFirst({
    where: { productId, cart: { user: { clerkId } } },
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

export async function deleteCartItem(cartItemId: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) return { success: false, error: "Unauthorized" };

  try {
    await prisma.cartItem.delete({
      where: {
        id: cartItemId,
        cart: { user: { clerkId } },
      },
    });
    revalidatePath("/basket");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete" };
  }
}

export async function cartCountAuth() {
  const { userId: clerkId } = await auth();

  if (!clerkId) return 0;

  return await prisma.cartItem.count({
    where: { cart: { user: { clerkId } } },
  });
}
