"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star, Zap, CreditCard, Palette, Smartphone, Globe, Lock } from "lucide-react";

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
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Fetch data
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch(console.error);

    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(console.error);

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch(console.error);

    // Dynamic import GSAP only on client
    const initAnimations = async () => {
      try {
        const gsap = (await import('gsap')).default;
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        const Lenis = (await import('lenis')).default;

        gsap.registerPlugin(ScrollTrigger);

        // Initialize Lenis Smooth Scroll
        const lenis = new Lenis({
          duration: 1.2,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Hero Title Reveal
        const titleLines = document.querySelectorAll('.hero-title-line');
        gsap.from(titleLines, {
          y: '100%',
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.2,
        });

        // Hero Subtitle
        gsap.from('.hero-subtitle', {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          delay: 0.8,
        });

        // Hero Buttons
        gsap.from('.hero-btn', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 1,
        });

        // Stats Counter Animation
        const stats = document.querySelectorAll('.stat-number');
        stats.forEach((stat) => {
          const target = stat.getAttribute('data-target');
          gsap.to(stat, {
            textContent: target,
            duration: 2,
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
            },
          });
        });

        // Services Cards Reveal
        gsap.from('.service-card', {
          y: 100,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-section',
            start: 'top 70%',
          },
        });

        // Projects Parallax
        gsap.utils.toArray('.project-card').forEach((card: any, i) => {
          gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
            delay: i * 0.1,
          });
        });

        // Testimonials Reveal
        gsap.from('.testimonial-card', {
          y: 80,
          opacity: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 70%',
          },
        });

        // CTA Section Scale
        gsap.from('.cta-section', {
          scale: 0.9,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 75%',
          },
        });
      } catch (error) {
        console.error('Animation init error:', error);
      }
    };

    initAnimations();

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const features = [
    { icon: Zap, title: "48-Hour Delivery", desc: "Fast turnaround" },
    { icon: CreditCard, title: "Pay After Delivery", desc: "Satisfaction first" },
    { icon: Palette, title: "Free Design", desc: "Professional included" },
    { icon: Smartphone, title: "Android & iOS", desc: "Cross-platform" },
    { icon: Globe, title: "SEO-Optimized", desc: "Mobile responsive" },
    { icon: Lock, title: "Secure & Scalable", desc: "Built for growth" },
  ];

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-[clamp(20px,5vw,8%)] py-[clamp(20px,4vw,40px)] flex justify-between items-center mix-blend-difference">
        <Link href="/" className="text-2xl font-bold tracking-tight">VEESIOO</Link>
        <ul className="hidden md:flex gap-[clamp(20px,4vw,40px)] list-none">
          <li><Link href="/about" className="text-sm font-medium uppercase tracking-wider hover:underline">About</Link></li>
          <li><Link href="/services" className="text-sm font-medium uppercase tracking-wider hover:underline">Services</Link></li>
          <li><Link href="/projects" className="text-sm font-medium uppercase tracking-wider hover:underline">Projects</Link></li>
          <li><Link href="/team" className="text-sm font-medium uppercase tracking-wider hover:underline">Team</Link></li>
          <li><Link href="/contact" className="text-sm font-medium uppercase tracking-wider hover:underline">Contact</Link></li>
        </ul>
        <button 
          className="md:hidden p-2 bg-transparent border-none cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center items-center gap-8">
          <button 
            className="absolute top-8 right-8 p-2 bg-transparent border-none cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <Link href="/about" className="text-[clamp(2rem,8vw,4rem)] font-bold uppercase" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/services" className="text-[clamp(2rem,8vw,4rem)] font-bold uppercase" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link href="/projects" className="text-[clamp(2rem,8vw,4rem)] font-bold uppercase" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
          <Link href="/team" className="text-[clamp(2rem,8vw,4rem)] font-bold uppercase" onClick={() => setMobileMenuOpen(false)}>Team</Link>
          <Link href="/contact" className="text-[clamp(2rem,8vw,4rem)] font-bold uppercase" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </div>
      )}

      {/* Hero Section */}
      <section className="hero min-h-screen flex flex-col justify-center items-center text-center pt-24">
        <div className="container max-w-7xl mx-auto px-[clamp(20px,5vw,8%)]">
          <h1 className="text-[clamp(3rem,10vw,9rem)] font-black leading-[0.95] tracking-[-0.04em] uppercase mb-[clamp(20px,4vw,40px)]">
            <span className="hero-title-line block overflow-hidden">Build Your</span>
            <span className="hero-title-line block overflow-hidden">Digital Future</span>
            <span className="hero-title-line block overflow-hidden" style={{ color: 'var(--color-highlight)' }}>Today</span>
          </h1>
          <p className="hero-subtitle text-[clamp(1rem,2vw,1.5rem)] text-[#8a8a8a] max-w-[600px] mx-auto mb-[clamp(30px,6vw,60px)]">
            Premium websites and mobile apps delivered in 48 hours.
            Pay after delivery. Starting from ₦50,000.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center hero-btns">
            <Link href="/contact" className="btn btn-primary inline-flex items-center justify-center gap-2 px-[clamp(32px,6vw,64px)] py-[clamp(16px,3vw,24px)] text-sm font-bold uppercase tracking-wider bg-white text-[#0a0a0a] relative overflow-hidden transition-all duration-300 hover:text-white">
              Start Project
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/projects" className="btn btn-outline inline-flex items-center justify-center gap-2 px-[clamp(32px,6vw,64px)] py-[clamp(16px,3vw,24px)] text-sm font-bold uppercase tracking-wider bg-transparent text-white border border-[rgba(255,255,255,0.3)] hover:border-white hover:bg-[rgba(255,255,255,0.1)] transition-all duration-300">
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="scroll-indicator absolute bottom-[40px] left-1/2 -translate-x-1/2 animate-[bounce_2s_ease-in-out_infinite]">
          <svg className="w-6 h-6 text-white/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="stat-number text-4xl md:text-6xl font-black mb-2" data-target="150" style={{ color: 'var(--color-highlight)' }}>0</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Projects Delivered</p>
            </div>
            <div className="text-center">
              <p className="stat-number text-4xl md:text-6xl font-black mb-2" data-target="98" style={{ color: 'var(--color-accent)' }}>0</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">% Happy Clients</p>
            </div>
            <div className="text-center">
              <p className="stat-number text-4xl md:text-6xl font-black mb-2" data-target="48" style={{ color: 'var(--color-secondary)' }}>0</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Hour Delivery</p>
            </div>
            <div className="text-center">
              <p className="stat-number text-4xl md:text-6xl font-black mb-2" data-target="5" style={{ color: 'var(--color-primary)' }}>0</p>
              <p className="text-sm text-gray-400 uppercase tracking-wider">Star Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <h2 className="mb-16">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(0, 6).map((service, index) => (
              <div key={service.id} className="card service-card">
                <h3 className="text-xl mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Marquee */}
      <div className="py-12 overflow-hidden bg-[#111]">
        <div className="marquee">
          <span className="text-6xl md:text-8xl font-black mx-8" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
            48-HOUR DELIVERY • PAY AFTER DELIVERY • FREE DESIGN • 
          </span>
          <span className="text-6xl md:text-8xl font-black mx-8" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>
            48-HOUR DELIVERY • PAY AFTER DELIVERY • FREE DESIGN • 
          </span>
        </div>
      </div>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <h2 className="mb-16">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project) => (
              <div key={project.id} className="project-card">
                <img
                  src={project.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"}
                  alt={project.title}
                  className="project-card-image"
                />
                <div className="project-card-overlay" />
                <div className="p-6">
                  <h3 className="text-xl mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="mb-16">Client Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="card testimonial-card">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <p className="font-semibold">{testimonial.name}</p>
                {testimonial.location && (
                  <p className="text-sm text-gray-400">{testimonial.location}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container text-center">
          <h2 className="mb-8">Ready to Start?</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Let's create something amazing together. Get your project delivered in just 48 hours.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Get Started Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 className="text-2xl font-bold mb-4">VEESIOO</h3>
              <p className="text-gray-400">
                A fast-growing digital agency delivering websites, mobile apps, and branding solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="footer-link">About Us</Link></li>
                <li><Link href="/services" className="footer-link">Services</Link></li>
                <li><Link href="/projects" className="footer-link">Projects</Link></li>
                <li><Link href="/contact" className="footer-link">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Nigeria</li>
                <li>info@veesioo.com</li>
                <li>+234 904 015 7866</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
            <p>&copy; 2026 Veesioo. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
