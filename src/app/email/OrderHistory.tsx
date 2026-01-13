import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Tailwind,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import React from "react";

type OrderHistoryEmailProps = {
  orders: {
    id: string;
    totalPaidInCents: number;
    createdAt: Date;
    items: {
      product: {
        name: string;
        imagePath: string;
        description: string;
      };
      quantity: number;
      priceInCents: number;
      downloadVerificationId: string;
    }[];
  }[];
};

OrderHistoryEmail.PreviewProps = {
  orders: [
    {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      totalPaidInCents: 10000,
      items: [
        {
          product: {
            name: "Product name",
            description: "Some description",
            imagePath:
              "/products/a74da488-ec95-4189-be4d-20d28dc97eb7- c9db3cea62133b6a6bb70597326b4a34-388-dubai-img-worlds-of-adventure-tickets-01.avif",
          },
          quantity: 1,
          priceInCents: 5000,
          downloadVerificationId: crypto.randomUUID(),
        },
      ],
    },
  ],
} satisfies OrderHistoryEmailProps;

export default function OrderHistoryEmail({ orders }: OrderHistoryEmailProps) {
  return (
    <Html>
      <Preview>Order History & Downloads</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Order History</Heading>
            {orders.map((order, index) => (
              <React.Fragment key={order.id}>
                {order.items.map((item) => (
                  <OrderInformation
                    key={item.downloadVerificationId}
                    product={item.product}
                    quantity={item.quantity}
                    priceInCents={item.priceInCents}
                    downloadVerificationId={item.downloadVerificationId}
                  />
                ))}
                {index < orders.length - 1 && <Hr />}
              </React.Fragment>
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
