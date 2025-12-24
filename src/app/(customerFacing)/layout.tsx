import { Nav, NavLink } from "./_components/Navbar";
import { TopNavbar } from "./_components/TopNavbar";

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
        <div className="flex border-b border-solid" />
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
      <main>{children}</main>
    </>
  );
}
