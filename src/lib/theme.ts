// Amara Law Firm Design System
// Brand colors, typography, and design tokens

export const colors = {
  // Brand Colors (from amara-partners-colors.png)
  brand: {
    blue: '#4966B3',        // HEX: 4966B3, RGB: 73, 107, 179
    gold: '#DBCDAE',        // HEX: DBCDAE, RGB: 219, 205, 174
    dark: '#0C1528',        // HEX: 0C1528, RGB: 12, 21, 40
    charcoal: '#1E242D',    // HEX: 1E242D, RGB: 30, 36, 45
    shadowGrey: '#565E71',  // HEX: 565E71, RGB: 86, 94, 113
    lightGrey: '#E2E3E4',   // HEX: E2E3E4, RGB: 226, 227, 228
  },
  
  // Semantic Colors for Development
  primary: {
    50: '#EEF2FF',
    100: '#E0E7FF', 
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#4966B3',  // Brand Blue
    600: '#3F5BA9',
    700: '#364F9F',
    800: '#2D4395',
    900: '#1E2B5C',
  },
  
  secondary: {
    50: '#FDFDF9',
    100: '#F9F7F0',
    200: '#F3EFE1',
    300: '#EDE7D2',
    400: '#E5D7B8',
    500: '#DBCDAE',  // Brand Gold
    600: '#D4C299',
    700: '#CDB684',
    800: '#C6AB6F',
    900: '#B8994D',
  },
  
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#565E71',  // Brand Shadow Grey
    700: '#404040',
    800: '#1E242D',  // Brand Charcoal
    900: '#0C1528',  // Brand Dark
  },
  
  // System Colors
  white: '#FFFFFF',
  black: '#000000',
  background: '#FFFFFF',
  foreground: '#0C1528',
  
  // State Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
} as const;

export const typography = {
  // Font Families
  fontFamily: {
    // Amara & Partners Sans Serif (Headings) - Based on typography system
    heading: ['Amara Serif', 'Playfair Display', 'Georgia', 'serif'],
    // Cabinet Grotesk (Body Text) - Based on typography system
    body: ['Cabinet Grotesk', 'Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
  },
  
  // Font Sizes (Based on typography hierarchy)
  fontSize: {
    // H1: 52px/56px, Bold, 5% letter-spacing
    'h1': ['3.25rem', { lineHeight: '3.5rem', letterSpacing: '0.05em', fontWeight: '700' }],
    // H2: 24px/30px, Medium, 3% letter-spacing  
    'h2': ['1.5rem', { lineHeight: '1.875rem', letterSpacing: '0.03em', fontWeight: '500' }],
    // H3: 20px/26px, Regular, 2% letter-spacing
    'h3': ['1.25rem', { lineHeight: '1.625rem', letterSpacing: '0.02em', fontWeight: '400' }],
    
    // Body Text
    // Primary body: 16px/24px, Regular, 0% letter-spacing
    'body-lg': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0em', fontWeight: '400' }],
    // Secondary body: 14px/20px, Regular, 0% letter-spacing
    'body-md': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0em', fontWeight: '400' }],
    // Tertiary elements: 12px/16px, Regular or Medium
    'body-sm': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0em', fontWeight: '400' }],
    
    // Additional sizes
    'xs': ['0.75rem', { lineHeight: '1rem' }],
    'sm': ['0.875rem', { lineHeight: '1.25rem' }],
    'base': ['1rem', { lineHeight: '1.5rem' }],
    'lg': ['1.125rem', { lineHeight: '1.75rem' }],
    'xl': ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },
  
  // Font Weights
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
  
  // Line Heights
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
} as const;

// Spacing Scale (8px base unit = 0.5rem)
export const spacing = {
  0: '0px',
  0.5: '2px',   // 0.125rem
  1: '4px',     // 0.25rem
  2: '8px',     // 0.5rem (base unit)
  3: '12px',    // 0.75rem
  4: '16px',    // 1rem
  5: '20px',    // 1.25rem
  6: '24px',    // 1.5rem
  8: '32px',    // 2rem
  10: '40px',   // 2.5rem
  12: '48px',   // 3rem
  16: '64px',   // 4rem
  20: '80px',   // 5rem
  24: '96px',   // 6rem
  32: '128px',  // 8rem
  40: '160px',  // 10rem
  48: '192px',  // 12rem
  56: '224px',  // 14rem
  64: '256px',  // 16rem
} as const;

// Responsive Breakpoints
export const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px', // Ultra-wide
} as const;

// Shadows
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  none: '0 0 #0000',
} as const;

// Border Radius
export const borderRadius = {
  none: '0px',
  sm: '2px',
  DEFAULT: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
} as const;

// Z-Index Scale
export const zIndex = {
  0: '0',
  10: '10',
  20: '20',
  30: '30',
  40: '40',
  50: '50',
  auto: 'auto',
  dropdown: '1000',
  sticky: '1020',
  fixed: '1030',
  modal: '1040',
  popover: '1050',
  tooltip: '1060',
} as const;

// Animation Durations
export const duration = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
} as const;

// Complete theme object
export const theme = {
  colors,
  typography,
  spacing,
  breakpoints,
  shadows,
  borderRadius,
  zIndex,
  duration,
} as const;

// Type exports for TypeScript
export type Colors = typeof colors;
export type Typography = typeof typography;
export type Spacing = typeof spacing;
export type Breakpoints = typeof breakpoints;
export type Theme = typeof theme; 