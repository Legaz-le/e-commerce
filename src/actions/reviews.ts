"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createReviews(
  productId: string,
  rating: number,
  comment: string,
) {
  const { userId: clerkId } = await auth();

  if (!clerkId) return { success: false, error: "Not authenticated" };

  const user = await prisma.user.findUnique({ where: { clerkId: clerkId } });

  if (!user) return { success: false, error: "User not existing" };

  const orderCheck = await prisma.orderItem.findFirst({
    where: {
      productId,
      order: {
        userId: user?.id,
      },
    },
    select: {
      orderId: true,
    },
  });

  if (!orderCheck) return { success: false, error: "No purchase found" };

  const existingReview = await prisma.review.findUnique({
    where: {
      userId_productId: {
        userId: user?.id,
        productId: productId,
      },
    },
  });

  if (existingReview) return { success: false, error: "Already reviewed" };

  const newReview = await prisma.review.create({
    data: {
      userId: user.id,
      productId: productId,
      orderId: orderCheck.orderId,
      rating: rating,
      comment: comment,
    },
  });

  return { success: true, error: null };
}
