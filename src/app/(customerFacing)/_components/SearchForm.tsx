"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchForm({ defaultValue }: { defaultValue?: string }) {
  const [item, setItem] = useState(defaultValue || "");
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${item}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <Search
        size={18}
        className="absolute left-3 top-1/3 -translate-y-1/2 text-brand-muted"
      />
      <Input
        onChange={(e) => setItem(e.target.value)}
        type="search"
        value={item}
        placeholder="Search products..."
        className="pl-10 mb-5 border-brand-border focus-visible:border-brand focus-visible:ring-brand/20"
      />
    </form>
  );
}
