import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, Globe, MapPin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero, FooterCTA } from "@/components/site/PageHero";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | Flash Renewable Energy Solutions" },
      {
        name: "description",
        content:
          "Get in touch with Flash Renewable Energy Solutions — free site assessment and personalised solar proposals within 48 hours.",
      },
      { property: "og:title", content: "Contact Flash Renewable Energy" },
      { property: "og:description", content: "Free site visit and proposal within 48 hours." },
      { property: "og:url", content: "https://www.flashrenewable.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://www.flashrenewable.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="bg-background text-foreground font-sans">
      <Header overlay />
      <PageHero
        title="Contact Us"
        crumb="Contact"
        tagline="Free site assessment and a personalised proposal — no obligations."
      />

      <section className="relative py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-3 gap-8 items-start">
          <div>
            <p className="text-primary font-semibold text-sm flex items-center gap-2 tracking-widest">
              <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />{" "}
              REACH US
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy leading-tight">
              Let's Switch to{" "}
              <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
                Clean Energy
              </span>{" "}
              Together
            </h2>

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

      <FooterCTA />
      <Footer />
    </div>
  );
}
