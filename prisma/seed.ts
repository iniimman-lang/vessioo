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
