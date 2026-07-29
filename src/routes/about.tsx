import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Sun,
  Zap,
  Users,
  Headphones,
  Target,
  Leaf,
  Shield,
  Lightbulb,
  Award,
  UserCheck,
  Headset,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import hero from "@/assets/hero-solar.jpg";
import engineers from "@/assets/about-engineers.jpg";
import residential from "@/assets/project-residential.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | Flash Renewable Energy Solutions" },
      {
        name: "description",
        content:
          "Learn about Flash Renewable Energy Solutions Pvt. Ltd. — a dedicated renewable energy company delivering innovative solar EPC solutions across India.",
      },
      { property: "og:title", content: "About Flash Renewable Energy Solutions" },
      { property: "og:description", content: "Leading the way towards a sustainable future." },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { icon: Sun, value: "500+", label: "Projects Completed" },
  { icon: Zap, value: "100MW+", label: "Installed Capacity" },
  { icon: Users, value: "25+", label: "Expert Engineers" },
  { icon: Headset, value: "24×7", label: "Customer Support" },
];

const values = [
  { icon: Leaf, title: "Sustainability", desc: "Committed to a better and cleaner tomorrow." },
  { icon: Shield, title: "Integrity", desc: "Honest, transparent and ethical in every action." },
  {
    icon: Lightbulb,
    title: "Innovation",
    desc: "Creating intelligent energy technology and solutions.",
  },
  { icon: Award, title: "Quality", desc: "Delivering excellence in every project we undertake." },
  {
    icon: UserCheck,
    title: "Customer Focus",
    desc: "Customer satisfaction is at the heart of our business.",
  },
];

function AboutPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header overlay />

      {/* Page hero */}
      <section className="relative min-h-[440px] md:min-h-[520px] overflow-hidden pt-[220px] md:pt-[260px] pb-16">
        <img
          src={hero}
          alt="Renewable energy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/92 via-brand-navy-deep/75 to-brand-navy/40" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -top-10 left-1/4 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            About Us
          </h1>
          <p className="mt-3 text-sm text-white/80">
            <a href="/" className="hover:text-primary">
              Home
            </a>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-primary">About Us</span>
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 space-y-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-sm">WHO WE ARE</p>
              <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy leading-tight">
                Leading the Way Towards
                <br /> a Sustainable Future
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Flash Renewable Energy Solutions Pvt Ltd, incorporated on 25th May 2026 under the Companies Act, 2013, is dedicated to advancing renewable energy technologies across India.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We specialize in solar, solar tiles, solar fences, turbine, wind and hybrid energy systems, offering end-to-end solutions from consultation to maintenance. Our mission is to make renewable energy accessible, affordable, sustainable and impactful.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We also planning to partner with Educational Institutions and Government Organisations, enabling them to adopt innovative solutions such as floating solar systems, solar fences, smart pole solar (Hybrid) lights, wall turbines and large scale utility solar to meet sustainability goals for the green future.
              </p>
            </div>
            <img
              src={engineers}
              alt="Flash engineering team"
              className="rounded-2xl w-full object-cover shadow-lg max-h-[480px]"
              loading="lazy"
            />
          </div>

          {/* Corporate Credentials Card */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-inner">
            <h3 className="font-display text-xl font-bold text-brand-navy border-b pb-3 mb-6">
              Company Registration & Credentials
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm text-slate-600">
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Corporate Identity Number (CIN)</span>
                <span className="font-semibold text-brand-navy text-base">U35105TN2026PTC193634</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">PAN & TAN</span>
                <span className="font-semibold text-brand-navy text-base">AAHCF0584G / CHEF08522D</span>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Contact Phone</span>
                <a href="tel:+919150011428" className="font-semibold text-brand-navy text-base hover:text-primary transition">
                  +91 91500 11428
                </a>
              </div>
              <div>
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">Email & Website</span>
                <div className="space-y-0.5">
                  <a href="mailto:Flashenergypvt.ltd@gmail.com" className="block font-semibold text-primary hover:underline truncate">
                    Flashenergypvt.ltd@gmail.com
                  </a>
                  <a href="https://www.flashrenewable.com" target="_blank" rel="noopener noreferrer" className="block font-semibold text-primary hover:underline">
                    www.flashrenewable.com
                  </a>
                </div>
              </div>
              <div className="sm:col-span-2 lg:col-span-4 border-t pt-4">
                <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">Registered Office Address</span>
                <span className="font-semibold text-brand-navy leading-relaxed">
                  FLASH STORAGE, Door No.7, Plot No.102, Manirajan Street, Janaki Nagar, Alwarthirunagar, Valasaravakkam, Chennai, Tamil Nadu – 600087
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="pb-6">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="rounded-xl bg-brand-navy-deep grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-4 px-6 py-6">
                <s.icon className="h-10 w-10 text-primary shrink-0" />
                <div>
                  <div className="text-white text-2xl font-bold">{s.value}</div>
                  <div className="text-white/70 text-sm">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="rounded-xl border border-border bg-card grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border shadow-sm">
            <div className="flex gap-5 p-8">
              <Target className="h-12 w-12 text-primary shrink-0" />
              <div>
                <h3 className="font-display text-xl font-bold text-brand-navy">Our Mission</h3>
                <ul className="mt-3.5 space-y-2 text-sm text-muted-foreground leading-relaxed list-none p-0">
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">🌱</span>
                    <span>Deliver non-polluted, eco-friendly green energy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">🌞</span>
                    <span>Powering to Serve a bright and sustainable future for the country.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">⚡</span>
                    <span>Provide innovative, reliable, and scalable renewable energy solutions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="shrink-0 mt-0.5">🤝</span>
                    <span>Partner with communities, industries, corporates, and governments to drive clean green energy adoption.</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex gap-5 p-8">
              <Leaf className="h-12 w-12 text-primary shrink-0" />
              <div>
                <h3 className="font-display text-xl font-bold text-brand-navy">Our Vision</h3>
                <p className="mt-3.5 text-sm text-muted-foreground leading-relaxed">
                  To be India’s most trusted renewable energy partner, driving innovation and a sustainable country for cleaner future generations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-4">
              <span className="h-px w-16 bg-primary/50" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy">
                Our Values
              </h2>
              <span className="h-px w-16 bg-primary/50" />
            </div>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center">
                <div className="mx-auto grid place-items-center h-16 w-16 rounded-full border-2 border-primary/30 text-primary">
                  <v.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-4 font-semibold text-brand-navy">{v.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed px-2">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="rounded-xl bg-brand-navy-deep overflow-hidden grid md:grid-cols-[1.5fr_1fr] items-center">
            <div className="p-8 md:p-10">
              <div className="flex items-center gap-4">
                <Headphones className="h-12 w-12 text-primary" />
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                  Need a Custom Solar Solution?
                </h3>
              </div>
              <p className="mt-3 text-white/75 text-sm">
                Our experts are here to help you choose the best solution for your needs.
              </p>
              <a
                href="/#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:brightness-95 transition"
              >
                Get a Free Consultation <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <img
              src={residential}
              alt="Solar home"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
