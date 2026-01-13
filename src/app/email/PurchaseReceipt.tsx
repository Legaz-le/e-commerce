import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { OrderInformation } from "./components/OrderInformation";
import { formatCurrency } from "@/lib/formater";

type PurchaseReceiptEmailProps = {
  order: { id: string; createdAt: Date; totalPaidInCents: number };
  items: Array<{
    product: {
      name: string;
      imagePath: string;
      description: string;
    };
    quantity: number;
    priceInCents: number;
    downloadVerificationId: string;
  }>;
};

PurchaseReceiptEmail.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    createdAt: new Date(),
    totalPaidInCents: 10000,
  },
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
    {
      product: {
        name: "Second Product",
        description: "Another description",
        imagePath: "/products/sample-image-2.avif",
      },
      quantity: 2,
      priceInCents: 2500,
      downloadVerificationId: crypto.randomUUID(),
    },
  ],
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({
  items,
  order,
}: PurchaseReceiptEmailProps) {
  const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

  return (
    <Html>
      <Preview>{`Your order with ${items.length} item(s)`}</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className="mb-0 text-gray-500">Order ID</Text>
                  <Text className="mt-0">{order.id}</Text>
                </Column>
                <Column>
                  <Text className="mb-0 text-gray-500">Purchased On</Text>
                  <Text className="mt-0">
                    {dateFormatter.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className="mb-0 text-gray-500">Total Paid</Text>
                  <Text className="mt-0">
                    {formatCurrency(order.totalPaidInCents / 100)}
                  </Text>
                </Column>
              </Row>
            </Section>
            {items.map((item) => (
              <OrderInformation
                key={item.downloadVerificationId}
                product={item.product}
                quantity={item.quantity}
                priceInCents={item.priceInCents}
                downloadVerificationId={item.downloadVerificationId}
              />
            ))}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
