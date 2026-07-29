import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Phone,
  Sparkles,
  Cog,
  TrendingUp,
  HelpCircle,
} from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FooterCTA } from "@/components/site/PageHero";
import { getService, services, type Service } from "@/lib/services-data";
import { ConsumerJourney } from "@/components/site/ConsumerJourney";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return {
      slug: service.slug,
      label: service.label,
      intro: service.intro,
      image: service.image,
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }] };
    }
    const s = loaderData;
    const url = `https://www.flashrenewable.com/services/${s.slug}`;
    const image = s.image?.startsWith("http")
      ? s.image
      : `https://www.flashrenewable.com${s.image?.startsWith("/") ? "" : "/"}${s.image ?? ""}`;
    const title = `${s.label} — Flash Renewable Energy Solutions`;
    return {
      meta: [
        { title },
        { name: "description", content: s.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: s.intro },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: image },
        { property: "og:site_name", content: "Flash Renewable Energy Solutions" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: s.intro },
        { name: "twitter:image", content: image },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: s.label,
            description: s.intro,
            url,
            image,
            provider: {
              "@type": "Organization",
              name: "Flash Renewable Energy Solutions",
              url: "https://www.flashrenewable.com",
            },
            areaServed: { "@type": "Country", name: "India" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.flashrenewable.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://www.flashrenewable.com/services",
              },
              { "@type": "ListItem", position: 3, name: s.label, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ServiceDetailPage,
  notFoundComponent: ServiceNotFound,
});

function ServiceNotFound() {
  return (
    <div className="bg-background text-foreground font-sans min-h-screen">
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-bold">Service not found</h1>
        <p className="mt-4 text-muted-foreground">The service you're looking for doesn't exist.</p>
        <Link
          to="/services"
          className="mt-8 inline-flex items-center gap-2 text-primary font-semibold"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Services
        </Link>
      </div>
      <Footer />
    </div>
  );
}

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = getService(slug) as Service;
  const [active, setActive] = useState(0);
  const Icon = service.icon;

  return (
    <div className="bg-background text-foreground font-sans">
      <Header overlay />

      {/* Hero */}
      <section className="relative min-h-[560px] md:min-h-[640px] overflow-hidden pt-[220px] md:pt-[260px] pb-20">
        <img
          src={service.image}
          alt={service.label}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/95 via-brand-navy-deep/80 to-brand-navy-deep/50" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -top-10 left-1/4 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-sm text-white/80">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <Link to="/services" className="hover:text-primary">
              Services
            </Link>
            <span className="mx-2 text-white/40">/</span>
            <span className="text-primary">{service.label}</span>
          </p>

          <div className="mt-6 flex items-center gap-4">
            <div className="h-14 w-14 rounded-xl grid place-items-center bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.8)]">
              <Icon className="h-7 w-7" strokeWidth={2.25} />
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />{" "}
              {service.tag}
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl">
            {service.label}
          </h1>
          <p className="mt-5 text-lg text-white/80 max-w-2xl">{service.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-6 py-3.5 text-sm font-semibold text-brand-navy-deep shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.8)] hover:-translate-y-0.5 transition"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+919150011428"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              <Phone className="h-4 w-4" /> +91 91500 11428
            </a>
          </div>

          {/* Specs strip */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl">
            {service.specs.map((sp) => (
              <div
                key={sp.label}
                className="rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur px-4 py-3"
              >
                <p className="text-[10px] uppercase tracking-widest text-white/50">{sp.label}</p>
                <p className="mt-1 font-display text-lg text-white font-semibold">{sp.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview + Features */}
      <section className="relative bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-5">
            <p className="text-primary font-semibold text-sm tracking-widest">OVERVIEW</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy-deep leading-tight">
              Why choose Flash for {service.label.toLowerCase()}
            </h2>
            {service.overview.map((p, i) => (
              <p key={i} className="text-muted-foreground leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm h-fit">
            <p className="text-primary font-semibold text-sm tracking-widest">KEY FEATURES</p>
            <h3 className="mt-2 font-display text-xl font-bold text-brand-navy-deep">
              What's included
            </h3>
            <ul className="mt-5 space-y-3">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground/80">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="relative bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-primary font-semibold text-sm tracking-widest">KEY BENEFITS</p>
          </div>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-brand-navy-deep">
            What you gain
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((b, i) => (
              <div
                key={b.title}
                className="group relative rounded-2xl border border-border bg-card p-6 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 transition"
              >
                <div className="h-10 w-10 rounded-lg grid place-items-center bg-primary/10 text-primary font-display font-bold text-sm">
                  0{i + 1}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-navy-deep">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-primary via-brand-gold to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
              </div>
            ))}
          </div>

          {service.slug === "rooftop-solar" && (
            <div className="mt-16 bg-card rounded-2xl shadow-sm border border-border p-8">
              <div className="grid lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-2xl font-display font-bold text-brand-navy-deep mb-6">Subsidy Benefits</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-brand-navy mb-3">Subsidy for Residential Households</h4>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li className="flex items-start gap-3"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Rs. 30,000 per kW up to 2 kW</li>
                        <li className="flex items-start gap-3"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Rs. 18,000 per kW for additional capacity up to 3 kW</li>
                        <li className="flex items-start gap-3"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Rs. 78,000 Total subsidy for systems larger than 3 kW capped at</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-semibold text-brand-navy mb-3">Subsidy for GHS/RWA</h4>
                      <ul className="space-y-2 text-muted-foreground text-sm">
                        <li className="flex items-start gap-3"><Check className="h-4 w-4 text-primary shrink-0 mt-0.5" /> Rs. 18,000 per kW for common facilities, including EV charging, up to 500 kW capacity (@3 kW per house) with the upper limit being inclusive of individual rooftop plants installed by individual residents in the GHS/RWA</li>
                      </ul>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                      <p className="text-brand-navy-deep text-sm font-semibold">For special states, an additional 10% Subsidy will be applicable per kW</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-display font-bold text-brand-navy-deep mb-6">Suitable Rooftop Solar Plant Capacity for households</h3>
                  <div className="overflow-hidden rounded-xl border border-border">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-muted/50 border-b border-border">
                          <th className="p-4 font-semibold text-brand-navy">Average Monthly Electricity Consumption (units)</th>
                          <th className="p-4 font-semibold text-brand-navy border-l border-border">Suitable Rooftop Solar Plant Capacity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border hover:bg-muted/30">
                          <td className="p-4 text-muted-foreground">0-150</td>
                          <td className="p-4 font-medium text-brand-navy-deep border-l border-border">1-2 kw</td>
                        </tr>
                        <tr className="border-b border-border hover:bg-muted/30">
                          <td className="p-4 text-muted-foreground">150-300</td>
                          <td className="p-4 font-medium text-brand-navy-deep border-l border-border">2-3 kw</td>
                        </tr>
                        <tr className="hover:bg-muted/30">
                          <td className="p-4 text-muted-foreground">&gt;300</td>
                          <td className="p-4 font-medium text-brand-navy-deep border-l border-border">Above 3 kw</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className="relative bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-primary font-semibold text-sm tracking-widest">GALLERY</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-brand-navy-deep">
            Project imagery
          </h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-lg">
              <img
                src={service.gallery[active]}
                alt={`${service.label} gallery ${active + 1}`}
                className="h-full w-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-navy-deep/70 to-transparent" />
              <span className="absolute bottom-4 left-4 rounded-full bg-brand-navy-deep/80 backdrop-blur px-3 py-1 text-xs font-semibold text-white">
                {active + 1} / {service.gallery.length}
              </span>
            </div>

            <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
              {service.gallery.map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group relative aspect-[4/3] overflow-hidden rounded-xl border transition-all ${
                    active === i
                      ? "border-primary ring-2 ring-primary/40"
                      : "border-border hover:border-primary/60"
                  }`}
                >
                  <img
                    src={g}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {active !== i && (
                    <div className="absolute inset-0 bg-brand-navy-deep/30 group-hover:bg-brand-navy-deep/10 transition" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="text-primary font-semibold text-sm tracking-widest">HOW WE DELIVER</p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold text-brand-navy-deep">
            Our process
          </h2>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {service.process.map((p, i) => (
              <div
                key={p.title}
                className="relative rounded-2xl border border-border bg-card p-5 hover:-translate-y-1 hover:shadow-lg transition"
              >
                <div className="h-9 w-9 rounded-lg grid place-items-center bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep font-display font-bold">
                  {i + 1}
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-brand-navy-deep">
                  {p.title}
                </h3>
              </div>
            ))}
          </div>

          {service.slug === "rooftop-solar" && <ConsumerJourney />}
        </div>
      </section>

      {/* Tech stack + Case study */}
      <section className="relative bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
            <div className="flex items-center gap-2">
              <Cog className="h-4 w-4 text-primary" />
              <p className="text-primary font-semibold text-sm tracking-widest">TECHNOLOGY STACK</p>
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold text-brand-navy-deep">
              Best-in-class components
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              We only use Tier-1, MNRE-approved and internationally certified equipment.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.techStack.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-brand-navy-deep"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {t}
                </span>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand-navy-deep to-brand-navy p-8 text-white shadow-lg">
            <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <p className="text-primary font-semibold text-sm tracking-widest">CASE STUDY</p>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold">{service.caseStudy.title}</h3>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur px-4 py-3">
                  <p className="text-[10px] uppercase tracking-widest text-white/50">Location</p>
                  <p className="mt-1 font-display text-sm text-white font-semibold">
                    {service.caseStudy.location}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur px-4 py-3">
                  <p className="text-[10px] uppercase tracking-widest text-white/50">Capacity</p>
                  <p className="mt-1 font-display text-sm text-white font-semibold">
                    {service.caseStudy.capacity}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-white/80 leading-relaxed">
                <span className="text-primary font-semibold">Result: </span>
                {service.caseStudy.result}
              </p>
              <Link
                to="/projects"
                className="mt-6 inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all"
              >
                View more projects <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <div className="flex items-center gap-2 justify-center">
            <HelpCircle className="h-4 w-4 text-primary" />
            <p className="text-primary font-semibold text-sm tracking-widest">FAQ</p>
          </div>
          <h2 className="mt-2 text-center font-display text-3xl md:text-4xl font-bold text-brand-navy-deep">
            Questions we hear a lot
          </h2>
          <div className="mt-10 space-y-3">
            {service.faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border bg-card p-5 open:shadow-md transition-shadow"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-base md:text-lg font-semibold text-brand-navy-deep list-none">
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-bold text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-navy-deep py-16">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-brand-gold/15" />
        <div className="pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" />
        <div className="relative mx-auto max-w-5xl px-4 md:px-6 text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight">
            Ready for a{" "}
            <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
              {service.label.toLowerCase()}
            </span>{" "}
            proposal?
          </h3>
          <p className="mt-3 text-white/70 max-w-2xl mx-auto">
            Get a detailed quote with capacity sizing, ROI projection and delivery timeline — free
            within 48 hours.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-7 py-3.5 text-sm font-semibold text-brand-navy-deep shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.8)] hover:-translate-y-0.5 transition"
            >
              Request Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition"
            >
              Contact Engineers
            </Link>
          </div>
        </div>
      </section>

      {/* Related services */}
      <section className="relative bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-primary font-semibold text-sm tracking-widest">EXPLORE MORE</p>
              <h2 className="mt-2 font-display text-3xl font-bold text-brand-navy-deep">
                Related services
              </h2>
            </div>
            <Link
              to="/services"
              className="text-sm font-semibold text-primary inline-flex items-center gap-2"
            >
              All services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .slice(0, 3)
              .map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="group relative rounded-2xl overflow-hidden border border-border bg-card hover:-translate-y-1 hover:shadow-xl transition"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.label}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/80 via-brand-navy-deep/20 to-transparent" />
                    <h3 className="absolute left-5 bottom-4 right-5 font-display text-lg font-semibold text-white">
                      {s.label}
                    </h3>
                  </div>
                  <div className="p-4 text-sm text-muted-foreground flex items-center justify-between">
                    <span>{s.tag}</span>
                    <span className="inline-flex items-center gap-1.5 text-primary font-semibold">
                      View <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <FooterCTA />
      <Footer />
    </div>
  );
}
