import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { render } from "@react-email/render";
import PurchaseReceiptEmail from "@/app/email/PurchaseReceipt";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const resend = new Resend(process.env.RESEND_API_KEY as string);

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("No signature", { status: 400 });
  }

  const event = await stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  if (event.type === "charge.succeeded") {
    const charge = event.data.object;
    const intent = charge.payment_intent as string;
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    const pricePaidInCents = charge.amount;

    const payment = await prisma.order.findUnique({
      where: {
        paymentIntentId: intent,
      },
    });

    if (payment) {
      return new NextResponse("Already processed", { status: 200 });
    }

    const isCartCheckout = charge.metadata.cartCheckout === "true";

    if (isCartCheckout) {
      const userId = charge.metadata.userId;

      const user = await prisma.user.findUnique({ where: { id: userId } });

      if (!user) {
        return new NextResponse("User not found", { status: 400 });
      }

      if (!email) {
        return new NextResponse("No email provided", { status: 400 });
      }

      // Fetch cart items from database instead of metadata
      const cartItems = await prisma.cartItem.findMany({
        where: {
          cart: { userId: user.id },
        },
        include: {
          product: true,
        },
      });

      if (cartItems.length === 0) {
        return new NextResponse("Cart is empty", { status: 400 });
      }

      const { order, downloadVerifications } = await prisma.$transaction(
        async (tx) => {
          const newOrder = await tx.order.create({
            data: {
              userId: user.id,
              paymentIntentId: intent,
              totalPaidInCents: pricePaidInCents,
              items: {
                create: cartItems.map((item) => ({
                  productId: item.productId,
                  quantity: item.quantity,
                  priceInCents: item.product.priceInCents,
                })),
              },
            },
          });

          await Promise.all(
            cartItems.map((item) =>
              tx.product.update({
                where: { id: item.productId },
                data: { stock: { decrement: item.quantity } },
              }),
            ),
          );
          

          const productIds = [
            ...new Set(cartItems.map((item) => item.productId)),
          ];

          const downloadVerifications = await Promise.all(
            productIds.map((productId) =>
              tx.downloadVerification.create({
                data: {
                  productId: productId,
                  expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
                },
              }),
            ),
          );

          const userCart = await tx.cart.findUnique({
            where: { userId: user.id },
          });

          if (userCart) {
            await tx.cartItem.deleteMany({
              where: { cartId: userCart.id },
            });
          }

          return {
            order: newOrder,
            downloadVerifications: downloadVerifications,
          };
        },
      );

      const verificationMap = new Map(
        downloadVerifications.map((v) => [v.productId, v.id]),
      );

      const baseUrl =
        process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

      const emailItems = cartItems.map((item) => {
        return {
          product: {
            name: item.product.name,
            imagePath: `${baseUrl}${item.product.imagePath}`,
            description: item.product.description,
          },
          quantity: item.quantity,
          priceInCents: item.product.priceInCents,
          downloadVerificationId: verificationMap.get(item.productId) ?? "",
        };
      });

      const { data, error } = await resend.emails.send({
        from: `Support <onboarding@resend.dev>`,
        to: email,
        subject: "Order Confirmation",
        html: await render(
          PurchaseReceiptEmail({
            order: {
              id: order.id,
              createdAt: order.createdAt,
              totalPaidInCents: order.totalPaidInCents,
            },
            items: emailItems,
          }),
        ),
      });

      if (error) {
        console.error("Failed to send cart checkout email:", error);
      } else {
        console.log("Cart checkout email sent successfully:", data);
      }
    } else {
      const product = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (product == null || email == null) {
        return new NextResponse("Bad Request", { status: 400 });
      }

      let user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            clerkId: null,
          },
        });
      }

      const order = await prisma.$transaction(async (tx) => {
        const newOrder = await tx.order.create({
          data: {
            userId: user.id,
            paymentIntentId: intent,
            totalPaidInCents: pricePaidInCents,
            items: {
              create: {
                productId,
                quantity: 1,
                priceInCents: pricePaidInCents,
              },
            },
          },
        });
      
        await tx.product.update({
          where: { id: productId },
          data: { stock: { decrement: 1 } },
        });
        
         await tx.downloadVerification.create({
          data: {
            productId,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
          },
        });
      
        return newOrder;
      });


      const fullImageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}${product.imagePath}`;

      console.log("Full Image URL:", fullImageUrl);

      const { data, error } = await resend.emails.send({
        from: `Support <onboarding@resend.dev>`,
        to: email,
        subject: "Order Confirmation",
        html: await render(
          PurchaseReceiptEmail({
            order: {
              id: order.id,
              createdAt: order.createdAt,
              totalPaidInCents: order.totalPaidInCents,
            },
            items: [
              {
                product: {
                  name: product.name,
                  imagePath: fullImageUrl,
                  description: product.description,
                },
                priceInCents: pricePaidInCents,
                quantity: 1,
                downloadVerificationId: order.id,
              },
            ],
          }),
        ),
      });

      if (error) {
        console.error("Failed to send single product email:", error);
      } else {
        console.log("Single product email sent successfully:", data);
      }
    }
  }

  return new NextResponse();
}
