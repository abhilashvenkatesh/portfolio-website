"use client";
import { useTheme } from "@/components/providers/useTheme";

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M13.5 9.5a6 6 0 0 1-8-8 6 6 0 1 0 8 8z"
        fill="currentColor"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="3" fill="currentColor" />
      <line x1="8" y1="1" x2="8" y2="3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="12.5" x2="8" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="1" y1="8" x2="3.5" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12.5" y1="8" x2="15" y2="8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3.4" y1="3.4" x2="5.2" y2="5.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10.8" y1="10.8" x2="12.6" y2="12.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3.4" y1="12.6" x2="5.2" y2="10.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10.8" y1="5.2" x2="12.6" y2="3.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 flex items-center justify-center bg-[var(--color-surface-alt)] rounded-[8px] text-[var(--color-secondary)] transition-colors duration-200 hover:opacity-80"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
