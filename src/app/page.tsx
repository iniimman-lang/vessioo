"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Zap, CreditCard, Palette, Smartphone, Globe, Lock, TrendingUp, Star, ArrowRight } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  location: string | null;
}

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
}

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));

    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const features = [
    { icon: Zap, title: "48-Hour Delivery", desc: "Fast turnaround time" },
    { icon: CreditCard, title: "Pay After Delivery", desc: "Satisfaction guaranteed" },
    { icon: Palette, title: "Free Graphics Design", desc: "Professional designs included" },
    { icon: Smartphone, title: "Android & iOS", desc: "Cross-platform development" },
    { icon: Globe, title: "SEO-Optimized", desc: "Mobile responsive" },
    { icon: Lock, title: "Secure & Scalable", desc: "Built for growth" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "var(--hero-image)"
          }}
        ></div>
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Build Your Website or Mobile App in Just 2 Days
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white">
            Full-Stack Websites from ₦50,000 (~$36)<br />
            Android & iPhone Apps from ₦100,000 (~$72)<br />
            <span className="font-semibold">Pay After Delivery.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-[var(--color-highlight)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[var(--color-accent)] transition inline-flex items-center justify-center"
            >
              Get Started Now
            </Link>
            <Link
              href="/reviews"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[var(--color-primary)] transition inline-flex items-center justify-center"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Veesioo */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12" style={{ color: 'var(--color-primary)' }}>Why Choose Veesioo?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                <feature.icon className="h-12 w-12 mb-4" style={{ color: 'var(--color-highlight)' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4" style={{ color: 'var(--color-primary)' }}>Our Services</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Comprehensive digital solutions for your business
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 5).map((service) => (
              <div key={service.id} className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-highlight)' }}>{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center font-semibold transition hover:text-[var(--color-accent)]"
              style={{ color: 'var(--color-highlight)' }}
            >
              View All Services <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#270A09]">Pricing Snapshot</h2>
          <p className="text-gray-600 text-center mb-12">Transparent pricing with no hidden fees</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Website */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-[#270A09]">
              <h3 className="text-2xl font-bold mb-2 text-[#270A09]">Starter Website</h3>
              <p className="text-4xl font-bold text-[#E94D1A] mb-2">₦50,000</p>
              <p className="text-gray-500 mb-6">(~$36)</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />5 Pages</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Mobile Responsive</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Contact Form</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Basic SEO</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Free Graphics</li>
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-[#270A09] text-white py-3 rounded-lg font-semibold hover:bg-[#720E07] transition"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile App Package */}
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-[#720E07]">
              <h3 className="text-2xl font-bold mb-2 text-[#270A09]">Mobile App Package</h3>
              <p className="text-4xl font-bold text-[#C3130B] mb-2">₦100,000</p>
              <p className="text-gray-500 mb-6">(~$72)</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Android + iOS</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />Admin Panel</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />API Integration</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" />App Store Guidance</li>
              </ul>
              <Link
                href="/contact"
                className="block text-center bg-[#720E07] text-white py-3 rounded-lg font-semibold hover:bg-[#C3130B] transition"
              >
                Get Started
              </Link>
            </div>
          </div>
          <p className="text-center mt-8 text-gray-600">
            <strong>Custom Projects?</strong> <Link href="/contact" className="text-[#E94D1A] hover:underline">Contact Us</Link>
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#270A09]">Testimonials</h2>
          <p className="text-gray-600 text-center mb-12">What our clients say about us</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <p className="font-semibold">— {testimonial.name}</p>
                {testimonial.location && <p className="text-gray-500 text-sm">{testimonial.location}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#270A09] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Build Your Project?</h2>
          <p className="text-xl mb-8 text-white/80">
            Let&apos;s create something amazing together in just 2 days.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#E94D1A] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#C3130B] transition"
          >
            Request Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
