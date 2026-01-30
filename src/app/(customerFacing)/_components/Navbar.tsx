"use client";

import { ReactNode, ComponentProps } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Nav({ children }: { children: ReactNode }) {
  return (
    <nav className="bg-white flex justify-center  px-4 md:mb-10">
      <div className="space-x-10 hidden md:block">{children}</div>
    </nav>
  );
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, "className">) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        "text-[#505050] font-serif hover:text-secondary-foreground text-sm md:text-lg text-muted-foreground`",
        "focus-visible:text-secondary-foreground",
        pathname === props.href && "text-brand font-semibold border-brand pb-1",
      )}
    />
  );
}
