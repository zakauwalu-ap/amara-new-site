import HeroSection from '@/components/sections/HeroSection';
import BackgroundLines from '@/components/ui/BackgroundLines';

export default function HomePage() {
  return (
    <main className="relative">
      <BackgroundLines
        // Base HSL: H: 41, S: 38%, L: 77%
        baseHue={41}
        baseSaturation={38}
        defaultLightness={77}   // Default L value
        hoverLightness={60}     // Darker L for hover
        intermediateLightness={90} // Lighter L for intermediate stage
        strokeWidth={5}         // Stroke width for paths
      />
      <HeroSection />
    </main>
  );
}
