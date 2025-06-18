import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Common animation configurations
export const animationConfig = {
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.1,
};

// Fade in animation
export const fadeIn = (element: string | Element, options?: gsap.TweenVars) => {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      ...options,
    }
  );
};

// Slide in from left
export const slideInLeft = (element: string | Element, options?: gsap.TweenVars) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: -50 },
    {
      opacity: 1,
      x: 0,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      ...options,
    }
  );
};

// Slide in from right
export const slideInRight = (element: string | Element, options?: gsap.TweenVars) => {
  return gsap.fromTo(
    element,
    { opacity: 0, x: 50 },
    {
      opacity: 1,
      x: 0,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      ...options,
    }
  );
};

// Scale in animation
export const scaleIn = (element: string | Element, options?: gsap.TweenVars) => {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8 },
    {
      opacity: 1,
      scale: 1,
      duration: animationConfig.duration,
      ease: animationConfig.ease,
      ...options,
    }
  );
};

export { gsap, ScrollTrigger }; 