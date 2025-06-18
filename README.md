# Amara Law Firm Website

A modern, professional website for Amara Law Firm built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## 🚀 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: 
  - Framer Motion (for component animations)
  - GSAP (for complex animations and scroll triggers)
- **Fonts**: Inter (body text) and Playfair Display (headings)

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
│   ├── gsap.ts          # GSAP utilities and animations
│   ├── framer-variants.ts # Framer Motion variants
│   └── utils.ts          # General utilities
├── hooks/                # Custom React hooks
└── styles/               # Additional styles
```

## 🎨 Design System

### Colors
- **Primary**: Deep blue (`#1a365d`) - Professional and trustworthy
- **Secondary**: Light gray (`#f7fafc`) - Clean backgrounds
- **Accent**: Red (`#c53030`) - Call-to-action elements

### Typography
- **Headings**: Playfair Display (serif) - Elegant and professional
- **Body**: Inter (sans-serif) - Clean and readable

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

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser

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
`