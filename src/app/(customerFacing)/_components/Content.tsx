import Image from "next/image";
import { ImageText } from "../../info-data/Image-text";

export function Content({ image, title, description }: ImageText) {
  return (
    <div className="flex flex-col w-[265px] space-y-2">
      <Image src={image} alt={image} width={20} height={20} loading="lazy" />
      <h2 className="text-xl font-mono">{title}</h2>
      <p className="text-[16px]">{description}</p>
    </div>
  );
}
