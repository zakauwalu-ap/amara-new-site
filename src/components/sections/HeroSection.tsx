import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="w-full bg-green-400 px-2 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-black font-medium text-sm sm:text-base">
            Amara&Partners logo
          </div>
          <div className="text-black font-medium text-xs sm:text-sm text-center sm:text-right">
            BORDERLESS NAV BAR. WITH "ABOUT US", NEWS/INSIGHTS, CONTACT
          </div>
        </div>
      </nav>

      {/* Main Grid Container - Responsive */}
      <div 
        className="relative min-h-screen"
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(8, 1fr)',
          gridTemplateColumns: 'repeat(12, 1fr)',
          rowGap: '20px',
          columnGap: '4px',
          padding: '0 8px',
          marginTop: '0'
        }}
      >
        
        {/* Left Content Area - Excellence. Redefined. */}
        <div 
          className="bg-gray-200 p-3 sm:p-4 md:p-6 flex flex-col justify-center"
          style={{
            gridRow: '2 / 5',
            gridColumn: '1 / 7'
          }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-tight">
            Excellence.<br />
            Redefined.
          </h1>
        </div>

        {/* Description Text Box */}
        <div 
          className="bg-gray-300 p-3 sm:p-4 md:p-6 flex items-center"
          style={{
            gridRow: '5 / 8',
            gridColumn: '2 / 9'
          }}
        >
          <p className="text-black text-sm sm:text-base leading-relaxed">
            At Amara & Partners, we transcent traditional legal practice. We are architects of innovative legal solutions, meticulously crafted for Abu Dhabi's dynamic landscape, driving clarity and delivering outcomes that redefine excellence for our clients.
          </p>
        </div>

        {/* Right Canvas Area - Updated positioning */}
        <div 
          className="flex items-center justify-center text-black text-lg sm:text-xl md:text-2xl font-bold ml-2 p-2"
          style={{
            gridRow: '1 / 9',
            gridColumn: '6 / 13',
            backgroundColor: '#F87171' // Using a coral/pink color similar to the image
          }}
        >
          <div className="text-center">
            CANVAS<br />
            ELEMENT FOR<br />
            ANIMATED<br />
            BACKGROUND.<br />
            EMPTY FOR<br />
            NOW
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 