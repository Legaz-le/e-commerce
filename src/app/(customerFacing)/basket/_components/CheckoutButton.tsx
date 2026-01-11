"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function CheckoutButton() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (isSignedIn) {
      router.push("/checkout");
    } else {
      router.push("/sign-in?redirect_url=/basket");
    }
  };

  return (
    <Button size="lg" onClick={handleClick}>
      Go to checkout
    </Button>
  );
}
