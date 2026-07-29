import { useEffect, useState } from "react";
import {
  X,
  MapPin,
  Zap,
  Calendar,
  Tag,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import residential from "@/assets/project-residential.jpg";
import commercial from "@/assets/project-commercial.jpg";
import industrial from "@/assets/project-industrial.jpg";
import utility from "@/assets/project-utility.jpg";
import glassApartment from "@/assets/project-glass-apartment.png";
import commercialOffices from "@/assets/project-commercial-offices.png";
import warehouseSolar from "@/assets/project-warehouse-solar.png";
import floatingSolar from "@/assets/project-floating-solar.png";
import schoolTurbine from "@/assets/project-school-turbine.png";

export type Project = {
  id: string;
  img: string;
  title: string;
  sector: "Residential" | "Commercial" | "Industrial" | "Utility" | "Institutional";
  location: string;
  capacity: string;
  year: string;
  desc: string;
  highlights: string[];
};

const PROJECTS: Project[] = [
  // ── Residential ────────────────────────────────────────
  {
    id: "p1",
    img: residential,
    title: "Rooftop Solar — Chennai Villa",
    sector: "Residential",
    location: "Chennai, Tamil Nadu",
    capacity: "10 kWp",
    year: "2025",
    desc: "Grid-tied rooftop PV system for a private villa — featuring monocrystalline panels, net-metering and remote monitoring.",
    highlights: ["Tier-1 mono modules", "Wi-Fi string inverter", "Net-metering ready"],
  },
  {
    id: "p2",
    img: glassApartment,
    title: "Glass Panel Apartment Complex",
    sector: "Residential",
    location: "Hyderabad, Telangana",
    capacity: "95 kWp",
    year: "2024",
    desc: "Tempered glass solar panels and BIPV roof tiles installed across an affordable apartment complex, reducing electricity bills for all residents.",
    highlights: ["Glass panel integration", "Common-area offset", "5-yr AMC"],
  },
  // ── Commercial ─────────────────────────────────────────
  {
    id: "p3",
    img: commercial,
    title: "IT Park Commercial Rooftop",
    sector: "Commercial",
    location: "Bengaluru, Karnataka",
    capacity: "420 kWp",
    year: "2024",
    desc: "Large-scale rooftop solar plant for an IT Park campus — offsetting 60% of daytime load with SCADA monitoring and 18-month payback.",
    highlights: ["Zero-downtime install", "SCADA monitoring", "18-month payback"],
  },
  {
    id: "p4",
    img: commercialOffices,
    title: "Government Office & Bank Complex",
    sector: "Commercial",
    location: "Chennai, Tamil Nadu",
    capacity: "220 kWp",
    year: "2025",
    desc: "Integrated solar solution for a multi-tenant complex housing government offices, banks and private offices — with individual metering per tenant.",
    highlights: ["Multi-tenant metering", "MNC & bank ready", "PM-Surya Ghar compliant"],
  },
  // ── Industrial ─────────────────────────────────────────
  {
    id: "p5",
    img: industrial,
    title: "Textile Factory Captive Plant",
    sector: "Industrial",
    location: "Coimbatore, Tamil Nadu",
    capacity: "1.2 MWp",
    year: "2024",
    desc: "Captive solar plant integrated with existing HT infrastructure for a large textile unit — with custom mounting and remote O&M.",
    highlights: ["HT synchronisation", "Custom mounting", "Remote O&M"],
  },
  {
    id: "p6",
    img: warehouseSolar,
    title: "Warehouse & Godown Solar",
    sector: "Industrial",
    location: "Pune, Maharashtra",
    capacity: "780 kWp",
    year: "2025",
    desc: "Solar plant across factory yards and godowns with large-span aerodynamic metal-roof mounting — non-penetrative for full structural integrity.",
    highlights: ["Non-penetrative mount", "Bifacial modules", "Fast commissioning"],
  },
  // ── Utility ────────────────────────────────────────────
  {
    id: "p7",
    img: utility,
    title: "Ground-Mounted Solar Farm",
    sector: "Utility",
    location: "Rajasthan",
    capacity: "25 MWp",
    year: "2023",
    desc: "Utility-scale ground-mounted solar field delivering clean grid power under a long-term PPA — with single-axis trackers for maximum yield.",
    highlights: ["Single-axis tracker", "String monitoring", "PPA-backed"],
  },
  {
    id: "p8",
    img: utility,
    title: "Wind-Solar Hybrid Farm",
    sector: "Utility",
    location: "Gujarat",
    capacity: "50 MWp",
    year: "2025",
    desc: "Co-located wind and solar hybrid farm providing firm renewable power — full EPC scoping, site survey, yield modelling and DPR delivered.",
    highlights: ["Wind + solar hybrid", "Yield modelling", "DPR delivered"],
  },
  // ── Institutional & Government ─────────────────────────
  {
    id: "p9",
    img: floatingSolar,
    title: "University Floating Solar & Wall Turbines",
    sector: "Institutional",
    location: "Tamil Nadu",
    capacity: "500 kWp",
    year: "2025",
    desc: "Floating solar panels on the campus pond combined with vertical wall turbines across academic blocks — powering labs, libraries and common areas sustainably.",
    highlights: ["Floating solar on pond", "Wall turbine integration", "Campus-wide metering"],
  },
  {
    id: "p10",
    img: schoolTurbine,
    title: "Government School Solar & Turbine",
    sector: "Institutional",
    location: "Chennai, Tamil Nadu",
    capacity: "75 kWp",
    year: "2025",
    desc: "Rooftop solar with compact wind turbines installed for a government school — powering classrooms, corridors and administrative infrastructure.",
    highlights: ["Rooftop + turbine combo", "Zero electricity bill", "Public infrastructure"],
  },
];

const SECTORS = ["All", "Residential", "Commercial", "Industrial", "Utility", "Institutional"] as const;
type Sector = (typeof SECTORS)[number];

// Category overview data
const CATEGORIES = [
  {
    emoji: "🏠",
    label: "Residential",
    desc: "Rooftops & glass panels for affordable solar homes and apartments.",
  },
  {
    emoji: "🏢",
    label: "Commercial",
    desc: "Banks, private & government offices, MNC, IT Parks, malls and integrated complexes.",
  },
  {
    emoji: "🏭",
    label: "Industrial",
    desc: "Factories, yards, godowns and large manufacturing plants.",
  },
  {
    emoji: "⚡",
    label: "Utility",
    desc: "Large-scale solar fields, solar fencing and wind farms.",
  },
  {
    emoji: "🏛️",
    label: "Institutional",
    desc: "Floating solar, turbines & wall turbines for schools, universities and public infrastructure.",
  },
];

export function ProjectsGallery() {
  const [filter, setFilter] = useState<Sector>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.sector === filter);

  const active = activeIndex !== null ? (filtered[activeIndex] ?? null) : null;

  const close = () => {
    setActiveIndex(null);
    setZoomed(false);
  };
  const next = () => {
    setZoomed(false);
    setActiveIndex((i) => (i === null ? i : (i + 1) % filtered.length));
  };
  const prev = () => {
    setZoomed(false);
    setActiveIndex((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
  };

  useEffect(() => {
    if (!active) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <>
      {/* Category overview strip */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setFilter(cat.label as Sector)}
            className={[
              "group flex flex-col gap-2 rounded-xl border p-4 text-left transition-all duration-300 hover:-translate-y-0.5",
              filter === cat.label
                ? "border-primary bg-primary/15 shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)]"
                : "border-white/10 bg-white/[0.04] hover:border-primary/40 hover:bg-white/[0.07]",
            ].join(" ")}
          >
            <span className="text-2xl leading-none">{cat.emoji}</span>
            <span className={`text-xs font-bold uppercase tracking-widest ${
              filter === cat.label ? "text-primary" : "text-white/80 group-hover:text-primary"
            } transition-colors`}>
              {cat.label}
            </span>
            <span className="text-[11px] text-white/50 leading-snug">{cat.desc}</span>
          </button>
        ))}
      </div>

      {/* Filter chips */}
      <div className="mt-4 flex flex-wrap gap-2">
        {SECTORS.map((s) => {
          const on = filter === s;
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={[
                "rounded-full border px-4 py-2 text-xs font-semibold tracking-wide transition",
                on
                  ? "bg-primary text-primary-foreground border-primary shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.8)]"
                  : "border-white/15 bg-white/5 text-white/80 hover:bg-white/10 hover:border-white/30",
              ].join(" ")}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* Masonry (CSS columns) */}
      <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
        {filtered.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setActiveIndex(i)}
            className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] text-left transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_25px_60px_-20px_hsl(var(--primary)/0.6)]"
          >
            <img
              src={p.img}
              alt={p.title}
              loading="lazy"
              className={[
                "w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]",
                i % 3 === 0 ? "h-80" : i % 3 === 1 ? "h-64" : "h-96",
              ].join(" ")}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy-deep/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/90 backdrop-blur px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                <Tag className="h-3 w-3" /> {p.sector}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">{p.title}</h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/75">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> {p.location}
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-primary" /> {p.capacity}
                </span>
              </div>
            </div>
            <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur text-white opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              <ArrowRight className="h-4 w-4" />
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={close}
        >
          <div className="absolute inset-0 bg-brand-navy-deep/85 backdrop-blur-md" />

          {/* Prev / Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous project"
            className="absolute left-3 sm:left-6 top-1/2 z-20 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur text-white hover:bg-primary hover:text-primary-foreground transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next project"
            className="absolute right-3 sm:right-6 top-1/2 z-20 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur text-white hover:bg-primary hover:text-primary-foreground transition"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold text-white/90">
            {(activeIndex ?? 0) + 1} / {filtered.length}
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-brand-navy-deep text-white shadow-[0_40px_120px_-20px_hsl(var(--primary)/0.5)] animate-scale-in"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur text-white hover:bg-primary hover:text-primary-foreground transition"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="grid md:grid-cols-[1.35fr_1fr]">
              <div className="relative bg-black overflow-hidden group/img">
                <img
                  src={active.img}
                  alt={active.title}
                  onClick={() => setZoomed((z) => !z)}
                  className={[
                    "h-64 sm:h-80 md:h-full w-full object-cover transition-transform duration-500 cursor-zoom-in",
                    zoomed ? "scale-150 cursor-zoom-out" : "",
                  ].join(" ")}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomed((z) => !z);
                  }}
                  aria-label={zoomed ? "Zoom out" : "Zoom in"}
                  className="absolute left-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/10 backdrop-blur text-white hover:bg-primary hover:text-primary-foreground transition opacity-0 group-hover/img:opacity-100"
                >
                  {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                </button>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-brand-navy-deep/60 via-transparent to-transparent md:bg-none" />
              </div>

              <div className="p-6 sm:p-8 md:p-10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                  <Tag className="h-3 w-3" /> {active.sector}
                </span>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-bold leading-tight">
                  {active.title}
                </h3>
                <p className="mt-3 text-sm text-white/75 leading-relaxed">{active.desc}</p>

                <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
                  {[
                    { icon: MapPin, k: "Location", v: active.location },
                    { icon: Zap, k: "Capacity", v: active.capacity },
                    { icon: Calendar, k: "Year", v: active.year },
                  ].map(({ icon: Icon, k, v }) => (
                    <div key={k} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <Icon className="mx-auto h-4 w-4 text-primary" />
                      <dt className="mt-1.5 text-[10px] uppercase tracking-wider text-white/50">
                        {k}
                      </dt>
                      <dd className="mt-0.5 text-xs font-semibold text-white leading-tight">{v}</dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-primary">
                    Highlights
                  </p>
                  <ul className="mt-3 space-y-2">
                    {active.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-white/85">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact"
                  onClick={close}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-5 py-3 text-sm font-semibold text-brand-navy-deep hover:shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.8)] transition"
                >
                  Discuss a similar project <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
