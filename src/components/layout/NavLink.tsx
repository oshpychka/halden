"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string;
  className?: string;
  onNavigate?: () => void;
};

export function NavLink({
  href,
  label,
  className = "",
  onNavigate,
}: NavLinkProps) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={`relative inline-flex min-h-11 items-center after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-300 after:ease-drawn hover:after:scale-x-100 ${active ? "after:scale-x-100" : "after:scale-x-0"} ${className}`}
    >
      {label}
    </Link>
  );
}
