"use client";

import { useEffect, useState } from "react";
import { User } from "lucide-react";

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
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#270A09] to-[#720E07] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meet The Team</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            The talented professionals behind Veesioo&apos;s success
          </p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {members.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                  ) : (
                    <User className="h-24 w-24 text-gray-400" />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-[#270A09]">{member.name}</h3>
                  <p className="text-[#E94D1A] font-semibold mb-3">{member.role}</p>
                  {member.bio && <p className="text-gray-600 text-sm">{member.bio}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#270A09]">Join Our Team</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals to join our fast-growing digital agency.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[#E94D1A] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#C3130B] transition"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
