import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0284c7",
};

export const metadata: Metadata = {
  title: "AI Solutions — AI Agents for Business",
  description:
    "Voice receptionists, personal AI agents, and web development for SMBs. 24/7 AI that answers calls, books appointments, and drives growth.",
  keywords: [
    "AI receptionist",
    "voice AI",
    "AI agent",
    "business automation",
    "call handling AI",
    "SMB AI",
    " appointment booking AI",
  ],
  authors: [{ name: "AI Solutions" }],
  openGraph: {
    title: "AI Solutions — AI Agents for Business",
    description:
      "Voice receptionists, personal AI agents, and web development for SMBs.",
    url: "https://aisolutions.com",
    siteName: "AI Solutions",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions — AI Agents for Business",
    description:
      "Voice receptionists, personal AI agents, and web development for SMBs.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
