"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function createReviews(
  productId: string,
  rating: number,
  comment: string,
) {
  const canReview = await canUserReview(productId);
  
  if (!canReview.canReview) {
    return { canReview: false, error: canReview.error };
  }
  
  await prisma.review.create({
    data: {
      userId: canReview.userId!,
      productId: productId,
      orderId: canReview.orderId!,
      rating: rating,
      comment: comment,
    },
  });

  return { canReview: true, error: null };
}

export async function getReviewForProduct(productId: string) {
  const reviews = await prisma.review.findMany({
    where: { productId: productId },
    include: { user: { select: { email: true } } },
    orderBy: { createdAt: "desc" },
  });
  return { reviews };
}

export async function getAverageRating(productId: string) {
  const average = await prisma.review.aggregate({
    where: { productId: productId },
    _avg: { rating: true },
    _count: { rating: true },
  });
  return { average };
}

export async function canUserReview(productId: string) {
  const { userId: clerkId } = await auth();

  if (!clerkId) return { canReview: false, error: "Not authenticated" };

  const user = await prisma.user.findUnique({ where: { clerkId: clerkId } });

  if (!user) return { canReview: false, error: "User not existing" };

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

  if (!orderCheck) return { canReview: false, error: "No purchase found" };

  const existingReview = await prisma.review.findUnique({
    where: {
      userId_productId: {
        userId: user?.id,
        productId: productId,
      },
    },
  });

  if (existingReview) return { canReview: false, error: "Already reviewed" };

  return { canReview: true, orderId: orderCheck.orderId, userId: user.id, error: null };
}
