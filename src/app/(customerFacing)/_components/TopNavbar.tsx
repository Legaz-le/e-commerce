import Image from "next/image";
import { NavLink } from "./Navbar";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function TopNavbar() {
  return (
    <div className=" px-15">
      <div className="flex items-center justify-between mt-5">
        <Image
          src="/images/Search.png"
          alt="Search"
          width="20"
          height="20"
          className="cursor-pointer"
        />
        <NavLink href="/">
          <h1 className="text-2xl font-medium">Avion</h1>
        </NavLink>
        <div className="sm:flex space-x-5 hidden ">
          <Link href="/basket">
            <Image
              src="/images/Shopping--cart.png"
              alt="Shopping Cart"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </Link>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
