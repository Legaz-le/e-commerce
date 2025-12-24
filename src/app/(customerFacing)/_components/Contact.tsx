export function Contact() {
  return (
    <section className="text-center  bg-[#FFFFFF] py-15 space-y-20">
      <div className="space-y-5 flex flex-col items-center">
        <h1 className="text-4xl font-mono">Join the club and get the benefits</h1>
        <p className="w-1/3 leading-10">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </p>
      </div>
      <div>
        <input type="email" placeholder="you@gmail.com" className="p-4 bg-[#F9F9F9] w-1/4" />
        <button className="py-4 px-8 bg-[#2A254B] text-white">Sign up</button>
      </div>
    </section>
  );
}
