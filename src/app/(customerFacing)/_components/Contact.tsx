import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <div className="flex justify-center">
        <div className="flex w-full md:w-1/2 lg:w-1/3">
          <Input
            type="email"
            placeholder="you@gmail.com"
            className="rounded-r-none h-12 bg-brand-light border-brand-border focus-visible:border-brand focus-visible:ring-brand/20"
          />
          <Button className="rounded-l-none h-12 px-8 bg-brand hover:bg-brand-primary btn-animate">
            Sign up
          </Button>
        </div>
      </div>
    </section>
  );
}
