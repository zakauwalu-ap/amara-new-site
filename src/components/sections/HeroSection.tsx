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
      className="lg:col-start-2 lg:col-end-10 flex items-center justify-center"
      data-testid="hero-image-container"
      data-component="hero-image-container"
    >
      <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
        <Image
          src="/sora-pics/textured-geological-layers.png"
          alt="Textured geological layers representing the solid foundation of legal expertise"
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
    </div>
  );
};

const HeroContentContainer: React.FC = () => {
  return (
    <div 
      className="lg:col-start-10 lg:col-end-17 flex items-center justify-start lg:pl-8"
      data-testid="hero-content-container"
      data-component="hero-content-container"
    >
      <div className="max-w-lg">
        <h1 className="font-serif text-hero text-brand-blue leading-tight tracking-wide">
          <span className="block">redefining</span>
          <span className="block">legal excellence</span>
        </h1>
      </div>
    </div>
  );
};

// Sub-component for the hero banner content
const HeroBanner: React.FC = () => {
  return (
    <div 
      className="flex-1 bg-neutral-50 px-6 py-12"
      data-component="hero-banner"
      data-testid="hero-banner"
    >
      {/* 16-column grid container */}
      <div className="w-full h-full grid grid-cols-1 lg:grid-cols-16 gap-4 max-w-screen-2xl mx-auto">
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