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

### Component Architecture

#### Named Component Extraction

For complex sections, we follow a **component extraction pattern** that breaks down monolithic components into clearly named, focused sub-components.

**Example Structure**
```tsx
// ==================== EXTRACTED COMPONENTS ====================

const SectionBackground = () => (
  <div 
    data-testid="section-background"
    data-component="section-background"
  >
    {/* Background implementation */}
  </div>
);

const SectionContent = () => (
  <div 
    data-testid="section-content"
    data-component="section-content"
  >
    {/* Main content area */}
  </div>
);

const SectionImage = () => (
  <div 
    data-testid="section-image"  
    data-component="section-image"
  >
    {/* Image implementation */}
  </div>
);

// ==================== MAIN SECTION ====================

const MainSection = () => {
  return (
    <section 
      data-testid="main-section"
      data-component="main-section"
    >
      <SectionBackground />
      <SectionContent />
      <SectionImage />
    </section>
  );
};
```

#### Component Identification Standards

**Data Attributes for Element Identification:**
- `data-testid`: For automated testing and QA identification
- `data-component`: For development/debugging and clear communication

**Benefits:**
- **Clear Communication**: "Adjust the HeroContent positioning" vs "adjust the content in the hero"
- **Easier Maintenance**: Smaller, focused components are easier to modify
- **Better Testing**: Each component can be tested independently
- **Improved Debugging**: Clear component boundaries in dev tools

#### Naming Conventions

**Component Names:**
- Use descriptive, semantic names that clearly indicate purpose
- Follow PascalCase for component names
- Prefix with parent component name for clarity (e.g., `SectionContent`, `SectionImage`)

**Data Attribute Values:**
- Use kebab-case for data attribute values
- Match component names but in lowercase with hyphens
- Be consistent across the entire application

This pattern is applied throughout the application for maintainable, communicable code architecture.

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
2. **Hero Section** - Main banner with call-to-action (ready to be built from scratch)
3. **About Section** - Firm overview and values
4. **Services Section** - Legal practice areas
5. **Team Section** - Attorney profiles
6. **Testimonials** - Client reviews
7. **Contact Section** - Contact form and information
8. **Footer** - Additional links and information

## 🚀 Deployment

This project is ready to deploy on Vercel, Netlify, or any platform that supports Next.js.

## 📚 Documentation

### Project Documentation

- **[README.md](./README.md)** - Project overview, setup, and development guide
- **[Design System](#design-system)** - Brand colors, typography, and spacing
- **[Technology Stack](#technology-stack)** - Framework and library information

---

Ready to start building your professional law firm website! 🏛️