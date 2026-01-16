import { Footer } from "./_components/Footer";
import { Nav, NavLink } from "./_components/Navbar";
import { TopNavbar } from "./_components/TopNavbar";

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
            <NavLink href="/">Plant pots</NavLink>
            <NavLink href="/">Ceramics</NavLink>
            <NavLink href="/">Tables</NavLink>
            <NavLink href="/">Chairs</NavLink>
            <NavLink href="/">Crockery</NavLink>
            <NavLink href="/">Tableware</NavLink>
            <NavLink href="/">Cutlery</NavLink>
          </Nav>
        </div>
      </div>
      <main className="flex-1">{children}</main>
      <div className="bg-[#2A254B] pt-16 ">
        <div className="container mx-auto">
          <Footer />
        </div>
      </div>
    </div>
  );
}
