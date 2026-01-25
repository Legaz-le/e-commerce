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

  function removeItem(productId: string) {
    const filtered = cartItems.filter((item) => item.productId !== productId);
    localStorage.setItem("guestCart", JSON.stringify(filtered));
    setCartItems(filtered);
  }

  function updateQuantity(
    productId: string,
    action: "increment" | "decrement",
  ) {
    const filtered = cartItems.findIndex(
      (item) => item.productId === productId,
    );

    if (filtered === -1) return;

    const copyItem = [...cartItems];

    if (action === "increment") {
      copyItem[filtered].quantity += 1;
    }

    if (action === "decrement") {
      if (copyItem[filtered].quantity > 1 ) {
        copyItem[filtered].quantity -= 1;
      }
    }
    localStorage.setItem("guestCart", JSON.stringify(copyItem))
    setCartItems(copyItem)
  }

  const addItem = (productId: string, quantity: number) => {
    setCartItems((prevItem) => {
      const existingItem = prevItem.findIndex(
        (cartItem) => cartItem.productId === productId,
      );

      let newCart = [...prevItem];

      if (existingItem >= 0) {
        newCart = [...prevItem];
        newCart[existingItem] = {
          ...newCart[existingItem],
          quantity: newCart[existingItem].quantity + quantity,
        };
      } else {
        newCart.push({ productId, quantity });
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
    removeItem,
    updateQuantity,
  };
}
