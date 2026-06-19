// src/components/Navbar.jsx
import Link from "next/link";
import { Button } from "./ui/button";
import NavLink from "./ui/NavLink";

export default function Navbar({ session = null, currentPath = null }) {
  const isActive = (url) => {
    if (!currentPath) return "text-gray-600";
    return currentPath === url
      ? "text-primary border-b-2 border-primary"
      : "text-gray-600";
  };

  const links = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "All Properties",
      url: "/properties",
    },
  ];

  const protectedLinks = [
    {
      label: "Dashboard",
      url: "/dashboard",
    },
  ];

  if (session) {
    links.push(...protectedLinks);
  }

  return (
    <nav className="sticky top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary">
          HavenStay
        </Link>

        {/* Navigation Links */}
        <ul className="flex items-center gap-8 text-sm font-medium text-gray-600">
          {links.map((link) => (
            <li
              key={link.url}
              className={
                isActive(link.url) +
                " *:hover:text-primary transition-colors px-1 py-px"
              }>
              <NavLink
                href={link.url}
                activeClass="text-primary border-b-2 border-primary">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Authentication Actions */}
        <div className="flex items-center gap-4">
          {!session ? (
            <>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
            <form action="/api/auth/signout" method="post">
              <Button type="submit" size="lg" variant="destructive">
                Logout
              </Button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
