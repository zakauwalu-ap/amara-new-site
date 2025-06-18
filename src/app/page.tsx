import { 
  PrecisionGrid, 
  GridItem, 
  AbsoluteItem, 
  GridDebugToggle,
  GridDebugProvider
} from '@/components/ui/precision-grid';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <GridDebugProvider>
        <PrecisionGrid>
        {/* Demo: Logo area */}
        <GridItem 
          gridArea={[1, 2, 1, 3]} 
          className="bg-brand-blue text-white p-4 flex items-center justify-center rounded"
        >
          <div className="text-sm font-medium">Logo Area [1,2,1,3]</div>
        </GridItem>
        
        {/* Demo: Hero text */}
        <GridItem 
          gridArea={[4, 8, 2, 7]} 
          className="bg-brand-gold text-brand-dark p-6 flex flex-col justify-center rounded"
        >
          <h1 className="text-h1 font-serif">Excellence. Redefined.</h1>
          <p className="text-body-lg mt-4">
            Precision Layout System Demo - Grid Area [4,8,2,7]
          </p>
        </GridItem>
        
        {/* Demo: Side content */}
        <GridItem 
          gridArea={[6, 12, 8, 12]} 
          className="bg-neutral-100 p-4 flex items-center justify-center rounded"
        >
          <div className="text-center">
            <div className="text-sm font-medium text-neutral-600">
              Side Content
            </div>
            <div className="text-xs text-neutral-500 mt-1">
              [6,12,8,12]
            </div>
          </div>
        </GridItem>
        
        {/* Demo: Floating element */}
        <AbsoluteItem 
          position={[15, 85, 12, 6]}
          className="bg-brand-blue text-white rounded-lg flex items-center justify-center shadow-lg"
          zIndex={50}
        >
          <div className="text-center">
            <div className="text-sm font-medium">Floating CTA</div>
            <div className="text-xs opacity-75">absolute [15,85,12,6]</div>
          </div>
        </AbsoluteItem>
        
        {/* Debug toggle */}
        <GridDebugToggle />
      </PrecisionGrid>
      </GridDebugProvider>
    </main>
  );
}
