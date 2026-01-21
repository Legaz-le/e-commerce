"use client";

import { useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const navLinks = [
  { href: "/", label: "Plant pots" },
  { href: "/", label: "Ceramics" },
  { href: "/", label: "Tables" },
  { href: "/", label: "Chairs" },
  { href: "/", label: "Crockery" },
  { href: "/", label: "Tableware" },
  { href: "/", label: "Cutlery" },
];

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)}>
        <Menu size={24} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 left-0 h-full w-64 bg-white z-50 p-5">
            <button onClick={() => setIsOpen(false)} className="mb-8">
              <X size={24} />
            </button>
            <div className="flex items-center space-x-4 mb-8">
              <Link href="/basket" onClick={() => setIsOpen(false)}>
                Cart
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
                <SignInButton />
              </SignedOut>
            </div>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg hover:text-gray-600"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
