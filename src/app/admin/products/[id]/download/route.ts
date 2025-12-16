import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    select: { filePath: true, name: true },
  });
  if (product == null) return notFound();

  const response = await fetch(product.filePath);

   if (!response.ok) {
    return new NextResponse("File not found", { status: 404 });
  }

  const blob = await response.blob();
  const buffer = Buffer.from(await blob.arrayBuffer());
  
  const extension = product.filePath.split('.').pop()?.split('?')[0] || 'file';

  return new NextResponse(buffer, {
   headers: {
      "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
      "Content-Type": blob.type,
      "Content-Length": blob.size.toString(),
    },
  });
}
