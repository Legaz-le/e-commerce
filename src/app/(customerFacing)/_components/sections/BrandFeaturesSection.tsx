import { Section } from "../shared";
import { Content } from "../Content";
import { data } from "@/app/info-data/Image-text";

export function BrandFeaturesSection() {
  return (
    <Section background="white">
      <div className="flex flex-col items-center space-y-10 w-full">
        <h1 className="text-2xl font-mono">What makes our brand different</h1>
        <div className="flex justify-between w-full flex-col space-y-10 md:flex-row">
          {data.map((item, index) => (
            <Content key={index} {...item} />
          ))}
        </div>
      </div>
    </Section>
  );
}
