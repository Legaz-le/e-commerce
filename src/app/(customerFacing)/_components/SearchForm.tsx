"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function SearchForm({ defaultValue }: { defaultValue?: string }) {
  const [item, setItem] = useState(defaultValue || "");
  const router = useRouter();
  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    router.push(`/search?q=${item}`);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
      className="border rounded px-4 py-2 w-full mb-5"
        onChange={(e) => setItem(e.target.value)}
        type="search"
        value={item}
        placeholder="Search products..."
      />
    </form>
  );
}
