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
  formData: FormData,
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
          totalPaidInCents: true,
          id: true,
          createdAt: true,
          items: {
            select: {
              id: true,
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
      const items = await Promise.all(
        order.items.map(async (item) => {
          const downloadVerification =
            await prisma.downloadVerification.create({
              data: {
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                productId: item.product.id,
              },
            });
  
          const baseUrl =
            process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";
  
          return {
            product: {
              name: item.product.name,
              imagePath: `${baseUrl}${item.product.imagePath}`,
              description: item.product.description,
            },
            downloadVerificationId: `${baseUrl}/products/download/${downloadVerification.id}`,
          };
        })
      );
  
      return {
        id: order.id,
        totalPaidInCents: order.totalPaidInCents,
        createdAt: order.createdAt,
        items,
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
