'use client';

import React from 'react';

// ==================== VIDEO BACKGROUND COMPONENT ====================

const HeroVideoBackground: React.FC = () => {
  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video failed to load:', e);
    console.error('Current video src:', (e.target as HTMLVideoElement).currentSrc);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
  };

  const handleCanPlay = () => {
    console.log('Video can start playing');
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900"
      data-component="hero-video-background"
      data-testid="hero-video-background"
    >
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onError={handleVideoError}
        onLoadedData={handleVideoLoad}
        onCanPlay={handleCanPlay}
      >
        <source src="/videos/site-background1.mp4" type="video/mp4" />
        <source src="/videos/site-background2.mp4" type="video/mp4" />
        <source src="/videos/site-background3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// ==================== VIDEO OVERLAY COMPONENT ====================

const HeroVideoOverlay: React.FC = () => {
  return (
    <div 
      className="absolute inset-0 bg-black bg-opacity-30"
      data-component="hero-video-overlay"
      data-testid="hero-video-overlay"
    />
  );
};

// ==================== MAIN VIDEO SECTION COMPONENT ====================

const HeroVideoSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/site-background1.mp4" type="video/mp4" />
      </video>
    </section>
  );
};

export default HeroVideoSection; 