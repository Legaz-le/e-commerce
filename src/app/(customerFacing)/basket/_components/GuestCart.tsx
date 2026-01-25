"use client";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { getProductsById } from "@/actions/getProductsByIds";
import { ProductCardBasket } from "./ProductCardBasket";
import { formatCurrency } from "@/lib/formater";
import { CheckoutButton } from "./CheckoutButton";

type Product = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
};

export function GuestCart() {
  const items = useCartStore((state) => state.items);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (items.length === 0) {
        setProducts([]);
        setIsLoading(false);
        return;
      }
      const productIds = items.map((item) => item.productId);
      const fetchedProducts = await getProductsById(productIds);
      setProducts(fetchedProducts);
      setIsLoading(false);
    }
    fetchProducts();
  }, [items]);

  const subtotal = products.reduce((sum, product) => {
    const carItem = items.find((cart) => cart.productId === product.id);
    const quantity = carItem?.quantity || 0;
    return sum + product.priceInCents * quantity;
  }, 0);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {products.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="flex flex-col w-full space-y-5">
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 w-full font-semibold">
            <h1>Product</h1>
            <h2 className="text-center">Quantity</h2>
            <h3 className="text-right">Total</h3>
          </div>
          <div className="hidden md:flex border-b border-solid" />
          <div className="space-y-4">
            {products.map((item) => {
              const cartItem = items.find((cart) => cart.productId === item.id);
              const quantity = cartItem?.quantity || 0;

              return (
                <ProductCardBasket
                  cartItemId={item.id}
                  key={item.id}
                  {...item}
                  quantity={quantity}
                />
              );
            })}
          </div>
          <div className="hidden md:flex border-b border-solid" />
          <div className="self-end text-end space-y-3 mt-4">
            <div className="flex justify-end space-x-3">
              <span className="text-lg">Subtotal</span>
              <span className="text-lg font-semibold">
                {formatCurrency(subtotal / 100)}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Taxes and shipping are calculated at checkout
            </p>
            <CheckoutButton />
          </div>
        </div>
      )}
    </>
  );
}
