"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { fetchJSON } from "@/lib/api";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  websiteUrl: string | null;
  category: string | null;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    (async () => {
      const data = await fetchJSON<any[]>("/api/projects");
      setProjects(Array.isArray(data) ? data : []);
    })();
  }, []);

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))) as string[]];
  
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6">
            Our Portfolio
          </h1>
          <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto">
            Explore our latest projects and see how we&apos;ve helped businesses grow
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-4 sm:py-6 bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1.5 sm:px-6 sm:py-2 rounded-full font-semibold text-xs sm:text-sm transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img
                    src={project.imageUrl || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Category Badge */}
                  {project.category && (
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-2 py-1 sm:px-3 sm:py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-bold text-[var(--color-primary)]">
                        {project.category}
                      </span>
                    </div>
                  )}
                  {/* Website Link Button */}
                  {project.websiteUrl && (
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                      <a
                        href={project.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2 bg-white/90 backdrop-blur-sm rounded-lg text-xs sm:text-sm font-semibold text-[var(--color-primary)] hover:bg-white transition-colors"
                      >
                        <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                    {project.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Hover accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-highlight)] to-[var(--color-accent)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <p className="text-sm sm:text-xl text-gray-600">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-base sm:text-xl text-white/80 mb-6 sm:mb-8">
            Let&apos;s create something amazing together in just 2 days.
          </p>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-white text-[var(--color-primary)] rounded-full font-bold text-sm sm:text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4 sm:w-6 sm:h-6 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}
