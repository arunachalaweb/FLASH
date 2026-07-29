import { Quote, Star } from "lucide-react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Flash delivered our 420 kWp rooftop plant two weeks ahead of schedule. Monitoring, billing and payback have all played out exactly as promised.",
    name: "Ravi Menon",
    role: "Facilities Director",
    location: "Bengaluru Tech Park",
    initials: "RM",
  },
  {
    quote:
      "The engineering team walked us through every decision — from module choice to HT synchronisation. Genuine EPC partners, not just installers.",
    name: "Anitha Krishnan",
    role: "Plant Head",
    location: "Coimbatore Textiles",
    initials: "AK",
  },
  {
    quote:
      "Clean installation on our villa rooftop, zero mess and perfectly documented. Our electricity bill dropped by 82% in the first quarter.",
    name: "Vikram Shah",
    role: "Homeowner",
    location: "Chennai",
    initials: "VS",
  },
  {
    quote:
      "24×7 remote O&M is real with Flash. Any performance dip and we hear from them before we notice it ourselves. Highly recommended.",
    name: "Priya Deshpande",
    role: "Operations Manager",
    location: "Pune Warehousing",
    initials: "PD",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-background py-24">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[40rem] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-primary font-semibold text-sm flex items-center gap-2 tracking-widest">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
            TESTIMONIALS
          </p>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight text-brand-navy">
            Trusted by clients{" "}
            <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
              across India
            </span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl">
            Real voices from homeowners, plant heads and facility managers powering their operations
            with Flash.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="group relative rounded-2xl border border-brand-navy/10 bg-white p-7 shadow-[0_10px_30px_-15px_hsl(var(--brand-navy)/0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_25px_60px_-20px_hsl(var(--primary)/0.45)]"
            >
              {/* top accent bar */}
              <span className="pointer-events-none absolute inset-x-7 top-0 h-0.5 bg-gradient-to-r from-primary via-brand-gold to-primary rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

              <Quote
                className="h-9 w-9 text-primary/25 group-hover:text-primary/70 group-hover:-rotate-6 transition-all duration-500"
                strokeWidth={2}
              />

              <div className="mt-3 flex gap-0.5" aria-label="5 star rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-gold text-brand-gold" />
                ))}
              </div>

              <blockquote className="mt-4 text-sm leading-relaxed text-brand-navy/85">
                "{t.quote}"
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3 border-t border-brand-navy/10 pt-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep font-bold text-sm shadow-[0_8px_20px_-8px_hsl(var(--primary)/0.7)] group-hover:scale-110 transition-transform duration-500">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="font-display text-sm font-semibold text-brand-navy truncate">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {t.role} · {t.location}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
