import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@veesioo.com" },
    update: {},
    create: {
      email: "admin@veesioo.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  // Create testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        name: "Chinedu A.",
        content: "Veesioo delivered my company website in 2 days exactly as promised. I paid after seeing the final result. Very professional.",
        rating: 5,
        location: "Abuja",
      },
      {
        name: "Mariam T.",
        content: "They built my real estate platform and mobile app. Smooth process and fast delivery.",
        rating: 5,
        location: "Lagos",
      },
      {
        name: "David E.",
        content: "Affordable and reliable. The design quality shocked me at that price.",
        rating: 5,
        location: "Port Harcourt",
      },
    ],
  });

  // Create services
  await prisma.service.createMany({
    data: [
      {
        title: "Full-Stack Website Development",
        description: "Corporate websites, e-commerce stores, landing pages, booking systems, real estate platforms, and more.",
        icon: "globe",
      },
      {
        title: "Graphics & Brand Design",
        description: "Logos, flyers, banners, social media designs, UI/UX mockups.",
        icon: "palette",
      },
      {
        title: "Mobile App Development",
        description: "Android & iPhone apps built for speed, performance, and monetization.",
        icon: "smartphone",
      },
      {
        title: "E-Commerce Solutions",
        description: "Online stores with payment gateway integration.",
        icon: "shopping-cart",
      },
      {
        title: "Business Automation",
        description: "Custom dashboards, admin panels, booking systems.",
        icon: "cpu",
      },
    ],
  });

  // Create team members
  await prisma.teamMember.createMany({
    data: [
      {
        name: "CEO & Lead Developer",
        role: "Full-Stack Engineer",
        bio: "Expert in web architecture, backend systems, and app deployment.",
      },
      {
        name: "UI/UX Designer",
        role: "Design Specialist",
        bio: "Specialist in modern, conversion-focused interfaces.",
      },
      {
        name: "Mobile App Engineer",
        role: "App Development Expert",
        bio: "Expert in Android & iOS performance optimization.",
      },
      {
        name: "Graphics Director",
        role: "Brand Identity Specialist",
        bio: "Brand identity and visual storytelling specialist.",
      },
    ],
  });

  // Create sample projects
  await prisma.project.createMany({
    data: [
      {
        title: "E-Commerce Platform",
        description: "Full-featured online store with payment integration",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
        websiteUrl: "https://example.com",
        category: "E-Commerce",
      },
      {
        title: "Real Estate Website",
        description: "Property listing and booking platform",
        imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
        websiteUrl: "https://example.com",
        category: "Real Estate",
      },
      {
        title: "Restaurant Booking App",
        description: "Table reservation and menu management system",
        imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
        websiteUrl: "https://example.com",
        category: "Hospitality",
      },
      {
        title: "Healthcare Portal",
        description: "Patient management and appointment booking",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        websiteUrl: "https://example.com",
        category: "Healthcare",
      },
      {
        title: "Education Platform",
        description: "Online learning and course management",
        imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
        websiteUrl: "https://example.com",
        category: "Education",
      },
      {
        title: "Fitness Tracking App",
        description: "Workout tracking and nutrition planning",
        imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80",
        websiteUrl: "https://example.com",
        category: "Health & Fitness",
      },
    ],
  });

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
