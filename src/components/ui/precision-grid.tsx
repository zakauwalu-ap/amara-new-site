"use client";
import { ReactNode, useState, createContext, useContext } from 'react';
import { cn } from '@/lib/utils';

interface PrecisionGridProps {
  children: ReactNode;
  className?: string;
  showDebug?: boolean;
}

interface GridItemProps {
  children: ReactNode;
  gridArea: {
    desktop: [number, number, number, number]; // [rowStart, rowEnd, colStart, colEnd] for lg+
    tablet?: [number, number, number, number];  // [rowStart, rowEnd, colStart, colEnd] for md
    mobile?: [number, number, number, number];  // [rowStart, rowEnd, colStart, colEnd] for sm and below
  };
  className?: string;
}

interface AbsoluteItemProps {
  children: ReactNode;
  position: [number, number, number, number]; // [top%, left%, width%, height%]
  className?: string;
  zIndex?: number;
}

// Grid configuration for different breakpoints
const GRID_CONFIGS = {
  mobile: { cols: 4, rows: 12 },   // sm and below
  tablet: { cols: 8, rows: 10 },  // md
  desktop: { cols: 12, rows: 16 }, // lg+
} as const;

// Main Grid Container
export const PrecisionGrid = ({ children, className }: Omit<PrecisionGridProps, 'showDebug'>) => {
  const debugContext = useContext(DebugContext);
  const showDebug = debugContext?.showDebug || false;
  
  return (
    <div 
      className={cn(
        "precision-grid", // For debug styling
        "relative w-screen h-screen",
        // Mobile: 4 columns × 12 rows, smaller margins and gutters
        "grid grid-cols-4 grid-rows-[repeat(12,1fr)]",
        "px-4 gap-x-3 gap-y-3", // 1rem margins, 0.75rem gutters on mobile
        // Tablet: 8 columns × 10 rows, medium margins and gutters  
        "md:grid-cols-8 md:grid-rows-[repeat(10,1fr)]",
        "md:px-8 md:gap-x-4 md:gap-y-4", // 2rem margins, 1rem gutters on tablet
        // Desktop: 12 columns × 16 rows, full margins and gutters
        "lg:grid-cols-12 lg:grid-rows-[repeat(16,1fr)]",
        "lg:px-32 lg:gap-x-6 lg:gap-y-6", // 8rem margins, 1.5rem gutters on desktop
        "py-0", // 0 vertical margin for all sizes
        className
      )}
    >
      {showDebug && <GridDebugOverlay />}
      {children}
    </div>
  );
};

// Grid Item Component
export const GridItem = ({ children, gridArea, className }: GridItemProps) => {
  const { desktop, tablet, mobile } = gridArea;
  
  // Use desktop values as fallback if responsive values not provided
  const tabletArea = tablet || desktop;
  const mobileArea = mobile || tablet || desktop;
  
  const [mobileRowStart, mobileRowEnd, mobileColStart, mobileColEnd] = mobileArea;
  const [tabletRowStart, tabletRowEnd, tabletColStart, tabletColEnd] = tabletArea;
  const [desktopRowStart, desktopRowEnd, desktopColStart, desktopColEnd] = desktop;
  
  return (
    <div
      className={cn("relative responsive-grid-item", className)}
      style={{
        // CSS Custom Properties for responsive positioning
        '--mobile-row-start': mobileRowStart,
        '--mobile-row-end': mobileRowEnd,
        '--mobile-col-start': mobileColStart,
        '--mobile-col-end': mobileColEnd,
        '--tablet-row-start': tabletRowStart,
        '--tablet-row-end': tabletRowEnd,
        '--tablet-col-start': tabletColStart,
        '--tablet-col-end': tabletColEnd,
        '--desktop-row-start': desktopRowStart,
        '--desktop-row-end': desktopRowEnd,
        '--desktop-col-start': desktopColStart,
        '--desktop-col-end': desktopColEnd,
        
        // Mobile positioning (default)
        gridRow: `${mobileRowStart} / ${mobileRowEnd}`,
        gridColumn: `${mobileColStart} / ${mobileColEnd}`,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// Absolute Positioned Item Component
export const AbsoluteItem = ({ children, position, className, zIndex = 10 }: AbsoluteItemProps) => {
  const [top, left, width, height] = position;
  
  return (
    <div
      className={cn("absolute", className)}
      style={{
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}%`,
        height: `${height}%`,
        zIndex,
      }}
    >
      {children}
    </div>
  );
};

// Debug Grid Overlay - now responsive
const GridDebugOverlay = () => {
  return (
    <>
      {/* Mobile Debug Grid */}
      <div className="absolute inset-0 pointer-events-none z-[9999] grid grid-cols-4 grid-rows-[repeat(12,1fr)] px-4 gap-x-3 gap-y-3 md:hidden">
        {Array.from({ length: GRID_CONFIGS.mobile.rows }, (_, row) =>
          Array.from({ length: GRID_CONFIGS.mobile.cols }, (_, col) => (
            <div
              key={`mobile-cell-${row}-${col}`}
              className="relative border border-red-300/30"
              style={{
                gridRow: row + 1,
                gridColumn: col + 1,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs text-red-400/70 font-mono">
                {row + 1},{col + 1}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tablet Debug Grid */}
      <div className="absolute inset-0 pointer-events-none z-[9999] hidden md:grid lg:hidden grid-cols-8 grid-rows-[repeat(10,1fr)] px-8 gap-x-4 gap-y-4">
        {Array.from({ length: GRID_CONFIGS.tablet.rows }, (_, row) =>
          Array.from({ length: GRID_CONFIGS.tablet.cols }, (_, col) => (
            <div
              key={`tablet-cell-${row}-${col}`}
              className="relative border border-red-300/30"
              style={{
                gridRow: row + 1,
                gridColumn: col + 1,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs text-red-400/70 font-mono">
                {row + 1},{col + 1}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop Debug Grid */}
      <div className="absolute inset-0 pointer-events-none z-[9999] hidden lg:grid grid-cols-12 grid-rows-[repeat(16,1fr)] px-32 gap-x-6 gap-y-6">
        {Array.from({ length: GRID_CONFIGS.desktop.rows }, (_, row) =>
          Array.from({ length: GRID_CONFIGS.desktop.cols }, (_, col) => (
            <div
              key={`desktop-cell-${row}-${col}`}
              className="relative border border-red-300/30"
              style={{
                gridRow: row + 1,
                gridColumn: col + 1,
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs text-red-400/70 font-mono">
                {row + 1},{col + 1}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

// Debug Toggle Context
interface DebugContextType {
  showDebug: boolean;
  toggleDebug: () => void;
}

const DebugContext = createContext<DebugContextType | null>(null);

// Debug Provider Component
export const GridDebugProvider = ({ children }: { children: ReactNode }) => {
  const [showDebug, setShowDebug] = useState(false);
  
  const toggleDebug = () => setShowDebug(!showDebug);
  
  return (
    <DebugContext.Provider value={{ showDebug, toggleDebug }}>
      {children}
    </DebugContext.Provider>
  );
};

// Debug Toggle Button Component
export const GridDebugToggle = () => {
  const context = useContext(DebugContext);
  
  if (!context) {
    throw new Error('GridDebugToggle must be used within GridDebugProvider');
  }
  
  const { showDebug, toggleDebug } = context;
  
  return (
    <button
      onClick={toggleDebug}
      className={cn(
        "fixed bottom-4 right-4 z-[10000]",
        "w-10 h-10 rounded-full",
        "bg-neutral-800 hover:bg-neutral-700",
        "text-white text-xs font-mono",
        "border border-neutral-600",
        "transition-all duration-200",
        "shadow-lg hover:shadow-xl"
      )}
      title="Toggle Grid Debug"
    >
      {showDebug ? "×" : "⊞"}
    </button>
  );
}; 