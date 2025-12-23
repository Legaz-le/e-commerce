import Image from "next/image";
import { dataType, imageType } from "../../info-data/Image-text";
export function Content({ image, title, description }: dataType) {
  return (
    <div className="flex flex-col w-[355px] space-y-2">
      <Image src={image} alt={image} width={20} height={20} loading="lazy" />
      <h2 className="text-xl font-mono">{title}</h2>
      <p className="text-[16px]">{description}</p>
    </div>
  );
}

export function ContentImages({image,title,price}:imageType) {
  return (
    <div className="space-y-5">
      <Image src={image} alt={image} width={355} height={462} loading="lazy" />
      <div className="space-y-3">
        <h3 className="text-xl font-mono">{title}</h3>
        <span className="text-lg font-semibold">{price}</span>
      </div>
    </div>
  )
}