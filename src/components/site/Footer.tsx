import { Link } from "@tanstack/react-router";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Send,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import logo from "@/assets/flash-logo-updated.png";

export function Footer() {
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep rounded-sm";
  const socials = [
    { Icon: Facebook, label: "Follow us on Facebook", href: "#" },
    { Icon: Linkedin, label: "Connect with us on LinkedIn", href: "#" },
    { Icon: Instagram, label: "Follow us on Instagram", href: "#" },
    { Icon: Youtube, label: "Subscribe to our YouTube channel", href: "#" },
  ];
  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="bg-brand-navy-deep text-white/85"
    >
      <NewsletterBand />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-10 pb-10 md:pt-12 md:pb-14 grid gap-8 grid-cols-2 lg:grid-cols-4 text-left">
        <div className="col-span-2 lg:col-span-1 flex flex-col items-start">
          <img
            src={logo}
            alt="Flash Renewable Energy Solutions"
            className="h-[80px] w-auto object-contain sm:-ml-1"
          />
          <p className="mt-2 text-sm leading-relaxed text-white/70 max-w-sm">
            Powering tomorrow with clean energy. Delivering innovative and sustainable renewable
            energy solutions across India.
          </p>
          <ul
            aria-label="Social media"
            className="mt-5 flex flex-wrap gap-3 list-none p-0"
          >
            {socials.map(({ Icon, label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`grid place-items-center h-11 w-11 rounded-full border border-white/20 hover:bg-primary hover:border-primary hover:text-primary-foreground transition ${focusRing}`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" focusable="false" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterCol
          navLabel="Quick links"
          title="Quick Links"
          items={[
            { label: "Home", href: "/" },
            { label: "About Us", href: "/about", accent: true },
            { label: "Services", href: "/services" },
            { label: "Projects", href: "/projects" },
            { label: "Expertise", href: "/expertise" },
            { label: "Why Us", href: "/why-us" },
            { label: "Contact Us", href: "/contact" },
            { label: "Free Quote", href: "/quote" },
            { label: "Investors / Partners", href: "/investors-partners" },
          ]}
        />
        <FooterCol
          navLabel="Our services"
          title="Our Services"
          items={[
            { label: "Solar EPC", href: "/services/solar-epc" },
            { label: "Rooftop Solar", href: "/services/rooftop-solar" },
            { label: "Ground-Mounted", href: "/services/ground-mounted" },
            { label: "Industrial Solar", href: "/services/industrial-solar" },
            { label: "Solar Water Pumping", href: "/services/solar-water-pumping" },
            { label: "Street Lighting", href: "/services/street-lighting" },
            { label: "Battery Storage", href: "/services/battery-storage" },
            { label: "O&M / AMC", href: "/services/om-amc" },
          ]}
        />

        <address className="col-span-2 lg:col-span-1 not-italic">
          <h4
            id="footer-contact-heading"
            className="text-white font-display font-semibold text-base mb-4 sm:mb-5 tracking-wide"
          >
            Contact Info
          </h4>
          <ul
            aria-labelledby="footer-contact-heading"
            className="space-y-3.5 text-sm text-white/70"
          >
            <li className="flex gap-3 min-w-0 text-left">
              <MapPin
                className="h-5 w-5 text-primary shrink-0 mt-0.5"
                aria-hidden="true"
                focusable="false"
              />
              <span className="leading-relaxed">
                <span className="sr-only">Address: </span>
                FLASH STORAGE Door No.7, Plot No.102, Manirajan Street, Janaki Nagar, Alwarthirunagar, Valasaravakkam, Chennai, Tamil Nadu – 600087
              </span>
            </li>
            <li className="flex gap-3 items-center min-w-0 justify-center sm:justify-start text-left">
              <Phone
                className="h-4 w-4 text-primary shrink-0"
                aria-hidden="true"
                focusable="false"
              />
              <a
                href="tel:+919150011428"
                aria-label="Call us at +91 91500 11428"
                className={`hover:text-primary transition truncate ${focusRing}`}
              >
                +91 91500 11428
              </a>
            </li>
            <li className="flex gap-3 items-center min-w-0 justify-center sm:justify-start text-left">
              <Mail
                className="h-4 w-4 text-primary shrink-0"
                aria-hidden="true"
                focusable="false"
              />
              <a
                href="mailto:info@flashrenewable.com"
                aria-label="Email us at info@flashrenewable.com"
                className={`hover:text-primary transition break-all ${focusRing}`}
              >
                info@flashrenewable.com
              </a>
            </li>
            <li className="flex gap-3 items-center min-w-0 justify-center sm:justify-start text-left">
              <Globe
                className="h-4 w-4 text-primary shrink-0"
                aria-hidden="true"
                focusable="false"
              />
              <a
                href="https://www.flashrenewable.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit our website"
                className={`truncate hover:text-primary transition ${focusRing}`}
              >
                www.flashrenewable.com
              </a>
            </li>
          </ul>
        </address>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-3 text-xs text-white/60">
          <div className="space-y-1">
            <p>
              © {new Date().getFullYear()} Flash Renewable Energy Solutions Pvt. Ltd. All Rights
              Reserved.
            </p>
            <p className="text-[10px] text-white/40">
              CIN: U35105TN2026PTC193634 · PAN: AAHCF0584G · TAN: CHEF08522D
            </p>
          </div>
          <p className="hidden sm:block">Valasaravakkam, Chennai, Tamil Nadu · India</p>
        </div>
      </div>
    </footer>
  );
}

const emailSchema = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .email({ message: "Enter a valid email address" })
  .max(255, { message: "Email is too long" });

function NewsletterBand() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message ?? "Invalid email";
      setError(msg);
      // Move focus to the input so screen reader users land on the invalid field
      requestAnimationFrame(() => {
        const el = document.getElementById("newsletter-email") as HTMLInputElement | null;
        el?.focus();
      });
      return;
    }
    setError(null);
    setStatus("loading");
    const isDev = import.meta.env.DEV;
  const BACKEND_URL = isDev ? "http://localhost:4000" : "";
    const useBackend = Boolean(import.meta.env.VITE_BACKEND_URL);

    if (useBackend) {
      try {
        const res = await fetch(`${BACKEND_URL}/api/newsletter_subscribers`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email: parsed.data, active: true }),
        });
        if (!res.ok) {
          if (res.status === 500) {
            toast.success("Subscribed!", {
              description: "You're already in our list or subscribed successfully.",
            });
            setStatus("success");
            setEmail("");
            return;
          }
          const txt = await res.text();
          throw new Error(txt || `Request failed: ${res.status}`);
        }
      } catch (err: any) {
        setStatus("idle");
        setError(err.message);
        toast.error(err.message);
        return;
      }
    } else {
      setStatus("idle");
      setError("Local backend URL not configured.");
      toast.error("Local backend URL not configured.");
      return;
    }
    setStatus("success");
    setEmail("");
    toast.success("Subscribed!", {
      description: "You'll receive our latest solar updates and offers.",
    });
  };

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="border-b border-white/10 bg-gradient-to-r from-brand-navy-deep via-brand-navy to-brand-navy-deep"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12 grid gap-8 lg:gap-12 lg:grid-cols-2 items-center">
        <div>
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary">
            Stay Powered
          </span>
          <h3
            id="newsletter-heading"
            className="mt-3 font-display text-2xl md:text-3xl font-bold text-white leading-tight"
          >
            Get renewable energy insights, project updates & offers
          </h3>
          <p className="mt-2 text-sm md:text-base text-white/70 max-w-xl">
            Join our newsletter for monthly updates on solar innovations, subsidy news and exclusive
            offers from Flash Renewable Energy Solutions.
          </p>
        </div>

        {status === "success" ? (
          <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className="flex items-start gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-5 backdrop-blur-sm"
          >
            <CheckCircle2
              className="h-6 w-6 text-primary shrink-0 mt-0.5"
              aria-hidden="true"
              focusable="false"
            />
            <div>
              <p className="text-white font-semibold">
                <span className="sr-only">Success: </span>You're subscribed!
              </p>
              <p className="text-sm text-white/75 mt-1">
                Thanks for joining. Watch your inbox for our next update.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-3 text-xs font-semibold text-primary hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep rounded-sm"
              >
                Subscribe another email →
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 p-2 sm:rounded-full sm:border sm:border-white/15 sm:bg-white/5 sm:backdrop-blur-sm">
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                aria-invalid={!!error}
                aria-describedby={`${error ? "newsletter-error " : ""}newsletter-hint`}
                aria-errormessage={error ? "newsletter-error" : undefined}
                className="flex-1 bg-white/5 sm:bg-transparent border border-white/15 sm:border-0 rounded-full sm:rounded-none px-5 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:focus:ring-0"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                aria-label={
                  status === "loading" ? "Subscribing to newsletter" : "Subscribe to newsletter"
                }
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep"
              >
                <Send className="h-4 w-4" aria-hidden="true" focusable="false" />
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
            </div>
            {/* Always-mounted live region so assistive tech reliably announces validation errors */}
            <p
              id="newsletter-error"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
              className={`mt-2 pl-2 text-xs text-red-300 ${error ? "" : "sr-only"}`}
            >
              {error ? (
                <>
                  <span className="sr-only">Error: </span>
                  {error}
                </>
              ) : (
                ""
              )}
            </p>
            {/* Polite status region for loading state */}
            <p role="status" aria-live="polite" className="sr-only">
              {status === "loading" ? "Subscribing, please wait." : ""}
            </p>
            <p id="newsletter-hint" className="mt-3 pl-2 text-xs text-white/50">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

function FooterCol({
  title,
  items,
  navLabel,
}: {
  title: string;
  items: { label: string; href?: string; accent?: boolean }[];
  navLabel?: string;
}) {
  const headingId = `footer-col-${title.replace(/\s+/g, "-").toLowerCase()}`;
  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep rounded-sm";
  return (
    <nav aria-label={navLabel ?? title} aria-labelledby={headingId}>
      <h4
        id={headingId}
        className="text-white font-display font-semibold text-base mb-4 sm:mb-5 tracking-wide"
      >
        {title}
      </h4>
      <ul className="space-y-2.5 sm:space-y-3 text-sm">
        {items.map((it) =>
          it.href ? (
            <li key={it.label}>
              <Link
                to={it.href}
                className={
                  (it.accent
                    ? "text-primary hover:brightness-110"
                    : "text-white/70 hover:text-primary transition") +
                  " " +
                  focusRing
                }
              >
                {it.label}
              </Link>
            </li>
          ) : (
            <li key={it.label} className="text-white/70">
              {it.label}
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
