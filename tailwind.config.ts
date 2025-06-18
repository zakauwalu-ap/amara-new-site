import type { Config } from "tailwindcss";
import { theme } from "./src/lib/theme";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        'brand-blue': theme.colors.brand.blue,
        'brand-gold': theme.colors.brand.gold,
        'brand-dark': theme.colors.brand.dark,
        'brand-charcoal': theme.colors.brand.charcoal,
        'brand-shadow-grey': theme.colors.brand.shadowGrey,
        'brand-light-grey': theme.colors.brand.lightGrey,
        
        // Semantic colors
        primary: theme.colors.primary,
        secondary: theme.colors.secondary,
        neutral: theme.colors.neutral,
        
        // System colors
        background: theme.colors.background,
        foreground: theme.colors.foreground,
        
        // State colors
        success: theme.colors.success,
        warning: theme.colors.warning,
        error: theme.colors.error,
        info: theme.colors.info,
      },
      fontFamily: {
        sans: theme.typography.fontFamily.body,
        serif: theme.typography.fontFamily.heading,
        mono: theme.typography.fontFamily.mono,
      },
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      letterSpacing: theme.typography.letterSpacing,
      lineHeight: theme.typography.lineHeight,
      spacing: theme.spacing,
      screens: theme.breakpoints,
      boxShadow: theme.shadows,
      borderRadius: theme.borderRadius,
      zIndex: theme.zIndex,
      transitionDuration: theme.duration,
    },
  },
  plugins: [],
} satisfies Config; 