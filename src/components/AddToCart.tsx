"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string, quantity: number) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    throw new Error("Please sign in to add items to cart");
  }
  console.log("clerkId:", clerkId);
  
  try {
    await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { clerkId },
      });
      console.log("user:", user);

      if (!user) {
        throw new Error("user don't exist");
      }

      let cart = await tx.cart.findUnique({
        where: { userId: user.id },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId: user.id },
        });
      }

      const existingItem = await tx.cartItem.findUnique({
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId,
          },
        },
      });

      if (existingItem) {
        await tx.cartItem.update({
          where: { id: existingItem.id },
          data: { quantity: { increment: quantity } },
        });
      } else {
        await tx.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity: quantity,
          },
        });
      }
    });

    revalidatePath("/cart");
    revalidatePath("/products");

    return { success: true };
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw new Error("Failed to add item to cart");
  }
}
