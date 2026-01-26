import { Section, ViewAllButton } from "../shared";
import { ContentPopular } from "../Content";
import { getPopularProducts } from "@/lib/cache";

export async function PopularProductsSection() {
  const PopularProducts = await getPopularProducts();
  return (
    <Section background="white">
      <div className="flex flex-col space-y-8">
        <h1 className="self-start text-2xl font-mono">Our popular products</h1>
        <div className="grid grid-cols-1 md:flex md:justify-between gap-5">
          {PopularProducts.map((item, index) => (
            <ContentPopular
              id={item.id}
              key={index}
              title={item.name}
              price={item.priceInCents}
              image={item.imagePath}
              isLarge={index === 0}
            />
          ))}
        </div>
        <ViewAllButton href="/products" />
      </div>
    </Section>
  );
}
