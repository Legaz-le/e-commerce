import { unstable_cache as nexCache } from "next/cache";
import { cache as reactCache } from "react";
import prisma from "@/lib/prisma";

type Callback = (...args: any[]) => Promise<any>;

export function cache<T extends Callback>(
  cb: T,
  keyParts: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) {
    return nexCache(reactCache(cb), keyParts, options)
}


export const getProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}, ["/products", "getProducts"]);