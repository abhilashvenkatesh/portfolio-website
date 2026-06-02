import Link from "next/link";
import NavLink from "./NavLink";
import ThemeToggle from "./ThemeToggle";
import NavScrollWrapper from "./NavScrollWrapper";
import { getContact } from "@/lib/content";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/chat", label: "Chat" },
  { href: "/contact", label: "Contact" },
] as const;

export default async function Nav() {
  const { email } = getContact();
  const mailtoHref = `mailto:${email}?subject=Hire%20me`;

  return (
    <NavScrollWrapper>
      <Link
        href="/"
        className="font-mono text-sm text-tertiary tracking-wider no-underline"
      >
        abhilash
      </Link>
      <nav className="hidden sm:flex items-center gap-1">
        {LINKS.map(({ href, label }) => (
          <NavLink key={href} href={href} label={label} />
        ))}
      </nav>
      <ThemeToggle />
      <a
        href={mailtoHref}
        className="text-sm font-medium text-tertiary rounded-sm px-4 py-1.75 transition-colors duration-200 hover:bg-accent-dim no-underline"
      >
        Hire me
      </a>
    </NavScrollWrapper>
  );
}
