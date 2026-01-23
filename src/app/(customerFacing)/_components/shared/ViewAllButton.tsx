import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewAllButtonProps = {
  href: string;
  label?: string;
  className?: string;
};

export function ViewAllButton({
  href,
  label = "View All",
  className,
}: ViewAllButtonProps) {
  return (
    <Button
      variant="outline"
      asChild
      className={cn(
        "bg-black text-white hover:bg-black/90 hover:text-white md:self-center md:w-[200px] py-5",
        className
      )}
    >
      <Link href={href} className="space-x-2">
        <span>{label}</span>
        <ArrowRight className="size-4" />
      </Link>
    </Button>
  );
}
