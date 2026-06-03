'use client';

import { useRouter } from 'next/navigation';

export function SuggestionChips({ chips }: { chips: string[] }) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip}
          type="button"
          onClick={() => router.push('/chat?q=' + encodeURIComponent(chip))}
          className="rounded-full border border-surface-alt bg-surface-alt text-secondary font-mono text-xs px-[14px] py-[6px] transition-colors duration-150 hover:bg-accent-dim hover:border-tertiary hover:text-tertiary cursor-pointer"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}
