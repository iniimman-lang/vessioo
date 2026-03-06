"use client";

import { useEffect, useState } from "react";
import { Star, ThumbsUp, MessageSquare, Repeat } from "lucide-react";
import { fetchJSON } from "@/lib/api";

interface Testimonial {
  id: string;
  name: string;
  content: string;
  rating: number;
  location: string | null;
}

export default function ReviewsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchJSON<any[]>("/api/testimonials");
      setTestimonials(Array.isArray(data) ? data : []);
    })();
  }, []);

  const stats = [
    { icon: MessageSquare, value: "150+", label: "Projects Completed" },
    { icon: ThumbsUp, value: "98%", label: "Client Satisfaction" },
    { icon: Repeat, value: "85%", label: "Repeat Customers" },
    { icon: Star, value: "5.0", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">Client Reviews</h1>
          <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto">
            See what our clients say about working with Veesioo
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4" style={{ color: 'var(--color-highlight)' }} />
                <p className="text-2xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.value}</p>
                <p className="text-xs sm:text-base text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12" style={{ color: 'var(--color-primary)' }}>What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 italic leading-relaxed">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-bold text-sm sm:text-base">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                    {testimonial.location && <p className="text-gray-500 text-xs sm:text-sm">{testimonial.location}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reviews */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">More Feedback</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <p className="text-sm sm:text-base text-gray-700 italic">&ldquo;Delivered before deadline.&rdquo;</p>
              <div className="flex mt-3 sm:mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <p className="text-sm sm:text-base text-gray-700 italic">&ldquo;Professional communication.&rdquo;</p>
              <div className="flex mt-3 sm:mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <p className="text-sm sm:text-base text-gray-700 italic">&ldquo;Excellent value for money.&rdquo;</p>
              <div className="flex mt-3 sm:mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
              <p className="text-sm sm:text-base text-gray-700 italic">&ldquo;Highly recommended for startups!&rdquo;</p>
              <div className="flex mt-3 sm:mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Join Our Happy Clients</h2>
          <p className="text-sm sm:text-xl text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
            Experience the Veesioo difference. Get your project delivered in 2 days.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[var(--color-highlight)] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-[var(--color-accent)] transition"
          >
            Start Your Project
          </a>
        </div>
      </section>
    </div>
  );
}
