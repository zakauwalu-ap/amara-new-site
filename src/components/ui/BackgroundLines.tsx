"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface BackgroundLinesProps {
  className?: string;
  style?: React.CSSProperties;
  
  // HSL Color Parameters
  baseHue?: number;
  baseSaturation?: number;
  defaultLightness?: number;
  hoverLightness?: number;
  intermediateLightness?: number;
  
  // SVG attributes
  strokeWidth?: number;
}

const BackgroundLines: React.FC<BackgroundLinesProps> = ({
  className = '',
  style,
  baseHue = 41,
  baseSaturation = 38,
  defaultLightness = 77,
  hoverLightness = 60,        // Darker for hover
  intermediateLightness = 90, // Lighter for intermediate stage
  strokeWidth = 3,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathLeaveTimelines = useRef(new Map<SVGPathElement, gsap.core.Timeline>());

  // Construct HSL color strings from props
  const defaultHslString = `hsl(${baseHue}, ${baseSaturation}%, ${defaultLightness}%)`;
  const hoverHslString = `hsl(${baseHue}, ${baseSaturation}%, ${hoverLightness}%)`;
  const intermediateHslString = `hsl(${baseHue}, ${baseSaturation}%, ${intermediateLightness}%)`;

  useGSAP(() => {
    if (!svgRef.current) return;

    // Target all paths for hover effect
    const strokedPathIds = ["path1", "path2", "path3", "path4", "path5", "path6", "path7"];
    const pathsToAnimate: SVGPathElement[] = [];

    strokedPathIds.forEach(id => {
      const pathEl = svgRef.current?.querySelector(`#${id}`) as SVGPathElement | null;
      if (pathEl) {
        pathsToAnimate.push(pathEl);
      }
    });

    if (pathsToAnimate.length === 0) return;

    pathsToAnimate.forEach(pathElement => {
      // --- Mouse Enter Animation ---
      pathElement.addEventListener('mouseenter', () => {
        if (pathLeaveTimelines.current.has(pathElement)) {
          pathLeaveTimelines.current.get(pathElement)?.kill();
          pathLeaveTimelines.current.delete(pathElement);
        }
        gsap.set(pathElement, { attr: { stroke: hoverHslString } });
      });

      // --- Mouse Leave Animation ---
      pathElement.addEventListener('mouseleave', () => {
        const leaveTimeline = gsap.timeline({
          onComplete: () => {
            pathLeaveTimelines.current.delete(pathElement);
          }
        });
        pathLeaveTimelines.current.set(pathElement, leaveTimeline);

        leaveTimeline.to(pathElement, {
          attr: { stroke: intermediateHslString },
          duration: 1,
          ease: 'power1.out',
        });

        leaveTimeline.to(pathElement, {
          attr: { stroke: defaultHslString },
          duration: 0.5, // Quicker return to default
          ease: 'power1.in',
        }, ">+0.2"); // Start 0.2s after the intermediate color tween completes
      });
    });

    // Cleanup for event listeners
    return () => {
      pathsToAnimate.forEach(pathElement => {
        // Kill any active timelines on these specific paths
        if (pathLeaveTimelines.current.has(pathElement)) {
          pathLeaveTimelines.current.get(pathElement)?.kill();
        }
      });
      pathLeaveTimelines.current.clear();
    };
  }, { scope: svgRef, dependencies: [defaultHslString, hoverHslString, intermediateHslString] });

  return (
    <div 
      className={`absolute top-0 left-0 w-full z-0 ${className}`}
              style={{
          height: '200vh', // Extend beyond viewport to allow scrolling
          background: `
            linear-gradient(135deg, 
              hsl(218, 20%, 15%) 0%, 
              hsl(218, 25%, 12%) 25%, 
              hsl(218, 20%, 15%) 50%, 
              hsl(218, 15%, 18%) 75%, 
              hsl(218, 20%, 15%) 100%
            )
          `,
          ...style
        }}
    >
      <svg
        ref={svgRef}
        viewBox="50 50 1858 2258"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 w-full h-full pointer-events-auto"
        preserveAspectRatio="none"
      >
        <g id="path-lines">
          <path 
            id="path7" 
            d="M67.9833 0C302.789 1.49056e-10 535.295 29.2029 752.227 85.9404C969.16 142.678 1166.27 225.839 1332.3 330.677C1498.33 435.514 1630.04 559.974 1719.9 696.95C1809.75 833.927 1856 980.738 1856 1129H1852.68C1852.68 981.316 1806.62 835.03 1717.04 698.481C1627.46 561.924 1496.11 437.766 1330.4 333.137C1164.7 228.508 967.93 145.479 751.307 88.8223C534.686 32.1661 302.49 3 67.9833 3V0Z" 
            stroke={defaultHslString} 
            strokeWidth={strokeWidth} 
            fill="none" 
            opacity="0.4"
          />
          <path 
            id="path6" 
            d="M500.202 0C678.248 1.46264e-10 854.551 29.2029 1019.04 85.9404C1183.54 142.678 1333 225.839 1458.9 330.677C1584.79 435.514 1684.66 559.974 1752.8 696.95C1820.93 833.927 1856 980.738 1856 1129H1852.68C1852.68 981.168 1817.72 834.776 1749.77 698.182C1681.83 561.586 1582.23 437.455 1456.65 332.884C1331.07 228.312 1181.97 145.349 1017.86 88.7432C853.751 32.1373 677.849 3 500.202 3V0Z" 
            stroke={defaultHslString} 
            strokeWidth={strokeWidth} 
            fill="none" 
            opacity="0.3"
          />
          <path 
            id="path5" 
            d="M928 1.5C1049.62 1.49999 1170.07 30.6437 1282.46 87.2795C1394.84 143.916 1496.99 226.94 1583.04 331.629C1669.09 436.318 1737.36 560.617 1783.94 697.434C1830.52 834.251 1854.5 980.898 1854.5 1129" 
            stroke={defaultHslString} 
            strokeWidth={strokeWidth} 
            fill="none" 
            opacity="0.6"
          />
          <path 
            id="path4" 
            d="M1235.86 1.5C1316.92 1.49999 1397.25 30.5642 1472.27 87.1376C1547.3 143.718 1615.54 226.699 1673.05 331.399C1730.56 436.095 1776.19 560.42 1807.33 697.283C1838.47 834.145 1854.5 980.843 1854.5 1129" 
            stroke={defaultHslString} 
            strokeWidth={strokeWidth} 
            fill="none" 
            opacity="0.5"
          />
          <path 
            id="path3" 
            d="M1447.55 1.5C1500.6 1.49999 1553.34 30.3787 1602.73 86.9267C1652.12 143.474 1697.06 226.448 1734.96 331.187C1772.84 435.911 1802.91 560.272 1823.42 697.173C1843.94 834.071 1854.5 980.807 1854.5 1129" 
            stroke={defaultHslString} 
            strokeWidth={strokeWidth} 
            fill="none" 
            opacity="0.4"
          />
          <path 
            id="path2" 
            d="M1634.92 1.5C1648.89 1.5 1662.98 8.52242 1676.98 22.7457C1690.98 36.9719 1704.79 58.2912 1718.17 86.5811C1744.91 143.155 1769.25 226.177 1789.77 330.965C1810.29 435.734 1826.57 560.136 1837.68 697.072C1848.78 834.005 1854.5 980.775 1854.5 1129" 
            stroke={defaultHslString} 
            strokeWidth={strokeWidth} 
            fill="none" 
            opacity="0.3"
          />
          <path 
            id="path1" 
            d="M1856 8V2201" 
            stroke={defaultHslString} 
            strokeWidth={strokeWidth} 
            fill="none" 
            opacity="0.7"
          />
        </g>
      </svg>
    </div>
  );
};

export default BackgroundLines; 