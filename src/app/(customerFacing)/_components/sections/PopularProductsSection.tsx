import { Section, ViewAllButton } from "../shared";
import { ContentPopular } from "../Content";
import { PopularProducts } from "@/app/info-data/Image-text";

export function PopularProductsSection() {
  return (
    <Section background="white">
      <div className="flex flex-col space-y-8">
        <h1 className="self-start text-2xl font-mono">Our popular products</h1>
        <div className="grid grid-cols-1 md:flex md:justify-between gap-5">
          {PopularProducts.map((item, index) => (
            <ContentPopular key={index} {...item} />
          ))}
        </div>
        <ViewAllButton href="/products" />
      </div>
    </Section>
  );
}
