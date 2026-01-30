import { Footer } from "./_components/Footer";
import { Nav, NavLink } from "./_components/Navbar";
import { TopNavbar } from "./_components/TopNavbar";
import { Toaster } from "sonner";

export const dynamic = "auto";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="space-y-5">
        <TopNavbar />
        <div className="hidden md:flex border-b border-solid" />
        <div className="container mx-auto">
          <Nav>
            <NavLink href="/products">All Products</NavLink>
            <NavLink href="/products?category=Furniture">Furniture</NavLink>
            <NavLink href="/products?category=Homeware">Homeware</NavLink>
            <NavLink href="/products?category=Sofas">Sofas</NavLink>
            <NavLink href="/products?category=Light+fittings">
              Light Fittings
            </NavLink>
            <NavLink href="/products?category=Accessories">Accessories</NavLink>
          </Nav>
        </div>
      </div>
      <main className="flex-1">{children}</main>
      <div className="bg-brand pt-16 ">
        <div className="container mx-auto">
          <Footer />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
