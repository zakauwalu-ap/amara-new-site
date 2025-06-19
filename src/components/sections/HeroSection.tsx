import { 
  PrecisionGrid, 
  GridItem,
  GridDebugToggle,
  GridDebugProvider
} from '@/components/ui/precision-grid';
import { createResponsiveGridArea } from '@/lib/utils';

const HeroSection = () => {
  return (
    <section className="w-screen h-screen relative">
      {/* Mobile background image - positioned with CSS instead of grid */}
      <div className="absolute inset-0 md:hidden -z-10">
        <img 
          src="/sora-pics/charcoal-and-blue-cubes.png"
          alt="Professional Legal Services"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/80" />
      </div>
      
      <GridDebugProvider>
        <PrecisionGrid>
          {/* Hero Content - Responsive positioning */}
          <GridItem 
            gridArea={{
              desktop: [4, 14, 2, 12],    // Desktop: Full width content area
              tablet: [3, 8, 2, 8],      // Tablet: Adjusted for 8×10 grid
              mobile: [3, 9, 1, 5]       // Mobile: Top half, centered
            }}
            className="flex flex-col justify-center p-4 md:p-6 lg:p-8 z-10"
          >
            <div className="max-w-2xl lg:max-w-4xl">
              <h1 className="font-serif text-2xl md:text-4xl lg:text-h1 text-brand-blue mb-4 md:mb-6">
                Excellence in Legal Services
              </h1>
              <p className="text-body-md md:text-body-lg text-neutral-600 mb-6 md:mb-8">
                Professional legal representation you can trust. We provide comprehensive 
                legal services with a commitment to excellence and client satisfaction.
              </p>
              <button className="bg-brand-blue text-white px-6 py-3 md:px-8 md:py-4 rounded-lg 
                               text-body-md md:text-body-lg font-medium hover:bg-primary-600 
                               transition-colors duration-200">
                Schedule Consultation
              </button>
            </div>
          </GridItem>
          
          {/* Hero Image - Desktop/Tablet only */}
          <GridItem 
            gridArea={{
              desktop: [5, 13, 7, 12],   // Desktop: Right side image
              tablet: [6, 10, 5, 8],    // Tablet: Smaller right section
              mobile: [9, 12, 1, 5]     // Mobile: Bottom section (will be hidden)
            }}
            className="relative hidden md:block"
          >
            <div className="h-full w-full relative overflow-hidden rounded-lg">
              <img 
                src="/sora-pics/geometric-precision-structure-1.png"
                alt="Professional Legal Services"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/20 to-transparent" />
            </div>
          </GridItem>
          
          {/* Debug toggle */}
          <GridDebugToggle />
        </PrecisionGrid>
      </GridDebugProvider>
    </section>
  );
};

export default HeroSection; 