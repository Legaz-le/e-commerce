export function Contact() {
  return (
    <section className="text-center bg-white py-15 space-y-20 px-8 md:px-0 animate-fade-in-up">
      <div className="space-y-5 flex flex-col items-center">
        <h1 className="heading-3 md:heading-1 text-brand">
          Join the club and get the benefits
        </h1>
        <p className="md:w-1/3 leading-10 body-sm text-brand-muted">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </p>
      </div>
      <div>
        <input
          type="email"
          placeholder="you@gmail.com"
          className="p-4 bg-brand-light md:w-1/4 border border-transparent focus:border-brand focus:outline-none transition-colors"
        />
        <button className="py-4 px-8 bg-brand text-white btn-animate hover:bg-brand-primary transition-colors">
          Sign up
        </button>
      </div>
    </section>
  );
}
