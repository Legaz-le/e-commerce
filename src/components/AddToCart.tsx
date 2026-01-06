"use server"; 

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function addToCart(productId: string) {
  
  const { userId } = await auth();
  
  if (!userId) {
    throw new Error("Please sign in to add items to cart");
  }

  try {
    await prisma.$transaction(async (tx) => {
      
      let cart = await tx.cart.findUnique({
        where: { userId },
      });

      if (!cart) {
        cart = await tx.cart.create({
          data: { userId }, 
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
          data: { quantity: { increment: 1 } }, 
        });
      } 
     
      else {
        await tx.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity: 1, 
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
