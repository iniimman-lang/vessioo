import Link from "next/link";
import { Target, Zap, Shield, Headphones } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Veesioo</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Empowering businesses with fast, affordable, and high-quality digital solutions
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center" style={{ color: 'var(--color-primary)' }}>Who We Are</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Veesioo is a modern digital agency focused on delivering affordable, high-quality websites
              and mobile applications for startups, entrepreneurs, and growing businesses.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We believe technology should be fast, accessible, and affordable. That&apos;s why we offer
              2-Day Delivery, Pay After Delivery Model, Transparent Pricing, and Long-Term Technical Support.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our mission is to empower businesses with digital tools that increase visibility,
              automate operations, and drive revenue.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: 'var(--color-primary)' }}>What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Zap className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-highlight)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>2-Day Delivery</h3>
              <p className="text-gray-600">Fast turnaround without compromising quality</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Shield className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-highlight)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>Pay After Delivery</h3>
              <p className="text-gray-600">Satisfaction guaranteed before payment</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Target className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-highlight)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>Transparent Pricing</h3>
              <p className="text-gray-600">No hidden fees or surprises</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Headphones className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--color-highlight)' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>Long-Term Support</h3>
              <p className="text-gray-600">Ongoing technical assistance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-16 text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Vision</h2>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto">
            To become Africa&apos;s most trusted fast-delivery digital agency.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--color-primary)' }}>Ready to Work With Us?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Let&apos;s build your digital presence in just 2 days.
          </p>
          <Link
            href="/contact"
            className="inline-block text-white px-8 py-4 rounded-lg font-semibold transition hover:bg-[var(--color-accent)]"
            style={{ backgroundColor: 'var(--color-highlight)' }}
          >
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}
