import { formatCurrency } from "@/lib/formater";
import {
  Button,
  Column,
  Img,
  Row,
  Section,
  Text,
} from "@react-email/components";

type OrderInformationProps = {
  product: { imagePath: string; name: string; description: string };
  quantity: number;
  priceInCents: number;
  downloadVerificationId: string;
};

export function OrderInformation({
  product,
  quantity,
  priceInCents,
  downloadVerificationId,
}: OrderInformationProps) {
  return (
    <>
      <Section className="border border-solid border-gray-500 rounded-lg p-4 md:p-6 my-4">
        <Img width="100" alt={product.name} src={product.imagePath} />
        <Row className="mt-8">
          <Column className="align-bottom">
            <Text className="text-lg font-bold m-0 mr-4">{product.name}</Text>
            <Text className="text-sm text-gray-500 m-0">Qty: {quantity} *{formatCurrency(priceInCents / 100)}</Text>
          </Column>
          <Column className="right">
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/products/download/${downloadVerificationId}`}
              className="bg-black text-white px-6 py-4 rounded text-lg"
            >
              Download
            </Button>
          </Column>
        </Row>
        <Row>
          <Column>
            <Text className="text-gray-500 mb-0">{product.description}</Text>
          </Column>
        </Row>
      </Section>
    </>
  );
}
