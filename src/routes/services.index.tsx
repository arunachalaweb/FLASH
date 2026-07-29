import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero, FooterCTA } from "@/components/site/PageHero";
import { services } from "@/lib/services-data";

// ─── Technology data ───────────────────────────────────────────────
const solarTechs = [
  {
    emoji: "🔆",
    name: "Poly-Crystalline Solar Panels",
    description:
      "Constructed from multiple silicon crystals, offering a cost-effective alternative to mono-crystalline panels.",
    advantages: "Affordable, reliable, and widely available.",
    bestUse: "Large-scale commercial and industrial projects.",
    efficiency: "14–18%",
    power: "Up to 330W",
    strength: "Budget-friendly & Less effective",
    lifespan: "20–25 years",
  },
  {
    emoji: "🔆",
    name: "Mono-Crystalline Solar Panels",
    description:
      "Made from single-crystal silicon, known for high efficiency and a sleek black finish.",
    advantages: "Space-saving, long lifespan, excellent performance in limited installation areas.",
    bestUse: "Residential rooftops and premium installations.",
    efficiency: "18–23%",
    power: "400–700W",
    strength: "Expensive & Better Performance",
    lifespan: "25–30 years",
  },
  {
    emoji: "🔆",
    name: "Thin Film Solar Panels",
    description:
      "Lightweight and flexible panels that can be integrated into building materials.",
    advantages: "Perform well in low-light conditions, adaptable to modern architecture.",
    bestUse: "Utility-scale projects and innovative building designs.",
    efficiency: "11–13%",
    power: "100–300W",
    strength: "Flexible, easy to install & lower performance",
    lifespan: "10 years",
  },
  {
    emoji: "🔆",
    name: "Sticker Panels",
    description:
      "Compact, adhesive-backed panels designed for portability and convenience.",
    advantages: "Easy installation, portable energy source.",
    bestUse: "Consumer gadgets, vehicles, and temporary setups.",
    efficiency: "10%",
    power: "100W",
    strength: "Flexible, easy to install & lower performance",
    lifespan: "5–10 years",
  },
  {
    emoji: "🔆",
    name: "Glass Panels",
    description:
      "Durable panels encased in protective glass for enhanced longevity.",
    advantages: "Aesthetic appeal, strong performance, premium quality.",
    bestUse: "High-end residential and commercial projects.",
    efficiency: "20–23%",
    power: "Up to 400W",
    strength: "Transparent, tempered toughness, captures reflected light from both sides",
    lifespan: "20–25 years",
  },
  {
    emoji: "🔆",
    name: "Roof Solar Tiles (BIPV)",
    description:
      "Building-Integrated Photovoltaic (BIPV) tiles combine clean energy generation with the structural protection of traditional roof tiles.",
    advantages: "Aesthetics, Durability, Efficiency.",
    bestUse: "Regions with tropical hill stations and traditional home structures.",
    efficiency: "12–20%",
    power: "38–70W per tile (varies by size & model)",
    strength: "Weather resistance, replaces roofing material, ultra-lightweight & space-saving",
    lifespan: "25–30 years",
  },
  {
    emoji: "🔆",
    name: "Turbine Integration",
    description:
      "Hybrid systems combining solar panels with wind turbines for consistent 24/7 power generation.",
    advantages: "Ensures consistent power supply by balancing solar and wind inputs.",
    bestUse: "Regions with variable weather conditions.",
    efficiency: "Up to 30–40% (wind-dependent)",
    power: "Up to 900W (wind-dependent)",
    strength: "High efficiency, 24/7 continuous generation & space-saving",
    lifespan: "20–25 years",
  },
  {
    emoji: "🔆",
    name: "Windmill Systems",
    description:
      "Portable windmills (small, mobile units for temporary/remote needs) and static windmills (larger, fixed installations for continuous generation).",
    advantages: "Reliable renewable energy source, complements solar systems.",
    bestUse: "Rural electrification, industrial sites, and hybrid projects.",
    efficiency: "Up to 30–40% (wind-dependent)",
    power: "2.6–3.9 million kWh per MW of capacity annually",
    strength: "Aerodynamic & gravitational load, survival mechanism",
    lifespan: "20–25 years (with component replacement & repowering extensions up to 35+ years)",
  },
  {
    emoji: "🔆",
    name: "Hybrid Solar Inverters",
    description:
      "Advanced inverters that manage both solar and wind inputs seamlessly.",
    advantages: "Stable energy conversion, efficient storage, uninterrupted power supply.",
    bestUse: "Residential and industrial setups requiring consistent energy.",
    efficiency: "–",
    power: "–",
    strength: "Seamless multi-source management",
    lifespan: "–",
  },
];

const innovations = [
  {
    emoji: "🌊",
    title: "Floating Solar Systems",
    desc: "Panels installed on water bodies, reducing land usage and improving efficiency. Ideal for large campuses and government projects.",
  },
  {
    emoji: "🌀",
    title: "Turbines & Wall Turbines",
    desc: "Compact vertical-axis wind turbines designed for rural, urban and institutional applications, providing clean energy in limited spaces.",
  },
];

const sectorApplications = [
  { sector: "Residential", apps: "Roof tiles, rooftop solar panels & vertical wind turbines for homes." },
  { sector: "Commercial", apps: "Banks, private offices, government offices, MNC companies, IT Parks, malls, integrated buildings and complexes." },
  { sector: "Industrial", apps: "Factories and large-scale manufacturing operations." },
  { sector: "Utility (Large Scale)", apps: "Solar plants, solar fencing and wind farms powering entire communities." },
  { sector: "Educational Institutions", apps: "Solar systems for campuses, wall turbines for schools and universities, enabling sustainable energy adoption." },
  { sector: "Government Organisations", apps: "Large-scale floating solar on seas and ponds, wind turbines for street lights and highway lighting with battery backup, wall turbine projects for public infrastructure — reducing carbon footprint and supporting national sustainability goals." },
];

function TechCard({ tech }: { tech: (typeof solarTechs)[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-primary/40">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 p-5 text-left group"
      >
        <span className="text-3xl">{tech.emoji}</span>
        <span className="flex-1 font-display text-lg font-semibold text-white group-hover:text-primary transition-colors">
          {tech.name}
        </span>
        {open ? (
          <ChevronUp className="h-5 w-5 text-white/40 group-hover:text-primary transition-colors" />
        ) : (
          <ChevronDown className="h-5 w-5 text-white/40 group-hover:text-primary transition-colors" />
        )}
      </button>

      {open && (
        <div className="px-5 pb-6 border-t border-white/10 pt-4 space-y-4">
          <p className="text-white/75 text-sm leading-relaxed">{tech.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Efficiency", value: tech.efficiency },
              { label: "Power Output", value: tech.power },
              { label: "Lifespan", value: tech.lifespan },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-primary/10 border border-primary/20 px-3 py-2 text-center"
              >
                <p className="text-[10px] uppercase tracking-widest text-primary/70 mb-0.5">
                  {s.label}
                </p>
                <p className="text-sm font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-primary/80 font-semibold">Best Use:</span>{" "}
              <span className="text-white/70">{tech.bestUse}</span>
            </div>
            <div>
              <span className="text-primary/80 font-semibold">Advantages:</span>{" "}
              <span className="text-white/70">{tech.advantages}</span>
            </div>
            <div>
              <span className="text-primary/80 font-semibold">Strength:</span>{" "}
              <span className="text-white/70">{tech.strength}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Solar EPC Services | Flash Renewable Energy Solutions" },
      {
        name: "description",
        content:
          "End-to-end solar EPC services — rooftop, ground-mounted, industrial, water pumps, street lighting, battery storage and O&M across India.",
      },
      { property: "og:title", content: "Our Services — Flash Renewable Energy" },
      {
        property: "og:description",
        content: "Complete renewable energy solutions for every sector.",
      },
      { property: "og:url", content: "https://www.flashrenewable.com/services" },
    ],
    links: [{ rel: "canonical", href: "https://www.flashrenewable.com/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header overlay />
      <PageHero
        title="Our Services"
        crumb="Services"
        tagline="Full-stack solar EPC — designed, delivered and maintained by an experienced engineering team."
      />

      <section className="relative overflow-hidden bg-brand-navy-deep text-white py-20">
        <div className="pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/20 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-primary font-semibold text-sm flex items-center gap-2 tracking-widest">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />{" "}
            WHAT WE DO
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight max-w-3xl">
            Complete Renewable{" "}
            <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
              Energy Solutions
            </span>
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      <FooterCTA />

      {/* ── Types of Solar Technologies ── */}
      <section className="relative overflow-hidden bg-brand-navy-deep text-white py-24">
        <div className="pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          {/* Heading */}
          <p className="text-primary font-semibold text-sm flex items-center gap-2 tracking-widest">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
            OUR TECHNOLOGY PORTFOLIO
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
            Types of{" "}
            <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
              Solar Technologies
            </span>
          </h2>
          <p className="mt-4 text-white/65 max-w-3xl text-base leading-relaxed">
            At Flash Renewable Energy Solutions Pvt Ltd, we provide a diverse portfolio of solar
            and hybrid technologies tailored to meet residential, commercial, industrial, and
            utility-scale needs. Each technology is designed to balance efficiency, cost, and
            sustainability.
          </p>

          {/* Technology accordion cards */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {solarTechs.map((tech) => (
              <TechCard key={tech.name} tech={tech} />
            ))}
          </div>

          {/* Additional Innovations */}
          <div className="mt-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              Additional{" "}
              <span className="bg-gradient-to-r from-primary to-brand-gold bg-clip-text text-transparent">
                Innovations
              </span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {innovations.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 flex gap-4 hover:border-primary/40 transition-colors duration-300"
                >
                  <span className="text-4xl leading-none">{item.emoji}</span>
                  <div>
                    <p className="font-semibold text-white text-lg mb-1">{item.title}</p>
                    <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Applications Across Sectors */}
          <div className="mt-16">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
              Applications Across{" "}
              <span className="bg-gradient-to-r from-primary to-brand-gold bg-clip-text text-transparent">
                Sectors
              </span>
            </h3>
            <div className="overflow-hidden rounded-2xl border border-white/10">
              {sectorApplications.map((row, i) => (
                <div
                  key={row.sector}
                  className={`flex flex-col sm:flex-row gap-2 sm:gap-6 px-6 py-4 ${
                    i % 2 === 0 ? "bg-white/[0.03]" : "bg-white/[0.065]"
                  } border-b border-white/10 last:border-b-0`}
                >
                  <span className="min-w-[200px] font-semibold text-primary text-sm uppercase tracking-widest">
                    {row.sector}
                  </span>
                  <span className="text-white/70 text-sm leading-relaxed">{row.apps}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
