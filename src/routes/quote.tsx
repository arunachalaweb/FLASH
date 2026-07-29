import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock, Phone } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero, FooterCTA } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Free Quote | Flash Renewable Energy Solutions" },
      {
        name: "description",
        content:
          "Request a free solar quote from Flash Renewable Energy — free site visit, personalised proposal and payback estimate within 48 hours.",
      },
      { property: "og:title", content: "Free Solar Quote — Flash Renewable Energy" },
      {
        property: "og:description",
        content: "Free site visit, personalised proposal and payback estimate within 48 hours.",
      },
      { property: "og:url", content: "https://www.flashrenewable.com/quote" },
    ],
    links: [{ rel: "canonical", href: "https://www.flashrenewable.com/quote" }],
  }),
  component: QuotePage,
});

const perks = [
  {
    icon: CheckCircle2,
    title: "Free site survey",
    desc: "Our engineer visits your site at no cost to measure roof, shade and load.",
  },
  {
    icon: Clock,
    title: "48-hour proposal",
    desc: "Detailed technical + commercial proposal within two business days.",
  },
  {
    icon: Phone,
    title: "One-on-one advisory",
    desc: "A dedicated engineer walks you through subsidies, financing and payback.",
  },
];

function QuotePage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header overlay />
      <PageHero
        title="Get a Free Quote"
        crumb="Free Quote"
        tagline="Tell us about your site — we'll respond with a personalised solar proposal within 48 hours."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start">
          <div>
            <p className="text-primary font-semibold text-sm flex items-center gap-2 tracking-widest">
              <span className="h-2 w-2 rounded-full bg-primary" /> HOW IT WORKS
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy leading-tight">
              Zero obligation.
              <br />
              <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
                Zero pressure.
              </span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              Just an honest assessment of what solar can do for your bills, your roof and your
              business.
            </p>

            <div className="mt-8 space-y-4">
              {perks.map((p) => (
                <div
                  key={p.title}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-[0_15px_40px_-20px_hsl(var(--primary)/0.5)] transition"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display font-semibold text-brand-navy">{p.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground leading-relaxed">
                      {p.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-brand-navy-deep text-white p-5 flex items-center gap-4">
              <Phone className="h-6 w-6 text-primary shrink-0" />
              <div className="text-sm">
                <div className="text-white/60">Prefer to call?</div>
                <a
                  href="tel:+919150011428"
                  className="font-display text-lg font-bold hover:text-primary transition"
                >
                  +91 91500 11428
                </a>
              </div>
            </div>
          </div>

          <ContactForm mode="quote" />
        </div>
      </section>

      <FooterCTA />
      <Footer />
    </div>
  );
}
