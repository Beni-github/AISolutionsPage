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
  { num: "04", title: "Delivery", desc: "Website delivered in 5 days to 3 weeks. AI agents set up remotely or on-site." },
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
    desc: "Your personal AI assistant on a mini PC in your home or office.",
    features: ["OpenClaw/Hermes agent", "Local + private AI", "Custom workflows", "Voice interface", "Hardware available"],
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
  {
    q: "Is the AI agent really private?",
    a: "Yes — the AI runs locally on your hardware. Your data never goes to the cloud unless you explicitly choose cloud models. No subscriptions, no ongoing data harvesting.",
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
    service: "Voice Receptionist",
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
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <span className="font-bold text-xl text-gray-900">AI Solutions</span>
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
      <section className="bg-gradient-to-br from-brand-900 via-brand-700 to-brand-600 text-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            Now serving businesses across the US
          </div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
            Your Personal AI.
            <br />
            <span className="text-brand-200">On Your Desk. No Subscription.</span>
          </h1>

          <p className="text-xl text-brand-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            AI Solutions builds websites and deploys private AI agents for homes and businesses.
            One-time pricing. Local execution. Yours forever — no monthly fees.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              className="bg-white text-brand-700 hover:bg-brand-50 border-0 text-lg py-4 px-8"
              onClick={() => scrollTo("contact")}
            >
              Book a Free Demo →
            </Button>
            <Button
              variant="ghost"
              className="text-white border-white/30 hover:bg-white/10 hover:border-white/50 text-lg py-4 px-8"
              onClick={() => scrollTo("pricing")}
            >
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="bg-white border-b border-gray-200 py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Projects Delivered", value: "Growing" },
            { label: "AI Agents Deployed", value: "Ready" },
            { label: "Response Time", value: "< 2 hours" },
            { label: "Satisfaction", value: "100%" },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Services (Tabbed) ─── */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">What We Build</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">AI Solutions for Real Businesses</h2>
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
              <div className="bg-white border border-gray-200 rounded-2xl p-8 md:p-10 mb-8">
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
                    { icon: "🏠", title: "Home Assistant", desc: "Manage schedules, research, smart home control" },
                    { icon: "💼", title: "Business Assistant", desc: "Lead research, email drafts, task management" },
                    { icon: "🔒", title: "Privacy First", desc: "Runs locally. No cloud. No data sharing." },
                    { icon: "🖥️", title: "Your Hardware", desc: "Mac Mini or Linux NUC. You own it forever." },
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

      {/* ─── Pricing ─── */}
      <section id="pricing" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">
              TRANSPARENT PRICING
            </p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Plans That Scale</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              No setup fees. No hidden costs. Cancel anytime. Most businesses see ROI within the
              first week.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} {...tier} onSelect={() => scrollTo("contact")} />
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            All plans include a 30-day money-back guarantee. No contracts.
          </p>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section id="process" className="py-20 px-6">
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
            <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-brand-100 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {processSteps.map(({ num, title, desc }, i) => (
                <div key={num} className="text-center">
                  {/* Step number circle with connector dot */}
                  <div className="relative inline-flex items-center justify-center mb-5">
                    <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center text-white text-2xl font-bold relative z-10">
                      {num}
                    </div>
                    {/* Connector dot on desktop */}
                    {i < processSteps.length - 1 && (
                      <div className="hidden md:block absolute -right-[calc(50%+12px)] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-brand-300" />
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
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
      <section id="contact" className="bg-brand-900 text-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-brand-200 mb-10 text-lg leading-relaxed">
            Send me a message and I'll get back to you within 2 hours. Let's discuss your project
            and I'll send a custom proposal — no obligation.
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-md mx-auto border border-white/20">
            <h3 className="font-bold text-lg mb-4">Book Your Demo</h3>

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
                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow"
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
                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow"
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
                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow"
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
                    className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-900 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-400 transition-shadow"
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
              📞{" "}
              <a href="tel:+15551234567" className="hover:text-white transition-colors">
                (555) 123-4567
              </a>
              &nbsp;&nbsp; ✉️{" "}
              <a href="mailto:hello@aisolutions.com" className="hover:text-white transition-colors">
                hello@aisolutions.com
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
            <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center text-white font-bold text-xs">
              AI
            </div>
            <span className="font-bold text-white">AI Solutions</span>
          </div>
          <p className="text-sm">© 2026 AI Solutions. All rights reserved.</p>
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
