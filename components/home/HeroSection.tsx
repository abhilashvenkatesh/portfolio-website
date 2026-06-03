import type { HomeContent } from "@/lib/types";
import { AccentTag } from "@/components/ui/AccentTag";
import { StatsBar } from "@/components/home/StatsBar";
import { ChatLauncher } from "@/components/home/ChatLauncher";

export function HeroSection({ content }: { content: HomeContent }) {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-[clamp(20px,5vw,64px)] pt-[120px] pb-[80px] relative overflow-hidden">
      <div className="relative z-10 max-w-[760px] w-full mx-auto">
        <div className="mb-6">
          <AccentTag label={content.roleBadge} />
        </div>

        <h1 className="text-[clamp(48px,7vw,88px)] font-semibold leading-[1.05] tracking-[-0.03em] text-primary mb-6">
          {content.headline}
          <br />
          <span className="text-secondary font-light">
            {content.subheading.base}
            <span className="text-tertiary">{content.subheading.accent}</span>
          </span>
        </h1>

        <p className="text-[clamp(16px,2vw,19px)] text-secondary font-light max-w-[520px] leading-[1.7] mx-auto mb-10">
          {content.bio}
        </p>

        <StatsBar stats={content.stats} />
        <div className="mt-10">
          <ChatLauncher />
        </div>
      </div>
    </section>
  );
}
