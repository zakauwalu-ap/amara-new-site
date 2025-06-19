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
          {/* Hero Header Section spanning from 3,1 to 14,12 */}
          <GridItem gridArea={[3, 15, 1, 13]} className="border-2 border-red-500">
            <div className="h-full flex flex-col md:flex-row">
              {/* Image Area - Top on mobile, Left 7/12 columns on desktop */}
              <div className="w-full md:w-7/12 border-2 border-blue-500 relative h-1/2 md:h-full">
                <img 
                  src="/sora-pics/20250618_1732_Charcoal_and_Blue_Cubes_gen_01jy21jqadezqvw91dmxdds3yf.png"
                  alt="Charcoal and Blue Cubes"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Content Area - Bottom on mobile, Right 5/12 columns on desktop */}
              <div className="w-full md:w-5/12 border-2 border-green-500 p-4 md:p-8 flex flex-col justify-center h-1/2 md:h-full">
                <h1 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Hero Title</h1>
                <p className="text-sm md:text-lg mb-4 md:mb-6">Hero content placeholder text goes here.</p>
                <button className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg w-fit text-sm md:text-base">
                  Call to Action
                </button>
              </div>
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