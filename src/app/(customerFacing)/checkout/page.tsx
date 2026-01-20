import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { CheckoutForm } from "@/components/CheckoutForm";

export default async function CheckoutPage() {
  const { userId: clerkId } = await auth();

  if (!clerkId) redirect("/sign-in?redirect_url=/checkout");

  const user = await prisma.user.findUnique({ where: { clerkId: clerkId } });

  if (!user) redirect("/sign-up");

  const cartItems = await prisma.cartItem.findMany({
    where: {
      cart: { userId: user.id },
      product: {
        isAvailableForPurchase: true,
      },
    },
    include: {
      product: {
        select: {
          id: true,
          name: true,
          priceInCents: true,
          imagePath: true,
          description: true,
        },
      },
    },
  });

  if (cartItems.length === 0) redirect("/basket");

  const totalInCents = cartItems.reduce(
    (sum, item) => sum + item.product.priceInCents * item.quantity,
    0,
  );

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalInCents,
    currency: "usd",
    metadata: {
      userId: user.id,
      cartCheckout: "true",
    },
  });

  if (!paymentIntent.client_secret) {
    throw new Error("client_secret not existing");
  }
  return (
    <div className="my-15">
      <CheckoutForm
        cartItems={cartItems}
        totalInCents={totalInCents}
        clientSecret={paymentIntent.client_secret}
      />
    </div>
  );
}
