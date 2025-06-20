import React from 'react';
import Image from 'next/image';

// ==================== NAVIGATION COMPONENT ====================

const HeroNavigation: React.FC = () => {
  return (
    <nav 
      className="w-full bg-white border-b border-neutral-200 px-6 py-4 my-6"
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

// ==================== BANNER WRAPPER COMPONENT ====================

const HeroBanner: React.FC = () => {
  return (
    <div 
      className="flex-1 bg-neutral-50"
      data-component="hero-banner"
      data-testid="hero-banner"
    >
      {/* 16-column grid container with fixed padding and gap */}
      <div className="h-full grid grid-cols-1 lg:grid-cols-16 gap-8 lg:mx-16">
        <HeroImageContainer />
        <HeroContentContainer />
      </div>
    </div>
  );
};

// ==================== IMAGE COMPONENT ====================

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

// ==================== CONTENT COMPONENTS ====================

const HeroContentContainer: React.FC = () => {
  return (
    <div 
      className="lg:col-start-10 lg:col-end-15 flex items-center justify-start"
      data-testid="hero-content-container"
      data-component="hero-content-container"
    >
      {/* Nested 5-column grid */}
      <div className="w-full grid grid-cols-5 gap-4">
        <HeroTitle />
        <HeroDescription />
      </div>
    </div>
  );
};

const HeroTitle: React.FC = () => {
  return (
    <div 
      className="col-span-5 relative z-10"
      data-testid="hero-title"
      data-component="hero-title"
    >
      <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight">
        <span className="block">redefining</span>
        <span className="block">legal excellence</span>
      </h1>
    </div>
  );
};

const HeroDescription: React.FC = () => {
  return (
    <div 
      className="col-span-5 lg:col-start-2 lg:col-span-4 relative z-20 pt-8"
      data-testid="hero-description"
      data-component="hero-description"
    >
      <p className="text-lg text-neutral-700 leading-relaxed">
        At Amara & Partners, we see law not as a rigid set of rules, but as a dynamic framework for innovation and growth. We navigate the complexities of today's global landscape to deliver clear, strategic outcomes. Your ambition defines the destination. <strong>Allow us to illuminate the path and join you on the journey.</strong>
      </p>
    </div>
  );
};

// ==================== MAIN SECTION COMPONENT ====================

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