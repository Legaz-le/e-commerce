export function Contact() {
  return (
    <section className="text-center  bg-[#FFFFFF] py-15 space-y-20 px-8 md:px-0 ">
      <div className="space-y-5 flex flex-col items-center">
        <h1 className="text-lg md:text-4xl font-mono">
          Join the club and get the benefits
        </h1>
        <p className="md:w-1/3 leading-10 text-sm">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </p>
      </div>
      <div>
        <input
          type="email"
          placeholder="you@gmail.com"
          className="p-4 bg-brand-light md:w-1/4"
        />
        <button className="py-4 px-8 bg-brand text-white">Sign up</button>
      </div>
    </section>
  );
}
