import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ResponsiveGridProps = {
  children: ReactNode;
  className?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: number;
};

export function ResponsiveGrid({
  children,
  className,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
  gap = 5,
}: ResponsiveGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
  };

  const mdGridCols = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  };

  const lgGridCols = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
  };

  const gapClass = `gap-${gap}`;

  return (
    <div
      className={cn(
        "grid",
        gridCols[columns.mobile as keyof typeof gridCols] || "grid-cols-1",
        mdGridCols[columns.tablet as keyof typeof mdGridCols] || "md:grid-cols-2",
        lgGridCols[columns.desktop as keyof typeof lgGridCols] || "lg:grid-cols-4",
        gapClass,
        className
      )}
    >
      {children}
    </div>
  );
}
