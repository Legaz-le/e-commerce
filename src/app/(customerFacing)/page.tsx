import prisma from "@/lib/prisma";
import { Product } from "../../../generated/prisma/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { Suspense } from "react";
import { cache } from "@/lib/cache";
import { Hero } from "@/app/(customerFacing)/_components/Hero";
import { data } from "../info-data/Image-text";
import { Content } from "./_components/Content";

export const revalidate = 3600;

const getMostPopularProducts = cache(
  () => {
    return prisma.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getMostPopularProducts"],
  { revalidate: 60 * 60 * 24 },
);

// const getNewestProducts = cache(() => {
//   return prisma.product.findMany({
//     where: { isAvailableForPurchase: true },
//     orderBy: { createdAt: "desc" },
//     take: 6,
//   });
// }, ["/", "getNewestProducts"])

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection
        title="Most Popular"
        productsFetcher={getMostPopularProducts}
      />
    </main>
  );
}

type ProductGridSectionProps = {
  title: string;
  productsFetcher: () => Promise<Product[]>;
};

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <>
      <div className="space-y-15">
        <Hero />
        <div className="flex flex-col items-center space-y-10 w-full">
          <h1 className="text-2xl font-mono">What makes our brand different</h1>
          <div className="flex justify-between w-full">
            {data.map((item, index) => (
              <Content
                key={index}
                image={item.image}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Button variant="outline" asChild>
            <Link href="/products" className="space-x-2">
              <span>View All</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense
            fallback={
              <>
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </>
            }
          >
            <ProductSuspense productsFetcher={productsFetcher} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
