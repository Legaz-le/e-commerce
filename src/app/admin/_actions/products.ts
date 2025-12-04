"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";

const fileSchema = z.instanceof(File, { message: "Required" });
const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

const addSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  file: fileSchema.refine((file) => file.size > 0, "Required"),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

type ActionState = {
  errors?: ReturnType<typeof z.treeifyError>;
  success?: boolean;
};

export async function addProduct(prevState: ActionState | null, formData: FormData): Promise<ActionState> {
  const result = addSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!result.success) {
    const treeErrors = z.treeifyError(result.error);
    
    return {
      success: false,
      errors: treeErrors
    };
  }

  const data = result.data;

  await fs.mkdir("products", { recursive: true });
  const filePath = `products/${crypto.randomUUID()}- ${data.file.name}`;
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer()));

  await fs.mkdir("public/products", { recursive: true });
  const imagePath = `public${crypto.randomUUID()}- ${data.image.name}`;
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer())
  );

  await prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      priceInCents: data.priceInCents,
      filePath,
      imagePath,
    },
  });

  redirect("/admin/products");
}
