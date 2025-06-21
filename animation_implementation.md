Here's the implementation plan for adding the GSAP hover effect to the SVG paths within your `src/components/ui/BackgroundLines.tsx` component, using `useGSAP` and HSL color manipulation.

```markdown
# GSAP Hover Effect for SVG Paths in `BackgroundLines.tsx` (HSL Color Animation)

This plan details implementing an interactive hover effect on the stroked SVG paths within `src/components/ui/BackgroundLines.tsx`. The effect will use GSAP's `useGSAP` hook and animate the `stroke` color by manipulating HSL lightness values.

**Target Component:** `src/components/ui/BackgroundLines.tsx`

## 1. Update Component Props

Modify the `BackgroundLinesProps` interface (if it exists, otherwise define it) and the component function signature in `BackgroundLines.tsx` to accept HSL color parameters:

```typescript
// src/components/ui/BackgroundLines.tsx
"use client"; // Ensure this is at the top

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

interface BackgroundLinesProps {
  className?: string; // Keep existing if any
  style?: React.CSSProperties; // Keep existing if any
  
  // HSL Color Parameters
  baseHue?: number;
  baseSaturation?: number;
  defaultLightness?: number;
  hoverLightness?: number;
  intermediateLightness?: number;
  
  // Existing or new props for SVG attributes
  strokeWidth?: number;
  // Opacity might be controlled by the HSL alpha or a separate prop.
  // For now, we'll assume colors are solid and opacity is managed elsewhere or fixed.
}

const BackgroundLines: React.FC<BackgroundLinesProps> = ({
  className = '',
  style,
  baseHue = 41,
  baseSaturation = 38,
  defaultLightness = 77,
  hoverLightness = 60,        // Example: Darker
  intermediateLightness = 90, // Example: Lighter
  strokeWidth = 3,            // Default from your existing SVG
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathLeaveTimelines = useRef(new Map<SVGPathElement, gsap.core.Timeline>());

  // Construct HSL color strings from props
  const defaultHslString = `hsl(${baseHue}, ${baseSaturation}%, ${defaultLightness}%)`;
  const hoverHslString = `hsl(${baseHue}, ${baseSaturation}%, ${hoverLightness}%)`;
  const intermediateHslString = `hsl(${baseHue}, ${baseSaturation}%, ${intermediateLightness}%)`;

  // ... (useGSAP hook and JSX will go here)
};

export default BackgroundLines;
```

## 2. Modify SVG Paths for Prop-Driven Initial Stroke Color

Inside the JSX of `BackgroundLines.tsx`, ensure that the `<path>` elements intended for this hover effect (specifically "path1" through "path5" which use `stroke`) have their `stroke` attribute initially set by `defaultHslString`. The paths currently using `fill` ("path6", "path7") will be ignored by this stroke animation plan unless their structure is changed to also use `stroke` for the hoverable part.

Example for one path:
```jsx
// Inside the return statement of BackgroundLines.tsx, within the <svg>
<path 
  id="path5" 
  d="..." // Existing d attribute
  stroke={defaultHslString} // Use the prop-derived HSL string
  strokeWidth={strokeWidth} // Use the prop
  fill="none" 
  opacity="0.6" // Keep existing opacity or make it a prop
/>
// ... other paths similarly modified ...
<path 
  id="path1" 
  d="M1856 8V2201" 
  stroke={defaultHslString} // Use the prop-derived HSL string
  strokeWidth={strokeWidth} // Use the prop
  fill="none" 
  opacity="0.7" // Keep existing opacity or make it a prop
/>
```
*The paths "path7" and "path6" currently use `fill`. If these also need a stroke hover effect, they would need a `stroke` attribute added, and their `fill` would remain static or be handled separately.*

## 3. Implement GSAP Animations with `useGSAP`

Utilize the `useGSAP` hook, scoped to the `svgRef`.

```typescript
// ... inside BackgroundLines component, after HSL string declarations

useGSAP(() => {
  if (!svgRef.current) return;

  // Target only paths that are intended to have a stroke and hover effect
  // (e.g., path1 to path5 based on your current SVG structure)
  const strokedPathIds = ["path1", "path2", "path3", "path4", "path5"];
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
      // It's good practice to remove listeners, but often GSAP's context handles elements within scope.
      // For this simple case, if the component unmounts, the listeners go with it.
      // However, explicitly:
      // pathElement.removeEventListener('mouseenter', ...); (would need to store the function reference)
      // pathElement.removeEventListener('mouseleave', ...);
      
      // More importantly, kill any active timelines on these specific paths
      if (pathLeaveTimelines.current.has(pathElement)) {
        pathLeaveTimelines.current.get(pathElement)?.kill();
      }
    });
    pathLeaveTimelines.current.clear();
  };
}, { scope: svgRef, dependencies: [defaultHslString, hoverHslString, intermediateHslString] });

// Ensure svgRef is attached to the <svg> element in the JSX:
// <svg ref={svgRef} ... >
```
*The `svgRef` must be attached to the root `<svg>` element in the `BackgroundLines.tsx` component's JSX.*

## 4. Usage in Parent Component (`page.tsx`)

Update `src/app/page.tsx` to pass the new HSL-related props to the `BackgroundLines` component.

```tsx
// src/app/page.tsx
import BackgroundLines from '@/components/ui/BackgroundLines';
import HeroSection from '@/components/sections/HeroSection'; // Assuming HeroSection is desired

export default function HomePage() {
  return (
    <main className="relative"> {/* Ensure main has a positioning context if needed */}
      <BackgroundLines
        // Base HSL: H: 41, S: 38%, L: 77%
        baseHue={41}
        baseSaturation={38}
        defaultLightness={77}   // Default L value
        hoverLightness={60}     // Example: Darker L for hover
        intermediateLightness={90} // Example: Lighter L for intermediate stage
        strokeWidth={3}         // Or pass as prop if dynamic
        // className and style props as needed
      />
      <HeroSection /> {/* HeroSection will be layered on top due to z-index or DOM order */}
    </main>
  );
}
```

## 5. Review GSAP Common Mistakes

After implementing, it's highly recommended to review [GSAP Common Mistakes](https://gsap.com/resources/mistakes/) to ensure the implementation is robust, performant, and avoids common pitfalls. Pay attention to:
*   **Scoped Selectors/Animations**: `useGSAP` with `scope` helps manage this.
*   **Dependency Arrays**: Ensure the `dependencies` array for `useGSAP` correctly lists all props or values that, if changed, should trigger a re-run of the GSAP setup.
*   **Animation Conflicts & Cleanup**: Killing previous/conflicting animations (as done with `pathLeaveTimelines`) is essential. `useGSAP` helps with cleanup on unmount.
*   **Performance**: Animating SVG attributes like `stroke` is generally fine for a moderate number of elements. For a very large number of paths, monitor performance.

This plan targets the correct component (`BackgroundLines.tsx`) and uses the specified HSL color manipulation strategy with `useGSAP`.
```