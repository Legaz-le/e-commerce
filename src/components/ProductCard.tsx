import { formatCurrency } from "@/lib/formater";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "./AddToCartButton";

type ProductCardProps = {
  id: string;
  name: string;
  priceInCents: number;
  description: string;
  imagePath: string;
  stock: number;
};

export function ProductCard({
  id,
  name,
  priceInCents,
  description,
  imagePath,
  stock,
}: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg hover:-translate-y-1 flex justify-between transition-all duration-300">
      <Link href={`/products/${id}`}>
        <CardHeader className="flex overflow-hidden flex-col">
          <div className="relative w-full h-auto aspect-square sm:aspect-video overflow-hidden rounded-t-lg">
            <Image
              src={imagePath}
              fill
              alt={name}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {stock <= 0 && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded text-sm z-10">
                Out of Stock
              </div>
            )}
          </div>
          <CardTitle className="text-sm sm:text-lg line-clamp-2">{name}</CardTitle>
          <CardDescription className="text-sm text-gray-600 line-clamp-2">
            {formatCurrency(priceInCents / 100)}
          </CardDescription>
        </CardHeader>
        <CardContent className="grow">
          <p>{description}</p>
        </CardContent>
      </Link>
      <CardFooter>
        <AddToCartButton productId={id} quantity={1} stock={stock} />
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  );
}
