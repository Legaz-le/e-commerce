import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ downloadVerificationId: string }> }
) {
  const { downloadVerificationId } = await params;
  
  const data = await prisma.downloadVerification.findUnique({
    where: { id: downloadVerificationId, expiresAt: { gt: new Date() } },
    select: { product: { select: { filePath: true, name: true } } },
  });

  if (data == null) {
    return NextResponse.redirect(
      new URL("/products/download/expired", req.url)
    );
  }
  const { product } = data;

  const response = await fetch(product.filePath);

   if (!response.ok) {
    return new NextResponse("File not found", { status: 404 });
  }

  const blob = await response.blob();
  const buffer = Buffer.from(await blob.arrayBuffer());

  const extension = data.product.filePath.split(".").pop();

  return new NextResponse(buffer, {
    headers: {
      "Content-Disposition": `attachment; filename="${data.product.name}.${extension}"`,
      "Content-Type": blob.type,
      "Content-Length": blob.size.toString(),
    },
  });
}
