"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getOrderForUser() {
  const { userId: clerkId } = await auth();

  if (!clerkId) return { orders: [], error: "Not authenticated" };

  const user = await prisma.user.findUnique({
    where: { clerkId: clerkId },
    select: {
      orders: {
        orderBy: { createdAt: "desc" },
        select: {
          totalPaidInCents: true,
          id: true,
          createdAt: true,
          items: {
            select: {
              quantity: true,
              priceInCents: true,
              id: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  imagePath: true,
                  description: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) return { orders: [], error: "User not found" };

  return { orders: user.orders, error: null };
}
