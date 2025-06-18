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
        "relative w-full h-screen",
        // 12 columns with 8rem (128px) margin and 1.5rem (24px) gutters
        "grid grid-cols-12 grid-rows-[repeat(16,1fr)]",
        "mx-32", // 8rem horizontal margins
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

// Debug Grid Overlay
const GridDebugOverlay = () => {
  return (
    <>
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none z-[9999]">
        {/* Column lines */}
        {Array.from({ length: 13 }, (_, i) => (
          <div
            key={`col-${i}`}
            className="absolute top-0 bottom-0 w-px bg-red-300/50"
            style={{
              left: `${(i / 12) * 100}%`,
            }}
          />
        ))}
        {/* Row lines */}
        {Array.from({ length: 17 }, (_, i) => (
          <div
            key={`row-${i}`}
            className="absolute left-0 right-0 h-px bg-red-300/50"
            style={{
              top: `${(i / 16) * 100}%`,
            }}
          />
        ))}
        {/* Grid cell numbers */}
        {Array.from({ length: 16 }, (_, row) =>
          Array.from({ length: 12 }, (_, col) => (
            <div
              key={`cell-${row}-${col}`}
              className="absolute text-xs text-red-400/70 font-mono pointer-events-none"
              style={{
                top: `${((row + 0.5) / 16) * 100}%`,
                left: `${((col + 0.5) / 12) * 100}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {row + 1},{col + 1}
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
      {/* Apply debug styles globally when enabled */}
      {showDebug && (
        <style jsx global>{`
          .precision-grid {
            position: relative;
          }
          .precision-grid::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: 
              repeating-linear-gradient(
                to right,
                transparent,
                transparent calc((100% - 16rem) / 12 - 1px),
                rgba(239, 68, 68, 0.15) calc((100% - 16rem) / 12),
                rgba(239, 68, 68, 0.15) calc((100% - 16rem) / 12 + 1px)
              ),
              repeating-linear-gradient(
                to bottom,
                transparent,
                transparent calc(100% / 16 - 1px),
                rgba(239, 68, 68, 0.15) calc(100% / 16),
                rgba(239, 68, 68, 0.15) calc(100% / 16 + 1px)
              );
            pointer-events: none;
            z-index: 9998;
            margin: 0 8rem;
          }
        `}</style>
      )}
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