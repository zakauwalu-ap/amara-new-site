# Amara Law Firm Website

A modern, professional website for Amara Law Firm built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## 🚀 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: 
  - Framer Motion (for component animations)
  - GSAP (for complex animations and scroll triggers)
- **Fonts**: Custom brand fonts (Amara Serif & Cabinet Grotesk)

## 🎨 Design System

### Brand Colors

Our color palette is based on the official Amara & Partners brand guidelines:

#### Primary Brand Colors
- **Blue** `#4966B3` - Primary brand color, professional and trustworthy
- **Gold** `#DBCDAE` - Secondary/accent color, warm and sophisticated
- **Dark** `#0C1528` - Deep navy for primary text and headings
- **Charcoal** `#1E242D` - Secondary dark for supporting text
- **Shadow Grey** `#565E71` - Muted text and subtle elements
- **Light Grey** `#E2E3E4` - Backgrounds, borders, and dividers

#### Usage in CSS/Tailwind
```css
/* Direct brand colors */
.text-brand-blue { color: #4966B3; }
.bg-brand-gold { background-color: #DBCDAE; }

/* Semantic color scales */
.text-primary-500 { color: #4966B3; }
.bg-secondary-100 { background-color: #F9F7F0; }
.text-neutral-600 { color: #565E71; }
```

#### Color Scales
Each brand color has been expanded into a full 50-900 scale for flexible usage:

**Primary (Blue) Scale:**
- `primary-50` to `primary-900` (lightest to darkest)
- Core brand blue at `primary-500`

**Secondary (Gold) Scale:**
- `secondary-50` to `secondary-900`
- Core brand gold at `secondary-500`

**Neutral (Grey) Scale:**
- `neutral-50` to `neutral-900`
- Incorporates brand greys at appropriate steps

### Typography System

#### Font Families

**Amara Serif** (Headings)
- Custom brand font (Amara & Partners Sans Serif)
- Usage: All headings (H1-H6) and key callouts
- Weights: Regular (400), Medium (500), Bold (700)
- Fallbacks: Playfair Display, Georgia, serif

**Cabinet Grotesk** (Body Text)
- Custom brand font with variable weight support
- Usage: All body text, buttons, navigation
- Weights: Variable (100-900), with Regular (400) and Medium (500) specifically loaded
- Fallbacks: Inter, system-ui, sans-serif

#### Typography Hierarchy

**Hero** - `text-hero` or `text-[112px]/[120px]`
- 112px/120px, Bold, 2% letter-spacing
- For extra-large hero sections and impact statements

**H1** - `text-h1` or standard `h1` tag
- 52px/56px, Bold, 2% letter-spacing
- Main page headings

**H2** - `text-h2` or standard `h2` tag
- 24px/30px, Medium, 2% letter-spacing
- Section headings

**H3** - `text-h3` or standard `h3` tag
- 20px/26px, Regular, 2% letter-spacing
- Subsection headings

**Body Large** - `text-body-lg`
- 16px/24px, Regular, 0% letter-spacing
- Primary body text

**Body Medium** - `text-body-md`
- 14px/20px, Regular, 0% letter-spacing
- Secondary body text

**Body Small** - `text-body-sm`
- 12px/16px, Regular or Medium, 0% letter-spacing
- Tertiary elements, captions, labels

#### Usage Examples
```tsx
// Hero section
<h1 className="font-serif text-hero text-brand-blue">
  Welcome to Amara Law Firm
</h1>

// Standard heading
<h2 className="font-serif text-brand-blue">
  Our Services
</h2>

// Body text
<p className="text-body-lg text-neutral-600">
  Professional legal services you can trust.
</p>
```

### Spacing Scale

Based on an 8px grid system (0.5rem base unit):

```
2px   → spacing-0.5
4px   → spacing-1
8px   → spacing-2  (base unit)
12px  → spacing-3
16px  → spacing-4
24px  → spacing-6
32px  → spacing-8
48px  → spacing-12
64px  → spacing-16
96px  → spacing-24
128px → spacing-32
```

Usage:
```tsx
<div className="px-6 py-4 mb-8">  {/* 24px, 16px, 32px */}
```

### Responsive Breakpoints

- **sm**: 640px (Mobile landscape)
- **md**: 768px (Tablet)
- **lg**: 1024px (Desktop)
- **xl**: 1280px (Large desktop)
- **2xl**: 1536px (Ultra-wide)

Usage:
```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text
</div>
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── sections/         # Page sections (Hero, About, etc.)
├── lib/                  # Utility libraries
│   ├── theme.ts          # Design system and theme configuration
│   ├── gsap.ts          # GSAP utilities and animations
│   ├── framer-variants.ts # Framer Motion variants
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
└── styles/               # Additional styles

public/
├── fonts/                # Custom font files
│   ├── CabinetGrotesk-Variable.woff2
│   ├── CabinetGrotesk-Regular.woff2
│   ├── CabinetGrotesk-Medium.woff2
│   ├── AmaraSerif-Regular.ttf
│   ├── AmaraSerif-Medium.ttf
│   └── AmaraSerif-Bold.ttf
└── [logo files]          # Brand assets
```

## 🏗️ Layout System

### PrecisionGrid

The site uses a custom hybrid layout system called **PrecisionGrid** that combines CSS Grid with absolute positioning capabilities.

#### Grid Structure
- **12 columns × 16 rows** responsive grid system
- **128px horizontal margins** (`px-32`)
- **24px gutters** throughout (`gap-6`)
- **Full viewport height** (`h-screen`)
- **Viewport width** (`w-screen`)

#### Usage

**Grid Items** - Use `GridItem` for elements that follow the grid structure:
```tsx
import { GridItem, PrecisionGrid } from '@/components/ui/precision-grid';

// Place element from position (2,2) to position (12,5) inclusive
<GridItem gridArea={[2, 13, 2, 6]}>
  <div>Your content</div>
</GridItem>
```

**Absolute Items** - Use `AbsoluteItem` for floating elements:
```tsx
import { AbsoluteItem } from '@/components/ui/precision-grid';

// Float element at 10% from top, 85% from left, 12% width, 8% height
<AbsoluteItem position={[10, 85, 12, 8]}>
  <div>Floating content</div>
</AbsoluteItem>
```

#### Coordinate System
- **Grid coordinates**: `[row-start, row-end+1, col-start, col-end+1]`
  - When you say "from 2,2 to 12,5", use `[2, 13, 2, 6]` (CSS Grid uses exclusive end values)
- **Absolute coordinates**: `[top%, left%, width%, height%]`

#### Debug Mode
Toggle the grid debug visualization to see cell boundaries and numbers:
```tsx
import { GridDebugProvider, GridDebugToggle } from '@/components/ui/precision-grid';

<GridDebugProvider>
  <PrecisionGrid>
    {/* Your content */}
    <GridDebugToggle />
  </PrecisionGrid>
</GridDebugProvider>
```

#### Responsive Behavior
- **Desktop**: 12×16 grid (default)
- **Tablet**: 8×10 grid (future implementation)
- **Mobile**: 4×12 grid (future implementation)

## 🛠️ Development

### Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎬 Animation Libraries Setup

### GSAP
- Pre-configured with ScrollTrigger plugin
- Utility functions for common animations (fadeIn, slideIn, scaleIn)
- Server-side rendering safe

### Framer Motion
- Pre-built animation variants
- Stagger animations for lists
- Hover and tap interactions

## 🎨 Theme Usage

### Accessing Theme Values

```tsx
import { theme } from '@/lib/theme';

// In your components
const primaryColor = theme.colors.primary[500];
const heroFontSize = theme.typography.fontSize.hero;
```

### Tailwind Classes

```tsx
// Colors
className="bg-primary-500 text-white"
className="text-brand-blue border-brand-gold"

// Typography  
className="font-serif text-hero"
className="font-sans text-body-lg"

// Spacing
className="px-6 py-4 mb-8"

// Responsive
className="text-base lg:text-hero"
```

## 📋 Next Steps

The project is now ready for development! We'll build the website section by section:

1. **Navigation Header** - Logo, menu, contact info
2. **Hero Section** - Main banner with call-to-action
3. **About Section** - Firm overview and values
4. **Services Section** - Legal practice areas
5. **Team Section** - Attorney profiles
6. **Testimonials** - Client reviews
7. **Contact Section** - Contact form and information
8. **Footer** - Additional links and information

## 🚀 Deployment

This project is ready to deploy on Vercel, Netlify, or any platform that supports Next.js.

---

Ready to start building your professional law firm website! 🏛️

## 🎯 Precision Layout System

### Overview

The **Precision Layout System** provides pixel-perfect control for element placement using a hybrid approach:

- **12 Columns × 16 Rows** main grid
- **8rem (128px) horizontal margins**
- **1.5rem (24px) gutters** for both columns and rows
- **Absolute positioning** for off-grid elements
- **Visual debugging tools** for development

### Grid Specifications

```
Columns: 12 (1fr each)
Rows: 16 (1fr each)
Horizontal Margin: 8rem (128px) - spacing-32
Column Gutter: 1.5rem (24px) - spacing-6
Row Gutter: 1.5rem (24px) - spacing-6
Vertical Margin: 0
```

### Communication Protocol

Use this format for precise element placement:

#### Grid Elements
```
"Place [element] at grid [row-start, row-end, col-start, col-end]"

Examples:
- "Place the logo at grid [1, 2, 1, 3]"
- "Put hero text at grid [3, 6, 2, 8] with center alignment"
- "Position the contact form at grid [8, 12, 7, 12]"
```

#### Absolute Elements (Off-Grid)
```
"Float [element] at absolute [top%, left%, width%, height%]"

Examples:
- "Float contact button at absolute [5, 85, 12, 8]" 
- "Overlay background pattern at absolute [0, 0, 100, 100] with z-index -1"
- "Position floating CTA at absolute [50, 90, 15, 6]"
```

### Components

#### PrecisionGrid
Main container component that establishes the 12×16 grid system.

```tsx
import { PrecisionGrid } from '@/components/ui/precision-grid';

<PrecisionGrid className="bg-white">
  {/* Grid and absolute items go here */}
</PrecisionGrid>
```

#### GridItem
For elements that align to the grid system.

```tsx
import { GridItem } from '@/components/ui/precision-grid';

<GridItem 
  gridArea={[1, 3, 1, 4]}  // row 1-3, col 1-4
  className="bg-brand-blue p-6"
>
  <h1>Grid-aligned content</h1>
</GridItem>
```

#### AbsoluteItem
For elements that need precise positioning outside the grid.

```tsx
import { AbsoluteItem } from '@/components/ui/precision-grid';

<AbsoluteItem 
  position={[10, 85, 15, 8]}  // 10% top, 85% left, 15% width, 8% height
  className="bg-brand-gold"
  zIndex={50}
>
  <button>Floating CTA</button>
</AbsoluteItem>
```

### Visual Debugging

#### GridDebugToggle
Add to any page for development visualization (must be within GridDebugProvider):

```tsx
import { GridDebugToggle, GridDebugProvider } from '@/components/ui/precision-grid';

// Wrap your page/component with the provider
<GridDebugProvider>
  {/* Your grid content */}
  <GridDebugToggle />
</GridDebugProvider>
```

**Features:**
- Toggles grid line visibility
- Shows cell coordinates (row, col)
- Discreet bottom-right button
- Red semi-transparent overlay
- Does not affect layout or functionality

### Responsive Strategy

The system uses rem-based units for proper scaling:

- **16px = 1rem** (browser default)
- All spacing uses rem units for consistent scaling
- Grid maintains proportions across devices
- Absolute positioning uses percentages for flexibility

### Best Practices

1. **Use Grid First**: Start with `GridItem` for structured layouts
2. **Absolute for Overlays**: Use `AbsoluteItem` for floating elements, overlays, or decorative elements
3. **Consistent Spacing**: Leverage the spacing scale (spacing-6, spacing-8, etc.)
4. **Debug During Development**: Always use `GridDebugToggle` while positioning elements
5. **Coordinate Reference**: Grid coordinates are 1-indexed (1,1 is top-left)

### Example Usage

```tsx
import { 
  PrecisionGrid, 
  GridItem, 
  AbsoluteItem, 
  GridDebugToggle,
  GridDebugProvider
} from '@/components/ui/precision-grid';

export default function HomePage() {
  return (
    <GridDebugProvider>
      <PrecisionGrid>
      {/* Logo - Top left */}
      <GridItem gridArea={[1, 2, 1, 3]} className="flex items-center">
        <img src="/logo.svg" alt="Logo" />
      </GridItem>
      
      {/* Hero Text - Center left */}
      <GridItem 
        gridArea={[6, 10, 2, 8]} 
        className="flex flex-col justify-center"
      >
        <h1 className="text-h1 text-brand-blue">Excellence. Redefined.</h1>
        <p className="text-body-lg mt-4">Professional legal services.</p>
      </GridItem>
      
      {/* Floating CTA */}
      <AbsoluteItem 
        position={[15, 85, 12, 6]}
        className="bg-brand-gold rounded-lg flex items-center justify-center"
        zIndex={50}
      >
        <button className="text-brand-dark font-medium">Contact Us</button>
      </AbsoluteItem>
      
      {/* Debug toggle for development */}
      <GridDebugToggle />
    </PrecisionGrid>
    </GridDebugProvider>
  );
}
```