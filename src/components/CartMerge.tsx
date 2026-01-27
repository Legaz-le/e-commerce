"use client";
import { useRef, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { mergeGuestCart } from "@/actions/mergeCart";
import { useCartStore } from "@/store/cartStore";

export function CartMerge() {
  const { isSignedIn } = useAuth();
  const ref = useRef(false);
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (ref.current) return;

    async function check() {
      if (!isSignedIn) return;

      if (items.length === 0) return;

      ref.current = true;
      const result = await mergeGuestCart(items);

      if (result.success) {
        clearCart();
      }
    }
    check();
  }, [isSignedIn, items, clearCart]);
  return null;
}
