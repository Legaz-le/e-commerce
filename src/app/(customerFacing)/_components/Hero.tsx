import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="bg-brand flex flex-col md:flex-row">
      <div className="mt-15 w-full">
        <div className="px-8 lg:px-15 flex flex-col">
          <div className="space-y-10 lg:w-[513px]">
            <h1 className="text-white heading-1 animate-fade-in-up">
              The furniture brand for the future, with timeless design
            </h1>
            <Button
              asChild
              className="hidden sm:flex w-fit text-white bg-brand-primary hover:bg-brand-primary/90 px-5 py-5 cursor-pointer btn-animate"
            >
              <Link href="/products">View Collections</Link>
            </Button>
          </div>
          <p
            className="text-white mt-10 bottom-15 body-lg lg:w-[602px] animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            A new era in eco friendly furniture with Avelon, the French luxury
            retail brand with nice fonts, tasteful colors and a beautiful way to
            display things digitally using modern web technologies.
          </p>
          <Button
            asChild
            className="w-fit text-white bg-brand-primary hover:bg-brand-primary/90 px-5 py-5 cursor-pointer flex my-5 sm:hidden btn-animate"
          >
            <Link href="/products">View Collections</Link>
          </Button>
        </div>
      </div>
      <div
        className="w-full justify-items-end animate-fade-in"
        style={{ animationDelay: "0.3s" }}
      >
        <Image
          src="/images/Right-Image.jpg"
          alt="Right Image"
          width={500}
          height={500}
          priority
          className="hidden sm:block h-full"
        />
      </div>
    </section>
  );
}
