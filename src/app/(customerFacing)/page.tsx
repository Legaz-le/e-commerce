import { LastContent } from "./_components/Content";
import {
  HeroSection,
  BrandFeaturesSection,
  FeaturedImagesSection,
  PopularProductsSection,
  ContactSection,
} from "./_components/sections";

export const revalidate = 3600;

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <BrandFeaturesSection />
      <FeaturedImagesSection />
      <PopularProductsSection />
      <ContactSection />
      <LastContent />
    </main>
  );
}
