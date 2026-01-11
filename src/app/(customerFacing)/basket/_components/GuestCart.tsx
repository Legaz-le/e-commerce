"use client";
import { useState, useEffect } from "react";
import { useGuestCart } from "@/hooks/useGuestCart";
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
  const { guestCart } = useGuestCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!guestCart) {
        return;
      }
      const productIds = guestCart.map((item) => item.productId);
      const fetchedProducts = await getProductsById(productIds);
      setProducts(fetchedProducts);
      setIsLoading(false);
    }
    fetchProducts();
  }, [guestCart]);

  const subtotal = products.reduce((sum, product) => {
    const carItem = guestCart.find((cart) => cart.productId === product.id);
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
                const carItem = guestCart.find(
                  (cart) => cart.productId === item.id,
                );
                const quantity = carItem?.quantity || 0;

                return (
                  <ProductCardBasket
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
