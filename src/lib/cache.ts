import { unstable_cache as nexCache } from "next/cache";
import { cache as reactCache } from "react";
import prisma from "@/lib/prisma";

type Callback = (...args: any[]) => Promise<any>;

export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {},
) {
  return nexCache(reactCache(cb), keyParts, options);
}

export const getProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}, ["/products", "getProducts"]);

export const getFilteredProducts = cache(
  async (filters: { category?: string; price?: string; designer?: string }) => {
    const where: any = { isAvailableForPurchase: true };

    if (filters.category) where.category = filters.category;
    if (filters.designer) where.designer = filters.designer;
    if (filters.price) {
      if (filters.price === "0 - 100") {
        where.priceInCents = { gte: 0, lte: 10000 };
      } else if (filters.price === "101 - 250") {
        where.priceInCents = { gte: 10100, lte: 25000 };
      } else if (filters.price === "250 +") {
        where.priceInCents = { gte: 25000 };
      }
    }

    return prisma.product.findMany({ where, orderBy: { name: "asc" } });
  },
  ["/products", "getFilteredProducts"],
);

export const getFeaturedProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    skip: 1,
    take: 4,
  });
}, ["/", "getFeaturedProducts",]);

export const getPopularProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 3,
  });
}, ["/", "getPopularProducts"]);
