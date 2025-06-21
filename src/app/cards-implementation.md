# GSAP Scroll-Based Card Stack Animation Implementation (Text-Only)

This document outlines the steps to create a `Cards.tsx` component that replicates a scroll-based card stacking and fanning animation effect. The component will use Next.js, TypeScript, Tailwind CSS, and GSAP with ScrollTrigger.

The component will occupy the full viewport (`100vw`, `100vh`). The cards will display text content and utilize a harmonious color scheme derived from the project's brand colors.

## I. Component Setup (`Cards.tsx`)

1.  **Create File**:
    Create `src/components/sections/Cards.tsx`.

2.  **Initial Component Structure**:
    ```tsx
    // src/components/sections/Cards.tsx
    "use client";

    import React, { useRef } from 'react';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { useGSAP } from '@gsap/react'; 

    // Register GSAP plugins if not already done globally
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    interface CardDataItem {
      id: string;
      useCase: string;
      shortTitle: string;
      title: string;
      backgroundColorClass: string; 
      textColorClass: string;
      accentColorClass: string;
    }

    // Sample data with harmonious colors based on the Amara Law Firm palette
    // Using brand-dark for the main component background.
    // Cards will use variations of brand-blue and neutral shades for background,
    // with brand-gold and white/light-greys for text/accents.
    const cardData: CardDataItem[] = [
      {
        id: "uc000",
        useCase: "UC_000",
        shortTitle: "Cyber Risk Assessment",
        title: "Is your cybersecurity strategy hitting the mark?",
        backgroundColorClass: "bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800", // Shades of brand-blue
        textColorClass: "text-white",
        accentColorClass: "text-secondary-300", // Lighter gold
      },
      {
        id: "uc001",
        useCase: "UC_001",
        shortTitle: "Test & Compare",
        title: "How do your security measures stack up against competitors?",
        backgroundColorClass: "bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900", // Darker neutrals
        textColorClass: "text-neutral-100",
        accentColorClass: "text-brand-gold",
      },
      {
        id: "uc003",
        useCase: "UC_003",
        shortTitle: "Cyber Regulation",
        title: "Struggling with complex cybersecurity regulations?",
        backgroundColorClass: "bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700", // Core brand-blue to darker
        textColorClass: "text-white",
        accentColorClass: "text-secondary-200",
      },
      {
        id: "uc010",
        useCase: "UC_010",
        shortTitle: "Security Concerns",
        title: "Worried about the overall security of your IT systems?",
        backgroundColorClass: "bg-gradient-to-br from-neutral-600 via-neutral-700 to-neutral-800",
        textColorClass: "text-neutral-50",
        accentColorClass: "text-brand-gold",
      },
      {
        id: "uc011",
        useCase: "UC_011",
        shortTitle: "Cyber Crisis Response",
        title: "Response and recovery plans in case of a cyber attack.",
        backgroundColorClass: "bg-gradient-to-br from-primary-700 via-brand-dark to-neutral-900", // Deepest blue to dark
        textColorClass: "text-neutral-100",
        accentColorClass: "text-secondary-400",
      },
    ];

    const Cards: React.FC = () => {
      const mainContainerRef = useRef<HTMLDivElement>(null);
      const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
      // Ensure cardRefs array is populated correctly
      cardRefs.current = Array(cardData.length).fill(null);


      const addToRefs = (el: HTMLDivElement | null, index: number) => {
        cardRefs.current[index] = el;
      };

      useGSAP(() => {
        if (!mainContainerRef.current || cardRefs.current.some(ref => ref === null)) {
          console.warn("GSAP animation setup skipped: Refs not ready.");
          return;
        }
        
        const validCardRefs = cardRefs.current.filter(ref => ref !== null) as HTMLDivElement[];
        if (validCardRefs.length === 0) return;


        gsap.set(validCardRefs, {
          xPercent: -50,
          yPercent: -50,
          transformOrigin: "50% 90%", // Pivot slightly above the bottom for a natural fan
          position: 'absolute', // Ensure GSAP controls position fully from centered state
          top: '50%',
          left: '50%',
        });

        const masterTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: mainContainerRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: `+=${validCardRefs.length * 75}%`, // Adjust scroll length: 75% of viewport per card
            // markers: process.env.NODE_ENV === "development", // For debugging
            invalidateOnRefresh: true,
          }
        });

        validCardRefs.forEach((cardEl, index) => {
          const cardDuration = 1; // Relative duration unit for timeline segments

          // --- Define animation states ---
          const initialYPercentOffset = 30; // How far down non-active cards start
          const stackedYPercent = initialYPercentOffset + index * 6; // Increase for cards further back
          const stackedZ = -180 * index;
          const stackedRotationX = -12 * index;
          const stackedRotationY = (index % 2 === 0 ? 1 : -1) * index * 2.5; // Alternate fan direction
          const stackedScale = 1 - (index * 0.06);
          
          // Initial setup for all cards
           gsap.set(cardEl, {
            opacity: 0, // Start all cards invisible
            visibility: 'hidden',
            yPercent: -50 + stackedYPercent + 20, // Start a bit lower to animate "up" into stacked view
            z: stackedZ - 50, // Start a bit further back
            rotationX: stackedRotationX -10,
            rotationY: stackedRotationY,
            scale: stackedScale * 0.9,
          });


          // 1. Animate card into its "waiting" stacked position (or active if first)
          masterTimeline.to(cardEl, {
            opacity: index === 0 ? 1 : 0.7, // First card fully visible, others semi-transparent
            visibility: 'visible',
            yPercent: -50 + (index === 0 ? 0 : stackedYPercent),
            z: index === 0 ? 0 : stackedZ,
            rotationX: index === 0 ? 0 : stackedRotationX,
            rotationY: index === 0 ? 0 : stackedRotationY,
            scale: index === 0 ? 1 : stackedScale,
            ease: "power1.out",
            duration: cardDuration * 0.4,
          }, 
          index * cardDuration * 0.2 // Staggered entry into stacked view
          );


          // 2. If not the first card, animate it to the active (front) state
          if (index > 0) {
            masterTimeline.to(cardEl, {
              yPercent: -50, // Centered
              z: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              opacity: 1,
              ease: "power2.inOut",
              duration: cardDuration * 0.5,
            }, 
            // Start bringing to front slightly before the previous one fully exits its "active" phase
            // (index - 1) * cardDuration is when prev card started its sequence
            // + cardDuration * 0.4 is partway through prev card's active/exit
            (index - 1) * cardDuration + cardDuration * 0.4 
            );
          }

          // 3. If not the last card, animate it out
          if (index < validCardRefs.length - 1) {
            masterTimeline.to(cardEl, {
              yPercent: -50 - 40, // Move up and out
              z: -150,
              rotationX: 15,
              // rotationY: (Math.random() - 0.5) * 15, // Slight random fan on exit
              opacity: 0,
              scale: 0.9,
              ease: "power2.in",
              duration: cardDuration * 0.5,
            }, 
            // Start exiting when this card has been active for its "slot"
            index * cardDuration + cardDuration * 0.5
            );
          }
        });

      }, { scope: mainContainerRef, dependencies: [cardData] });

      return (
        <div 
          ref={mainContainerRef} 
          className="relative w-screen h-screen overflow-hidden bg-brand-dark" // Main background
          data-component="cards-section"
          style={{ perspective: '1200px' }} // Crucial for 3D effect
        >
          {cardData.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => addToRefs(el, index)}
              className={`card-element absolute w-[75vw] max-w-[900px] h-[65vh] max-h-[600px] 
                          rounded-xl shadow-2xl p-8 md:p-10 flex flex-col 
                          border border-neutral-700/50
                          ${card.backgroundColorClass}`}
              data-component={`card-${card.id}`}
              data-testid={`card-${card.id}`}
              // GSAP will control opacity, visibility, and transforms
            >
              <div className="flex-grow flex flex-col justify-between" data-component="card-content-wrapper">
                <div data-component="card-header">
                  <span className={`block text-xs font-mono tracking-wider uppercase ${card.accentColorClass} opacity-80`} data-component="card-usecase">
                    {card.useCase}
                  </span>
                  <h3 className={`mt-1 text-3xl md:text-4xl font-serif ${card.textColorClass}`} data-component="card-shorttitle">
                    {card.shortTitle}
                  </h3>
                </div>

                <div className="my-6 flex-grow" data-component="card-main-text-area">
                  <p className={`text-base md:text-lg ${card.textColorClass} opacity-90`} data-component="card-title">
                    {card.title}
                  </p>
                </div>

                <div data-component="card-footer">
                  <button 
                    className={`bg-brand-blue hover:bg-primary-400 text-white font-sans text-sm py-2.5 px-5 rounded-md transition-colors duration-200`}
                    data-component="card-button"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    };

    export default Cards;
    ```

## II. Explanation of GSAP Logic and Styling

### 1. Component Structure:
   - The `Cards.tsx` component is a client component (`"use client"`).
   - It defines an `interface CardDataItem` for the structure of each card's data, including `backgroundColorClass`, `textColorClass`, and `accentColorClass` for styling.
   - `cardData` array holds the content and styling classes for each card.
   - `mainContainerRef` is a ref for the main scrolling section.
   - `cardRefs` is an array of refs, one for each card `div`, crucial for GSAP to target individual cards.

### 2. Card Styling:
   - Each card is an absolutely positioned `div` within the `mainContainerRef`.
   - **Centering**: Cards are initially positioned at `top-1/2 left-1/2`. GSAP's `xPercent: -50, yPercent: -50` will then truly center them.
   - **Dimensions**: Cards use viewport units (`vw`, `vh`) with `max-w` and `max-h` for responsiveness.
   - **Appearance**: Rounded corners, shadows, padding, and a subtle border are applied using Tailwind CSS.
   - **Colors**:
     - The main section background is `bg-brand-dark`.
     - Card backgrounds use gradient classes defined in `cardData` (e.g., `bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800`). These leverage shades of `brand-blue` and `neutral` colors from your theme.
     - Text and accent colors are also dynamically applied from `cardData`.
   - **Perspective**: The `mainContainerRef` has `style={{ perspective: '1200px' }}`. This enables the 3D transformations (`z`, `rotationX`, `rotationY`) to appear correctly.
   - **Transform Origin**: `transformOrigin: "50% 90%"` is set via GSAP. This means cards will rotate and scale around a point near their bottom-center, creating a natural fanning effect when `rotationY` is applied.

### 3. GSAP Animation (`useGSAP` hook):
   - **Plugin Registration**: `gsap.registerPlugin(ScrollTrigger)` is done at the top.
   - **Refs Check**: The animation setup only proceeds if `mainContainerRef` and all `cardRefs` are properly initialized.
   - **Initial GSAP `set`**:
     - All cards are initially centered using `xPercent: -50, yPercent: -50`.
     - `transformOrigin` is set.
     - All cards are initially set to `opacity: 0` and `visibility: 'hidden'`, then animated into a "stacked" or "active" state.
   - **Master Timeline & ScrollTrigger**:
     - A single `masterTimeline` is created.
     - `ScrollTrigger` is configured:
       - `trigger`: The `mainContainerRef`.
       - `pin: true`: Pins the `mainContainerRef` while the timeline scrubs.
       - `scrub: 1`: Smoothly synchronizes the timeline's progress with scroll position.
       - `start: "top top"`: Animation begins when the top of the trigger hits the top of the viewport.
       - `end: `+=${validCardRefs.length * 75}%``: The total scrollable distance for the animation. Each card effectively gets 75% of the viewport height to complete its animation cycle. This value can be tweaked for speed.
       - `invalidateOnRefresh: true`: Ensures ScrollTrigger recalculates positions on browser resize.
   - **Per-Card Animation Loop**:
     - The code iterates through each `cardEl` in `validCardRefs`.
     - **States Defined**:
       - `stackedYPercent, stackedZ, stackedRotationX, stackedRotationY, stackedScale`: These calculate the transform properties for cards when they are in the background stack.
         - `yPercent` includes an `initialYPercentOffset` to push background cards further down.
         - `rotationY` uses `(index % 2 === 0 ? 1 : -1)` to alternate the fanning direction slightly for a more dynamic look.
     - **Timeline Tweens for each card**:
       1.  **Animate into Stacked/Initial Active View**:
           - This first tween brings each card from an even further-back/lower state into its designated "stacked" position (or active, if it's the first card).
           - `opacity` is animated to `1` for the first card and `0.7` for others in the stack.
           - `visibility` is set to `'visible'`.
           - Transforms (`yPercent`, `z`, `rotationX`, `rotationY`, `scale`) are set based on whether it's the first card (active state) or a subsequent card (stacked state).
           - This tween is staggered using `index * cardDuration * 0.2` as the position parameter, so cards appear sequentially.
       2.  **Animate to Active (Front)**:
           - This tween only applies if `index > 0` (i.e., not the first card).
           - It animates the card from its "stacked" position to the fully active front position (no rotation, centered, full scale, full opacity).
           - The position parameter `(index - 1) * cardDuration + cardDuration * 0.4` is designed to start this animation while the *previous* card is partway through its own "active" time or is beginning to exit. This creates overlap.
       3.  **Animate Out (Exit)**:
           - This tween only applies if it's not the last card (`index < validCardRefs.length - 1`).
           - It animates the card from the active state to an "exit" state (moving up, slightly back, rotating, and fading out).
           - The position parameter `index * cardDuration + cardDuration * 0.5` makes it start exiting after it has been active for a portion of its "slot" in the timeline.
   - **`cardDuration`**: This is a relative unit on the timeline. The actual time it takes for a card to animate through its states is determined by the `scrub` value and the total scroll `end` distance of the `ScrollTrigger`.

### 4. Usage in `HomePage`:
    ```tsx
    // src/app/page.tsx (or any other page)
    import Cards from '@/components/sections/Cards';

    export default function HomePage() {
      return (
        <main>
          {/* Other sections can go here or remove them to only show Cards */}
          <Cards />
        </main>
      );
    }
    ```

### Key Considerations for the LLM:
-   The animation is scroll-driven due to `ScrollTrigger` and `scrub:1`.
-   The stacking and fanning effect is achieved by progressively changing `z`, `rotationX`, `rotationY`, and `scale` for cards based on their index.
-   The timeline position parameters are critical for smooth overlapping transitions. These values (`0.2`, `0.4`, `0.5` multipliers for `cardDuration`) might need fine-tuning for the desired aesthetic.
-   `perspective` on the parent container is essential for 3D transforms.
-   Initial `gsap.set` for common properties and then specific initial states for each card before the main timeline begins is important for a clean start.
-   The `backgroundColorClass`, `textColorClass`, and `accentColorClass` in `cardData` allow for easy theming of individual cards using Tailwind.
-   Make sure the `cardRefs.current` array is correctly populated with the same number of elements as `cardData`. The provided `addToRefs` and `cardRefs.current = Array(cardData.length).fill(null);` handles this.