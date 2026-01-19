import prisma from "@/lib/prisma";
import { ProductCard } from "@/components/ProductCard";
export default async function Search({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const products = await prisma.product.findMany({
    where: {
      isAvailableForPurchase: true,
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ],
    },
  });

  return (
    <div className="container mx-auto py-8 px-8 sm:px-0">
      <h1 className="text-2xl font-semibold mb-2">
        {q ? `Results for: "${q}"` : "Search"}
      </h1>
      <p className="text-gray-600 mb-8">
        {products.length} {products.length === 1 ? "product" : "products"} found
      </p>

      {products.length === 0 ? (
        <p className="text-gray-500">
          No products found. Try a different search term.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}
