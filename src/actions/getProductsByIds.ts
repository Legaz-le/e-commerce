"use server";

import prisma from "@/lib/prisma";

export async function getProductsById(productIds: string[]) {
  try {
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isAvailableForPurchase: true },
      select: {
        id: true,
        name: true,
        priceInCents: true,
        description: true,
        imagePath: true,
      },
    });
    return products
  } catch {
    throw new Error("issue with getting data");
  }
}
