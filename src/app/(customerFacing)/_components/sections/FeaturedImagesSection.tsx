import { Section, ViewAllButton } from "../shared";
import { ContentImages } from "../Content";
import { getFeaturedProducts } from "@/lib/cache";

export async function FeaturedImagesSection() {
  const Images = await getFeaturedProducts();
  return (
    <Section background="white">
      <div className="flex flex-col space-y-10">
        <div className="grid grid-cols-2 md:flex md:justify-between gap-5">
          {Images.map((item, index) => (
            <ContentImages
              key={index}
              id={item.id}
              image={item.imagePath}
              price={item.priceInCents}
              title={item.name}
            />
          ))}
        </div>
        <ViewAllButton href="/products" />
      </div>
    </Section>
  );
}
