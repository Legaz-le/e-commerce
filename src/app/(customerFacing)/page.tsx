import type { Metadata } from "next";
import { LastContent } from "./_components/Content";
import {
  HeroSection,
  BrandFeaturesSection,
  FeaturedImagesSection,
  PopularProductsSection,
  ContactSection,
} from "./_components/sections";

export const metadata: Metadata = {
  title: "Home — Avion",
  description:
    "Discover premium furniture and home decor. Shop our curated collection of modern designs.",
};

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
