import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  background?: "white" | "gray" | "transparent";
  containerClassName?: string;
  withPadding?: boolean;
};

export function Section({
  children,
  className,
  background = "white",
  containerClassName,
  withPadding = true,
}: SectionProps) {
  const bgColors = {
    white: "bg-white",
    gray: "bg-brand-light",
    transparent: "bg-transparent",
  };

  return (
    <section className={cn(bgColors[background], "py-16", className)}>
      <div
        className={cn(
          "container mx-auto",
          withPadding && "px-8 sm:px-0",
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
