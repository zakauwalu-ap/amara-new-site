import { 
  PrecisionGrid, 
  GridDebugToggle,
  GridDebugProvider
} from '@/components/ui/precision-grid';

const HeroSection = () => {
  return (
    <section className="w-screen h-screen">
      <GridDebugProvider>
        <PrecisionGrid>
          {/* Empty grid - ready for content */}
          
          {/* Debug toggle */}
          <GridDebugToggle />
        </PrecisionGrid>
      </GridDebugProvider>
    </section>
  );
};

export default HeroSection; 