"use client";

import { ReactNode, ComponentProps } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-white flex justify-center px-4 md:mb-10">
      <div className="space-x-10 hidden md:block">{children}</div>
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const href = props.href.toString();
  const [linkPath, linkQuery] = href.split("?");


  const isActive = (() => {
    if (linkQuery) {
      const linkParams = new URLSearchParams(linkQuery);
      const linkCategory = linkParams.get("category");
      const currentCategory = searchParams.get("category");
      return pathname === linkPath && linkCategory === currentCategory;
    }
    return pathname === linkPath && !searchParams.get("category");
  })();

  return (
    <Link
      {...props}
      className={cn(
        "text-brand-muted font-body hover:text-brand body-sm md:body-md transition-colors",
        "focus-visible:text-brand",
        isActive && "text-brand font-semibold border-b-2 border-brand pb-1",
      )}
    />
  );
}
