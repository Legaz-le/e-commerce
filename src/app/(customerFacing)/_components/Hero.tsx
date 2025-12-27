import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-[#2A254B] flex flex-col md:flex-row ">
      <div className=" mt-15 w-full">
        <div className="px-8 lg:px-15 flex flex-col" >
          <div className="space-y-10 lg:w-[513px]">
            <h1 className="text-white text-3xl font-mono">
              The furniture brand for the future, with timeless design
            </h1>
            <Button className="hidden sm:flex text-white bg-gray-700 px-5 py-5 cursor-pointer">
              <Link href="/products"> View Collections</Link>
            </Button>
          </div>
          <p className="text-white mt-10 bottom-15  text-lg lg:w-[602px] ">
            A new era in eco friendly furniture with Avelon, the French luxury
            retail brand with nice fonts, tasteful colors and a beautiful way to
            display things digitally using modern web technologies.
          </p>
          <Button className="text-white bg-gray-700 px-5 py-5 cursor-pointer flex my-5 sm:hidden">
            <Link href="/products"> View Collections</Link>
          </Button>
        </div>
      </div>
      <Image
        src="/images/Right-Image.jpg"
        alt="Right Image"
        width={500}
        height={500}
        className="hidden sm:block"
      />
    </section>
  );
}
