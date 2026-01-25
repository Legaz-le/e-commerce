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
  const items =  useCartStore((state) => state.items);
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

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          {products.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {products.map((item) => {
                const carItem = items.find(
                  (cart) => cart.productId === item.id,
                );
                const quantity = carItem?.quantity || 0;

                return (
                  <ProductCardBasket
                    cartItemId={item.id}
                    key={item.id}
                    {...item}
                    quantity={quantity}
                  />
                );
              })}
              <div className="text-right space-y-5">
                <div>Subtotal: {formatCurrency(subtotal / 100)}</div>
                <CheckoutButton />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
