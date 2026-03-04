"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Globe, Smartphone, Palette, ShoppingCart, Cpu, ArrowRight, CheckCircle } from "lucide-react";

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
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#270A09] to-[#720E07] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Comprehensive digital solutions to grow your business
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => {
              const IconComponent = service.icon ? iconMap[service.icon] || Globe : Globe;
              const details = serviceDetails[service.title] || {
                description: service.description,
                features: ["Custom solutions", "Professional quality", "Fast delivery", "Ongoing support"],
              };

              return (
                <div
                  key={service.id}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1">
                    <div className="bg-[#E94D1A]/10 rounded-2xl p-8 flex items-center justify-center h-64">
                      <IconComponent className="h-32 w-32 text-[#E94D1A]" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4 text-[#270A09]">{service.title}</h2>
                    <p className="text-lg text-gray-700 mb-6">{details.description}</p>
                    <p className="text-gray-600 mb-4 font-semibold">Includes:</p>
                    <ul className="space-y-2 mb-8">
                      {details.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-700">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-[#E94D1A] font-semibold hover:text-[#C3130B] transition"
                    >
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#270A09]">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact us today for a free consultation and quote for your project.
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
