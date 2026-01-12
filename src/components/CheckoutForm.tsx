"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency } from "@/lib/formater";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { FormEvent, useState } from "react";

type CartItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    imagePath: string;
    name: string;
    priceInCents: number;
    description: string;
  };
};

type CheckoutFormProps = {
  cartItems: CartItem[];
  totalInCents: number;
  clientSecret: string;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string,
);

export function CheckoutForm({
  cartItems,
  totalInCents,
  clientSecret,
}: CheckoutFormProps) {
  return (
    <div className="max-w-5xl w-full mx-auto space-y-8">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4 items-center">
            <div className="aspect-video shrink-0 w-24 relative">
              <Image
                src={item.product.imagePath}
                fill
                alt={item.product.name}
                className="object-cover rounded"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.product.name}</h3>
              <p className="text-sm text-muted-foreground">
                Qty: {item.quantity}
              </p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                {formatCurrency(
                  (item.product.priceInCents * item.quantity) / 100,
                )}
              </p>
              {item.quantity > 1 && (
                <p className="text-sm text-muted-foreground">
                  {formatCurrency(item.product.priceInCents / 100)} each
                </p>
              )}
            </div>
          </div>
        ))}
        <div className="border-t pt-4 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>{formatCurrency(totalInCents / 100)}</span>
        </div>
      </div>
      <Elements options={{ clientSecret }} stripe={stripePromise}>
        <Form totalInCents={totalInCents} />
      </Elements>
    </div>
  );
}

function Form({ totalInCents }: { totalInCents: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Payment Details</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading
              ? "Purchasing..."
              : `Pay - ${formatCurrency(totalInCents / 100)}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
