"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavScrollWrapper({
  children,
  mobileMenuContent,
}: {
  children: React.ReactNode;
  mobileMenuContent?: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {menuOpen && (
        <div
          id="mobile-backdrop"
          className="fixed inset-0 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <header
        className={`fixed top-0 inset-x-0 z-50 flex flex-col transition-[background-color,backdrop-filter,border-color] duration-200 ${
          scrolled
            ? "bg-neutral/80 backdrop-blur-md border-b border-surface-alt"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div
          className="flex items-center justify-between h-15"
          style={{ paddingInline: "clamp(20px, 5vw, 64px)" }}
        >
          {children}
          <button
            className="block sm:hidden p-2 text-tertiary"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="16" y2="16" />
                  <line x1="16" y1="4" x2="4" y2="16" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="17" y2="6" />
                  <line x1="3" y1="10" x2="17" y2="10" />
                  <line x1="3" y1="14" x2="17" y2="14" />
                </>
              )}
            </svg>
          </button>
        </div>
        <div
          id="mobile-menu"
          className={`sm:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out bg-neutral border-b border-surface-alt ${
            menuOpen ? "max-h-screen" : "max-h-0"
          }`}
          style={{ paddingInline: "clamp(20px, 5vw, 64px)" }}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest("a")) setMenuOpen(false);
          }}
        >
          {mobileMenuContent}
        </div>
      </header>
    </>
  );
}
