"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, Smartphone, Palette, ShoppingCart, Cpu, ArrowRight, CheckCircle } from "lucide-react";
import { fetchJSON } from "@/lib/api";

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string | null;
}

const serviceDetails: Record<string, { features: string[]; description: string }> = {
  "Full-Stack Website Development": {
    description: "We build scalable websites using modern technologies including frontend frameworks and backend APIs.",
    features: ["Admin dashboard", "Database integration", "Hosting setup", "SEO optimization", "Mobile responsive", "Contact forms"],
  },
  "Mobile App Development": {
    description: "Native and cross-platform apps for Android & iOS.",
    features: ["Push notifications", "Payment integration", "App store publishing guidance", "API integration", "Offline functionality", "Performance optimized"],
  },
  "Graphics & Branding": {
    description: "Professional design services for your brand identity.",
    features: ["Logo design", "Corporate identity kits", "Flyers & banners", "Social media kits", "UI/UX mockups", "Brand guidelines"],
  },
  "E-Commerce Solutions": {
    description: "Complete online store solutions with secure payment processing.",
    features: ["Product management system", "Secure checkout", "Inventory tracking", "Order management", "Payment gateway integration", "Customer accounts"],
  },
  "Business Automation": {
    description: "Streamline your operations with custom automation solutions.",
    features: ["Custom dashboards", "Admin panels", "Booking systems", "Workflow automation", "Report generation", "Integration with existing tools"],
  },
};

const iconMap: Record<string, React.ElementType> = {
  globe: Globe,
  smartphone: Smartphone,
  palette: Palette,
  "shopping-cart": ShoppingCart,
  cpu: Cpu,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchJSON<any[]>("/api/services");
      setServices(Array.isArray(data) ? data : []);
    })();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive digital solutions to grow your business
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 sm:space-y-16">
            {services.map((service, index) => {
              const IconComponent = service.icon ? iconMap[service.icon] || Globe : Globe;
              const details = serviceDetails[service.title] || {
                description: service.description,
                features: ["Custom solutions", "Professional quality", "Fast delivery", "Ongoing support"],
              };

              return (
                <div
                  key={service.id}
                  className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 w-full">
                    <div className="bg-[var(--color-highlight)]/10 rounded-2xl p-6 sm:p-8 flex items-center justify-center">
                      <IconComponent className="h-24 w-24 sm:h-32 sm:w-32" style={{ color: 'var(--color-highlight)' }} />
                    </div>
                  </div>
                  <div className="flex-1 w-full">
                    <h2 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4" style={{ color: 'var(--color-primary)' }}>{service.title}</h2>
                    <p className="text-sm sm:text-lg text-gray-700 mb-4 sm:mb-6">{details.description}</p>
                    <p className="text-sm text-gray-600 mb-3 sm:mb-4 font-semibold">Includes:</p>
                    <ul className="space-y-2 mb-6 sm:mb-8">
                      {details.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm sm:text-base text-gray-700">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-2 sm:mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-sm sm:text-base" style={{ color: 'var(--color-highlight)' }}
                    >
                      Get Started <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--color-primary)' }}>Ready to Get Started?</h2>
          <p className="text-sm sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote for your project.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[var(--color-highlight)] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-[var(--color-accent)] transition"
          >
            Request Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
