"use client";
import { useEffect, useState } from "react";

export default function NavScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between h-15 transition-[background-color,backdrop-filter,border-color] duration-200 ${
        scrolled
          ? "bg-neutral/80 backdrop-blur-md border-b border-surface-alt"
          : "bg-transparent border-b border-transparent"
      }`}
      style={{ paddingInline: "clamp(20px, 5vw, 64px)" }}
    >
      {children}
    </header>
  );
}
