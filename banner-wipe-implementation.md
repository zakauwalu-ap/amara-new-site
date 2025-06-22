### **Task: Implement GSAP Wipe Animation for HeroBanner Component**

**Objective:**
Implement a wipe animation for the `HeroBanner` component located in `src/components/sections/HeroSection.tsx`. This animation will involve a panel sliding across the banner to first cover and then reveal the content, similar to a common "wipe" transition effect.

**File to Modify:**
*   `src/components/sections/HeroSection.tsx`

**Detailed Implementation Steps:**

1.  **Enable Client-Side Rendering for the Component File:**
    *   At the very top of `src/components/sections/HeroSection.tsx`, add the directive:
        ```javascript
        "use client";
        ```
    *   This is crucial because we will be using React hooks (`useRef`, `useEffect`) and GSAP, which operate on the client side.

2.  **Import Necessary Modules:**
    *   Ensure the following imports are present at the top of the file:
        ```javascript
        import React, { useRef } from 'react'; // Add useRef if not already present
        import Image from 'next/image';
        import { gsap } from 'gsap';             // Import gsap
        import { useGSAP } from '@gsap/react';    // Import useGSAP hook
        ```

3.  **Modify the `HeroBanner` Component:**

    *   **Add Refs:**
        *   Inside the `HeroBanner` functional component, define two refs:
            *   `heroBannerRef`: This ref will be attached to the main container `div` of the `HeroBanner`. It will be used to scope the GSAP animations.
            *   `wipePanelRef`: This ref will be attached to a new `div` element that will act as the animating wipe panel.
            ```javascript
            const HeroBanner: React.FC = () => {
              const heroBannerRef = useRef<HTMLDivElement>(null);
              const wipePanelRef = useRef<HTMLDivElement>(null);
              // ... rest of the component
            };
            ```

    *   **Update the Main Banner Container `div`:**
        *   Attach `heroBannerRef` to the outermost `div` of the `HeroBanner` component.
        *   Add the following Tailwind CSS classes to this `div`: `relative overflow-hidden`. This is to ensure the wipe panel (which will be absolutely positioned) is contained and clipped correctly when it animates off-screen.
        *   The existing `flex-1 bg-transparent` classes should remain.
            ```jsx
            <div 
              ref={heroBannerRef} // Attach ref
              className="flex-1 bg-transparent relative overflow-hidden" // Add relative and overflow-hidden
              data-component="hero-banner"
              data-testid="hero-banner"
            >
              {/* ... content ... */}
            </div>
            ```

    *   **Adjust Z-Index of Banner Content:**
        *   The direct child `div` of `heroBannerRef` (the one containing `HeroImageContainer` and `HeroContentContainer`) should have a `z-index` that places it below the wipe panel. Add `relative z-10`.
            ```jsx
            <div className="h-full grid grid-cols-1 lg:grid-cols-16 gap-16 lg:mx-16 relative z-10"> {/* Ensure content is on z-10 */}
              <HeroImageContainer />
              <HeroContentContainer />
            </div>
            ```

    *   **Create the Wipe Panel `div`:**
        *   Inside the `heroBannerRef` `div`, *after* the content grid `div`, add a new `div` element.
        *   Attach `wipePanelRef` to this new `div`.
        *   Apply the following Tailwind CSS classes: `absolute inset-0 bg-brand-gold z-20`.
            *   `absolute inset-0`: Makes the panel cover the entire parent (`heroBannerRef` div).
            *   `bg-brand-gold`: Sets the background color of the wipe panel. You can change this to any desired color (e.g., `bg-brand-blue`, `bg-brand-dark`).
            *   `z-20`: Ensures the wipe panel is on top of the content (which is on `z-10`).
        *   Add a `data-component="hero-wipe-panel"` attribute for identification.
            ```jsx
            {/* ... Banner Content (Grid and its children are above this) ... */}

            {/* Wipe Panel */}
            <div
              ref={wipePanelRef} // Attach ref
              className="absolute inset-0 bg-brand-gold z-20" // Styling for the wipe panel
              data-component="hero-wipe-panel"
            />
            ```

    *   **Implement the GSAP Animation using `useGSAP`:**
        *   Inside the `HeroBanner` component, below the ref declarations, use the `useGSAP` hook.
        *   The animation should only run if both `wipePanelRef.current` and `heroBannerRef.current` are available.
        *   **Initial State:** Set the initial position of the `wipePanelRef` to be off-screen to the right. This can be achieved with `gsap.set(wipePanelRef.current, { xPercent: 100 });`.
        *   **Timeline:** Create a GSAP timeline: `const tl = gsap.timeline({});`.
        *   **Animation Sequence:**
            1.  **Panel In:** Animate the `wipePanelRef` from `xPercent: 100` to `xPercent: 0`. This will make it slide in from the right to cover the banner content.
                *   Duration: `0.8` seconds (configurable).
                *   Ease: `"power3.inOut"` (configurable).
            2.  **Panel Out:** Animate the `wipePanelRef` from `xPercent: 0` to `xPercent: -100`. This will make it continue sliding to the left, revealing the banner content underneath.
                *   Duration: `0.8` seconds (configurable).
                *   Ease: `"power3.inOut"` (configurable).
                *   Delay: `0.1` seconds (optional, adds a brief pause when the panel fully covers the content).
        *   **Scope:** Ensure the `useGSAP` hook is scoped to `heroBannerRef`: `{ scope: heroBannerRef }`.
            ```javascript
            useGSAP(() => {
              if (wipePanelRef.current && heroBannerRef.current) {
                // Set initial state of the wipe panel: off-screen to the right
                gsap.set(wipePanelRef.current, { xPercent: 100 });

                const tl = gsap.timeline({
                  // delay: 0.5 // Optional: Add a delay before the animation starts
                });

                // 1. Animate wipe panel in from the right to cover the content
                tl.to(wipePanelRef.current, {
                  xPercent: 0,
                  duration: 0.8,
                  ease: "power3.inOut",
                })
                // 2. Animate wipe panel out to the left, revealing the content
                .to(wipePanelRef.current, {
                  xPercent: -100,
                  duration: 0.8,
                  ease: "power3.inOut",
                  delay: 0.1, // Brief pause when panel covers content
                });
              }
            }, { scope: heroBannerRef }); // Scope animations to heroBannerRef
            ```

4.  **Verify Component Structure:**
    The final structure of the `HeroBanner` component's JSX should look something like this:

    ```jsx
    const HeroBanner: React.FC = () => {
      const heroBannerRef = useRef<HTMLDivElement>(null);
      const wipePanelRef = useRef<HTMLDivElement>(null);

      useGSAP(() => {
        // ... GSAP animation logic ...
      }, { scope: heroBannerRef });

      return (
        <div 
          ref={heroBannerRef}
          className="flex-1 bg-transparent relative overflow-hidden" // Key classes here
          data-component="hero-banner"
          data-testid="hero-banner"
        >
          {/* Banner Content */}
          <div className="h-full grid grid-cols-1 lg:grid-cols-16 gap-16 lg:mx-16 relative z-10"> {/* Content on z-10 */}
            <HeroImageContainer />
            <HeroContentContainer />
          </div>

          {/* Wipe Panel */}
          <div
            ref={wipePanelRef}
            className="absolute inset-0 bg-brand-gold z-20" // Wipe panel on z-20
            data-component="hero-wipe-panel"
          />
        </div>
      );
    };
    ```

**Expected Outcome:**
Upon page load (or when the `HeroBanner` component mounts and the animation triggers), a panel (colored with `brand-gold`) will slide in from the right side of the screen, completely covering the `HeroBanner`'s content (image and text). After a brief moment, this panel will then continue sliding to the left, disappearing off-screen and revealing the banner content underneath. The animation should be smooth.

**Key Considerations & Tips:**
*   **Animation Timing:** Adjust `duration`, `delay`, and `ease` properties in the GSAP timeline to fine-tune the look and feel of the animation.
*   **Panel Color:** The `bg-brand-gold` class on the wipe panel can be changed to any other Tailwind background color utility (e.g., `bg-brand-blue`, `bg-black`).
*   **Triggering the Animation:** Currently, the animation triggers on component mount. If you need it to trigger on scroll or another event, the GSAP setup (especially with `ScrollTrigger`) would need to be adjusted.
*   **Performance:** GSAP is highly performant. Animating `xPercent` (which translates to `transform: translateX()`) is generally good for performance.

Please implement these changes carefully.