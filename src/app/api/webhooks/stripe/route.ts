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
    const productId = charge.metadata.productId;
    const email = charge.billing_details.email;
    const pricePaidInCents = charge.amount;

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });
    if (product == null || email == null) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });
    
    if(!user) {
      user = await prisma.user.create({
        data: {
          email,
          clerkId: null,
        }
      })
    }
    
    const order = await prisma.order.create({
      data: {
        userId: user.id,
        totalPaidInCents: pricePaidInCents,
        items: {
          create: {
            productId,
            quantity: 1,
            priceInCents: pricePaidInCents,
          },
        },
      }
    })

    const downloadVerification = await prisma.downloadVerification.create({
      data: {
        productId,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
      },
    });

    const fullImageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}${product.imagePath}`;

    console.log("Full Image URL:", fullImageUrl);

    await resend.emails.send({
      from: `Support <onboarding@resend.dev>`,
      to: email,
      subject: "Order Confirmation",
      html: await render(
        PurchaseReceiptEmail({
          product: {
            name: product.name,
            imagePath: fullImageUrl,
            description: product.description,
          },
          order: {
            id: order.id,
            createdAt: order.createdAt,
            totalPaidInCents: order.totalPaidInCents,
          },
          downloadVerificationId: downloadVerification.id,
        }),
      ),
    });
  }

  return new NextResponse();
}
