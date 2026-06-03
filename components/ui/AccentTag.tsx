export function AccentTag({ label }: { label: string }) {
  return (
    <span className="inline-block bg-accent-dim text-primary font-mono text-[11px] tracking-[0.04em] rounded-[4px] px-[9px] py-[3px]">
      {label}
    </span>
  );
}
