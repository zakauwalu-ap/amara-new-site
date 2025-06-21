import HeroSection from '@/components/sections/HeroSection';
import HeroVideoSection from '@/components/sections/HeroVideoSection';
import FlowingLinesBackground from '@/components/sections/FlowingLinesBackground';
import ParticleBackground from '@/components/ui/ParticleBackground';
import SVGPathExperiment from '@/components/ui/SVGPathExperiment';
import Cards from '@/components/sections/Cards';
import BackgroundLines from '@/components/ui/BackgroundLines';

export default function HomePage() {
  return (
    <main>
      <BackgroundLines />
      <HeroSection />
    </main>
  );
}
