"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  label: string;
}

export default function NavLink({ href, label }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={[
        "text-sm rounded-[6px] px-3 py-1.5 transition-colors",
        isActive
          ? "bg-[var(--color-surface-alt)] text-[var(--color-primary)]"
          : "text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:bg-[var(--color-surface-alt)]",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}
