import HeroSection from '@/components/sections/HeroSection';
import HeroVideoSection from '@/components/sections/HeroVideoSection';
import FlowingLinesBackground from '@/components/sections/FlowingLinesBackground';
import ParticleBackground from '@/components/ui/ParticleBackground';
import SVGPathExperiment from '@/components/ui/SVGPathExperiment';
import Cards from '@/components/sections/Cards';
import PathLinesBackground from '@/components/ui/PathLinesBackground';

export default function HomePage() {
  return (
    <main>
      <PathLinesBackground
        stroke="none"
        fill="hsl(41, 90%, 77%)"
        opacity={0.4}
        className="text-neutral-400"
      />
      <HeroSection />
    </main>
  );
}
