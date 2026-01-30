"use client";

import { NavLink } from "./Navbar";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { MobileMenu } from "./MobileMenu";
import { Search, ShoppingCart, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { cartCountAuth } from "@/actions/cartQuantity";

export function TopNavbar() {
  const guestItems = useCartStore((state) => state.items);
  const { isSignedIn } = useAuth();
  const authCount = useCartStore((state) => state.authCount);
  const cartCount = isSignedIn ? authCount : guestItems.length;

  useEffect(() => {
    if (!isSignedIn) return;
    cartCountAuth().then((count) =>
      useCartStore.getState().setAuthCount(count),
    );
  }, [isSignedIn]);

  return (
    <div className=" px-15">
      <div className="flex items-center justify-between mt-5">
        <Link href="/search" aria-label="Search">
          <Search
            size={20}
            className="cursor-pointer text-brand hover:text-brand-primary transition-colors"
          />
        </Link>
        <NavLink href="/">
          <h1 className="text-2xl font-medium">Avion</h1>
        </NavLink>
        <div className="sm:flex space-x-5 hidden ">
          <Link href="/basket" className="relative" aria-label="Shopping Cart">
            <ShoppingCart
              size={20}
              className="cursor-pointer text-brand hover:text-brand-primary transition-colors"
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <SignedOut>
            <SignInButton>
              <User
                size={20}
                className="cursor-pointer text-brand hover:text-brand-primary transition-colors"
              />
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonPopoverActionButton: "text-sm",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link
                  label="My Orders"
                  labelIcon={<ShoppingBag size={16} />}
                  href="/orders"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
        <MobileMenu />
      </div>
    </div>
  );
}
