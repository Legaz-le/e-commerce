"use server";

import OrderHistoryEmail from "@/app/email/OrderHistory";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import z from "zod";
import { render } from "@react-email/render";

const emailSchema = z.email();
const resend = new Resend(process.env.RESEND_API_KEY as string);

export async function emailOrderHistory(
  prevState: unknown,
  formData: FormData
): Promise<{ message?: string; error?: string }> {
  const result = emailSchema.safeParse(formData.get("email"));
  if (result.success === false) {
    return { error: "Invalid email address" };
  }

  const user = await prisma.user.findUnique({
    where: { email: result.data },
    select: {
      email: true,
      orders: {
        select: {
          pricePaidInCents: true,
          id: true,
          createdAt: true,
          product: {
            select: {
              id: true,
              name: true,
              imagePath: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (user == null) {
    return {
      message:
        "Check your email to view your order history and download your products",
    };
  }

  const orders = await Promise.all(
    user.orders.map(async (order) => {
      const downloadVerification = await prisma.downloadVerification.create({
        data: {
          expiresAt: new Date(Date.now() + 24 * 1000 * 60 * 60),
          productId: order.product.id,
        },
      });

      const fullImageUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}${order.product.imagePath}`;
      const downloadUrl = `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"}/products/download/${downloadVerification.id}`;

      return {
        id: order.id,
        pricePaidInCents: order.pricePaidInCents,
        createdAt: order.createdAt,
        downloadVerificationId: downloadVerification.id,
        product: {
          name: order.product.name,
          imagePath: fullImageUrl,
          description: order.product.description,
        },
        downloadUrl: downloadUrl,
      };
    })
  );

  const data = await resend.emails.send({
    from: `Support <onboarding@resend.dev>`,
    to: user.email,
    subject: "Order History",
    html: await render(OrderHistoryEmail({ orders })),
  });

  if (data.error) {
    return {
      error: "There was an error sending your email. Please try again,",
    };
  }

  return {
    message:
      "Check your email to view your order history and download your products",
  };
}
