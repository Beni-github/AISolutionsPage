import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ea580c",
};

export const metadata: Metadata = {
  title: "Fenn — AI Agents & Websites for Business",
  description:
    "Private AI agents and web development for homes and businesses. One-time pricing. Local execution. No subscriptions.",
  keywords: [
    "AI agent",
    "private AI",
    "business automation",
    "AI receptionist",
    "website development",
    "AI for business",
  ],
  authors: [{ name: "Fenn" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Fenn — AI Agents & Websites for Business",
    description:
      "Private AI agents and web development for homes and businesses.",
    url: "https://aisolutions-site.vercel.app",
    siteName: "Fenn",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fenn — AI Agents & Websites for Business",
    description:
      "Private AI agents and web development for homes and businesses.",
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
