"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Zap, CreditCard, Palette, Smartphone, Globe, Lock, TrendingUp, Star, ArrowRight, X } from "lucide-react";

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

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  websiteUrl: string | null;
  category: string | null;
}

export default function Home() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: "",
    location: "",
    content: "",
    rating: 5,
  });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Handle scroll-based zoom effect
    const handleScroll = () => {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection) {
        const scrollTop = window.scrollY;
        const heroHeight = heroSection.clientHeight;
        const progress = Math.min(scrollTop / heroHeight, 1);
        setScrollProgress(progress);
        
        // Apply zoom effect to elements
        const zoomElements = document.querySelectorAll('.zoom-on-scroll');
        zoomElements.forEach((el) => {
          const scale = 1 - progress * 0.3;
          const opacity = 1 - progress * 1.5;
          (el as HTMLElement).style.transform = `scale(${scale})`;
          (el as HTMLElement).style.opacity = `${Math.max(opacity, 0)}`;
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data));

    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSubmitting(true);

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewForm),
      });

      if (res.ok) {
        setReviewSubmitted(true);
        setReviewForm({ name: "", location: "", content: "", rating: 5 });
        // Refresh testimonials
        const data = await fetch("/api/testimonials").then((r) => r.json());
        setTestimonials(data);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setReviewSubmitting(false);
    }
  };

  const features = [
    { icon: Zap, title: "48-Hour Delivery", desc: "Fast turnaround time" },
    { icon: CreditCard, title: "Pay After Delivery", desc: "Satisfaction guaranteed" },
    { icon: Palette, title: "Free Graphics Design", desc: "Professional designs included" },
    { icon: Smartphone, title: "Android & iOS", desc: "Cross-platform development" },
    { icon: Globe, title: "SEO-Optimized", desc: "Mobile responsive" },
    { icon: Lock, title: "Secure & Scalable", desc: "Built for growth" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - White Background with Scroll Animations */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        {/* Animated Background Elements using brand colors */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large gradient orbs using brand colors */}
          <div className="absolute -top-40 -right-40 w-96 h-96 sm:w-[600px] sm:h-[600px] rounded-full opacity-20 blur-3xl animate-float"
               style={{ background: 'radial-gradient(circle, var(--color-highlight) 0%, transparent 70%)' }}></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full opacity-20 blur-3xl animate-float-delayed"
               style={{ background: 'radial-gradient(circle, var(--color-accent) 0%, transparent 70%)' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-3xl"
               style={{ background: 'radial-gradient(circle, var(--color-secondary) 0%, transparent 70%)' }}></div>
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(var(--color-primary) 1px, transparent 1px),
                               linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>
        </div>

        {/* Hero Content with Scroll-triggered Zoom */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Animated Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full mb-8 sm:mb-12 opacity-0 animate-fade-in-up cursor-pointer hover:scale-105 transition-transform"
            style={{ 
              background: 'linear-gradient(135deg, var(--color-highlight)/10, var(--color-accent)/10)',
              border: '1px solid var(--color-highlight)/30'
            }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3" style={{ backgroundColor: 'var(--color-highlight)' }}></span>
            </span>
            <span className="text-sm sm:text-base font-medium" style={{ color: 'var(--color-primary)' }}>Available for new projects</span>
          </div>

          {/* Main Heading with Zoom on Scroll */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black mb-6 sm:mb-8 leading-tight opacity-0 animate-fade-in-up zoom-on-scroll"
              style={{ color: 'var(--color-primary)' }}>
            Build Your
            <br />
            <span className="relative inline-block">
              <span style={{ 
                background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary), var(--color-highlight))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>Digital Future</span>
              {/* Underline animation */}
              <svg className="absolute -bottom-2 left-0 w-full h-3 opacity-30" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00025 6.99997C2.00025 6.99997 45.1429 -0.999975 100.5 3.49998C155.857 7.99998 198.001 2.99997 198.001 2.99997" 
                      stroke="var(--color-highlight)" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8 sm:mb-12 max-w-4xl mx-auto opacity-0 animate-fade-in-up zoom-on-scroll font-light"
             style={{ color: 'var(--color-secondary)' }}>
            Premium Websites & Mobile Apps
            <span className="font-bold" style={{ color: 'var(--color-primary)' }}> Delivered in 48 Hours</span>
          </p>

          {/* Pricing Cards */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12 sm:mb-16 opacity-0 animate-fade-in-up zoom-on-scroll">
            <div className="group relative bg-white rounded-3xl px-8 py-6 sm:px-10 sm:py-8 border-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                 style={{ borderColor: 'var(--color-primary)/20' }}>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background: `linear-gradient(135deg, var(--color-primary)/5, var(--color-highlight)/5)` }}></div>
              <div className="relative">
                <p className="text-sm sm:text-base mb-2 font-medium" style={{ color: 'var(--color-secondary)' }}>Websites from</p>
                <p className="text-4xl sm:text-5xl md:text-6xl font-black mb-1" style={{ color: 'var(--color-primary)' }}>₦50K</p>
                <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>(~$36)</p>
              </div>
            </div>
            
            <div className="group relative bg-white rounded-3xl px-8 py-6 sm:px-10 sm:py-8 border-2 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-pulse-glow"
                 style={{ borderColor: 'var(--color-highlight)/40' }}>
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                   style={{ background: `linear-gradient(135deg, var(--color-highlight), var(--color-accent))` }}>
                MOST POPULAR
              </div>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                   style={{ background: `linear-gradient(135deg, var(--color-highlight)/10, var(--color-accent)/10)` }}></div>
              <div className="relative">
                <p className="text-sm sm:text-base mb-2 font-medium" style={{ color: 'var(--color-secondary)' }}>Mobile Apps from</p>
                <p className="text-4xl sm:text-5xl md:text-6xl font-black mb-1" style={{ color: 'var(--color-highlight)' }}>₦100K</p>
                <p className="text-sm" style={{ color: 'var(--color-secondary)' }}>(~$72)</p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 sm:mb-20 opacity-0 animate-fade-in-up zoom-on-scroll">
            <Link
              href="/contact"
              className="group relative px-10 py-5 rounded-full font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{ 
                background: `linear-gradient(135deg, var(--color-highlight), var(--color-accent))`,
                color: 'white'
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: `linear-gradient(135deg, var(--color-accent), var(--color-secondary))` }}></div>
            </Link>
            
            <Link
              href="/projects"
              className="group px-10 py-5 border-2 rounded-full font-bold text-base sm:text-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ 
                borderColor: 'var(--color-primary)',
                color: 'var(--color-primary)'
              }}
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Portfolio
              </span>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto opacity-0 animate-fade-in-up zoom-on-scroll">
            <div className="text-center p-4 rounded-2xl hover:scale-105 transition-transform duration-300"
                 style={{ background: `linear-gradient(135deg, var(--color-primary)/5, transparent)` }}>
              <p className="text-4xl sm:text-5xl md:text-6xl font-black mb-2" style={{ color: 'var(--color-highlight)' }}>150+</p>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>Projects Delivered</p>
            </div>
            <div className="text-center p-4 rounded-2xl hover:scale-105 transition-transform duration-300"
                 style={{ background: `linear-gradient(135deg, var(--color-accent)/5, transparent)` }}>
              <p className="text-4xl sm:text-5xl md:text-6xl font-black mb-2" style={{ color: 'var(--color-accent)' }}>98%</p>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>Happy Clients</p>
            </div>
            <div className="text-center p-4 rounded-2xl hover:scale-105 transition-transform duration-300"
                 style={{ background: `linear-gradient(135deg, var(--color-highlight)/5, transparent)` }}>
              <p className="text-4xl sm:text-5xl md:text-6xl font-black mb-2" style={{ color: 'var(--color-primary)' }}>48h</p>
              <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--color-secondary)' }}>Avg. Delivery</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow opacity-60">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Why Choose Veesioo */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[var(--color-highlight)] rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--color-accent)] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/20 text-white text-xs sm:text-sm font-semibold mb-4 backdrop-blur-sm">
              OUR ADVANTAGES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 text-white">
              Why Choose Veesioo?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              We deliver exceptional results with unmatched speed and flexibility
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white/10 backdrop-blur-md p-8 rounded-3xl hover:bg-white/15 transition-all duration-500 border border-white/10 hover:border-white/30 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-highlight)]/0 to-[var(--color-accent)]/0 group-hover:from-[var(--color-highlight)]/10 group-hover:to-[var(--color-accent)]/10 transition-all duration-500"></div>
                
                {/* Icon with glow effect */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[var(--color-highlight)]/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 scale-75 group-hover:scale-100"></div>
                  <div className="relative bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] rounded-2xl w-16 h-16 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-[var(--color-highlight)] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {feature.desc}
                  </p>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-3xl"></div>
              </div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/90 text-sm font-medium">All features included in every package</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-primary)] rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-[var(--color-highlight)] rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-[var(--color-secondary)] rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] text-white text-xs sm:text-sm font-bold mb-4 sm:mb-6 shadow-lg">
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              WHAT WE OFFER
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 tracking-tight" style={{ color: 'var(--color-primary)' }}>
              Our Services
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Comprehensive digital solutions for your business
            </p>
          </div>
          
          {/* Services - Alternating Layout */}
          <div className="space-y-12">
            {services.slice(0, 5).map((service, index) => (
              <div 
                key={service.id}
                className={`group relative ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                } flex flex-col md:flex-row items-center gap-8 lg:gap-16`}
              >
                {/* Icon/Visual Side */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    {/* Animated shape background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] rounded-3xl transform rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-20 group-hover:opacity-30"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] rounded-3xl transform -rotate-3 group-hover:-rotate-6 transition-transform duration-500 opacity-20 group-hover:opacity-30"></div>
                    
                    {/* Main card */}
                    <div className="relative bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] rounded-3xl p-12 shadow-2xl group-hover:shadow-3xl transition-all duration-500 overflow-hidden">
                      {/* Animated lines */}
                      <div className="absolute inset-0 opacity-30">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <pattern id={`grid-${index}`} width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill={`url(#grid-${index})`}/>
                        </svg>
                      </div>
                      
                      {/* Icon */}
                      <div className="relative z-10">
                        <div className="bg-white/20 backdrop-blur-sm rounded-2xl w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                          <svg className="h-10 w-10 sm:h-12 sm:w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content Side */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    {/* Number badge */}
                    <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500">
                      <span className="text-xl sm:text-3xl font-black text-white">{String(index + 1).padStart(2, '0')}</span>
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl border border-gray-100 group-hover:border-[var(--color-highlight)]/30 group-hover:shadow-2xl transition-all duration-500">
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 md:hidden" style={{ color: 'var(--color-primary)' }}>
                        {service.title}
                      </h3>
                      <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 md:mb-8">
                        {service.description}
                      </p>
                      
                      {/* Feature tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {['Fast Delivery', 'Premium Quality', '24/7 Support'].map((tag, i) => (
                          <span 
                            key={i}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium group-hover:bg-[var(--color-highlight)]/10 group-hover:text-[var(--color-highlight)] transition-colors duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* CTA Button */}
                      <a 
                        href="/services"
                        className="group/btn inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Learn More
                        <svg className="h-5 w-5 transform group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View All CTA */}
          <div className="text-center mt-20">
            <div className="inline-block relative">
              {/* Animated rings */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] rounded-full blur-xl opacity-50 animate-pulse"></div>
              <Link
                href="/services"
                className="group relative inline-flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] text-white rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">View All Services</span>
                <ArrowRight className="relative z-10 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/20 text-white text-xs font-bold mb-3 backdrop-blur-sm border border-white/30">
              BEST VALUE
            </span>
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-3 text-white">
              Pricing Snapshot
            </h2>
            <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
              Transparent pricing with no hidden fees
            </p>
          </div>
          
          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Starter Website */}
            <div className="group relative">
              <div className="relative bg-white rounded-2xl p-6 shadow-xl overflow-hidden">
                {/* Top badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[var(--color-highlight)] to-[var(--color-accent)] text-white px-4 py-1.5 rounded-bl-xl font-semibold text-xs">
                  POPULAR
                </div>
                
                {/* Card content */}
                <div className="mb-4 sm:mb-5">
                  <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                    Starter Website
                  </h3>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-highlight)' }}>₦50,000</span>
                    <span className="text-gray-500 text-xs sm:text-sm">(~$36)</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 sm:space-y-3 mb-6">
                  {[
                    { text: '5 Pages' },
                    { text: 'Mobile Responsive' },
                    { text: 'Contact Form' },
                    { text: 'Basic SEO' },
                    { text: 'Free Graphics' }
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm">{feature.text}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Link
                  href="/contact"
                  className="block w-full py-3 bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] text-white text-center rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>
            
            {/* Mobile App Package */}
            <div className="group relative">
              <div className="relative bg-white rounded-2xl p-6 shadow-xl overflow-hidden border-2 border-transparent hover:border-[var(--color-highlight)]/30">
                {/* Top badge */}
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[var(--color-accent)] to-[var(--color-secondary)] text-white px-4 py-1.5 rounded-bl-xl font-semibold text-xs flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  PREMIUM
                </div>
                
                {/* Card content */}
                <div className="mb-4 sm:mb-5">
                  <h3 className="text-lg sm:text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                    Mobile App Package
                  </h3>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>₦100,000</span>
                    <span className="text-gray-500 text-xs sm:text-sm">(~$72)</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 sm:space-y-3 mb-6">
                  {[
                    { text: 'Android + iOS' },
                    { text: 'Admin Panel' },
                    { text: 'API Integration' },
                    { text: 'App Store Guidance' }
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] flex items-center justify-center flex-shrink-0">
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 text-xs sm:text-sm">{feature.text}</span>
                    </li>
                  ))}
                </ul>
                
                {/* CTA Button */}
                <Link
                  href="/contact"
                  className="block w-full py-3 bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-secondary)] text-white text-center rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          
          {/* Custom Projects CTA */}
          <div className="text-center mt-12">
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
              <p className="text-white text-sm">
                <span className="font-semibold">Custom Projects?</span>{' '}
                <a href="/contact" className="text-[var(--color-highlight)] font-semibold hover:underline transition-all">
                  Contact Us
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-[var(--color-highlight)]/10 text-[var(--color-highlight)] text-xs font-bold mb-3 border border-[var(--color-highlight)]/20">
              TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: 'var(--color-primary)' }}>
              What Our Clients Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Don't just take our word for it
            </p>
            <button
              onClick={() => setShowReviewModal(true)}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] text-white rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              Write a Review
            </button>
          </div>
          
          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-[var(--color-highlight)]/30 overflow-hidden"
              >
                {/* Quote icon background */}
                <div className="absolute top-4 right-4 text-8xl font-serif text-[var(--color-highlight)]/5 leading-none select-none">
                  "
                </div>
                
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                {/* Rating */}
                <div className="flex mb-4 relative">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Content */}
                <div className="relative mb-6">
                  <svg className="absolute -top-2 -left-2 w-8 h-8 text-[var(--color-highlight)]/20" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.112-5.472-5.088-5.472-.48 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  <p className="text-gray-700 leading-relaxed pl-6">
                    {testimonial.content}
                  </p>
                </div>
                
                {/* Author */}
                <div className="flex items-center gap-3 relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-highlight)] to-[var(--color-accent)] flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    {testimonial.location && (
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {testimonial.location}
                      </p>
                    )}
                  </div>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-[var(--color-highlight)]/5 to-transparent rounded-tl-3xl"></div>
              </div>
            ))}
          </div>
          
          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '150+', label: 'Projects Completed' },
              { value: '98%', label: 'Client Satisfaction' },
              { value: '85%', label: 'Repeat Customers' },
              { value: '5.0', label: 'Average Rating' }
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 bg-white rounded-xl shadow-md">
                <p className="text-3xl font-bold text-[var(--color-highlight)] mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-[var(--color-highlight)] rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">
            Ready to Build Your Project?
          </h2>
          <p className="text-base sm:text-xl text-white/80 mb-6 sm:mb-8">
            Let's create something amazing together in just 2 days.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[var(--color-primary)] rounded-full font-bold text-base sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            Request Free Consultation
            <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => {
                setShowReviewModal(false);
                setReviewSubmitted(false);
              }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="p-6 sm:p-8">
              {reviewSubmitted ? (
                /* Success State */
                <div className="text-center py-8">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3" style={{ color: 'var(--color-primary)' }}>
                    Thank You!
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-6">
                    Your review has been submitted successfully.
                  </p>
                  <button
                    onClick={() => {
                      setShowReviewModal(false);
                      setReviewSubmitted(false);
                    }}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] text-white rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* Form */
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                      Write a Review
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Share your experience with Veesioo
                    </p>
                  </div>

                  <form onSubmit={handleReviewSubmit} className="space-y-4 sm:space-y-5">
                    {/* Rating */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                        Your Rating *
                      </label>
                      <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-7 h-7 sm:w-8 sm:h-8 ${
                                star <= reviewForm.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent outline-none transition text-sm sm:text-base"
                        placeholder="John Doe"
                      />
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                        Location
                      </label>
                      <input
                        type="text"
                        value={reviewForm.location}
                        onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent outline-none transition text-sm sm:text-base"
                        placeholder="Lagos, Nigeria"
                      />
                    </div>

                    {/* Review Content */}
                    <div>
                      <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
                        Your Review *
                      </label>
                      <textarea
                        required
                        value={reviewForm.content}
                        onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent outline-none transition resize-none"
                        placeholder="Share your experience working with Veesioo..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={reviewSubmitting}
                      className="w-full py-4 bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:transform-none"
                    >
                      {reviewSubmitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
