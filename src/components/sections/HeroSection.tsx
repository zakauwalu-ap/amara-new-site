import Image from 'next/image';
import { BackgroundBeams } from '@/components/ui/background-beams';

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-blue-300">
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
          className="bg-gray-200 p-3 sm:p-4 md:p-6 flex flex-col justify-center border-2 border-black"
          style={{
            gridRow: '2 / 4',
            gridColumn: '1 / 5'
          }}
        >
          <h1 className="text-h1 font-bold text-black leading-tight">
            Excellence.<br />
            Redefined.
          </h1>
        </div>

        {/* Description Text Box */}
        <div 
          className="bg-gray-300 p-3 sm:p-4 md:p-6 flex items-center"
          style={{
            gridRow: '5 / 8',
            gridColumn: '2 / 6'
          }}
        >
          <p className="text-black text-sm sm:text-base leading-relaxed">
            At Amara & Partners, we transcent traditional legal practice. We are architects of innovative legal solutions, meticulously crafted for Abu Dhabi's dynamic landscape, driving clarity and delivering outcomes that redefine excellence for our clients.
          </p>
        </div>

        {/* Right Canvas Area - Updated positioning */}
        <div 
          className="relative overflow-hidden ml-2 border-l-4 border-black"
          style={{
            gridRow: '1 / 9',
            gridColumn: '6 / 13'
          }}
        >
          <BackgroundBeams />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 