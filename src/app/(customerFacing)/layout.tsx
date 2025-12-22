import { Nav, NavLink } from "@/components/Navbar";
import { TopNavbar } from "@/components/TopNavbar";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="space-y-5">
      <TopNavbar />
        <div className=" flex border-b border-solid" />
        <Nav>
          <NavLink href="/">Plant pots</NavLink>
          <NavLink href="/products">Ceramics</NavLink>
          <NavLink href="/orders">Tables</NavLink>
          <NavLink href="/orders">Chairs</NavLink>
          <NavLink href="/orders">Crockery</NavLink>
          <NavLink href="/orders">Tableware</NavLink>
          <NavLink href="/orders">Cutlery</NavLink>
        </Nav>
      </div>
        <div className="container mx-auto my-6">{children}</div>
    </>
  );
}
