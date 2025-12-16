"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { notFound, redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  fileUrl: z.string().min(1, "File is required"),
  imageUrl: z.string().min(1, "Image is required"),
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
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

const editSchema = addSchema.extend({
  fileUrl: z.string().optional(),
  imageUrl: z.string().optional(),
});

export async function updateProduct(
  id: string,
  prevState: unknown,
  formData: FormData
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
    },
  });

  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function toggleProductAvailability(
  id: string,
  isAvailableForPurchase: boolean
) {
  await prisma.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  });

  revalidatePath("/");
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const product = await prisma.product.delete({ where: { id } });
  if (product == null) return notFound();

  revalidatePath("/");
  revalidatePath("/products");
}