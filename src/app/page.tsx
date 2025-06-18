import Image from "next/image";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary">
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
          
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-6">
            Amara Law Firm
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Professional Legal Services with Dedicated Advocacy
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
            Experienced legal representation you can trust. We provide comprehensive legal services 
            with a commitment to excellence and client satisfaction.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Schedule Consultation
            </button>
            <button className="border border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Placeholder sections */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
            Ready to Build Your Law Firm Website
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This is your project foundation. We&apos;ll build this site section by section, 
            creating a professional and engaging online presence for your law firm.
          </p>
        </div>
      </section>
    </main>
  );
}
