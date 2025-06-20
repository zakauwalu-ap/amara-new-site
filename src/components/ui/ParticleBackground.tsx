'use client';

import React, { useCallback, useMemo, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

interface ParticleBackgroundProps {
  /** Number of particles to render (default: 100) */
  particleCount?: number;
  /** Primary color for particles and links (default: "#ffffff") */
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
  particleCount = 100,
  color = "#ffffff",
  speed = 1.5,
  enableLinks = true,
  interactive = true,
  zIndex = -1,
  className = "",
}) => {
  const [init, setInit] = useState(false);

  // Initialize particles engine - this should run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Callback when particles are loaded
  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log("Particles loaded:", container);
    if (container) {
      console.log("Particle count:", container.particles.count);
      console.log("Canvas dimensions:", container.canvas.size);
    }
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

    const finalParticleCount = getResponsiveParticleCount();
    console.log("Configured particle count:", finalParticleCount);

    return {
      background: {
        color: {
          value: "#000000", // Temporary dark background for debugging
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
            mode: "repulse",
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
            distance: 100,
            duration: 0.4,
          },
          bubble: {
            distance: 200,
            size: 4,
            duration: 2,
            opacity: 0.8,
          },
        },
      },
      particles: {
        color: {
          value: "#00ff00", // Bright green for debugging
        },
        links: {
          color: "#ff0000", // Bright red links for debugging
          distance: 150,
          enable: enableLinks,
          opacity: 0.8, // Higher opacity for debugging
          width: 2, // Thicker lines for debugging
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: speed,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: finalParticleCount,
        },
        opacity: {
          value: 1.0, // Full opacity for debugging
          random: {
            enable: false, // Disable random opacity for debugging
            minimumValue: 0.3,
          },
          animation: {
            enable: false, // Disable animation for debugging
            speed: 1,
            minimumValue: 0.3,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 5, max: 10 }, // Larger particles for debugging
          animation: {
            enable: false, // Disable animation for debugging
            speed: 2,
            minimumValue: 1,
            sync: false,
          },
        },
      },
      detectRetina: true,
      // Remove motion reduce for debugging
      // motion: {
      //   disable: false,
      //   reduce: {
      //     factor: 4,
      //     value: true,
      //   },
      // },
    };
  }, [particleCount, color, speed, enableLinks, interactive]);

  // Don't render until particles engine is initialized
  if (!init) {
    console.log("Particles engine not initialized yet");
    return <div className="fixed inset-0 bg-red-500 opacity-50 z-50">Loading particles...</div>; // Debugging fallback
  }

  console.log("Rendering particles with init:", init);

  return (
    <div
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ zIndex: 10 }} // Temporary high z-index for debugging
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