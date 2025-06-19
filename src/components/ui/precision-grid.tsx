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
  gridArea: [number, number, number, number]; // [rowStart, rowEnd, colStart, colEnd]
  className?: string;
}

interface AbsoluteItemProps {
  children: ReactNode;
  position: [number, number, number, number]; // [top%, left%, width%, height%]
  className?: string;
  zIndex?: number;
}

// Main Grid Container
export const PrecisionGrid = ({ children, className }: Omit<PrecisionGridProps, 'showDebug'>) => {
  const debugContext = useContext(DebugContext);
  const showDebug = debugContext?.showDebug || false;
  
  return (
    <div 
      className={cn(
        "precision-grid", // For debug styling
        "relative w-screen h-screen",
        // 12 columns with 8rem (128px) margin and 1.5rem (24px) gutters
        "grid grid-cols-12 grid-rows-[repeat(16,1fr)]",
        "px-32", // 8rem horizontal padding (not margin)
        "gap-x-6 gap-y-6", // 1.5rem gutters
        "py-0", // 0 vertical margin
        className
      )}
      style={{
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridTemplateRows: 'repeat(16, 1fr)',
      }}
    >
      {showDebug && <GridDebugOverlay />}
      {children}
    </div>
  );
};

// Grid Item Component
export const GridItem = ({ children, gridArea, className }: GridItemProps) => {
  const [rowStart, rowEnd, colStart, colEnd] = gridArea;
  
  return (
    <div
      className={cn("relative", className)}
      style={{
        gridRow: `${rowStart} / ${rowEnd}`,
        gridColumn: `${colStart} / ${colEnd}`,
      }}
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

// Debug Grid Overlay - matches the actual CSS Grid positioning
const GridDebugOverlay = () => {
  return (
    <>
      {/* Create a grid that mirrors the actual CSS Grid structure */}
      <div 
        className="absolute inset-0 pointer-events-none z-[9999] grid grid-cols-12 grid-rows-[repeat(16,1fr)] px-32 gap-x-6 gap-y-6"
      >
        {/* Generate grid cells with numbers and borders */}
        {Array.from({ length: 16 }, (_, row) =>
          Array.from({ length: 12 }, (_, col) => (
            <div
              key={`cell-${row}-${col}`}
              className="relative border border-red-300/30"
              style={{
                gridRow: row + 1,
                gridColumn: col + 1,
              }}
            >
              {/* Cell number */}
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