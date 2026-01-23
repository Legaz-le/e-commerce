import { Section, ViewAllButton } from "../shared";
import { ContentImages } from "../Content";
import { Images } from "@/app/info-data/Image-text";

export function FeaturedImagesSection() {
  return (
    <Section background="white">
      <div className="flex flex-col space-y-10">
        <div className="grid grid-cols-2 md:flex md:justify-between gap-5">
          {Images.map((item, index) => (
            <ContentImages key={index} {...item} />
          ))}
        </div>
        <ViewAllButton href="/products" />
      </div>
    </Section>
  );
}
