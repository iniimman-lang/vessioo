import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Veesioo - Build Your Website or Mobile App in Just 2 Days",
  description: "Full-Stack Websites from ₦50,000 (~$36). Android & iPhone Apps from ₦100,000 (~$72). Pay After Delivery.",
  manifest: "/manifest.json",
  themeColor: "#E94D1A",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Veesioo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center">
                <img src="/logo.png" alt="Veesioo" className="h-[10rem] w-auto max-w-[100%]" />
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/" className="hover:text-[var(--color-highlight)] transition" style={{ color: 'var(--color-primary)' }}>Home</Link>
                <Link href="/about" className="hover:text-[var(--color-highlight)] transition" style={{ color: 'var(--color-primary)' }}>About Us</Link>
                <Link href="/projects" className="hover:text-[var(--color-highlight)] transition" style={{ color: 'var(--color-primary)' }}>Projects</Link>
                <Link href="/team" className="hover:text-[var(--color-highlight)] transition" style={{ color: 'var(--color-primary)' }}>Team</Link>
                <Link href="/services" className="hover:text-[var(--color-highlight)] transition" style={{ color: 'var(--color-primary)' }}>Services</Link>
                <Link href="/reviews" className="hover:text-[var(--color-highlight)] transition" style={{ color: 'var(--color-primary)' }}>Reviews</Link>
                <Link href="/contact" className="hover:text-[var(--color-highlight)] transition" style={{ color: 'var(--color-primary)' }}>Contact</Link>
              </div>
              <div className="md:hidden">
                <button className="mobile-menu-btn" style={{ color: 'var(--color-primary)' }}>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer style={{ backgroundColor: 'var(--color-primary)' }} className="text-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Veesioo</h3>
                <p className="text-gray-300">
                  A fast-growing digital agency delivering websites, mobile apps, and branding solutions with 48-hour turnaround and pay-after-delivery flexibility.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><Link href="/about" className="hover:text-[var(--color-highlight)] transition">About Us</Link></li>
                  <li><Link href="/services" className="hover:text-[var(--color-highlight)] transition">Services</Link></li>
                  <li><Link href="/reviews" className="hover:text-[var(--color-highlight)] transition">Reviews</Link></li>
                  <li><Link href="/contact" className="hover:text-[var(--color-highlight)] transition">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>Nigeria</li>
                  <li>info@veesioo.com</li>
                  <li>+234 904 015 7866</li>
                  <li>
                    <a href="https://wa.me/2349040157866" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-flex items-center gap-2" style={{ color: 'var(--color-highlight)' }}>
                      <MessageCircle className="h-5 w-5" /> WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/veesioo_?igsh=aTZ0NzlhM2Fyd2Q2" target="_blank" rel="noopener noreferrer" className="hover:text-white transition inline-flex items-center gap-2" style={{ color: 'var(--color-highlight)' }}>
                      <Instagram className="h-5 w-5" /> Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div style={{ borderColor: 'var(--color-secondary)' }} className="border-t mt-8 pt-8 text-center text-gray-300">
              <p>&copy; 2026 Veesioo. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
        <ChatWidget />
      </body>
    </html>
  );
}
