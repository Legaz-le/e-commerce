import prisma from "@/lib/prisma";
import {
  getReviewForProduct,
  getAverageRating,
  canUserReview,
} from "@/actions/reviews";
import Image from "next/image";
import { AddToCartButton } from "@/components/AddToCartButton";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return notFound();
  const { reviews } = await getReviewForProduct(id);
  const { average } = await getAverageRating(id);
  const canReview = await canUserReview(id);

  return <div></div>;
}
