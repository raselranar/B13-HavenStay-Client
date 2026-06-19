"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ children, href, activeClass, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={onClick}
      className={isActive ? activeClass : "text-gray-500"}>
      {children}
    </Link>
  );
};
export default NavLink;
