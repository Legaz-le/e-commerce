import { formatCurrency } from "@/lib/formater";
import Image from "next/image";

export type ProductCardBasketProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
  quantity: number;
};

export function ProductCardBasket({
  name,
  priceInCents,
  description,
  imagePath,
  quantity,
}: ProductCardBasketProps) {
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 items-center w-full">
      <div className="flex space-x-5 ">
        <Image
          src={imagePath}
          width={109}
          height={139}
          alt={name}
          className="object-cover"
        />
        <div className="flex flex-col  justify-between">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <span className="text-sm">{formatCurrency(priceInCents / 100)}</span>
        </div>
      </div>
      <div className="text-center">
        <span>{quantity}</span>
      </div>

      <div className="text-right">
        <span className="font-semibold">
          {formatCurrency((priceInCents * quantity) / 100)}
        </span>
      </div>
    </div>
  );
}
