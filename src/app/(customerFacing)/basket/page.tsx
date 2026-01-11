import { Cart } from "./_components/carts";
import { CartMerge } from "@/components/CartMerge";

export default function BasketPage() {
  return (
    <>
      <div className="bg-[#F9F9F9]">
        <div className="container mx-auto py-10 ">
          <div className="space-y-10">
            <h1 className="text-4xl font-mono">Your shopping cart</h1>
            <Cart />
            <CartMerge />
          </div>
        </div>
      </div>
    </>
  );
}
