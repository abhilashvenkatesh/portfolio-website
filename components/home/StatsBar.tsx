import type { HomeStat } from "@/lib/types";

export function StatsBar({ stats }: { stats: HomeStat[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-[40px] mt-[72px]">
      {stats.map((stat) => (
        <div key={stat.value + stat.label} className="text-center">
          <div className="text-[28px] font-semibold tracking-[-0.02em] text-[var(--heading)]">
            {stat.value}
          </div>
          <div className="text-[13px] font-mono text-[var(--muted)]">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
