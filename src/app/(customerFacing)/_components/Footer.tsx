import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand text-white flex flex-col space-y-10 px-8 md:px-0">
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-10 md:pr-20">
          <div className="flex flex-col space-y-3">
            <span className="font-semibold">Menu</span>
            <Link
              href="/products"
              className="hover:text-brand-light transition-colors"
            >
              New arrivals
            </Link>
            <Link
              href="/products"
              className="hover:text-brand-light transition-colors"
            >
              Best sellers
            </Link>
            <Link
              href="/products"
              className="hover:text-brand-light transition-colors"
            >
              Recently viewed
            </Link>
            <Link
              href="/products"
              className="hover:text-brand-light transition-colors"
            >
              Popular this week
            </Link>
            <Link
              href="/products"
              className="hover:text-brand-light transition-colors"
            >
              All products
            </Link>
          </div>
          <div className="flex flex-col space-y-3">
            <span className="font-semibold">Categories</span>
            <Link
              href="/products?category=Furniture"
              className="hover:text-brand-light transition-colors"
            >
              Furniture
            </Link>
            <Link
              href="/products?category=Homeware"
              className="hover:text-brand-light transition-colors"
            >
              Homeware
            </Link>
            <Link
              href="/products?category=Sofas"
              className="hover:text-brand-light transition-colors"
            >
              Sofas
            </Link>
            <Link
              href="/products?category=Light+fittings"
              className="hover:text-brand-light transition-colors"
            >
              Light fittings
            </Link>
            <Link
              href="/products?category=Accessories"
              className="hover:text-brand-light transition-colors"
            >
              Accessories
            </Link>
          </div>
          <div className="flex flex-col space-y-3 mb-10 md:mb-0">
            <span className="font-semibold">Our company</span>
            <Link href="/" className="hover:text-brand-light transition-colors">
              About us
            </Link>
            <Link href="/" className="hover:text-brand-light transition-colors">
              Vacancies
            </Link>
            <Link href="/" className="hover:text-brand-light transition-colors">
              Contact us
            </Link>
            <Link href="/" className="hover:text-brand-light transition-colors">
              Privacy
            </Link>
            <Link href="/" className="hover:text-brand-light transition-colors">
              Return policy
            </Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col space-y-5">
          <label className="font-semibold">Join our mailing list</label>
          <div className="flex text-black">
            <input
              type="email"
              placeholder="your@email.com"
              className="p-4 bg-brand-primary/50 text-white placeholder:text-white/70 w-full focus:outline-none focus:ring-2 focus:ring-brand-light transition-all"
            />
            <button className="bg-brand-light text-brand p-4 w-1/4 btn-animate hover:bg-white transition-colors">
              Sign up
            </button>
          </div>
        </div>
      </div>
      <div className="py-5 space-y-5 hidden md:block">
        <div className="flex border-b border-solid" />
        <div className="flex justify-between">
          <h1>Copyright 2026 Avion LTD</h1>
          <div className="flex justify-between space-x-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="24"
                height="24"
                fill="white"
                style={{ mixBlendMode: "multiply" }}
              />
              <path
                d="M19.65 3H4.35C3.6 3 3 3.6 3 4.275V19.65C3 20.325 3.6 20.925 4.35 20.925H19.65C20.4 20.925 21 20.325 21 19.65V4.275C21 3.6 20.4 3 19.65 3ZM8.325 18.3H5.7V9.75H8.325V18.3ZM7.05 8.55C6.225 8.55 5.475 7.875 5.475 6.975C5.475 6.075 6.15 5.4 7.05 5.4C7.875 5.4 8.625 6.075 8.625 6.975C8.625 7.875 7.875 8.55 7.05 8.55ZM18.375 18.225H15.75V14.025C15.75 13.05 15.75 11.7 14.325 11.7C12.9 11.7 12.75 12.825 12.75 13.875V18.15H10.125V9.75H12.6V10.875H12.675C13.05 10.2 13.95 9.45 15.225 9.45C17.925 9.45 18.45 11.25 18.45 13.575V18.225H18.375Z"
                fill="white"
              />
            </svg>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="24"
                height="24"
                fill="white"
                style={{ mixBlendMode: "multiply" }}
              />
              <path
                d="M20.0025 3H3.9975C3.73355 3.00196 3.48097 3.10769 3.29433 3.29433C3.10769 3.48097 3.00196 3.73355 3 3.9975V20.0025C3.00196 20.2664 3.10769 20.519 3.29433 20.7057C3.48097 20.8923 3.73355 20.998 3.9975 21H12.615V14.04H10.275V11.3175H12.615V9.315C12.615 6.99 14.0325 5.7225 16.1175 5.7225C16.815 5.7225 17.5125 5.7225 18.21 5.8275V8.25H16.7775C15.645 8.25 15.4275 8.79 15.4275 9.5775V11.31H18.1275L17.775 14.0325H15.4275V21H20.0025C20.2664 20.998 20.519 20.8923 20.7057 20.7057C20.8923 20.519 20.998 20.2664 21 20.0025V3.9975C20.998 3.73355 20.8923 3.48097 20.7057 3.29433C20.519 3.10769 20.2664 3.00196 20.0025 3Z"
                fill="white"
              />
            </svg>

            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="24"
                height="24"
                fill="white"
                style={{ mixBlendMode: "multiply" }}
              />
              <path
                d="M8.94 18.705C10.2069 18.713 11.4627 18.4693 12.6346 17.9882C13.8066 17.507 14.8714 16.798 15.7672 15.9022C16.663 15.0064 17.3721 13.9416 17.8532 12.7696C18.3343 11.5977 18.578 10.3418 18.57 9.07499C18.57 8.92499 18.57 8.78249 18.57 8.63249C19.2267 8.15136 19.7951 7.56012 20.25 6.88499C19.6316 7.15544 18.9773 7.3348 18.3075 7.41749C19.0177 6.99432 19.5506 6.32824 19.8075 5.54249C19.1456 5.93957 18.4199 6.21871 17.6625 6.36749C17.1524 5.82401 16.4775 5.46378 15.7421 5.34253C15.0067 5.22128 14.2518 5.34576 13.5943 5.69673C12.9368 6.04769 12.4132 6.60557 12.1047 7.28405C11.7962 7.96252 11.7198 8.72376 11.8875 9.44999C10.542 9.38395 9.22553 9.03525 8.02377 8.42662C6.822 7.81798 5.7619 6.96305 4.9125 5.91749C4.48419 6.66087 4.35437 7.53923 4.54932 8.37473C4.74427 9.21023 5.24942 9.94043 5.9625 10.4175C5.43646 10.3972 4.92259 10.2533 4.4625 9.99749V10.035C4.45783 10.8119 4.71954 11.5669 5.20403 12.1742C5.68851 12.7815 6.3665 13.2044 7.125 13.3725C6.63573 13.5041 6.12322 13.5246 5.625 13.4325C5.84459 14.095 6.26376 14.6734 6.82503 15.0883C7.38631 15.5032 8.06219 15.7344 8.76 15.75C7.56691 16.7104 6.08407 17.239 4.5525 17.25C4.28396 17.2422 4.01606 17.2197 3.75 17.1825C5.30022 18.1702 7.1019 18.6909 8.94 18.6825"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
