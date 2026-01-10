import { useState } from "react";

type CartItem = {
  productId: string;
  quantity: number;
};

export function useGuestCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const savedCart = localStorage.getItem("guestCart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addItem = (item: string) => {
    setCartItems((prevItem) => {
      const existingItem = prevItem.findIndex(
        (cartItem) => cartItem.productId === item,
      );

      let newCart = [...prevItem];

      if (existingItem >= 0) {
        newCart = [...prevItem];
        newCart[existingItem] = {
          ...newCart[existingItem],
          quantity: newCart[existingItem].quantity + 1,
        };
      } else {
        newCart.push({ productId: item, quantity: 1 });
      }
      localStorage.setItem("guestCart", JSON.stringify(newCart));
      return newCart;
    });
  };
  const getGuestCart = (): CartItem[] => {
    const savedCart = localStorage.getItem("guestCart");
    return savedCart ? JSON.parse(savedCart) : [];
  };
  const clearCart = () => {
    localStorage.removeItem("guestCart");
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return {
    guestCart: cartItems,
    addItem,
    getGuestCart,
    clearCart,
    cartCount,
  };
}
