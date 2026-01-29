"use server";

import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function deleteOrder(id: string) {
  const order = await prisma.order.delete({
    where: { id },
  });

  if (order == null) return notFound();

  return order;
}

export async function updateOrderStatus(
  orderId: string,
  status: string,
  trackingNumber?: string,
) {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status: status as OrderStatus, trackingNumber },
  });
  revalidatePath("/admin/orders");

  return order;
}
