import type { Metadata } from "next";
import { Cart } from "./_components/carts";
import { CartMerge } from "@/components/CartMerge";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Cart — Avion",
  description: "Review items in your shopping cart and proceed to checkout.",
};

export default function BasketPage() {
  return (
    <>
      <div className="bg-brand-light">
        <div className="container mx-auto py-10 ">
          <div className="space-y-10">
            <h1 className="heading-1">Your shopping cart</h1>
            <Cart />
            <CartMerge />
          </div>
        </div>
      </div>
    </>
  );
}
