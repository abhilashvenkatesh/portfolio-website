import NavLink from "./NavLink";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/chat", label: "Chat" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Nav() {
  return (
    <header
      className="fixed top-0 inset-x-0 z-50 flex items-center h-[60px] bg-[var(--color-neutral)] border-b border-[var(--color-surface-alt)]"
      style={{ paddingInline: "clamp(20px, 5vw, 64px)" }}
    >
      <nav className="flex items-center gap-1">
        {LINKS.map(({ href, label }) => (
          <NavLink key={href} href={href} label={label} />
        ))}
      </nav>
    </header>
  );
}
