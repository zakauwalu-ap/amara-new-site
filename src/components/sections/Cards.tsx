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
const cardData: CardDataItem[] = [
  {
    id: "uc000",
    useCase: "UC_000",
    shortTitle: "Cyber Risk Assessment",
    title: "Is your cybersecurity strategy hitting the mark?",
    backgroundColorClass: "bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800",
    textColorClass: "text-white",
    accentColorClass: "text-secondary-300",
  },
  {
    id: "uc001",
    useCase: "UC_001",
    shortTitle: "Test & Compare",
    title: "How do your security measures stack up against competitors?",
    backgroundColorClass: "bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-900",
    textColorClass: "text-neutral-100",
    accentColorClass: "text-brand-gold",
  },
  {
    id: "uc003",
    useCase: "UC_003",
    shortTitle: "Cyber Regulation",
    title: "Struggling with complex cybersecurity regulations?",
    backgroundColorClass: "bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700",
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
    backgroundColorClass: "bg-gradient-to-br from-primary-700 via-brand-dark to-neutral-900",
    textColorClass: "text-neutral-100",
    accentColorClass: "text-secondary-400",
  },
];

const Cards: React.FC = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize cardRefs array with correct length
  if (cardRefs.current.length !== cardData.length) {
    cardRefs.current = Array(cardData.length).fill(null);
  }

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (cardRefs.current) {
      cardRefs.current[index] = el;
    }
  };

  useGSAP(() => {
    // Ensure all refs are ready
    if (!mainContainerRef.current || cardRefs.current.some(ref => ref === null)) {
      console.warn("GSAP animation setup skipped: Refs not ready.");
      return;
    }
    
    const validCardRefs = cardRefs.current.filter(ref => ref !== null) as HTMLDivElement[];
    if (validCardRefs.length === 0) return;

    // Clear any existing ScrollTriggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Define animation constants
    const cardDuration = 1; // Base duration unit for each card cycle
    const stackOffset = 8; // Reduced distance between stacked cards for tighter stack
    const fanRotation = 2; // Slightly reduced rotation angle for subtler fanning

    // Set up initial states for all cards - CONSOLIDATED APPROACH
    validCardRefs.forEach((cardEl, index) => {
      // Calculate stacked position values
      const stackedY = stackOffset * index;
      const stackedZ = -120 * index;
      const stackedRotX = -8 * index;
      const stackedRotY = (index % 2 === 0 ? 1 : -1) * fanRotation * index;
      const stackedScale = 1 - (index * 0.05);

      // Single gsap.set call for each card with all initial properties
      gsap.set(cardEl, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50 + stackedY,
        z: stackedZ,
        rotationX: stackedRotX,
        rotationY: stackedRotY,
        scale: stackedScale,
        transformOrigin: "50% 85%", // Slightly higher for better fan effect
        opacity: index === 0 ? 1 : 0.8, // First card fully visible
        visibility: 'visible',
        willChange: 'transform, opacity', // Performance optimization
      });
    });

    // Create master timeline with ScrollTrigger
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: mainContainerRef.current,
        pin: true,
        scrub: 1.2, // Slightly smoother scrub
        start: "top top",
        end: `+=${validCardRefs.length * 60}%`, // Reduced scroll distance per card
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Optional: Add subtle parallax effect to background
          if (mainContainerRef.current) {
            gsap.set(mainContainerRef.current, {
              backgroundPosition: `50% ${50 + self.progress * 20}%`
            });
          }
        }
      }
    });

    // Create animation sequence for each card
    validCardRefs.forEach((cardEl, index) => {
      const isLast = index === validCardRefs.length - 1;
      
      // Timeline positions - SIMPLIFIED LOGIC
      const startTime = index * cardDuration;
      const activeTime = startTime + 0.2; // Cards become active sooner
      const exitTime = startTime + 0.6; // Cards exit sooner for tighter timing

      // Phase 1: Bring card to active position (if not first card)
      if (index > 0) {
        masterTimeline.to(cardEl, {
          yPercent: -50, // Center vertically
          z: 0,
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          duration: 0.4,
        }, activeTime);
      }

      // Phase 2: Exit animation (if not last card)
      if (!isLast) {
        masterTimeline.to(cardEl, {
          yPercent: -50 - 50, // Move up and out
          z: -200,
          rotationX: 20,
          rotationY: (index % 2 === 0 ? 15 : -15), // Alternating exit direction
          opacity: 0,
          scale: 0.8,
          ease: "power2.in",
          duration: 0.4,
        }, exitTime);
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };

  }, { 
    scope: mainContainerRef, 
    dependencies: [cardData.length],
    revertOnUpdate: true // Ensure clean state on updates
  });

  return (
    <div 
      ref={mainContainerRef} 
      className="relative w-screen h-screen overflow-hidden bg-brand-dark"
      data-component="cards-section"
      style={{ 
        perspective: '1400px', // Increased perspective for better 3D effect
        perspectiveOrigin: 'center center'
      }}
    >
      {cardData.map((card, index) => (
        <div
          key={card.id}
          ref={(el) => addToRefs(el, index)}
          className={`card-element w-[80vw] max-w-[850px] h-[70vh] max-h-[650px] 
                      rounded-2xl shadow-2xl p-8 md:p-12 flex flex-col 
                      border border-neutral-700/30 backdrop-blur-sm
                      ${card.backgroundColorClass}`}
          data-component={`card-${card.id}`}
          data-testid={`card-${card.id}`}
          style={{
            // Ensure proper layering
            zIndex: cardData.length - index,
          }}
        >
          <div className="flex-grow flex flex-col justify-between" data-component="card-content-wrapper">
            <div data-component="card-header">
              <span 
                className={`block text-xs font-mono tracking-wider uppercase ${card.accentColorClass} opacity-90`} 
                data-component="card-usecase"
              >
                {card.useCase}
              </span>
              <h3 
                className={`mt-2 text-3xl md:text-5xl font-serif leading-tight ${card.textColorClass}`} 
                data-component="card-shorttitle"
              >
                {card.shortTitle}
              </h3>
            </div>

            <div className="my-8 flex-grow flex items-center" data-component="card-main-text-area">
              <p 
                className={`text-lg md:text-xl leading-relaxed ${card.textColorClass} opacity-95`} 
                data-component="card-title"
              >
                {card.title}
              </p>
            </div>

            <div data-component="card-footer">
              <button 
                className="bg-brand-gold hover:bg-secondary-400 text-brand-dark font-medium text-sm py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
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