'use client';

import React, { useCallback, useMemo, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container, Engine, ISourceOptions } from "@tsparticles/engine";
import { loadFull } from "tsparticles";
import { loadSVGPath } from "@tsparticles/path-svg";

interface SVGPathExperimentProps {
  /** Number of particles to render (default: 20) */
  particleCount?: number;
  /** Primary color for particles (default: "#DBCDAE" - brand gold) */
  color?: string;
  /** Movement speed of particles (default: 2) */
  speed?: number;
  /** Whether particles should react to mouse interactions (default: true) */
  interactive?: boolean;
  /** Custom z-index for the background (default: -1) */
  zIndex?: number;
  /** Additional CSS classes */
  className?: string;
  /** URL to an SVG file */
  svgUrl?: string;
  /** Direct SVG path data array */
  svgPathData?: string[];
  /** SVG dimensions */
  svgSize?: { width: number; height: number };
  /** Scale factor for the path (default: 1) */
  pathScale?: number;
  /** Whether particles can reverse direction (default: true) */
  pathReverse?: boolean;
  /** Width for random offset generation (default: 10) */
  pathWidth?: number;
}

export const SVGPathExperiment: React.FC<SVGPathExperimentProps> = ({
  particleCount = 20, // ✅ Reduced default for testing
  color = "#DBCDAE", // Brand gold
  speed = 2,
  interactive = true,
  zIndex = -1,
  className = "",
  svgUrl,
  svgPathData,
  svgSize,
  pathScale = 1,
  pathReverse = true,
  pathWidth = 10,
}) => {
  const [init, setInit] = useState(false);

  // ✅ FIXED: Larger shared circle path for all particles
  const testPaths = {
    sharedCircle: {
      data: ["M 0,0 m -200,0 a 200,200 0 1,0 400,0 a 200,200 0 1,0 -400,0"], // Large shared circle
      size: { width: 400, height: 400 }
    },
    largeCircle: {
      data: ["M 0,0 m -150,0 a 150,150 0 1,0 300,0 a 150,150 0 1,0 -300,0"], // Much larger circle
      size: { width: 300, height: 300 }
    },
    heart: {
      data: ["M 0,-20 C 0,-20 -30,-50 -60,-20 C -90,10 -60,40 0,100 C 60,40 90,10 60,-20 C 30,-50 0,-20 0,-20 Z"], // Centered at origin
      size: { width: 150, height: 120 }
    }
  };
  
  // Use shared circle for all particles to follow the same path
  const selectedPath = testPaths.sharedCircle;
  const defaultSVGPath = selectedPath.data;
  const defaultSVGSize = selectedPath.size;

  // ✅ FIXED: Simplified engine loading without dual loading or tsParticles import
  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadFull(engine);
      await loadSVGPath(engine);
      
      // Debug: Check what path generators are available after loading
      console.log("SVG path generator loaded successfully");
      console.log("Available path generators:", Array.from(engine.pathGenerators.keys()));
    }).then(() => {
      setInit(true);
    });
  }, []);

  // ✅ FIXED: Enhanced callback with positioning debug logging
  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log("SVG Path particles loaded successfully");
    console.log("Container path generators:", container?.pathGenerators.size);
    console.log("Available generators:", Array.from(container?.pathGenerators.keys() || []));
    
    // Debug positioning information
    console.log("Canvas size:", container?.canvas.size);
    console.log("SVG path size:", defaultSVGSize);
    console.log("Scale factor:", pathScale);
    
    // Log first few particle positions after a short delay
    setTimeout(() => {
      if (container?.particles) {
        // Get first 3 particles for debugging
        const particleCount = Math.min(3, container.particles.count);
        console.log(`Logging positions for first ${particleCount} particles`);
        
        // Note: In tsParticles v3, we can't easily access individual particle positions
        // but we can log general particle info
        console.log("Total particles:", container.particles.count);
        console.log("Particles container bounds:", {
          width: container.canvas.size?.width,
          height: container.canvas.size?.height
        });
      }
    }, 1000);
  }, [defaultSVGSize, pathScale]);

  // Memoize particle configuration for performance
  const particlesOptions: ISourceOptions = useMemo(() => {
    // Use provided SVG data or fallback to defaults
    const finalSVGPath = svgPathData || defaultSVGPath;
    const finalSVGSize = svgSize || defaultSVGSize;

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
            quantity: 2,
          },
          attract: {
            distance: 200,
            factor: 3,
            speed: 1,
          },
        },
      },
      particles: {
        color: {
          value: color,
        },
        links: {
          enable: false, // Disable particle links for cleaner SVG path visibility
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
            top: "bounce",
            bottom: "bounce", 
            left: "bounce",
            right: "bounce"
          },
          random: false, // Keep false for predictable SVG path following
          speed: speed,
          straight: false,
          // ✅ FIXED: Essential SVG Path Configuration for Shared Path
          path: {
            enable: true,
            generator: "svgPathGenerator", // ✅ Correct registered generator name
            options: {
              // Use either url OR path data, not both
              ...(svgUrl && { url: svgUrl }),
              ...(!svgUrl && {
                path: {
                  data: finalSVGPath,
                  size: finalSVGSize,
                },
              }),
              scale: pathScale * 3, // ✅ FIXED: Larger scale for better visibility
              reverse: pathReverse,
              width: 0, // ✅ CRITICAL: Set to 0 to prevent individual particle offsets
              position: { x: 50, y: 50, mode: "percent" }, // Center the path
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
          value: 0.9,
          random: {
            enable: true,
            minimumValue: 0.6,
          },
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.6,
            sync: false,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 3, max: 6 },
          animation: {
            enable: true,
            speed: 4,
            minimumValue: 3,
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
                path: {
                  options: {
                    scale: pathScale * 2.4, // ✅ FIXED: 80% of 3x scale on mobile
                    width: 0, // ✅ No offsets on mobile either
                  },
                },
              },
              size: {
                value: { min: 2, max: 4 }, // Smaller particles on mobile
              },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: false, // Disable hover on mobile for performance
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
              move: {
                path: {
                  options: {
                    scale: pathScale * 2.7, // ✅ FIXED: 90% of 3x scale on tablet
                    width: 0, // ✅ No offsets on tablet either
                  },
                },
              },
            },
          },
        },
      ],
    };
  }, [
    particleCount,
    color,
    speed,
    interactive,
    svgUrl,
    svgPathData,
    svgSize,
    pathScale,
    pathReverse,
    pathWidth,
    defaultSVGPath,
    defaultSVGSize,
  ]);

  // ✅ FIXED: Simplified render condition - no pathsReady delay needed
  if (!init) {
    return (
      <div 
        className={`fixed inset-0 w-full h-full ${className} flex items-center justify-center`} 
        style={{ 
          zIndex,
          background: `
            radial-gradient(ellipse at top left, rgba(73, 102, 179, 0.8) 0%, rgba(73, 102, 179, 0.4) 50%, rgba(12, 21, 40, 0.9) 100%),
            linear-gradient(135deg, #4966B3 0%, #364F9F 25%, #2D4395 50%, #1E2B5C 75%, #0C1528 100%)
          `
        }}
      >
        <div className="text-white text-lg">
          Initializing particles engine...
        </div>
      </div>
    );
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
        id="svg-path-experiment"
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
      
      {/* ✅ UPDATED: Simplified debug info overlay */}
      <div className="absolute top-4 left-4 text-white text-sm bg-black bg-opacity-50 p-3 rounded-lg max-w-xs">
        <h3 className="font-bold mb-2">SVG Path Debug Info</h3>
        <div className="space-y-1 text-xs">
          <p>Particles: {particleCount}</p>
          <p>Speed: {speed}</p>
          <p>Scale: {pathScale * 3} (base: {pathScale})</p>
          <p>Path Width: 0 (shared path - no offsets)</p>
          <p>Reverse: {pathReverse ? 'Yes' : 'No'}</p>
          <p>Using: {svgUrl ? 'External SVG' : 'Large Shared Circle'}</p>
          <p>Engine Ready: {init ? 'Yes' : 'No'}</p>
          <p>Generator: svgPathGenerator</p>
          <p>Out Mode: bounce (all sides)</p>
          <p>Path Size: {defaultSVGSize.width}x{defaultSVGSize.height}</p>
          <p>Circle Radius: 200px (shared)</p>
        </div>
      </div>
    </div>
  );
};

export default SVGPathExperiment; 