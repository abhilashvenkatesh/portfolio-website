import { getHomeContent } from "@/lib/content";
import { HeroSection } from "@/components/home/HeroSection";

export default function Home() {
  const content = getHomeContent();
  return (
    <main>
      <HeroSection content={content} />
    </main>
  );
}
