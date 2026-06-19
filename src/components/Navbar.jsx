"use client";
import Link from "next/link";
import NavLink from "./ui/NavLink";
import AuthButtons from "./ui/AuthButtons";
import { usePathname } from "next/navigation";

export default function Navbar({ session = null }) {
  const path = usePathname();
  console.log(path);
  if (path && path.includes("/dashboard")) {
    return null; // Don't render the navbar on dashboard pages
  }

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
              key={link.label}
              className={"*:hover:text-primary transition-colors px-1 py-px"}>
              <NavLink
                href={link.url}
                activeClass="text-primary border-b-2 border-primary">
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Authentication Actions */}
        <AuthButtons session={session} />
      </div>
    </nav>
  );
}
