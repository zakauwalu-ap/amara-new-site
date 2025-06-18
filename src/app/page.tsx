import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-8">
            <Image
              src="/A&P_logo_grey_primary_RGB.svg"
              alt="Amara Law Firm Logo"
              width={200}
              height={100}
              className="mx-auto mb-8"
              priority
            />
          </div>
          
          <h1 className="font-serif text-brand-blue mb-6">
            Amara Law Firm
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-2xl mx-auto font-medium">
            Professional Legal Services with Dedicated Advocacy
          </p>
          
          <p className="text-lg text-neutral-600 mb-12 max-w-3xl mx-auto">
            Experienced legal representation you can trust. We provide comprehensive legal services 
            with a commitment to excellence and client satisfaction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary-500 text-white px-8 py-4 rounded-lg font-medium hover:bg-primary-600 transition-colors">
              Schedule Consultation
            </button>
            <button className="border border-primary-500 text-primary-500 px-8 py-4 rounded-lg font-medium hover:bg-primary-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Placeholder sections */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-serif text-brand-blue mb-6">
            Ready to Build Your Law Firm Website
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            This is your project foundation. We&apos;ll build this site section by section, 
            creating a professional and engaging online presence for your law firm.
          </p>
        </div>
      </section>

      {/* Brand Colors Demo Section */}
      <section className="py-20 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-brand-blue text-center mb-12">
            Brand Color System
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-lg mb-3" style={{backgroundColor: '#4966B3'}}></div>
              <p className="font-medium text-sm">Blue</p>
              <p className="text-xs text-neutral-500">#4966B3</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-lg mb-3" style={{backgroundColor: '#DBCDAE'}}></div>
              <p className="font-medium text-sm">Gold</p>
              <p className="text-xs text-neutral-500">#DBCDAE</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-lg mb-3" style={{backgroundColor: '#0C1528'}}></div>
              <p className="font-medium text-sm">Dark</p>
              <p className="text-xs text-neutral-500">#0C1528</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-lg mb-3" style={{backgroundColor: '#1E242D'}}></div>
              <p className="font-medium text-sm">Charcoal</p>
              <p className="text-xs text-neutral-500">#1E242D</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-lg mb-3" style={{backgroundColor: '#565E71'}}></div>
              <p className="font-medium text-sm">Shadow Grey</p>
              <p className="text-xs text-neutral-500">#565E71</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto rounded-lg mb-3" style={{backgroundColor: '#E2E3E4'}}></div>
              <p className="font-medium text-sm">Light Grey</p>
              <p className="text-xs text-neutral-500">#E2E3E4</p>
            </div>
          </div>
        </div>
      </section>

      {/* Typography Demo Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-brand-blue text-center mb-12">
            Typography System
          </h2>
          <div className="space-y-12">
            {/* Hero Text - Full Width */}
            <div className="w-full">
              <h1 className="font-serif text-hero text-brand-blue mb-4 text-center">Hero Sample Text</h1>
              <p className="text-sm text-neutral-500 text-center">112px/120px, Bold, 2% letter-spacing</p>
            </div>
            
            {/* Other Typography - Constrained Width */}
            <div className="max-w-4xl mx-auto space-y-8">
              <div>
                <h1 className="font-serif text-brand-blue mb-2">Heading 1 - Amara Serif</h1>
                <p className="text-sm text-neutral-500">52px/56px, Bold, 2% letter-spacing</p>
              </div>
              <div>
                <h2 className="font-serif text-brand-blue mb-2">Heading 2 - Amara Serif</h2>
                <p className="text-sm text-neutral-500">24px/30px, Medium, 2% letter-spacing</p>
              </div>
              <div>
                <h3 className="font-serif text-brand-blue mb-2">Heading 3 - Amara Serif</h3>
                <p className="text-sm text-neutral-500">20px/26px, Regular, 2% letter-spacing</p>
              </div>
              <div>
                <p className="text-base mb-2">Body Text - Cabinet Grotesk Regular</p>
                <p className="text-sm text-neutral-500">16px/24px, Regular, 0% letter-spacing</p>
              </div>
              <div>
                <p className="text-sm mb-2">Secondary Body - Cabinet Grotesk Regular</p>
                <p className="text-sm text-neutral-500">14px/20px, Regular, 0% letter-spacing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
