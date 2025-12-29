import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { cache } from "@/lib/cache";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { Suspense } from "react";
import { Sidebar } from "./_components/Sidebar";
import { Footer } from "../_components/Footer";

const getProducts = cache(() => {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "asc" },
  });
}, ["/products", "getProducts"]);

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
      <div className="container mx-auto mt-10 flex w-full px-8 xl:px-0">
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
      <div className="bg-[#2A254B] pt-16 sm:px-8 xl:px-0">
        <div className="container mx-auto">
          <Footer />
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
