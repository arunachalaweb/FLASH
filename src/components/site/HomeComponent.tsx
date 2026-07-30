import { Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Sun,
  Zap,
  Headphones,
  MapPin,
  Leaf,
  Award,
  Clock,
  Smile,
  Home,
  Building2,
  Factory,
  Droplets,
  Lightbulb,
  BatteryCharging,
  Wrench,
  CheckCircle2,
  Send,
  Phone,
  Mail,
  Globe,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ProjectsGallery } from "@/components/site/ProjectsGallery";
import { Testimonials } from "@/components/site/Testimonials";
import { ContactForm } from "@/components/site/ContactForm";
import { services } from "@/lib/services-data";
import flash1 from "@/assets/flash-1.png";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import engineers from "@/assets/about-engineers.jpg";
import residential from "@/assets/project-residential.jpg";
import commercial from "@/assets/project-commercial.jpg";
import industrial from "@/assets/project-industrial.jpg";
import utility from "@/assets/project-utility.jpg";
import solarHouse from "@/assets/solar-house-3d.jpg";

const stats = [
  { icon: Sun, value: "500+", label: "Projects Completed" },
  { icon: Zap, value: "100MW+", label: "Installed Capacity" },
  { icon: Headphones, value: "24×7", label: "Customer Support" },
  { icon: MapPin, value: "PAN India", label: "Service Network" },
];

const values = [
  { icon: Leaf, title: "Sustainable Solutions" },
  { icon: Award, title: "Quality Assurance" },
  { icon: Clock, title: "Timely Delivery" },
  { icon: Smile, title: "Customer Satisfaction" },
];

const process = [
  {
    n: "01",
    title: "Consultation & Feasibility Study",
    desc: "We analyze your energy needs and site feasibility.",
    green: true,
  },
  {
    n: "02",
    title: "Design & Engineering",
    desc: "Customized system design with precise engineering.",
    green: false,
  },
  {
    n: "03",
    title: "Installation & Commissioning",
    desc: "Professional installation & testing for performance.",
    green: true,
  },
  {
    n: "04",
    title: "Monitoring & Maintenance",
    desc: "Real-time monitoring and regular maintenance.",
    green: false,
  },
  {
    n: "05",
    title: "Continuous Innovation",
    desc: "Upgrading technology for better efficiency always.",
    green: true,
  },
];

export const heroSlides = [
  {
    img: flash1,
    tag: "Powering a Bright & Green Future",
    headline: ["Clean Energy,", "Engineered for", "India's Future."],
    accent: "India's Future.",
    sub: "Delivering innovative solar, wind, and clean energy solutions for a sustainable tomorrow.",
    cta: "Get Free Consultation",
    ctaHref: "#contact",
  },
  {
    img: hero2,
    tag: "Solar Panel Excellence",
    headline: ["From Rooftop", "to Utility Scale —", "We Power All."],
    accent: "We Power All.",
    sub: "Mono, Poly, TOPCon, BIFACIAL, Thin Film, Glass Panels & BIPV Roof Tiles — every solar technology under one roof.",
    cta: "Explore Technologies",
    ctaHref: "/services",
  },
  {
    img: hero3,
    tag: "Wind & Hybrid Systems",
    headline: ["Wind Turbines,", "Wall Turbines &", "Hybrid Systems."],
    accent: "Hybrid Systems.",
    sub: "Portable & static wind turbines, vertical wall turbines and hybrid solar-wind systems — clean energy 24×7.",
    cta: "View Services",
    ctaHref: "/services",
  },
  {
    img: solarHouse,
    tag: "Institutional & Government",
    headline: ["Floating Solar,", "Schools, Campuses", "& Public Infra."],
    accent: "& Public Infra.",
    sub: "Floating solar systems on ponds and lakes, wall turbines for schools and universities, smart highway street lighting.",
    cta: "See Projects",
    ctaHref: "/projects",
  },
  {
    img: engineers,
    tag: "Trusted EPC Partner",
    headline: ["500+ Projects,", "PAN India", "Service Network."],
    accent: "Service Network.",
    sub: "MNRE-compliant, quality-assured, delivered on time — backed by a 24×7 support team and 25-year panel warranty.",
    cta: "About Us",
    ctaHref: "/about",
  },
];

const whyus = [
  "Experienced Engineering Team",
  "MNRE-Compliant Solutions",
  "High-Quality Components",
  "Timely Project Delivery",
  "24×7 Customer Support",
  "Warranty & AMC Services",
];

function HeroSection() {
  const [active, setActive] = useState(0);
  const [billAmount, setBillAmount] = useState<string>("");
  const [calcResult, setCalcResult] = useState<{ size: number; cost: number; savings: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), 6000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => { setActive(i); startTimer(); };
  const slide = heroSlides[active];

  const calculateSolar = (e: React.FormEvent) => {
    e.preventDefault();
    const bill = parseFloat(billAmount) || 0;
    if (bill <= 0) return;
    
    // Roughly: 1 kW generates 120 units/month = saves ~₹960/month (@₹8/unit). Cost ~₹60,000/kW.
    const sizeKw = Math.max(1, Math.round((bill / 960) * 10) / 10);
    const cost = sizeKw * 60000;
    const savingsYearly = bill * 12;

    setCalcResult({ size: sizeKw, cost, savings: savingsYearly });
  };

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col">
      <Header overlay />

      {/* ── Background slides ── */}
      <div className="absolute inset-0">
        {heroSlides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000 overflow-hidden"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {s.video ? (
              <video
                src={s.video}
                autoPlay
                loop
                muted
                playsInline
                className={`h-full w-full object-cover transition-transform duration-[10000ms] ease-out ${i === active ? 'scale-110' : 'scale-100'}`}
              />
            ) : (
              <img 
                src={s.img} 
                alt={s.tag} 
                className={`h-full w-full object-cover transition-transform duration-[10000ms] ease-out ${i === active ? 'scale-110' : 'scale-100'}`} 
              />
            )}
          </div>
        ))}
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/97 via-brand-navy-deep/80 to-brand-navy-deep/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/90 via-transparent to-brand-navy-deep/50" />
      </div>

      {/* ── Animated Sky & Rising Sun Scene ── */}
      <div className="hidden md:block pointer-events-none absolute inset-0 w-full h-full overflow-hidden" style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}>
        <style>{`
          @keyframes cinematic-rise { 
            0% { transform: translate(-50%, 180px) scale(0.9); opacity: 0; } 
            20% { transform: translate(-50%, 60px) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -30px) scale(1.05); opacity: 1; }
          }
          @keyframes cloud-drift-slow {
            0% { transform: translateX(5%); }
            50% { transform: translateX(-5%); }
            100% { transform: translateX(5%); }
          }
          @keyframes cloud-drift-fast {
            0% { transform: translateX(-10%); }
            50% { transform: translateX(10%); }
            100% { transform: translateX(-10%); }
          }
          @keyframes bird-fly {
            0% { transform: translate(-50px, 150px) scale(0.4) rotate(-10deg); opacity: 0; }
            10% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translate(1200px, -200px) scale(0.7) rotate(15deg); opacity: 0; }
          }
          @keyframes plane-fly {
            0% { transform: translate(1200px, 150px) scale(0.4) rotate(-82deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translate(-300px, -50px) scale(0.4) rotate(-82deg); opacity: 0; }
          }
          @keyframes rocket-fly {
            0% { transform: translate(-100px, 600px) scale(0.5) rotate(45deg); opacity: 0; }
            20% { opacity: 0.9; }
            80% { opacity: 0.9; }
            100% { transform: translate(1000px, -400px) scale(0.3) rotate(45deg); opacity: 0; }
          }
          @keyframes smoke-fade {
            0% { opacity: 0; transform: scaleX(0.5); }
            20% { opacity: 0.5; transform: scaleX(1); }
            80% { opacity: 0.5; transform: scaleX(1); }
            100% { opacity: 0; transform: scaleX(0.8); }
          }
          @keyframes outer-flash {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.4); opacity: 0.7; }
          }
          @keyframes inner-pulse {
            0%, 100% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          @keyframes hero-text-in{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:translateY(0)}}
          .hero-text-in{animation:hero-text-in 0.7s cubic-bezier(0.23,1,0.32,1) forwards;}
        `}</style>

        {/* The Sun */}
        <div className="absolute top-[20%] left-1/2 w-[450px] h-[450px] flex items-center justify-center" style={{ animation: "cinematic-rise 40s cubic-bezier(0.1, 0.8, 0.9, 1) forwards" }}>
          
          {/* Massive Outer Flash / Corona */}
          <div 
            className="absolute rounded-full bg-brand-gold/30 mix-blend-screen"
            style={{ width: "400px", height: "400px", filter: "blur(50px)", animation: "outer-flash 8s ease-in-out infinite" }} 
          />
          <div 
            className="absolute rounded-full bg-orange-500/40 mix-blend-screen"
            style={{ width: "250px", height: "250px", filter: "blur(30px)", animation: "outer-flash 6s ease-in-out infinite reverse" }} 
          />

          {/* Core modern glowing orb */}
          <div
            className="relative rounded-full flex items-center justify-center"
            style={{
              width: "140px", height: "140px",
              background: "radial-gradient(circle at 35% 35%, #fff9c4 0%, #fbbf24 40%, #ea580c 85%, #9a3412 100%)",
              boxShadow: "0 0 80px 25px rgba(251,191,36,0.6), inset -15px -15px 40px rgba(154,52,18,0.6)",
              animation: "inner-pulse 5s ease-in-out infinite"
            }}
          >
            <div style={{ width: "75px", height: "75px", borderRadius: "50%", background: "radial-gradient(circle, #ffffff 0%, #fffde7 20%, transparent 80%)", filter: "blur(4px)" }} />
          </div>
        </div>

        {/* Back Cloud Layer */}
        <div className="absolute inset-y-0 w-[120%] -left-[10%] opacity-60 mix-blend-screen" style={{ animation: 'cloud-drift-slow 60s ease-in-out infinite' }}>
          <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none">
            <path d="M-100,650 Q100,450 300,500 T700,400 T1000,550 L1000,700 L-100,700 Z" fill="rgba(249,115,22,0.3)" filter="blur(20px)"/>
            <path d="M0,700 Q200,350 450,450 T900,300 L900,700 L0,700 Z" fill="rgba(251,191,36,0.2)" filter="blur(30px)"/>
          </svg>
        </div>

        {/* Mid Cloud Layer */}
        <div className="absolute inset-y-0 w-[120%] -left-[10%] opacity-80" style={{ animation: 'cloud-drift-fast 45s ease-in-out infinite' }}>
          <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none">
            <path d="M-50,650 Q150,400 400,450 T850,350 L850,700 L-50,700 Z" fill="rgba(234,88,12,0.4)" filter="blur(15px)"/>
            <path d="M100,650 Q300,380 500,480 T950,400 L950,700 L100,700 Z" fill="rgba(154,52,18,0.5)" filter="blur(25px)"/>
          </svg>
        </div>

        {/* Front Cloud Layer (Darker for depth) */}
        <div className="absolute inset-y-0 w-[120%] -left-[10%]" style={{ animation: 'cloud-drift-slow 70s ease-in-out infinite reverse' }}>
          <svg viewBox="0 0 800 600" className="w-full h-full" preserveAspectRatio="none">
            <path d="M-200,650 Q50,450 250,550 T650,450 T1100,600 L1100,700 L-200,700 Z" fill="rgba(0,31,63,0.7)" filter="blur(10px)"/>
          </svg>
        </div>

        {/* Flying Objects Container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Flying Bird */}
          <div className="absolute top-[35%] left-[20%]" style={{ animation: 'bird-fly 20s linear infinite' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-brand-navy-deep opacity-80 drop-shadow-md">
              <path d="M2.5 12c2.5-1.5 5-2 7.5-1.5 1.5 3.5 2.5 5 4.5 4.5-1.5-2-2-4-1-6 2 1.5 4 2.5 6 2 1.5-.5 2.5-1 2-2-2-2.5-4-3-6-2.5-1.5 2-2.5 4-2 6-2 0-3.5-1.5-4.5-4C8.5 7 6.5 7.5 4 9c-1 1-1.5 2-1.5 3z" />
            </svg>
          </div>

          {/* Flying Airplane with Smoke */}
          <div className="absolute top-[10%] left-[0] flex flex-col items-center" style={{ animation: 'plane-fly 35s linear infinite 5s' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor" className="text-brand-navy-deep opacity-60 drop-shadow-lg z-10">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
            <div className="w-[3px] h-[150px] mt-[-15px] rounded-full bg-gradient-to-b from-white/30 to-transparent" style={{ filter: 'blur(1px)' }} />
          </div>

          {/* Flying Rocket with Fire/Smoke */}
          <div className="absolute top-[60%] left-[10%] flex flex-col items-center" style={{ animation: 'rocket-fly 18s ease-in infinite 12s' }}>
            <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor" className="text-brand-navy-deep opacity-90 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] z-10">
              <path d="M13.13 2.13l3.18 3.18c2.14 2.15 3.2 5.09 3.03 8.04l-1.35 1.35-6.88-6.88 1.35-1.35c2.95-.17 5.89.89 8.04 3.03l3.18 3.18c.39.39.39 1.02 0 1.41l-2.12 2.12c-.39.39-1.02.39-1.41 0l-3.18-3.18c-2.15-2.14-5.09-3.2-8.04-3.03l-1.35 1.35 6.88 6.88-1.35 1.35c-2.95.17-5.89-.89-8.04-3.03l-3.18-3.18c-.39-.39-.39-1.02 0-1.41l2.12-2.12c.39-.39 1.02-.39 1.41 0l3.18 3.18c2.14 2.15 3.2 5.09 3.03 8.04l1.35-1.35-6.88-6.88-1.35 1.35c-2.95.17-5.89-.89-8.04-3.03L2.13 10.87c-.39-.39-.39-1.02 0-1.41l2.12-2.12c.39-.39 1.02-.39 1.41 0z" />
              <path d="M12 2.01c-1.33 0-2.58.52-3.52 1.46l-4.94 4.94c-1.07 1.07-1.57 2.62-1.36 4.14L3.6 19.4c.16.89.94 1.55 1.84 1.6h.17l6.85-1.42c1.52.21 3.07-.29 4.14-1.36l4.94-4.94c.94-.94 1.46-2.19 1.46-3.52s-.52-2.58-1.46-3.52l-4.94-4.94C14.58 2.53 13.33 2.01 12 2.01zm5.66 11.3l-4.94 4.94c-.66.66-1.61.97-2.55.84l-5.74 1.19 1.19-5.74c-.13-.94.18-1.89.84-2.55l4.94-4.94c.62-.62 1.45-.96 2.33-.96s1.71.34 2.33.96l1.6 1.6c1.28 1.29 1.28 3.38 0 4.66z" />
            </svg>
            <div className="w-[10px] h-[80px] mt-[-10px] rounded-full bg-gradient-to-b from-orange-500/80 via-white/40 to-transparent" style={{ filter: 'blur(3px)' }} />
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative flex-1 mx-auto max-w-7xl w-full px-4 md:px-6 pt-[140px] md:pt-[170px] lg:pt-[190px] pb-12 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

        {/* Left: Slide content */}
        <div className="flex-1 max-w-2xl">
          {/* Tag */}
          <div key={`tag-${active}`} className="hero-text-in inline-flex items-center gap-2 rounded-full border border-primary/40 bg-white/5 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-primary uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            {slide.tag}
          </div>

          {/* Headline */}
          <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            {slide.headline.map((line, li) => (
              <span
                key={`${active}-${li}`}
                className="block hero-text-in"
                style={{ animationDelay: `${li * 0.1 + 0.05}s`, opacity: 0 }}
              >
                {line === slide.accent
                  ? <span className="text-gradient-gold">{line}</span>
                  : line
                }
              </span>
            ))}
          </h1>

          {/* Sub */}
          <p key={`sub-${active}`} className="hero-text-in mt-6 text-white/75 text-base md:text-lg leading-relaxed max-w-xl" style={{ animationDelay: "0.35s", opacity: 0 }}>
            {slide.sub}
          </p>

          {/* CTAs */}
          <div key={`cta-${active}`} className="hero-text-in mt-8 flex flex-wrap gap-3" style={{ animationDelay: "0.45s", opacity: 0 }}>
            <Link
              to={slide.ctaHref as any}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-7 py-3.5 text-sm font-bold text-brand-navy-deep shadow-[0_12px_35px_-10px_rgba(247,147,30,0.7)] hover:shadow-[0_18px_45px_-10px_rgba(247,147,30,0.9)] hover:-translate-y-0.5 transition-all duration-300"
            >
              {slide.cta} <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur text-white px-7 py-3.5 text-sm font-semibold hover:bg-white/10 transition"
            >
              <Phone className="h-4 w-4" /> +91 91500 11428
            </a>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-white/60 text-xs">
            {["MNRE Compliant", "25-Year Panel Warranty", "PAN-India Delivery", "24×7 Support"].map(b => (
              <span key={b} className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" /> {b}
              </span>
            ))}
          </div>

          {/* Slide dots + arrows */}
          <div className="mt-10 flex items-center gap-4">
            <button onClick={() => goTo((active - 1 + heroSlides.length) % heroSlides.length)} className="h-9 w-9 rounded-full border border-white/20 bg-white/5 backdrop-blur grid place-items-center text-white hover:bg-primary hover:border-primary transition">
              <ArrowRight className="h-4 w-4 rotate-180" />
            </button>
            <div className="flex items-center gap-2">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`rounded-full transition-all duration-400 ${
                    i === active
                      ? "w-8 h-2.5 bg-primary dot-active"
                      : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
            <button onClick={() => goTo((active + 1) % heroSlides.length)} className="h-9 w-9 rounded-full border border-white/20 bg-white/5 backdrop-blur grid place-items-center text-white hover:bg-primary hover:border-primary transition">
              <ArrowRight className="h-4 w-4" />
            </button>
            <span className="text-white/40 text-xs ml-1">{active + 1} / {heroSlides.length}</span>
          </div>
        </div>

        {/* Right: Solar Calculator */}
        <div className="w-full lg:w-[380px] xl:w-[420px] flex-shrink-0">
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-2xl p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            {/* Calculator header */}
            <div className="mb-5">
              <p className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Solar Calculator
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-white">Estimate Your Savings</h3>
              <p className="text-white/50 text-xs mt-1">Find out what size system you need.</p>
            </div>

            {calcResult ? (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="rounded-xl border border-primary/20 bg-primary/10 p-4 mb-4">
                  <div className="text-center mb-4">
                    <p className="text-white/60 text-xs uppercase tracking-wider mb-1">Recommended System</p>
                    <p className="text-3xl font-display font-bold text-white">{calcResult.size} <span className="text-primary text-xl">kW</span></p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center divide-x divide-white/10">
                    <div>
                      <p className="text-white/50 text-[10px] uppercase">Est. Cost</p>
                      <p className="text-white font-semibold">₹{(calcResult.cost / 100000).toFixed(2)}L</p>
                    </div>
                    <div>
                      <p className="text-white/50 text-[10px] uppercase">Yearly Savings</p>
                      <p className="text-emerald-400 font-semibold">₹{calcResult.savings.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button onClick={() => setCalcResult(null)} className="w-full rounded-xl border border-white/20 bg-transparent py-3 text-sm font-bold text-white hover:bg-white/5 transition-all">
                    Recalculate
                  </button>
                  <a href="#contact" className="w-full rounded-xl bg-gradient-to-r from-primary to-brand-gold py-3 text-sm font-bold text-brand-navy-deep shadow-[0_10px_30px_-8px_rgba(247,147,30,0.6)] hover:shadow-[0_14px_40px_-8px_rgba(247,147,30,0.8)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2">
                    Get Final Quote <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={calculateSolar} className="space-y-4">
                <div>
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-white/50 block mb-2">Average Monthly Electricity Bill (₹)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-medium">₹</span>
                    <input
                      required
                      type="number"
                      min="500"
                      step="100"
                      placeholder="e.g. 2500"
                      value={billAmount}
                      onChange={e => setBillAmount(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition"
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-primary to-brand-gold py-3 text-sm font-bold text-brand-navy-deep shadow-[0_10px_30px_-8px_rgba(247,147,30,0.6)] hover:shadow-[0_14px_40px_-8px_rgba(247,147,30,0.8)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Lightbulb className="h-4 w-4" /> Calculate Now
                </button>
                <p className="text-[10px] text-white/40 text-center leading-relaxed">
                  * This is an approximate estimate based on average solar generation in India. Actual system size may vary.
                </p>
              </form>
            )}
          </div>

          {/* Quick contact strip */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <a href="tel:+919150011428" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white/70 hover:bg-white/[0.09] hover:text-white transition text-xs">
              <Phone className="h-3.5 w-3.5 text-primary flex-shrink-0" /> +91 91500 11428
            </a>
            <a href="mailto:info@flashrenewable.com" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white/70 hover:bg-white/[0.09] hover:text-white transition text-xs truncate">
              <Mail className="h-3.5 w-3.5 text-primary flex-shrink-0" /> info@flashrenewable.com
            </a>
          </div>
        </div>
      </div>

      {/* ── Stat bar ── */}
      <div className="relative mx-auto max-w-7xl w-full px-4 md:px-6 pb-10 z-10">
        <div className="rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4 px-6 py-5 group">
              <div className="grid place-items-center h-12 w-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-white text-2xl font-display font-bold">{s.value}</div>
                <div className="text-white/50 text-xs uppercase tracking-wider">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeComponent() {
  return (
    <div className="bg-background text-foreground font-sans">
      <HeroSection />

      {/* ABOUT */}
      <section id="about" className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-primary font-semibold text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> ABOUT US
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy">
              Flash Renewable Energy
              <br /> Solutions Pvt. Ltd.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              We are a leading renewable energy company delivering high-quality, cost-effective and
              sustainable solar solutions. From rooftop installations to large-scale solar power
              plants, we provide end-to-end EPC services with the highest standards of safety and
              performance.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {values.map((v) => (
                <div key={v.title} className="text-center">
                  <div className="mx-auto grid place-items-center h-14 w-14 rounded-full border-2 border-primary/30 text-primary">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-3 text-sm font-semibold text-brand-navy leading-tight">
                    {v.title}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 relative rounded-2xl overflow-hidden">
              <img
                src={engineers}
                alt="Engineers inspecting solar panels"
                className="h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute left-4 bottom-4 bg-white rounded-lg px-4 py-3 flex items-center gap-2 shadow-lg">
                <Leaf className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-xs text-primary font-semibold">Clean Energy</div>
                  <div className="text-sm font-bold text-brand-navy">Better Tomorrow</div>
                </div>
              </div>
            </div>
            <div className="grid grid-rows-3 gap-3">
              <img
                src={residential}
                alt="Rooftop solar"
                className="rounded-xl h-full w-full object-cover"
                loading="lazy"
              />
              <img
                src={commercial}
                alt="Commercial solar"
                className="rounded-xl h-full w-full object-cover"
                loading="lazy"
              />
              <img
                src={utility}
                alt="Utility solar"
                className="rounded-xl h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── COMBINED SERVICES & HIGHLIGHTS BACKGROUND ── */}
      <div className="relative overflow-hidden bg-brand-navy-deep text-white">
        {/* ambient glows */}
        <div className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute top-[40%] -right-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
        
        {/* Unified subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* SERVICES */}
        <section id="services" className="relative py-24">
          <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-primary font-semibold text-sm flex items-center gap-2 tracking-widest">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
                OUR SERVICES
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">
                Complete Renewable{" "}
                <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
                  Energy Solutions
                </span>
              </h2>
              <p className="mt-4 text-white/70 max-w-xl">
                From consultation to commissioning — a full-stack solar EPC partner delivering
                measurable performance across every sector.
              </p>
            </div>
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-5 py-3 text-sm font-semibold hover:bg-primary hover:border-primary transition"
            >
              Request a Consultation <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_25px_70px_-20px_hsl(var(--primary)/0.55)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.label}
                    width={1024}
                    height={768}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy-deep/50 to-transparent" />
                  <div className="absolute inset-0 bg-brand-navy-deep/25 group-hover:bg-brand-navy-deep/10 transition-colors duration-500" />

                  <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-brand-navy-deep/80 backdrop-blur border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />{" "}
                    {s.tag}
                  </span>

                  <div className="absolute top-4 right-4 h-11 w-11 rounded-xl grid place-items-center bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.8)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <s.icon className="h-5 w-5" strokeWidth={2.25} />
                  </div>

                  <h3 className="absolute left-5 right-5 bottom-4 font-display text-xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                    {s.label}
                  </h3>
                </div>

                {/* Body */}
                <div className="p-5">
                  <p className="text-sm text-white/70 leading-relaxed min-h-[64px]">{s.desc}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                    <span className="inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </span>
                    <span className="text-xs uppercase tracking-widest text-white/45 group-hover:text-white transition">
                      Details
                    </span>
                  </div>
                </div>

                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-primary via-brand-gold to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="relative py-12 md:py-20">
        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm inline-flex items-center gap-2 tracking-widest">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
              WHAT MAKES US DIFFERENT
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">
              Our{" "}
              <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
                Highlights
              </span>
            </h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto text-base">
              Innovative technologies and community-focused initiatives that set Flash Renewable Energy Solutions apart.
            </p>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                emoji: "🌊",
                title: "Floating Solar Systems",
                desc: "Harnessing water surfaces for solar installations — reducing land dependency, saving water evaporation and boosting overall system efficiency.",
                color: "from-sky-500/20 to-blue-600/10",
                border: "hover:border-sky-400/50",
                glow: "group-hover:shadow-[0_25px_60px_-20px_rgba(56,189,248,0.4)]",
              },
              {
                emoji: "🌀",
                title: "Turbines & Wall Turbines",
                desc: "Vertical-axis wind turbines designed for compact spaces — ideal for schools, universities, highway lights, and urban & rural street lighting.",
                color: "from-emerald-500/20 to-teal-600/10",
                border: "hover:border-emerald-400/50",
                glow: "group-hover:shadow-[0_25px_60px_-20px_rgba(52,211,153,0.4)]",
              },
              {
                emoji: "🏛️",
                title: "Institutional & Government Focus",
                desc: "Supporting sustainable energy adoption in educational institutions and public infrastructure projects across India.",
                color: "from-amber-500/20 to-orange-600/10",
                border: "hover:border-amber-400/50",
                glow: "group-hover:shadow-[0_25px_60px_-20px_rgba(251,191,36,0.4)]",
              },
              {
                emoji: "🤝",
                title: "Community Impact",
                desc: "Demonstrated through real-world projects featured on our Instagram reel, inspiring clean energy adoption across communities in India.",
                color: "from-primary/20 to-brand-gold/10",
                border: "hover:border-primary/50",
                glow: "group-hover:shadow-[0_25px_60px_-20px_hsl(var(--primary)/0.4)]",
              },
            ].map((h) => (
              <div
                key={h.title}
                className={`group relative rounded-2xl border border-white/10 bg-gradient-to-br ${h.color} backdrop-blur-xl p-6 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-1.5 ${h.border} ${h.glow}`}
              >
                <span className="text-4xl leading-none">{h.emoji}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                    {h.title}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">{h.desc}</p>
                </div>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-primary via-brand-gold to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      {/* PROCESS */}
      <section id="process" className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-[1.7fr_1fr] gap-10 items-center">
          <div>
            <p className="text-primary font-semibold text-sm flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> OUR PROCESS
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy">
              Our 5-Step Process
            </h2>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-5 gap-6">
              {process.map((p) => (
                <div key={p.n} className="text-center">
                  <div
                    className={`mx-auto h-16 w-16 rounded-full grid place-items-center font-bold text-lg text-white ${
                      p.green ? "bg-primary" : "bg-brand-navy"
                    }`}
                  >
                    {p.n}
                  </div>
                  <div className="mt-4 font-semibold text-brand-navy text-sm leading-tight">
                    {p.title}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src={solarHouse}
            alt="Solar powered home"
            className="w-full max-w-md mx-auto"
            loading="lazy"
          />
        </div>
      </section>

      {/* PROJECTS + WHY US */}
      <section
        id="projects"
        className="relative overflow-hidden bg-brand-navy-deep text-white py-24"
      >
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-primary font-semibold text-sm flex items-center gap-2 tracking-widest">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
                OUR PROJECTS
              </p>
              <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">
                Powering{" "}
                <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
                  Every Sector
                </span>
              </h2>
              <p className="mt-4 text-white/70 max-w-xl">
                A curated look at recent installations — tap any tile for full project details.
              </p>
            </div>
            <div
              id="why"
              className="hidden lg:grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 max-w-md"
            >
              {whyus.slice(0, 4).map((w) => (
                <div key={w} className="flex items-start gap-2 text-xs text-white/85">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          </div>

          <ProjectsGallery />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />

      {/* CONTACT */}
      <section id="contact" className="relative py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-3 gap-8 items-start">
          <div>
            <p className="text-primary font-semibold text-sm flex items-center gap-2 tracking-widest">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
              CONTACT US
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-brand-navy leading-tight">
              Let's Switch to{" "}
              <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
                Clean Energy
              </span>{" "}
              Together
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Get a free site assessment and a personalised proposal — no obligations.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                { icon: Phone, label: "+91 91500 11428", href: "tel:+919150011428" },
                {
                  icon: Mail,
                  label: "info@flashrenewable.com",
                  href: "mailto:info@flashrenewable.com",
                },
                { icon: Globe, label: "www.flashrenewable.com" },
              ].map(({ icon: Icon, label, href }) => (
                <li
                  key={label}
                  className="group flex items-center gap-3 rounded-xl border border-brand-navy/10 bg-white px-4 py-3 hover:border-primary/50 hover:shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.5)] transition"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep">
                    <Icon className="h-4 w-4" />
                  </span>
                  {href ? (
                    <a
                      href={href}
                      className="font-medium text-brand-navy group-hover:text-primary transition"
                    >
                      {label}
                    </a>
                  ) : (
                    <span className="font-medium text-brand-navy">{label}</span>
                  )}
                </li>
              ))}
              <li className="flex gap-3 rounded-xl border border-brand-navy/10 bg-white px-4 py-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-brand-navy/85 text-left">
                  FLASH STORAGE Door No.7, Plot No.102, Manirajan Street, Janaki Nagar, Alwarthirunagar, Valasaravakkam, Chennai, Tamil Nadu – 600087
                </span>
              </li>
            </ul>
          </div>

          <ContactForm />

          <div className="rounded-2xl overflow-hidden relative min-h-[420px] border border-brand-navy/10 shadow-[0_25px_60px_-30px_hsl(var(--brand-navy)/0.4)]">
            <iframe
              title="Flash Renewable Energy Solutions location"
              src="https://www.google.com/maps?q=Valasaravakkam,+Chennai,+Tamil+Nadu&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
            />
            <div className="absolute top-4 left-4 max-w-[240px] rounded-xl bg-brand-navy-deep/95 backdrop-blur text-white p-4 text-xs leading-relaxed border border-white/10">
              <div className="text-primary font-semibold mb-1 tracking-wider">OUR LOCATION</div>
              FLASH STORAGE, Door No.7, Valasaravakkam, Chennai – 600087
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="relative overflow-hidden bg-brand-navy-deep py-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-brand-gold/15" />
        <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="font-display text-2xl md:text-4xl font-bold text-white leading-tight">
              Ready to power up with{" "}
              <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
                clean energy?
              </span>
            </h3>
            <p className="mt-2 text-white/70 text-sm md:text-base">
              Talk to our engineers today — free site visit and proposal within 48 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-6 py-3.5 text-sm font-semibold text-brand-navy-deep shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.8)] hover:shadow-[0_20px_50px_-10px_hsl(var(--primary))] hover:-translate-y-0.5 transition"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+919150011428"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              <Phone className="h-4 w-4" /> +91 91500 11428
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

