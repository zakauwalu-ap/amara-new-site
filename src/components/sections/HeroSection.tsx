import React from 'react';
import Image from 'next/image';

// Sub-component for the navigation bar
const HeroNavigation: React.FC = () => {
  return (
    <nav 
      className="w-full bg-white border-b border-neutral-200 px-6 py-4"
      data-component="hero-navigation"
      data-testid="hero-navigation"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo placeholder */}
        <div className="flex items-center">
          <div className="w-32 h-8 bg-primary-500 rounded flex items-center justify-center">
            <span className="text-white text-sm font-medium">Logo</span>
          </div>
        </div>
        
        {/* Navigation items placeholder */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-neutral-700 hover:text-primary-500 transition-colors">
            About
          </a>
          <a href="#" className="text-neutral-700 hover:text-primary-500 transition-colors">
            Services
          </a>
          <a href="#" className="text-neutral-700 hover:text-primary-500 transition-colors">
            Team
          </a>
          <a href="#" className="text-neutral-700 hover:text-primary-500 transition-colors">
            Contact
          </a>
        </div>
        
        {/* Mobile menu button placeholder */}
        <div className="md:hidden">
          <button className="w-6 h-6 bg-neutral-300 rounded flex items-center justify-center">
            <span className="text-xs">☰</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

// ==================== EXTRACTED COMPONENTS ====================

const HeroImageContainer: React.FC = () => {
  return (
    <div 
      className="lg:col-start-2 lg:col-end-9"
      data-testid="hero-image-container"
      data-component="hero-image-container"
    >
      <Image
        src="/sora-pics/textured-geological-layers.png"
        alt="Small digital blocks splitting from a large cube"
        width={524}
        height={740}
        className="w-full h-auto"
        priority
        style={{ color: 'transparent' }}
      />
    </div>
  );
};

const HeroContentContainer: React.FC = () => {
  return (
    <div 
      className="lg:col-start-10 lg:col-end-15 flex items-center justify-start"
      data-testid="hero-content-container"
      data-component="hero-content-container"
    >
      {/* Empty for now - content will be added later */}
    </div>
  );
};

// Sub-component for the hero banner content
const HeroBanner: React.FC = () => {
  return (
    <div 
      className="flex-1 bg-neutral-50 py-6"
      data-component="hero-banner"
      data-testid="hero-banner"
    >
      {/* 16-column grid container with fixed padding and gap */}
      <div className="h-full grid grid-cols-1 lg:grid-cols-16 gap-8 lg:mx-15">
        <HeroImageContainer />
        <HeroContentContainer />
      </div>
    </div>
  );
};

// ==================== MAIN SECTION ====================

// Main HeroSection component
const HeroSection: React.FC = () => {
  return (
    <section 
      className="w-full h-screen flex flex-col"
      data-component="hero-section"
      data-testid="hero-section"
    >
      <HeroNavigation />
      <HeroBanner />
    </section>
  );
};

export default HeroSection; 