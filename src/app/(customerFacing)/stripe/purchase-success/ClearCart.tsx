"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";

export function ClearCart() {
  useEffect(() => {
    useCartStore.getState().setAuthCount(0);
    useCartStore.getState().clearCart();
  }, []);

  return null;
}
