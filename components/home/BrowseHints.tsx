import Link from "next/link";

const links = [
  { label: "projects", href: "/projects" },
  { label: "experience", href: "/experience" },
  { label: "contact", href: "/contact" },
];

export function BrowseHints() {
  return (
    <div className="flex items-center justify-center gap-0 mt-4 text-sm">
      <span className="text-secondary">or browse</span>
      {links.map((link) => (
        <span key={link.href} className="flex items-center">
          <span className="text-muted mx-2">·</span>
          <Link href={link.href} className="text-tertiary hover:underline underline-offset-2">
            {link.label}
          </Link>
        </span>
      ))}
    </div>
  );
}
