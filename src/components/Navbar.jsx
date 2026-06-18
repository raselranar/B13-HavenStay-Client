// src/components/Navbar.jsx
"use client";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export default function Navbar() {
  const { data: session, isPending } = useSession();
  const path = usePathname();

  const isActive = (url) => {
    return path === url
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
          {/* <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link
            href=
            className="hover:text-blue-600 transition-colors">
            All Properties
          </Link> */}
          {links.map((links) => (
            <li
              key={links.url}
              className={
                isActive(links.url) +
                " *:hover:text-primary transition-colors px-1 py-px"
              }>
              <Link href={links.url}>{links.label}</Link>
            </li>
          ))}
        </ul>

        {/* Authentication Actions */}
        <div className="flex items-center gap-4">
          {!isPending && !session ? (
            <>
              <Button variant="outline" size="lg" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="lg" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </>
          ) : (
            <button
              onClick={() => signOut()}
              className="text-sm font-medium text-red-600 hover:text-red-700 transition-colors cursor-pointer">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
