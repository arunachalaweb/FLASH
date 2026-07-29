import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Award, Clock, Leaf, Shield, Users, Headset } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero, FooterCTA } from "@/components/site/PageHero";

export const Route = createFileRoute("/why-us")({
  head: () => ({
    meta: [
      { title: "Why Choose Flash Renewable Energy Solutions" },
      {
        name: "description",
        content:
          "Experienced engineering team, MNRE-compliant designs, high-quality components, timely delivery and 24×7 support — the reasons clients choose Flash.",
      },
      { property: "og:title", content: "Why Choose Us — Flash Renewable Energy" },
      {
        property: "og:description",
        content: "Engineering-led solar EPC with proven delivery across India.",
      },
      { property: "og:url", content: "https://www.flashrenewable.com/why-us" },
    ],
    links: [{ rel: "canonical", href: "https://www.flashrenewable.com/why-us" }],
  }),
  component: WhyUsPage,
});

const reasons = [
  {
    icon: Users,
    title: "Experienced Engineering Team",
    desc: "Twenty-five plus solar engineers with hundreds of MW commissioned across sectors.",
  },
  {
    icon: Shield,
    title: "MNRE-Compliant Solutions",
    desc: "Every design, module and inverter meets MNRE and BIS requirements out of the box.",
  },
  {
    icon: Award,
    title: "High-Quality Components",
    desc: "Tier-1 modules, IEC-certified inverters, hot-dip galvanised structures — nothing else.",
  },
  {
    icon: Clock,
    title: "Timely Project Delivery",
    desc: "Milestone-driven schedules with weekly progress reporting and on-time commissioning.",
  },
  {
    icon: Headset,
    title: "24×7 Customer Support",
    desc: "Real remote O&M — you hear from us before you notice a performance dip.",
  },
  {
    icon: Leaf,
    title: "Warranty & AMC Services",
    desc: "25-year panel warranty and flexible AMC packages to protect your yield long-term.",
  },
];

function WhyUsPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header overlay />
      <PageHero
        title="Why Choose Us"
        crumb="Why Us"
        tagline="Engineering-led solar EPC with proven delivery across every sector."
      />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="max-w-2xl">
            <p className="text-primary font-semibold text-sm flex items-center gap-2 tracking-widest">
              <span className="h-2 w-2 rounded-full bg-primary" /> WHY FLASH
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold text-brand-navy leading-tight">
              A partner you can{" "}
              <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
                count on
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Six reasons India's homes, factories and utilities pick Flash for their solar journey.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="group rounded-2xl border border-border bg-white p-7 shadow-[0_10px_30px_-15px_hsl(var(--brand-navy)/0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_25px_60px_-20px_hsl(var(--primary)/0.45)]"
              >
                <div className="h-14 w-14 rounded-xl grid place-items-center bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] group-hover:scale-110 transition-transform duration-500">
                  <r.icon className="h-6 w-6" strokeWidth={2.25} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-brand-navy">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider">
                  <CheckCircle2 className="h-4 w-4" /> Included in every project
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA />
      <Footer />
    </div>
  );
}
