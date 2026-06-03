'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function ChatLauncher() {
  const [value, setValue] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    router.push('/chat?q=' + encodeURIComponent(value.trim()));
  };

  return (
    <div className="w-full max-w-[620px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 bg-surface border border-surface-alt rounded-[14px] px-[18px] py-2 pr-2 transition-colors duration-200 focus-within:border-tertiary"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-secondary"
          aria-hidden="true"
        >
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>

        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask me anything about Abhilash…"
          className="flex-1 bg-transparent border-none outline-none text-[15px] text-primary py-3 px-1 placeholder:text-secondary"
        />

        <button
          type="submit"
          className="inline-flex items-center justify-center w-10 h-10 rounded-[10px] bg-tertiary text-white shrink-0 hover:opacity-85 transition-opacity duration-150"
          aria-label="Send question"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </form>
    </div>
  );
}
