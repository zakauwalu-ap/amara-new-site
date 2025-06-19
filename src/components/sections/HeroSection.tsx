import { 
  PrecisionGrid, 
  GridItem,
  GridDebugToggle,
  GridDebugProvider
} from '@/components/ui/precision-grid';

const HeroSection = () => {
  return (
    <section className="w-screen h-screen">
      <GridDebugProvider>
        <PrecisionGrid>
          {/* Content will be placed here */}
          
          {/* Debug toggle */}
          <GridDebugToggle />
        </PrecisionGrid>
      </GridDebugProvider>
    </section>
  );
};

export default HeroSection; 