import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartItem = {
  productId: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  authCount: number;
  addItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (
    productId: string,
    action: "increment" | "decrement",
  ) => void;
  clearCart: () => void;
  setAuthCount: (count: number) => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      authCount: 0,

      addItem: (productId, quantity) =>
        set((state) => {
          const existingItem = state.items.findIndex(
            (cartItem) => cartItem.productId === productId,
          );

          let newCart = [...state.items];

          if (existingItem >= 0) {
            newCart = [...state.items];
            newCart[existingItem] = {
              ...newCart[existingItem],
              quantity: newCart[existingItem].quantity + quantity,
            };
          } else {
            newCart.push({ productId, quantity });
          }
          return { items: newCart };
        }),

      removeItem: (productId) =>
        set((state) => {
          const filtered = state.items.filter(
            (item) => item.productId !== productId,
          );

          return { items: filtered };
        }),

      updateQuantity: (productId, action) =>
        set((state) => {
          const filtered = state.items.findIndex(
            (item) => item.productId === productId,
          );

          if (filtered === -1) return state;

          const copyItem = [...state.items];

          const newQuantity =
            action === "increment"
              ? copyItem[filtered].quantity + 1
              : copyItem[filtered].quantity - 1;

          if (newQuantity >= 1) {
            copyItem[filtered] = {
              ...copyItem[filtered],
              quantity: newQuantity,
            };
          }
          return { items: copyItem };
        }),

      clearCart: () => set({ items: [] }),
      
      setAuthCount: (count) => set({ authCount: count })
    }),
    { name: "guest-cart" },
  ),
);
