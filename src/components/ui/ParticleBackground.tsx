'use client';

import React, { useCallback, useMemo, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { loadTrailEffect } from "@tsparticles/effect-trail";

interface ParticleBackgroundProps {
  /** Number of particles to render (default: 80) */
  particleCount?: number;
  /** Primary color for particles and links (default: "#DBCDAE" - brand gold) */
  color?: string;
  /** Movement speed of particles (default: 1.5) */
  speed?: number;
  /** Whether to show connecting lines between particles (default: true) */
  enableLinks?: boolean;
  /** Whether particles should react to mouse interactions (default: true) */
  interactive?: boolean;
  /** Custom z-index for the background (default: -1) */
  zIndex?: number;
  /** Additional CSS classes */
  className?: string;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  particleCount = 80,
  color = "#DBCDAE", // Brand gold
  speed = 1.2,
  enableLinks = true,
  interactive = true,
  zIndex = -1,
  className = "",
}) => {
  const [init, setInit] = useState(false);

  // Initialize particles engine - this should run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
      await loadTrailEffect(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Callback when particles are loaded
  const particlesLoaded = useCallback(async (container?: Container) => {
    // Clean callback without debugging
  }, []);

  // Memoize particle configuration for performance
  const particlesOptions: ISourceOptions = useMemo(() => {
    // Adjust particle count based on screen size for performance
    const getResponsiveParticleCount = () => {
      if (typeof window !== "undefined") {
        const width = window.innerWidth;
        if (width < 768) return Math.floor(particleCount * 0.6); // 60% on mobile
        if (width < 1024) return Math.floor(particleCount * 0.8); // 80% on tablet
      }
      return particleCount;
    };

    return {
      background: {
        color: {
          value: "transparent", // Let CSS handle the gradient background
        },
      },
      fpsLimit: 120,
      interactivity: {
        detect_on: "canvas",
        events: {
          onClick: {
            enable: interactive,
            mode: "push",
          },
          onHover: {
            enable: interactive,
            mode: "attract",
          },
          resize: {
            enable: true,
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 150,
            duration: 0.6,
            factor: 3,
            speed: 2,
          },
          attract: {
            distance: 250,
            factor: 5,
            speed: 2,
          },
          bubble: {
            distance: 200,
            size: 6,
            duration: 2,
            opacity: 0.9,
          },
        },
      },
      particles: {
        color: {
          value: color,
        },
        links: {
          enable: false, // Disable particle links
        },
        // Add trail effect configuration
        effect: {
          type: "trail",
          options: {
            trail: {
              length: {
                min: 15,
                max: 100,
              },
              minWidth: 1,
              maxWidth: 3,
              fade: true,
            },
          },
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true, // Changed to true for more dynamic movement
          speed: speed * 1.2, // Increased speed for better trail visibility
          straight: false,
          attract: {
            enable: true,
            rotate: {
              x: 600,
              y: 600,
            },
          },
          // Add more dynamic movement patterns
          path: {
            enable: true,
            options: {
              sides: {
                count: {
                  min: 4,
                  max: 8,
                },
              },
            },
          },
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: getResponsiveParticleCount(),
        },
        opacity: {
          value: 0.8,
          random: {
            enable: true,
            minimumValue: 0.5,
          },
          animation: {
            enable: true,
            speed: 1.5,
            minimumValue: 0.5,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 2, max: 4 },
          animation: {
            enable: true,
            speed: 3,
            minimumValue: 2,
            sync: false,
          },
        },
      },
      detectRetina: true,
      // Respect user's motion preferences for accessibility
      motion: {
        disable: false,
        reduce: {
          factor: 4,
          value: true,
        },
      },
      // Responsive configuration
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: {
                value: Math.floor(particleCount * 0.6),
              },
              move: {
                speed: speed * 0.8,
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: false, // Disable hover on mobile for performance
                },
              },
              modes: {
                attract: {
                  distance: 150,
                  factor: 2,
                  speed: 0.8,
                },
              },
            },
          },
        },
        {
          maxWidth: 1024,
          options: {
            particles: {
              number: {
                value: Math.floor(particleCount * 0.8),
              },
            },
          },
        },
      ],
    };
  }, [particleCount, color, speed, enableLinks, interactive]);

  // Don't render until particles engine is initialized
  if (!init) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ 
        zIndex,
        background: `
          radial-gradient(ellipse at top left, rgba(73, 102, 179, 0.8) 0%, rgba(73, 102, 179, 0.4) 50%, rgba(12, 21, 40, 0.9) 100%),
          linear-gradient(135deg, #4966B3 0%, #364F9F 25%, #2D4395 50%, #1E2B5C 75%, #0C1528 100%)
        `
      }}
      aria-hidden="true" // Hide from screen readers as it's decorative
    >
      <Particles
        id="particle-background"
        particlesLoaded={particlesLoaded}
        options={particlesOptions}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};

export default ParticleBackground; 