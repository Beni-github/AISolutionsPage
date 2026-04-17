"use client";
import { useState, useEffect } from "react";

/* ─── UI Components ─── */
function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "secondary" | "ghost" }) {
  const base = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
    secondary: "bg-white text-brand-600 border-2 border-brand-600 hover:bg-brand-50",
    ghost: "text-brand-600 hover:bg-brand-50 border border-gray-200 hover:border-brand-300",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

function Card({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-gray-200 p-6 shadow-sm ${
        hover ? "hover:shadow-md hover:border-brand-200 transition-all duration-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function TabNav({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="flex gap-2 bg-gray-100 p-1 rounded-xl w-fit" role="tablist">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === i}
          onClick={() => onChange(i)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            active === i
              ? "bg-white text-brand-700 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  calls,
  desc,
  features,
  highlight,
  onSelect,
}: {
  name: string;
  price: string;
  period: string;
  calls: string;
  desc: string;
  features: string[];
  highlight?: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={`flex flex-col relative ${highlight ? "border-brand-500 ring-2 ring-brand-100" : ""}`}
      hover={false}
    >
      {highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-gray-500 text-sm mb-4">{desc}</p>
      <div className="mb-2">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        {period && <span className="text-gray-400">{period}</span>}
      </div>
      <p className="text-sm font-medium text-brand-600 mb-6">{calls}</p>
      <ul className="space-y-2 mb-8 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-brand-500 flex-shrink-0 mt-0.5">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Button
        variant={highlight ? "primary" : "secondary"}
        className="w-full mt-auto"
        onClick={onSelect}
      >
        Get Started
      </Button>
    </Card>
  );
}

/* ─── Hamburger Nav ─── */
function MobileNav({
  onClose,
}: {
  onClose: () => void;
}) {
  const navItems: [string, string][] = [
    ["Services", "services"],
    ["Pricing", "pricing"],
    ["How It Works", "process"],
    ["FAQ", "faq"],
    ["Contact", "contact"],
  ];

  const handleNav = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose}>
      <div
        className="absolute right-0 top-0 h-full w-64 bg-white shadow-xl p-6 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="self-end text-gray-500 hover:text-gray-900 text-2xl leading-none p-1"
          aria-label="Close menu"
        >
          ×
        </button>
        <nav className="flex flex-col gap-4">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className="text-gray-700 hover:text-brand-600 font-medium text-left transition-colors"
            >
              {label}
            </button>
          ))}
        </nav>
        <Button variant="primary" className="w-full mt-auto" onClick={() => handleNav("contact")}>
          Get Started
        </Button>
      </div>
    </div>
  );
}

/* ─── Form Success/Error States ─── */
function FormField({
  label,
  id,
  error,
  required,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-brand-500 ml-1">*</span>}
      </label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}

/* ─── Data ─── */
const testimonials = [
  {
    quote: "Betty's Bakery went from missing catering orders every week to having an AI assistant that catches everything. The morning inventory briefing alone saved us 3 hours a week.",
    author: "Marcus Chen",
    business: "Betty's Bakery, Austin TX",
    service: "AI Agent Deployment",
  },
  {
    quote: "Our landing page went live in 6 days. Clean design, mobile-friendly, and we're getting inquiries from local customers we weren't reaching before.",
    author: "Sarah Rodriguez",
    business: "Rodriguez Home Services, Denver CO",
    service: "Landing Page",
  },
  {
    quote: "The AI agent handles our Instagram DMs and drafts replies while I sleep. My social media presence went from sporadic to consistent without adding hours to my day.",
    author: "James Wright",
    business: "Wright Fitness Studio, Miami FL",
    service: "AI Agent + Website",
  },
  {
    quote: "Full business website with 8 pages, contact forms, and SEO setup — delivered in 2 weeks. The custom design felt exactly like our brand, not a template.",
    author: "Elena Kowalski",
    business: "Kowalski Legal Group, Chicago IL",
    service: "Business Website",
  },
];

const landingPageFeatures = [
  { icon: "🌐", title: "Mobile Responsive", desc: "Looks great on phones, tablets, and desktops." },
  { icon: "📱", title: "Contact Forms", desc: "Let visitors reach you directly from your page." },
  { icon: "⚡", title: "Fast Loading", desc: "Optimized for speed and SEO from day one." },
  { icon: "🎨", title: "Professional Design", desc: "Clean, modern design that matches your brand." },
  { icon: "🔍", title: "Basic SEO", desc: "Search engine optimization to get found locally." },
  { icon: "✅", title: "1 Revision Round", desc: "One round of changes included, fast turnaround." },
];

const industries = [
  "Small Business Owners", "Freelancers & Consultants", "Real Estate Agents",
  "Home Services", "Restaurants & Cafes", "Salons & Spas",
  "Tech Startups", "Personal Branding", "E-commerce", "Local Retail",
];

const websiteFeatures = [
  { icon: "📄", title: "5-15 Pages", desc: "Home, about, services, contact, and more." },
  { icon: "🎨", title: "Custom Design", desc: "Tailored to your brand, not a template." },
  { icon: "📊", title: "SEO Optimized", desc: "Meta tags, structured data, local SEO setup." },
  { icon: "📱", title: "Mobile First", desc: "Every page optimized for all devices." },
  { icon: "📧", title: "Contact Forms", desc: "Lead capture forms with email notifications." },
  { icon: "🔒", title: "SSL Included", desc: "Secure HTTPS encryption on your domain." },
];

const webDevOfferings = [
  { icon: "🌐", title: "Landing Pages", price: "$399", time: "5–7 days" },
  { icon: "🏢", title: "Business Websites", price: "$1,500–$3,500", time: "2–3 weeks" },
  { icon: "🤖", title: "AI Agent Setup", price: "$1,500–$7,500", time: "Remote or On-site" },
  { icon: "💻", title: "Hardware Bundles", price: "$450–$700", time: "Mini PC + Agent" },
];

const processSteps = [
  { num: "01", title: "Contact", desc: "Reach out via the form below. We'll schedule a quick call to discuss your needs." },
  { num: "02", title: "Proposal", desc: "Based on our call, you'll receive a custom proposal with pricing and timeline." },
  { num: "03", title: "Deposit", desc: "50% upfront to start. We begin work immediately after payment." },
  { num: "04", title: "Delivery", desc: "Websites: 5 days to 3 weeks. AI agents: guided 2–3 day setup connecting your tools, configuring workflows, and going live." },
];

const pricingTiers = [
  {
    name: "Landing Page",
    price: "$399",
    period: "one-time",
    calls: "5–7 day delivery",
    desc: "Perfect for startups and service-based businesses.",
    features: ["Single page website", "Mobile responsive", "Contact form", "Basic SEO", "1 revision round"],
  },
  {
    name: "Business Website",
    price: "$1,500",
    period: "–$3,500",
    calls: "2–3 week delivery",
    desc: "Full website with multiple pages for growing businesses.",
    features: ["5–15 pages", "Custom design", "SEO optimization", "Contact forms", "2 revision rounds"],
    highlight: true,
  },
  {
    name: "AI Agent",
    price: "$1,500",
    period: "–$7,500",
    calls: "One-time setup",
    desc: "Your personal AI assistant on a mini PC — runs on a schedule, works while you sleep.",
    features: [
      "Connects email, calendar, Slack/WhatsApp",
      "Automated reports & briefings",
      "Works on your schedule (cron)",
      "You approve before anything external sends",
      "30 days priority support included",
    ],
  },
];

const faqs = [
  {
    q: "What's the difference between a landing page and a full website?",
    a: "A landing page is a single page — great for a quick online presence. A full website has multiple pages (Home, About, Services, Contact, etc.) and is better for businesses that need more content and SEO depth.",
  },
  {
    q: "What exactly is an AI agent deployment?",
    a: "I set up an AI assistant (OpenClaw/Hermes) on a small computer (Mac Mini or Linux NUC) that runs in your home or office. It can help with tasks, research, scheduling, and more — completely private, no cloud subscription.",
  },
  {
    q: "How is this different from just paying for ChatGPT or Claude?",
    a: "Those are subscription tools you rent access to — $20–30/month, forever. They also don't connect to your email, calendar, or business tools on their own. Hermes is a one-time setup ($1,500–$7,500) that runs on your own hardware and connects to your specific tools — WhatsApp, Google Sheets, Slack, your ERP. It runs on a schedule, acts autonomously when you approve, and works while you sleep. After the upfront cost, there is no monthly fee for the software itself (you pay only for LLM API usage, which is typically $5–30/month depending on volume).",
  },
  {
    q: "Will the AI agent make mistakes?",
    a: "Yes — like any tool. But it surfaces its confidence. If it sees conflicting data, it says \"I'm not sure about X — do you want to review before I proceed?\" rather than guessing. For anything external (emails, client messages), it drafts first and waits for your approval. The human-in-the-loop means a wrong draft never goes out the door.",
  },
  {
    q: "What if it sends an email to the wrong person?",
    a: "It's configured to never send external emails without your explicit approval. It drafts first, shows you exactly what it plans to send, and waits for your YES. Nothing goes out until you confirm. You control every external action.",
  },
  {
    q: "How private is my data?",
    a: "Everything runs on the Mini PC you purchase. Your emails, spreadsheets, messages, and files never leave your hardware unless you explicitly authorize a specific action. The LLM API call does go to an external AI provider — but only the specific prompt content needed for that task, not your full email history. For maximum privacy (medical, legal, highly sensitive data), we can configure a fully air-gapped deployment using a local LLM that never makes external API calls at all.",
  },
  {
    q: "What happens if the hardware fails?",
    a: "Your configuration is stored in a backup file created during setup. If the Mini PC fails, you replace the hardware, restore from backup, and you're running again within hours. We include a backup verification step during onboarding so you know it works.",
  },
  {
    q: "What's the actual setup process?",
    a: "Day 1: We connect your tools together — Gmail, Google Sheets, WhatsApp or Slack, Instagram, calendar. You authorize each one (we never see your passwords). Day 2: We configure your first automation together — your morning briefing format, inventory thresholds, report templates. Day 3: Go live. We monitor alongside you for 48 hours to answer questions. 30 days of priority support included.",
  },
  {
    q: "How is this different from Josh.ai or other AI home assistants?",
    a: "Josh.ai is $29–99/month on an ongoing subscription, focused on home automation. It doesn't connect to your business tools — no email, no spreadsheets, no business reporting. There's no equivalent for Betty's bakery inventory management or Marcus's logistics reporting. And you can't take it with you if you change providers. With HermesB, you own the agent and can host it anywhere.",
  },
  {
    q: "Do I need to buy the hardware separately?",
    a: "You can supply your own Mac Mini or Linux mini PC, or I can include one for $450–$700. The hardware is yours to keep forever.",
  },
  {
    q: "How long does a website project take?",
    a: "Landing pages are ready in 5–7 days. Full websites typically take 2–3 weeks depending on complexity and how quickly you provide feedback.",
  },
  {
    q: "What if I need changes after the site is done?",
    a: "Landing pages include one revision round. Full websites include two revision rounds. Additional changes after that are billed at an hourly rate.",
  },
];

/* ─── Main Page ─── */
export default function Home() {
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    business: "",
    phone: "",
    email: "",
    service: "Landing Page ($399)",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");

  // Scroll tracking
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Close mobile nav on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileNavOpen) setMobileNavOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileNavOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required.";
    if (!formData.business.trim()) errors.business = "Business name is required.";
    if (!formData.phone.trim()) errors.phone = "Phone number is required.";
    else if (!/^[\d\s\-\+\(\)]{7,}$/.test(formData.phone))
      errors.phone = "Please enter a valid phone number.";
    if (!formData.email.trim()) errors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = "Please enter a valid email address.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormStatus("loading");
    setFormMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus("success");
        setFormMessage("Thanks! I'll be in touch within 2 hours.");
        setFormData({ name: "", business: "", phone: "", email: "", service: "Landing Page ($399)" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        const data = await res.json();
        setFormStatus("error");
        setFormMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setFormStatus("error");
      setFormMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 font-sans">
      {/* ─── Sticky Nav ─── */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/fenn_suit.jpg" alt="Fenn the Fox" className="w-9 h-9 rounded-lg object-cover shadow-sm" />
            <span className="font-bold text-xl text-gray-900">Fenn</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            {[
              ["Services", "services"],
              ["Pricing", "pricing"],
              ["How It Works", "process"],
              ["FAQ", "faq"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="hover:text-brand-600 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              className="text-sm py-2 hidden md:inline-flex"
              onClick={() => scrollTo("contact")}
            >
              Get Started
            </Button>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileNavOpen}
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      {mobileNavOpen && (
        <MobileNav onClose={() => setMobileNavOpen(false)} />
      )}

      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-fenn-orange via-orange-600 to-fenn-teal text-white py-24 px-6">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-fenn-teal rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl" />
        </div>
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8 animate-fade-in">
            <img src="/fenn_suit.jpg" alt="Fenn the Fox" className="w-28 h-28 rounded-2xl object-cover shadow-2xl border-4 border-white/20 animate-float" />
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Now serving businesses across the US
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up">
            Your Personal AI.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-teal-200">On Your Desk. No Subscription.</span>
          </h1>

          <p className="text-xl md:text-2xl text-orange-100 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Fenn builds websites and deploys private AI agents for homes and businesses.
            One-time pricing. Local execution. Yours forever — no monthly fees.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              variant="secondary"
              className="bg-white text-brand-700 hover:bg-brand-50 border-0 text-lg py-4 px-10 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              onClick={() => scrollTo("contact")}
            >
              Book a Free Demo →
            </Button>
            <Button
              variant="ghost"
              className="text-white border-2 border-white/30 hover:bg-white/10 hover:border-white/50 text-lg py-4 px-10 transition-all duration-300"
              onClick={() => scrollTo("pricing")}
            >
              View Pricing
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-brand-200 text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No monthly fees
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              30-day support included
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Delivered in days
            </span>
          </div>
        </div>
      </section>

      {/* ─── Trust Bar ─── */}
      <section className="bg-white border-b border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-center">
            {[
              { label: "Pricing", value: "One-time" },
              { label: "Setup Time", value: "2–3 days" },
              { label: "Support", value: "30 days included" },
              { label: "Your Data", value: "Stays local" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-brand-600">{value}</div>
                <div className="text-sm text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Services (Tabbed) ─── */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">What We Build</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Fenn for Real Businesses</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Three ways to put AI to work — pick the service that fits your needs.
            </p>
          </div>

          <div className="flex justify-center mb-10">
            <TabNav
              tabs={["Landing Pages", "Full Websites", "AI Agents"]}
              active={activeServiceTab}
              onChange={setActiveServiceTab}
            />
          </div>

          {/* Tab 0: Landing Pages */}
          {activeServiceTab === 0 && (
            <div className="animate-fade-in">
              <div className="bg-brand-50 border border-brand-100 rounded-2xl p-8 md:p-10 mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    QUICK & AFFORDABLE
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">Landing Pages — $399</h3>
                </div>
                <p className="text-gray-600 mb-8 max-w-2xl">
                  Perfect for startups, freelancers, and service businesses that need a professional
                  online presence fast. Single page, mobile responsive, contact form included.
                  Delivered in 5–7 days.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {landingPageFeatures.map(({ icon, title, desc }) => (
                    <Card key={title} className="flex gap-4">
                      <span className="text-2xl flex-shrink-0">{icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                        <p className="text-sm text-gray-500">{desc}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" onClick={() => scrollTo("contact")}>
                  Get Your Landing Page →
                </Button>
              </div>
            </div>
          )}

          {/* Tab 1: Full Websites */}
          {activeServiceTab === 1 && (
            <div className="animate-fade-in">
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    FULL PRESENCE
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">Business Websites — $1,500–$3,500</h3>
                </div>
                <p className="text-gray-600 mb-8 max-w-2xl">
                  Complete multi-page websites with custom design, SEO optimization, and contact
                  forms. Perfect for businesses that need more than a single page. 5–15 pages,
                  delivered in 2–3 weeks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {websiteFeatures.map(({ icon, title, desc }) => (
                    <Card key={title} className="flex gap-4">
                      <span className="text-2xl flex-shrink-0">{icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                        <p className="text-sm text-gray-500">{desc}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" onClick={() => scrollTo("contact")}>
                  Get Your Business Website →
                </Button>
              </div>
            </div>
          )}

          {/* Tab 2: AI Agents */}
          {activeServiceTab === 2 && (
            <div className="animate-fade-in">
              <div className="bg-purple-50 border border-purple-100 rounded-2xl p-8 md:p-10 mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    AI AGENTS
                  </span>
                  <h3 className="text-2xl font-bold text-gray-900">AI Agent Deployment — $1,500–$7,500</h3>
                </div>
                <p className="text-gray-600 mb-8 max-w-2xl">
                  I deploy a private AI assistant (OpenClaw/Hermes) on a mini PC for your home or business.
                  One-time purchase. No subscriptions. Runs locally — your data stays private.
                  Hardware available separately ($450–$700).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { icon: "🌅", title: "Morning Briefing", desc: "Wake up to a WhatsApp summary — inventory alerts, today's schedule, urgent emails, and social opportunities. No checking required." },
                    { icon: "📬", title: "Email Management", desc: "Reads your inbox, drafts replies, flags urgent messages. You approve before anything goes out. Never miss a catering inquiry again." },
                    { icon: "📅", title: "Scheduling & Reminders", desc: "Checks your calendar, sends 30-min reminders, auto-books appointments, blocks double-bookings. Coordinates with your existing calendar." },
                    { icon: "📱", title: "Social Media", desc: "Monitors Instagram DMs and comments, drafts replies for your approval, auto-posts scheduled content. Consistent presence without the daily effort." },
                    { icon: "📊", title: "Reporting Automation", desc: "Consolidates spreadsheets, auto-calculates KPIs, generates reports on a schedule. Marcus's Monday report goes from 4 hours to 15 minutes." },
                    { icon: "🔒", title: "Private & Local", desc: "Runs on your hardware. Your emails, data, and messages never go to third-party servers. No subscription. You own it forever." },
                  ].map(({ icon, title, desc }) => (
                    <Card key={title} className="flex gap-4">
                      <span className="text-2xl flex-shrink-0">{icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
                        <p className="text-sm text-gray-500">{desc}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
              <div className="flex justify-center">
                <Button variant="primary" onClick={() => scrollTo("contact")}>
                  Deploy Your AI Agent →
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ─── Industries ─── */}
      <section className="py-16 px-6 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">
              WHO IT'S FOR
            </p>
            <h2 className="text-3xl font-bold text-gray-900">Built for Businesses Like Yours</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((ind) => (
              <span
                key={ind}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-brand-100 hover:text-brand-700 transition-colors cursor-default"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">
              CLIENT SUCCESS STORIES
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Real Businesses</h2>
          <p className="text-xl md:text-2xl text-gray-500 max-w-xl mx-auto leading-relaxed">
            Fenn — AI agents and websites for homes and businesses.
          </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map(({ quote, author, business, service }, i) => (
              <Card key={i} className="hover-lift">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">{author}</p>
                    <p className="text-sm text-gray-500">{business}</p>
                  </div>
                  <span className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                    {service}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">
              TRANSPARENT PRICING
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Plans That Scale</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              No monthly fees. No subscriptions. You own what we build — forever.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} {...tier} onSelect={() => scrollTo("contact")} />
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            You own it. No contracts. No ongoing fees.
          </p>

          {/* Comparison Table */}
          <div className="mt-16">
            <h3 className="text-xl font-bold text-gray-900 text-center mb-8">What's Included</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold text-gray-900">Landing Page</th>
                    <th className="text-center py-3 px-4 font-semibold text-brand-600">Business Website</th>
                    <th className="text-center py-3 px-4 font-semibold text-purple-600">AI Agent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Pages", "1", "5–15", "—"],
                    ["Mobile Responsive", "✓", "✓", "✓"],
                    ["Contact Form", "✓", "✓", "✓"],
                    ["SSL Certificate", "✓", "✓", "✓"],
                    ["Custom Design", "—", "✓", "—"],
                    ["SEO Setup", "Basic", "Full", "—"],
                    ["Revision Rounds", "1", "2", "—"],
                    ["AI Integration", "—", "—", "✓"],
                    ["Email/Calendar Sync", "—", "—", "✓"],
                    ["WhatsApp/Slack Integration", "—", "—", "✓"],
                    ["Social Media Management", "—", "—", "✓"],
                    ["Delivery Time", "5–7 days", "2–3 weeks", "2–3 days"],
                    ["Monthly Fees", "None", "None", "None*"],
                  ].map(([feature, landing, business, ai]) => (
                    <tr key={feature} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-gray-700 font-medium">{feature}</td>
                      <td className="py-3 px-4 text-center text-gray-600">{landing}</td>
                      <td className="py-3 px-4 text-center text-gray-600 bg-brand-50/50 font-medium">{business}</td>
                      <td className="py-3 px-4 text-center text-gray-600 bg-purple-50/50 font-medium">{ai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 text-center mt-4">
              * AI Agent requires LLM API usage (~$5–30/month depending on volume)
            </p>
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="process" className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">
              HOW IT WORKS
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Live in Days, Not Months</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              From first call to go-live in as little as 48 hours. We handle everything.
            </p>
          </div>

          {/* Steps with connecting line */}
          <div className="relative">
            {/* Connecting line — hidden on mobile */}
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-100 via-brand-200 to-brand-100 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {processSteps.map(({ num, title, desc }, i) => (
                <div key={num} className="text-center reveal">
                  {/* Step number circle with connector dot */}
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-2xl font-bold relative z-10 shadow-lg shadow-brand-200/50">
                      {num}
                    </div>
                    {/* Connector dot on desktop */}
                    {i < processSteps.length - 1 && (
                      <div className="hidden md:block absolute -right-[calc(50%+16px)] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-400 ring-4 ring-brand-100" />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">
              WHY AI SOLUTIONS
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built Different. Priced Differently.</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Most AI services charge monthly fees forever. We build you something you own — one-time pricing, local execution, no subscriptions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "No Subscriptions",
                desc: "One-time payment and it's yours forever. No $20–30/month going to AI companies every month.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: "Private & Local",
                desc: "Your data never leaves your hardware. Emails, messages, files — everything stays in your home or office.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
              },
              {
                title: "Human in the Loop",
                desc: "AI drafts first, you approve second. Wrong emails never go out. You stay in control of everything.",
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
              },
            ].map(({ title, desc, icon }) => (
              <Card key={title} className="text-center hover-lift">
                <div className="w-14 h-14 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-4">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">FAQ</p>
            <h2 className="text-4xl font-bold text-gray-900">Common Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                  id={`faq-question-${i}`}
                >
                  <span className="font-semibold text-gray-900">{q}</span>
                  <span
                    className={`text-brand-600 text-xl transition-transform duration-200 flex-shrink-0 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  className={`overflow-hidden transition-all duration-200 ${
                    openFaq === i ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 py-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 bg-white">
                    {a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact / CTA ─── */}
      <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white py-24 px-6">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-brand-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-300 rounded-full blur-3xl" />
        </div>
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <img src="/fenn_suit.jpg" alt="Fenn the Fox" className="w-20 h-20 rounded-xl object-cover shadow-lg border-2 border-white/20" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">Ready to Get Started?</h2>
          <p className="text-brand-200 mb-12 text-lg md:text-xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Send me a message and I'll get back to you within 2 hours. Let's discuss your project
            and I'll send a custom proposal — no obligation.
          </p>

          <div className="glass-dark rounded-2xl p-8 md:p-10 mb-8 max-w-md mx-auto animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-bold text-xl mb-6">Book Your Demo</h3>

            {formStatus === "success" ? (
              <div className="text-center py-8 animate-fade-in">
                <div className="text-4xl mb-3">✅</div>
                <p className="text-lg font-semibold text-white mb-2">Request received!</p>
                <p className="text-brand-200 text-sm">{formMessage}</p>
              </div>
            ) : (
              <form className="space-y-4 text-left" onSubmit={handleFormSubmit} noValidate>
                <FormField label="Your Name" id="name" required error={formErrors.name}>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-lg bg-white/95 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-all duration-200 hover:border-gray-300"
                    aria-invalid={!!formErrors.name}
                  />
                </FormField>

                <FormField label="Business Name" id="business" required error={formErrors.business}>
                  <input
                    id="business"
                    type="text"
                    value={formData.business}
                    onChange={(e) => setFormData((p) => ({ ...p, business: e.target.value }))}
                    placeholder="Bright Dental Studio"
                    className="w-full px-4 py-3 rounded-lg bg-white/95 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-all duration-200 hover:border-gray-300"
                    aria-invalid={!!formErrors.business}
                  />
                </FormField>

                <FormField label="Phone Number" id="phone" required error={formErrors.phone}>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    placeholder="(555) 867-5309"
                    className="w-full px-4 py-3 rounded-lg bg-white/95 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-all duration-200 hover:border-gray-300"
                    aria-invalid={!!formErrors.phone}
                  />
                </FormField>

                <FormField label="Email Address" id="email" required error={formErrors.email}>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    placeholder="jane@brightdental.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/95 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-brand-400 transition-all duration-200 hover:border-gray-300"
                    aria-invalid={!!formErrors.email}
                  />
                </FormField>

                <FormField label="Service Interest" id="service">
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData((p) => ({ ...p, service: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow"
                  >
                    <option>Landing Page ($399)</option>
                    <option>Business Website ($1,500–$3,500)</option>
                    <option>AI Agent Deployment ($1,500–$7,500)</option>
                    <option>Hardware Bundle ($450–$700)</option>
                    <option>Not Sure Yet</option>
                  </select>
                </FormField>

                {formStatus === "error" && (
                  <p className="text-red-300 text-sm bg-red-500/20 rounded-lg px-4 py-2">
                    {formMessage}
                  </p>
                )}

                <Button
                  variant="primary"
                  className="w-full text-lg py-4"
                  type="submit"
                  disabled={formStatus === "loading"}
                >
                  {formStatus === "loading" ? (
                    <span className="flex items-center gap-2 justify-center">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Sending...
                    </span>
                  ) : (
                    "Send Message →"
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="text-brand-300 text-sm space-y-1">
            <p>
              ✉️{" "}
              <a href="mailto:AIsolutions@gmail.com" className="hover:text-white transition-colors">
                AIsolutions@gmail.com
              </a>
            </p>
            <p className="text-brand-400/60 text-xs mt-2">
              I respond within 2 hours during business hours. All projects include 1-on-1 communication.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/fenn_suit.jpg" alt="Fenn" className="w-6 h-6 rounded object-cover" />
            <span className="font-bold text-white">Fenn</span>
          </div>
          <p className="text-sm">© 2026 Fenn. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
