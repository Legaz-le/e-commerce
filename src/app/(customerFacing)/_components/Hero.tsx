import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-[#2A254B] flex">
      <div className="flex-1 mt-15 relative">
        <div className="px-15 flex flex-col">
          <div className="space-y-10 w-[513px] ">
            <h1 className="text-white text-3xl font-mono">
              The furniture brand for the future, with timeless design
            </h1>
            <Button className="text-white bg-gray-700 px-5 py-5 cursor-pointer">
              <Link href="/products"> View Collections</Link>
            </Button>
          </div>
          <p className="text-white absolute bottom-15 text-lg w-[602px]">
            A new era in eco friendly furniture with Avelon, the French luxury
            retail brand with nice fonts, tasteful colors and a beautiful way to
            display things digitally using modern web technologies.
          </p>
        </div>
      </div>
      <Image
        src="/images/Right-Image.jpg"
        alt="Right Image"
        width={500}
        height={500}
      />
    </section>
  );
}
