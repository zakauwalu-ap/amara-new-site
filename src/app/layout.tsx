import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amara Law Firm - Professional Legal Services",
  description: "Experienced legal representation and professional legal services. Contact us for expert legal counsel and dedicated advocacy.",
  keywords: ["law firm", "legal services", "attorney", "lawyer", "legal counsel"],
  authors: [{ name: "Amara Law Firm" }],
  creator: "Amara Law Firm",
  publisher: "Amara Law Firm",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Amara Law Firm - Professional Legal Services",
    description: "Experienced legal representation and professional legal services.",
    siteName: "Amara Law Firm",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amara Law Firm - Professional Legal Services",
    description: "Experienced legal representation and professional legal services.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} font-inter antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
