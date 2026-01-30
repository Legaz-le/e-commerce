"use client";

import { useState } from "react";
import { Menu, ShoppingBag, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@clerk/nextjs";

const navLinks = [
  { href: "/products", label: "All Products" },
  { href: "/products?category=Furniture", label: "Furniture" },
  { href: "/products?category=Homeware", label: "Homeware" },
  { href: "/products?category=Sofas", label: "Sofas" },
  { href: "/products?category=Light+fittings", label: "Light Fittings" },
  { href: "/products?category=Accessories", label: "Accessories" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const guestItems = useCartStore((state) => state.items);
  const { isSignedIn } = useAuth();
  const authCount = useCartStore((state) => state.authCount);
  const cartCount = isSignedIn ? authCount : guestItems.length;

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        className="text-brand hover:text-brand-primary transition-colors"
      >
        <Menu size={24} />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
            onClick={() => setIsOpen(false)}
          />
          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-72 bg-white z-50 p-6 shadow-xl animate-slide-in-left">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-display text-brand">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
                className="text-brand hover:text-brand-primary transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart & User */}
            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-brand-border">
              <Link
                href="/basket"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-brand hover:text-brand-primary transition-colors"
              >
                <ShoppingCart size={20} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-brand text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
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
              <SignedOut>
                <SignInButton>
                  <button className="text-brand hover:text-brand-primary transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-brand-muted hover:text-brand hover:bg-brand-light px-3 py-2 rounded-md transition-all body-md"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Home Link */}
            <div className="mt-8 pt-6 border-t border-brand-border">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="text-brand hover:text-brand-primary transition-colors font-semibold"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
