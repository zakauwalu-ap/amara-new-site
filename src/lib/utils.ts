import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Responsive Grid Utilities
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const GRID_CONFIGS = {
  mobile: { cols: 4, rows: 12 },   // sm and below
  tablet: { cols: 8, rows: 10 },  // md
  desktop: { cols: 16, rows: 16 }, // lg+
} as const;

export type ResponsiveGridArea = {
  desktop: [number, number, number, number]; // [rowStart, rowEnd, colStart, colEnd]
  tablet?: [number, number, number, number];
  mobile?: [number, number, number, number];
};

// Helper function to adapt grid coordinates between different grid sizes
export function adaptGridCoordinates(
  desktopCoords: [number, number, number, number],
  fromGrid: { cols: number; rows: number },
  toGrid: { cols: number; rows: number }
): [number, number, number, number] {
  const [rowStart, rowEnd, colStart, colEnd] = desktopCoords;
  
  // Calculate relative positions (0-1 scale)
  const relativeRowStart = (rowStart - 1) / fromGrid.rows;
  const relativeRowEnd = (rowEnd - 1) / fromGrid.rows;
  const relativeColStart = (colStart - 1) / fromGrid.cols;
  const relativeColEnd = (colEnd - 1) / fromGrid.cols;
  
  // Map to new grid
  const newRowStart = Math.max(1, Math.round(relativeRowStart * toGrid.rows) + 1);
  const newRowEnd = Math.max(newRowStart + 1, Math.round(relativeRowEnd * toGrid.rows) + 1);
  const newColStart = Math.max(1, Math.round(relativeColStart * toGrid.cols) + 1);
  const newColEnd = Math.max(newColStart + 1, Math.round(relativeColEnd * toGrid.cols) + 1);
  
  return [newRowStart, newRowEnd, newColStart, newColEnd];
}

// Helper to automatically generate responsive grid areas
export function createResponsiveGridArea(
  desktop: [number, number, number, number],
  tablet?: [number, number, number, number],
  mobile?: [number, number, number, number]
): ResponsiveGridArea {
  return {
    desktop,
    tablet: tablet || adaptGridCoordinates(desktop, GRID_CONFIGS.desktop, GRID_CONFIGS.tablet),
    mobile: mobile || adaptGridCoordinates(desktop, GRID_CONFIGS.desktop, GRID_CONFIGS.mobile),
  };
}

// Common breakpoints for responsive design
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Common z-index values
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modal: 1040,
  popover: 1050,
  tooltip: 1060,
};

// Scroll to element utility
export const scrollToElement = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    });
  }
}; 