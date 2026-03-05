"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "",
          budget: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto">
            Let&apos;s Build Your Project in 2 Days
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-green-600 mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-sm sm:text-base text-green-700">
                    Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-sm sm:text-base text-green-600 hover:text-green-700 font-semibold"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent text-sm sm:text-base"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent text-sm sm:text-base"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent text-sm sm:text-base"
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Select a project type</option>
                      <option value="Website">Website</option>
                      <option value="Mobile App">Mobile App</option>
                      <option value="Graphics Design">Graphics Design</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Business Automation">Business Automation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                      Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent text-sm sm:text-base"
                    >
                      <option value="">Select budget range</option>
                      <option value="₦50,000 - ₦100,000">₦50,000 - ₦100,000</option>
                      <option value="₦100,000 - ₦200,000">₦100,000 - ₦200,000</option>
                      <option value="₦200,000 - ₦500,000">₦200,000 - ₦500,000</option>
                      <option value="₦500,000+">₦500,000+</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-highlight)] focus:border-transparent text-sm sm:text-base"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[var(--color-highlight)] text-white py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-[var(--color-accent)] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {loading ? "Sending..." : (
                      <>
                        Request Free Consultation <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--color-primary)' }}>Get in Touch</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                Have questions? We&apos;re here to help. Reach out to us and we&apos;ll respond as soon as possible.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 mt-1" style={{ color: 'var(--color-highlight)' }} />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-lg" style={{ color: 'var(--color-primary)' }}>Office Location</h3>
                    <p className="text-sm text-gray-600">Nigeria</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 mt-1" style={{ color: 'var(--color-highlight)' }} />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-lg" style={{ color: 'var(--color-primary)' }}>Email</h3>
                    <a href="mailto:info@veesioo.com" style={{ color: 'var(--color-highlight)' }} className="hover:underline text-sm sm:text-base">
                      info@veesioo.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 mr-3 sm:mr-4 mt-1" style={{ color: 'var(--color-highlight)' }} />
                  <div>
                    <h3 className="font-semibold text-sm sm:text-lg" style={{ color: 'var(--color-primary)' }}>Phone/WhatsApp</h3>
                    <a href="tel:+2349040157866" style={{ color: 'var(--color-highlight)' }} className="hover:underline text-sm sm:text-base">
                      +234 904 015 7866
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-8 sm:mt-12 bg-[var(--color-highlight)]/10 rounded-lg p-4 sm:p-6">
                <h3 className="font-bold text-sm sm:text-lg mb-3 sm:mb-4" style={{ color: 'var(--color-primary)' }}>Why Choose Veesioo?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm sm:text-base text-gray-700">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-3" />
                    48-Hour Delivery
                  </li>
                  <li className="flex items-center text-sm sm:text-base text-gray-700">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-3" />
                    Pay After Delivery
                  </li>
                  <li className="flex items-center text-sm sm:text-base text-gray-700">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-3" />
                    Free Graphics Design
                  </li>
                  <li className="flex items-center text-sm sm:text-base text-gray-700">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mr-3" />
                    SEO-Optimized & Mobile Responsive
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
