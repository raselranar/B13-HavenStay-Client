// src/components/Navbar.jsx
"use client";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function Navbar() {
  const { data: session, isPending } = useSession();

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

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-primary">
          HavenStay
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          {/* <Link href="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link
            href=
            className="hover:text-blue-600 transition-colors">
            All Properties
          </Link> */}
          {links.map((links) => (
            <Link href={links.url} key={links.url}>
              {links.label}
            </Link>
          ))}
          {session && (
            <Link
              href="/dashboard"
              className="hover:text-blue-600 transition-colors">
              Dashboard
            </Link>
          )}
        </div>

        {/* Authentication Actions */}
        <div className="flex items-center gap-4">
          {!isPending && !session ? (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Register
              </Link>
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
