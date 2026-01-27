import prisma from "@/lib/prisma";
import {
  getReviewForProduct,
  getAverageRating,
  canUserReview,
} from "@/actions/reviews";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  BrandFeaturesSection,
  ContactSection,
  FeaturedImagesSection,
  ReviewsSection,
} from "../../_components/sections";
import { formatCurrency } from "@/lib/formater";
import { ProductAction } from "../_components/ProductActions";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return { title: "Product Not Found — Avion" };
  }

  return {
    title: `${product.name} — Avion`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 160),
      images: [product.imagePath],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description.slice(0, 160),
      images: [product.imagePath],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return notFound();
  const { reviews } = await getReviewForProduct(id);
  const { average } = await getAverageRating(id);
  const canReview = await canUserReview(id);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imagePath,
    offers: {
      "@type": "Offer",
      price: product.priceInCents / 100,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      ></script>
      <div className="bg-white">
        <div className="flex flex-col lg:flex-row min-h-[759px]">
          <div className="relative w-full lg:w-1/2 h-[400px] lg:h-[759px]">
            <Image
              src={product.imagePath}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              quality={90}
              priority
              className="object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2 bg-white px-6 lg:px-10 py-10 lg:py-[51px]">
            <div className="flex flex-col gap-[13px] mb-8">
              <h1 className="font-['Clash_Display'] font-normal text-[36px] leading-11 text-[#2A254B]">
                {product.name}
              </h1>
              <span className="font-['Satoshi'] font-normal text-[24px] leading-8 text-[#12131A]">
                {formatCurrency(product.priceInCents / 100)}
              </span>
            </div>

            <div className="flex flex-col gap-4 p-10 mb-6">
              <h2 className="font-['Clash_Display'] font-normal text-[16px] leading-5 text-[#2A254B]">
                Description
              </h2>
              <div className="flex flex-col gap-5 max-w-[498px]">
                <p className="font-['Satoshi'] font-normal text-[16px] leading-[22px] text-[#505977]">
                  {product.description}
                </p>
                <ul className="font-['Satoshi'] font-normal text-[16px] leading-[22px] text-[#505977] list-disc list-inside">
                  <li>Premium material</li>
                  <li>Handmade upholstery</li>
                  <li>Quality timeless classic</li>
                </ul>
              </div>
            </div>

            <div className="mb-6 px-10">
              <h2 className="font-['Clash_Display'] font-normal text-[16px] leading-5 text-[#2A254B] mb-7">
                Dimensions
              </h2>
              <div className="flex flex-row gap-[57px]">
                <div className="flex flex-col gap-3">
                  <span className="font-['Clash_Display'] font-normal text-[14px] leading-[17px] text-[#2A254B]">
                    Height
                  </span>
                  <span className="font-['Satoshi'] font-normal text-[16px] leading-[22px] text-[#505977]">
                    110cm
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-['Clash_Display'] font-normal text-[14px] leading-[17px] text-[#2A254B]">
                    Width
                  </span>
                  <span className="font-['Satoshi'] font-normal text-[16px] leading-[22px] text-[#505977]">
                    75cm
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="font-['Clash_Display'] font-normal text-[14px] leading-[17px] text-[#2A254B]">
                    Depth
                  </span>
                  <span className="font-['Satoshi'] font-normal text-[16px] leading-[22px] text-[#505977]">
                    50cm
                  </span>
                </div>
              </div>
            </div>
            <ProductAction productId={product.id} />
          </div>
        </div>
      </div>
      <FeaturedImagesSection />
      <BrandFeaturesSection />
      <ContactSection />
      <ReviewsSection
        productId={id}
        reviews={reviews}
        averageRating={average}
        canReview={canReview}
      />
    </>
  );
}
