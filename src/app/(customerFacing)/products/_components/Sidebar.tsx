"use client";

import { Designer, Prices, TextsType } from "@/app/info-data/Image-text";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type FilterType = "category" | "price" | "designer";

export function Sidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleFilterChange(
    type: FilterType,
    value: string,
    checked: boolean,
  ) {
    const params = new URLSearchParams(searchParams.toString());

    if (checked) {
      params.set(type, value);
    } else {
      params.delete(type);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="hidden sm:flex flex-col space-y-10 animate-slide-in-left">
      <div>
        <h1 className="mb-5 heading-5 text-brand">Product type</h1>
        <div className="flex flex-col space-y-4">
          {TextsType.map((item, index) => (
            <CheckBoxLabel
              key={index}
              title={item.title}
              checked={searchParams.get("category") === item.title}
              onChange={(checked) =>
                handleFilterChange("category", item.title, checked)
              }
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="mb-5 heading-5 text-brand">Price</h1>
        <div className="flex flex-col space-y-4">
          {Prices.map((item, index) => (
            <CheckBoxLabel
              key={index}
              title={item.title}
              checked={searchParams.get("price") === item.title}
              onChange={(checked) =>
                handleFilterChange("price", item.title, checked)
              }
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="mb-5 heading-5 text-brand">Designer</h1>
        <div className="flex flex-col space-y-4">
          {Designer.map((item, index) => (
            <CheckBoxLabel
              key={index}
              title={item.title}
              checked={searchParams.get("designer") === item.title}
              onChange={(checked) =>
                handleFilterChange("designer", item.title, checked)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function CheckBoxLabel({
  title,
  checked,
  onChange,
}: {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <Checkbox checked={checked} onCheckedChange={onChange} />
      <Label>{title}</Label>
    </div>
  );
}
