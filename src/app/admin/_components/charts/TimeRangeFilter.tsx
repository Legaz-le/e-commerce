"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

export function TimeRangeFilter() {
  const router = useRouter();
  const currentRange = useSearchParams().get("range") ?? "30d";
  const timeRange = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" },
  ];
  const handleRangeChange = (range: string) => {
    router.push(`/admin?range=${range}`);
  };
  return (
    <div className="flex gap-2">
      {timeRange.map((range) => (
        <Button
          key={range.value}
          variant={currentRange === range.value ? "default" : "outline"}
          size="sm"
          onClick={() => handleRangeChange(range.value)}
        >{range.label}</Button>
      ))}
    </div>
  );
}
