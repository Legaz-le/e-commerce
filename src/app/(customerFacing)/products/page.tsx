import type { Metadata } from "next";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { getFilteredProducts } from "@/lib/cache";
import Image from "next/image";
import { Suspense } from "react";
import { Sidebar } from "./_components/Sidebar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Product — Avion",
  description:
    "Browse our full collection of premium furniture and home decor. Filter by category, price, and designer.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    price?: string;
    designer?: string;
  }>;
}) {
  const filters = await searchParams;
  return (
    <>
      <div className="w-full">
        <Image
          src="/images/Page_Headers.jpg"
          alt="Page Header"
          width={1430}
          height={209}
          className="w-full object-contain"
        />
      </div>
      <div className="container mx-auto my-10 flex w-full px-8 xl:px-0">
        <div className=" md:w-[385px]">
          <Sidebar />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full animate-stagger">
          <Suspense
            fallback={
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            }
          >
            <ProductsSuspense filters={filters} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

type Filters = {
  category?: string;
  price?: string;
  designer?: string;
};

async function ProductsSuspense({ filters }: { filters: Filters }) {
  const products = await getFilteredProducts(filters);
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
