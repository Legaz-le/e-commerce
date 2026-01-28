"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath, revalidateTag } from "next/cache";

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  fileUrl: z.string().min(1, "File is required"),
  imageUrl: z.string().min(1, "Image is required"),
  stock: z.coerce.number().int().min(0),
});

function formatErrors(issues: z.core.$ZodIssue[]) {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const path = String(issue.path[0]);
    if (path && !errors[path]) {
      errors[path] = issue.message;
    }
  }
  return errors;
}

export async function addProduct(prevState: unknown, formData: FormData) {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return formatErrors(result.error.issues);
  }

  const data = result.data;

  await prisma.product.create({
    data: {
      isAvailableForPurchase: false,
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath: data.fileUrl,
      imagePath: data.imageUrl,
      stock: data.stock,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidateTag("products", "default");
  redirect("/admin/products");
}

const editSchema = addSchema.extend({
  fileUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  stock: z.coerce.number().int().min(0),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData,
) {
  const result = editSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    return formatErrors(result.error.issues);
  }

  const data = result.data;
  const product = await prisma.product.findUnique({ where: { id } });

  if (product == null) return notFound();

  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath: data.fileUrl || product.filePath,
      imagePath: data.imageUrl || product.imagePath,
      stock: data.stock,
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidateTag("products", "default");
  redirect("/admin/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean,
) {
  await prisma.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  });

  revalidatePath("/");
  revalidatePath("/products");
  revalidateTag("products", "default");
}

export async function deleteProduct(id: string) {
  const orderItems = await prisma.orderItem.findFirst({
    where: { productId: id },
  });

  if (orderItems) {
    throw new Error("Cannot delete product with existing orders");
  }

  await prisma.cartItem.deleteMany({ where: { productId: id } });
  await prisma.downloadVerification.deleteMany({ where: { productId: id } });
  await prisma.review.deleteMany({ where: { productId: id } });

  const product = await prisma.product.delete({ where: { id } });
  if (product == null) return notFound();

  revalidatePath("/");
  revalidatePath("/products");
  revalidateTag("products", "default");
}
