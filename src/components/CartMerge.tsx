"use client";
import { useRef, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { mergeGuestCart } from "@/actions/mergeCart";

export function CartMerge() {
  const { isSignedIn } = useAuth();
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) return;

    async function check() {
      if (!isSignedIn) return;

      const stored = localStorage.getItem("guestCart");

      if (!stored) return;

      const item = JSON.parse(stored);

      if (item.length === 0) return;

      const result = await mergeGuestCart(item);

      if (result.success) {
        localStorage.removeItem("guestCart");
      }
      ref.current = true;
    }
    check();
  }, [isSignedIn]);
  return null
}
