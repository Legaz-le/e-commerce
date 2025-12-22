import Image from "next/image";

export function Hero() {
  return (
    <div className="bg-[#2A254B] flex">
      <div className="flex-1 mt-15 relative">
        <div className="px-15 flex flex-col">
          <div className="space-y-3 w-[513px]">
          <h1 className="text-white text-3xl font-mono">
            The furniture brand for the future, with  timeless design
          </h1>
          <a className="text-white bg-gray-700 px-5 py-2 ">View Collections</a>
          </div>
          <p className="text-white absolute bottom-15 text-lg w-[602px]">A new era in eco friendly furniture with Avelon, the French luxury retail brand
          with nice fonts, tasteful colors and a beautiful way to display things digitally 
          using modern web technologies.</p>
        </div>
      </div>
      <Image
        src="/images/Right-Image.jpg"
        alt="Right Image"
        width={500}
        height={500}
      />
    </div>
  );
}
