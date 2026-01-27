import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const product = await prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    select: { id: true, updatedAt: true },
  });

  return [
    {
      url: "https://e-commerce-ruby-two-72.vercel.app",
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://e-commerce-ruby-two-72.vercel.app/products",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...product.map((p) => ({
      url: `https://e-commerce-ruby-two-72.vercel.app/products/${p.id}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
