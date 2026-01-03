import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { getProducts } from "@/lib/cache";
import Image from "next/image";
import { Suspense } from "react";
import { Sidebar } from "./_components/Sidebar";


export default function ProductsPage() {
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
        <div className="grid grid-cols-2  lg:grid-cols-3 gap-4 w-full">
          <Suspense
            fallback={
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            }
          >
            <ProductsSuspense />
          </Suspense>
        </div>
      </div>
    </>
  );
}

async function ProductsSuspense() {
  const products = await getProducts();
  return products.map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
