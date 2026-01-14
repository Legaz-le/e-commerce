import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formater";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Stripe from "stripe";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ payment_intent: string }>;
}) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const { payment_intent } = await searchParams;
  const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

  const isCartCheckout = paymentIntent.metadata.cartCheckout === "true";

  if (isCartCheckout) {
    const isSuccess = paymentIntent.status === "succeeded";
    return (
      <div className="max-w-5xl w-full mx-auto space-y-8">
        <h1 className="text-4xl font-bold">
          {isSuccess ? "Order Successful!" : "Error"}
        </h1>
        <p className="text-lg">
          Thank you for your purchase! We have sent a confirmation email with
          your download links.
        </p>
        <p className="text-muted-foreground">
          You can also view and download all your items from your orders page.
        </p>
        <Button className="mt-4" size="lg" asChild>
          <Link href="/orders">View My Orders</Link>
        </Button>
      </div>
    );
  } else {
    if (paymentIntent.metadata.productId == null) return notFound();

    const product = await prisma.product.findUnique({
      where: { id: paymentIntent.metadata.productId },
    });

    if (product == null) return notFound();

    const isSuccess = paymentIntent.status === "succeeded";

    return (
      <div className="max-w-5xl w-full mx-auto space-y-8">
        <h1 className="text-4xl font-bold">
          {isSuccess ? "Success!" : "Error"}
        </h1>
        <div className="flex gap-4 items-center">
          <div className="aspect-video shrink-0 w-1/3 relative">
            <Image
              src={product.imagePath}
              fill
              alt={product.name}
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-lg">
              {formatCurrency(product.priceInCents / 100)}
            </div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <div className="line-clamp-3 text-muted-foreground">
              {product.description}
            </div>
            <Button className="mt-4" size="lg" asChild>
              {isSuccess ? (
                <a
                  href={`/products/download/${await createDownloadVerification(
                    product.id,
                  )}`}
                >
                  Download
                </a>
              ) : (
                <Link href={`/products/${product.id}/purchase`}>Try Again</Link>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

async function createDownloadVerification(productId: string) {
  return (
    await prisma.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    })
  ).id;
}
