import type React from "react";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Rasel — System Architect",
  description:
    "Full-Stack Developer & API Architect. Building scalable web platforms with clean architecture.",
  keywords: [
    "Full-Stack Developer",
    "API Architect",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Rasel" }],
  openGraph: {
    title: "Rasel — System Architect",
    description: "Senior Full-Stack Engineer & API Architect",
    type: "website",
  },
  icons: {
    icon: "/fav-rasel.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
