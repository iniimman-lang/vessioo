import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Instagram, MessageCircle } from "lucide-react";
import ChatWidget from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Veesioo - Build Your Website or Mobile App in Just 2 Days",
  description: "Full-Stack Websites from ₦50,000 (~$36). Android & iPhone Apps from ₦100,000 (~$72). Pay After Delivery.",
  manifest: "/manifest.json",
  themeColor: "#E94D1A",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Veesioo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
