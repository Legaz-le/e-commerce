import Image from "next/image";
import {
  dataType,
  imageType,
  PopularProductsType,
} from "../../info-data/Image-text";
export function Content({ image, title, description }: dataType) {
  return (
    <section className="flex flex-col w-[355px] space-y-2">
      <Image src={image} alt={image} width={20} height={20} loading="lazy" />
      <h2 className="text-xl font-mono">{title}</h2>
      <p className="text-[16px]">{description}</p>
    </section>
  );
}

export function ContentImages({ image, title, price }: imageType) {
  return (
    <section className="space-y-5">
      <Image src={image} alt={image} width={355} height={462} loading="lazy" />
      <div className="space-y-3">
        <h3 className="text-xl font-mono">{title}</h3>
        <span className="text-lg font-semibold">{price}</span>
      </div>
    </section>
  );
}

export function ContentPopular({
  image,
  title,
  price,
  width,
  height,
}: PopularProductsType) {
  return (
    <section className="space-y-5">
      <Image
        src={image}
        alt={image}
        width={width}
        height={height}
        loading="lazy"
      />
      <div className="space-y-3">
        <h3 className="text-xl font-mono">{title}</h3>
        <span className="text-lg font-semibold">{price}</span>
      </div>
    </section>
  );
}

export function LastContent() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-0">
     
      <div className="py-16 pl-[max(2rem,calc((84vw-1280px)/2+2rem))] pr-45 flex flex-col justify-center space-y-10">
        <h2 className="text-3xl font-bold">
          From a studio in London to a global brand with over 400 outlets
        </h2>
        <div className="space-y-5">
        <p className="text-gray-600">
          When we started Avion, the idea was simple. Make high quality
          furniture affordable and available for the mass market.
        </p>
        <p className="text-gray-600">
          Handmade, and lovingly crafted furniture and homeware is what we live,
          breathe and design so our Chelsea boutique become the hotbed for the
          London interior design community.
        </p>
        </div>
        <button  className="w-fit bg-[#F9F9F9] py-4 px-8 cursor-pointer">
          Get in touch
        </button>
      </div>

      <div className="relative h-[400px] lg:h-auto lg:min-h-[600px]">
        <Image
          src="/images/furniture-image.jpg"
          alt="furniture"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}