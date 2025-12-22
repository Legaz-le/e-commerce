"use client";

import { ReactNode, ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-white flex justify-center  px-4">
      <div className="flex space-x-10">{children}</div>
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "font-serif hover:text-secondary-foreground",
        "focus-visible:text-secondary-foreground",
        pathname === props.href && "bg-background text-foreground",
      )}
    />
  );
}
