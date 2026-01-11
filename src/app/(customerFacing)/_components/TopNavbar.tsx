import Image from "next/image";
import { NavLink } from "./Navbar";
import Link from "next/link";

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
          <Link href="/sign-in">
            <Image
              src="/images/User--avatar.png"
              alt="User"
              width={20}
              height={20}
              className="cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
