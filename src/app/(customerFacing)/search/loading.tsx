import { ProductCardSkeleton } from "@/components/ProductCard";

export default function SearchLoading() {
  return (
    <div className="container mx-auto py-8 px-8 sm:px-0 animate-fade-in">
      <div className="relative mb-5">
        <div className="h-10 w-full bg-gray-200 rounded-md animate-pulse" />
      </div>
      <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-2" />
      <div className="h-5 w-32 bg-gray-200 rounded-md animate-pulse mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
}
