"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { fetchJSON } from "@/lib/api";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image: string | null;
}

export default function TeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    (async () => {
      const data = await fetchJSON<any[]>("/api/team");
      setMembers(Array.isArray(data) ? data : []);
    })();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">Meet The Team</h1>
          <p className="text-base sm:text-xl text-white/90 max-w-3xl mx-auto">
            The talented professionals behind Veesioo&apos;s success
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {members.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="bg-gray-200 h-40 sm:h-48 flex items-center justify-center">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-16 w-16 sm:h-24 sm:w-24 text-gray-400" />
                  )}
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>{member.name}</h3>
                  <p className="text-sm sm:text-base text-[var(--color-highlight)] font-semibold mb-2 sm:mb-3">{member.role}</p>
                  {member.bio && <p className="text-gray-600 text-xs sm:text-sm">{member.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--color-primary)' }}>Join Our Team</h2>
          <p className="text-sm sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals to join our fast-growing digital agency.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[var(--color-highlight)] text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-[var(--color-accent)] transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
