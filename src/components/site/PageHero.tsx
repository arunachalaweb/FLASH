import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-solar.jpg";

export function PageHero({
  title,
  crumb,
  tagline,
  compact = false,
}: {
  title: string;
  crumb: string;
  tagline?: string;
  compact?: boolean;
}) {
  return (
    <section className={`relative overflow-hidden pb-10 ${
      compact 
        ? "min-h-[280px] md:min-h-[320px] pt-[140px] md:pt-[160px]" 
        : "min-h-[440px] md:min-h-[520px] pt-[220px] md:pt-[260px]"
    }`}>
      <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/92 via-brand-navy-deep/75 to-brand-navy/40" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -top-10 left-1/4 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <h1 className={`font-display font-bold text-white leading-tight ${
          compact ? "text-2xl md:text-3xl lg:text-4xl" : "text-xl md:text-5xl lg:text-6xl"
        }`}>
          {title}
        </h1>
        {tagline && <p className="mt-2 text-white/75 text-xs md:text-sm max-w-2xl">{tagline}</p>}
        <p className="mt-2 text-xs text-white/80">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="mx-2 text-white/40">/</span>
          <span className="text-primary">{crumb}</span>
        </p>
      </div>
    </section>
  );
}

export function FooterCTA() {
  return (
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
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-6 py-3.5 text-sm font-semibold text-brand-navy-deep shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.8)] hover:shadow-[0_20px_50px_-10px_hsl(var(--primary))] hover:-translate-y-0.5 transition"
          >
            Get a Free Quote
          </Link>
          <a
            href="tel:+919150011428"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            +91 91500 11428
          </a>
        </div>
      </div>
    </section>
  );
}
