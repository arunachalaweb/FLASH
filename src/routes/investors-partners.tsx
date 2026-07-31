import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { useState } from "react";
import { toast } from "sonner";
import {
  TrendingUp,
  Handshake,
  ChevronRight,
  Shield,
  Zap,
  BarChart3,
  Globe,
  CheckCircle2,
  FileText,
  Users,
  Leaf,
  Award,
  ArrowRight,
  Phone,
  Mail,
  Building2,
  BadgeIndianRupee,
  ClipboardList,
  Scale,
  AlertTriangle,
} from "lucide-react";
import heroImg from "@/assets/hero-solar.jpg";
import industrialImg from "@/assets/service-industrial.jpg";
import epcImg from "@/assets/service-epc.jpg";

export const Route = createFileRoute("/investors-partners")({
  head: () => ({
    meta: [
      { title: "Investors & Partners | Flash Renewable Energy Solutions" },
      {
        name: "description",
        content:
          "Join Flash Renewable Energy Solutions as an investor or channel partner. Discover solar investment opportunities and partnership programs across India with industry-leading returns.",
      },
      { property: "og:title", content: "Investors & Partners | Flash Renewable Energy" },
      {
        property: "og:description",
        content: "Explore investor opportunities and channel partner programs with Flash Renewable Energy Solutions.",
      },
      { property: "og:url", content: "https://www.flashrenewable.com/investors-partners" },
    ],
    links: [{ rel: "canonical", href: "https://www.flashrenewable.com/investors-partners" }],
  }),
  component: InvestorsPartnersPage,
});

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "₹50Cr+", label: "Capital Deployed" },
  { value: "500+", label: "Projects Delivered" },
  { value: "18–22%", label: "Avg. IRR for Investors" },
  { value: "12+", label: "Active Partner States" },
];

// ─── Investor Benefits ─────────────────────────────────────────────────────────
const INVESTOR_BENEFITS = [
  {
    Icon: BarChart3,
    title: "High-Yield Returns",
    desc: "Achieve 18–22% IRR on solar infrastructure projects backed by Power Purchase Agreements (PPAs) and government-backed schemes.",
  },
  {
    Icon: Shield,
    title: "Secured Investments",
    desc: "All projects are structured with asset-backed security, DISCOM tie-ups, and insurance cover, minimising downside risk.",
  },
  {
    Icon: Zap,
    title: "Accelerated Depreciation",
    desc: "Investors enjoy up to 40% accelerated depreciation under Indian tax law, significantly reducing effective tax liability.",
  },
  {
    Icon: Leaf,
    title: "ESG & Green Credits",
    desc: "Gain Carbon Credit eligibility and ESG reporting benefits by funding certified renewable energy assets.",
  },
  {
    Icon: Globe,
    title: "100% FDI Permitted",
    desc: "Foreign investors can participate via the automatic route — no prior government approval required for renewable energy projects.",
  },
  {
    Icon: Award,
    title: "MNRE-Compliant Projects",
    desc: "All Flash projects are executed under Ministry of New and Renewable Energy (MNRE) guidelines, ensuring regulatory compliance.",
  },
];

// ─── Partner Benefits ──────────────────────────────────────────────────────────
const PARTNER_BENEFITS = [
  {
    Icon: BadgeIndianRupee,
    title: "Lucrative Commissions",
    desc: "Earn competitive project-based commissions (typically 2–5% of project value) on every successfully closed deal you refer or manage.",
  },
  {
    Icon: Users,
    title: "Dedicated Support",
    desc: "Access a dedicated relationship manager, technical training, proposal tools, and co-branded marketing collateral.",
  },
  {
    Icon: Building2,
    title: "Territorial Rights",
    desc: "Get exclusive or preferred rights in your district/region, preventing channel conflicts and protecting your pipeline.",
  },
  {
    Icon: ClipboardList,
    title: "Lead Management",
    desc: "Our Partner Portal gives you real-time visibility of lead status, site assessments, and project milestones.",
  },
  {
    Icon: FileText,
    title: "Documentation Support",
    desc: "We handle DISCOM applications, MNRE subsidy paperwork, and net-metering documentation on your behalf.",
  },
  {
    Icon: TrendingUp,
    title: "Performance Incentives",
    desc: "Top-performing partners receive quarterly bonuses, priority project allocation, and co-investment opportunities.",
  },
];

// ─── T&C Sections ──────────────────────────────────────────────────────────────
const INVESTOR_TNC = [
  {
    title: "1. Eligibility",
    body: "Any individual, HUF, corporate body, trust, or foreign entity permitted under applicable Indian laws and FEMA regulations may apply. Minimum investment threshold is ₹25 Lakhs per project tranche unless specified otherwise.",
  },
  {
    title: "2. Investment Structure",
    body: "Investments may be structured as Equity, Mezzanine Debt, or Non-Convertible Debentures (NCDs) as mutually agreed. Return projections are indicative and subject to site assessment, DISCOM approval, and grid conditions.",
  },
  {
    title: "3. Risk Disclosure",
    body: "Solar energy investments carry inherent risks including irradiation variability, regulatory changes, DISCOM offtake delays, and grid curtailment. Flash Renewable provides audited project reports but does not guarantee fixed returns.",
  },
  {
    title: "4. Confidentiality",
    body: "All financial models, project data, and deal structures shared with prospective investors are strictly confidential and protected under a Non-Disclosure Agreement (NDA) signed prior to due diligence.",
  },
  {
    title: "5. Governing Law",
    body: "All investment agreements are governed by the laws of India. Disputes shall be settled by arbitration under the Arbitration and Conciliation Act, 1996, with Chennai, Tamil Nadu as the seat of arbitration.",
  },
  {
    title: "6. Regulatory Compliance",
    body: "Investors are responsible for ensuring their participation complies with SEBI, RBI (FEMA for overseas investors), and applicable state regulations. Flash Renewable is not liable for individual investor tax obligations.",
  },
];

const PARTNER_TNC = [
  {
    title: "1. Onboarding Requirements",
    body: "Partners must provide valid GST registration, PAN card, business proof (Proprietorship/LLP/Pvt. Ltd.), and a valid Electrical Contractor License (where installation services are rendered). MSME/Udyam registration is preferred.",
  },
  {
    title: "2. Scope of Work",
    body: "Channel Partners are responsible for lead generation, site feasibility coordination, and customer relationship management within their designated territory. Technical installation (where applicable) must comply with IS/IEC standards and MNRE guidelines.",
  },
  {
    title: "3. Commission & Payment",
    body: "Commissions are disbursed within 30 days of project milestone achievement (typically 50% on agreement sign-off and 50% on system commissioning). Payments are subject to TDS deduction as per applicable Income Tax rates.",
  },
  {
    title: "4. Non-Solicitation & Exclusivity",
    body: "Partners must not directly or indirectly solicit Flash's customers or subcontract work to competing solar EPC firms during the agreement term and for 12 months post-termination.",
  },
  {
    title: "5. Quality & Compliance",
    body: "Partners must ensure all customer-facing communications are accurate and not misleading. Misrepresentation of Flash's pricing, subsidies, or technical capabilities may result in immediate termination and recovery of advances.",
  },
  {
    title: "6. Term & Termination",
    body: "Agreements are valid for 12 months and renewable annually upon performance review. Either party may terminate with 30 days' written notice. Immediate termination applies in cases of fraud, regulatory violation, or reputational harm.",
  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
function InvestorsPartnersPage() {
  const [activeTab, setActiveTab] = useState<"investor" | "partner">("investor");

  return (
    <div className="bg-background text-foreground font-sans">
      <Header overlay />

      {/* ── HERO ── */}
      <section className="relative min-h-[520px] md:min-h-[600px] overflow-hidden flex items-end pb-20 pt-[160px] md:pt-[200px]">
        <img
          src={heroImg}
          alt="Solar investment landscape"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/95 via-brand-navy-deep/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/80 via-transparent to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 md:px-6 w-full">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-[0.15em] uppercase text-primary backdrop-blur-sm mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Now Accepting Applications
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl">
            Grow Together with{" "}
            <span className="bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent">
              Solar's Fastest-Rising
            </span>{" "}
            EPC Company
          </h1>
          <p className="mt-5 text-white/75 max-w-2xl text-base md:text-lg leading-relaxed">
            Whether you're deploying capital for superior returns or building a business on clean energy — Flash
            Renewable Energy Solutions offers structured, transparent, and rewarding programmes designed for your goals.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={() => {
                setActiveTab("investor");
                document.getElementById("apply-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition shadow-lg shadow-primary/30"
            >
              <TrendingUp className="h-4 w-4" />
              I'm an Investor
            </button>
            <button
              onClick={() => {
                setActiveTab("partner");
                document.getElementById("apply-section")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition backdrop-blur-sm"
            >
              <Handshake className="h-4 w-4" />
              I'm a Partner
            </button>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-brand-navy-deep border-y border-white/10">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center py-8 px-4 text-center">
              <span className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-brand-gold bg-clip-text text-transparent">
                {value}
              </span>
              <span className="mt-1 text-xs text-white/60 tracking-wide uppercase">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY INVEST / PARTNER SECTION ── */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-16">
            <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">Why Flash?</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy leading-tight">
              Two Programmes. One Mission.
            </h2>
            <p className="mt-4 text-foreground/60 max-w-2xl mx-auto">
              Flash Renewable Energy Solutions powers India's clean energy transition — and we invite you to be part of
              it, on your own terms.
            </p>
          </div>

          {/* Two-column cards */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Investor Card */}
            <div className="relative rounded-3xl overflow-hidden border border-brand-navy/10 bg-gradient-to-br from-brand-navy-deep to-brand-navy shadow-2xl text-white">
              <img
                src={industrialImg}
                alt="Solar investment"
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="relative p-8 md:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/40 px-4 py-1.5 text-xs font-semibold text-primary mb-6">
                  <TrendingUp className="h-3 w-3" /> Investor Programme
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">Deploy Capital. Earn Green.</h3>
                <p className="text-white/70 mb-8 leading-relaxed">
                  Invest in MNRE-compliant solar assets across residential, commercial, and utility segments with
                  structured returns, asset security, and ESG benefits.
                </p>
                <div className="space-y-3">
                  {INVESTOR_BENEFITS.map(({ Icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex items-start gap-4 rounded-xl bg-white/5 border border-white/10 p-4 hover:bg-white/10 transition"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-white text-sm">{title}</p>
                        <p className="text-white/60 text-xs mt-1 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setActiveTab("investor");
                    document.getElementById("apply-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 transition"
                >
                  Apply as Investor <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Partner Card */}
            <div className="relative rounded-3xl overflow-hidden border border-primary/20 bg-gradient-to-br from-primary/5 to-brand-gold/5 shadow-xl">
              <img
                src={epcImg}
                alt="Solar partnership"
                className="absolute inset-0 w-full h-full object-cover opacity-10"
              />
              <div className="relative p-8 md:p-10">
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-navy/10 border border-brand-navy/20 px-4 py-1.5 text-xs font-semibold text-brand-navy mb-6">
                  <Handshake className="h-3 w-3" /> Channel Partner Programme
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-brand-navy mb-4">
                  Build a Business. Build a Future.
                </h3>
                <p className="text-foreground/65 mb-8 leading-relaxed">
                  Become an authorised Flash Channel Partner — source solar leads, close deals with our technical
                  support, and earn competitive commissions on every project.
                </p>
                <div className="space-y-3">
                  {PARTNER_BENEFITS.map(({ Icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex items-start gap-4 rounded-xl bg-white border border-brand-navy/10 p-4 hover:shadow-md hover:border-primary/30 transition"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-navy to-brand-navy-deep text-white">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="font-semibold text-brand-navy text-sm">{title}</p>
                        <p className="text-foreground/55 text-xs mt-1 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setActiveTab("partner");
                    document.getElementById("apply-section")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white hover:bg-brand-navy-deep transition"
                >
                  Apply as Partner <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS STEPS ── */}
      <section className="py-20 bg-brand-navy-deep">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">How It Works</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white">Simple. Transparent. Fast.</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Submit Application", desc: "Fill the form below with your details and intent." },
              { step: "02", title: "Discovery Call", desc: "Our team schedules a 30-min consultation within 48 hours." },
              {
                step: "03",
                title: "Due Diligence",
                desc: "We share project data, financial models, or partner agreements for review.",
              },
              { step: "04", title: "Onboard & Begin", desc: "Sign agreements, get onboarded, and start earning." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="relative flex flex-col items-center text-center">
                <span className="font-display text-6xl font-black text-white/5 leading-none select-none absolute -top-2 left-1/2 -translate-x-1/2">
                  {step}
                </span>
                <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep font-bold text-lg font-display shadow-lg shadow-primary/40 mb-4">
                  {step}
                </div>
                <h4 className="font-display font-semibold text-white mb-2">{title}</h4>
                <p className="text-white/55 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORMS ── */}
      <section id="apply-section" className="py-24 bg-background scroll-mt-20">
        <div className="mx-auto max-w-5xl px-4 md:px-6">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">Apply Now</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy">
              Choose Your Path with Flash
            </h2>
            <p className="mt-3 text-foreground/60 max-w-xl mx-auto">
              Select the programme that matches your goals and submit your expression of interest below.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center rounded-full bg-brand-navy-deep/5 border border-brand-navy/10 p-1.5 gap-1">
              <button
                id="tab-investor"
                role="tab"
                aria-selected={activeTab === "investor"}
                aria-controls="form-investor"
                onClick={() => setActiveTab("investor")}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  activeTab === "investor"
                    ? "bg-brand-navy-deep text-white shadow-md"
                    : "text-foreground/60 hover:text-brand-navy"
                }`}
              >
                <TrendingUp className="h-4 w-4" />
                Investor Enquiry
              </button>
              <button
                id="tab-partner"
                role="tab"
                aria-selected={activeTab === "partner"}
                aria-controls="form-partner"
                onClick={() => setActiveTab("partner")}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition ${
                  activeTab === "partner"
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                    : "text-foreground/60 hover:text-primary"
                }`}
              >
                <Handshake className="h-4 w-4" />
                Partner Application
              </button>
            </div>
          </div>

          {/* Forms */}
          <div className="rounded-3xl border border-brand-navy/10 bg-white shadow-2xl shadow-brand-navy/5 overflow-hidden">
            {activeTab === "investor" ? <InvestorForm /> : <PartnerForm />}
          </div>
        </div>
      </section>

      {/* ── TERMS & CONDITIONS ── */}
      <section className="py-24 bg-gradient-to-br from-brand-navy-deep/5 via-background to-primary/5">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="text-center mb-14">
            <Scale className="mx-auto h-10 w-10 text-primary mb-4" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-brand-navy">Terms & Conditions</h2>
            <p className="mt-3 text-foreground/60 max-w-xl mx-auto text-sm">
              Please review the applicable terms for your programme. All engagement is subject to formal written
              agreements reviewed by both parties.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Investor T&C */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-navy-deep text-primary">
                  <TrendingUp className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold text-brand-navy">Investor Programme — T&C</h3>
              </div>
              <div className="space-y-4">
                {INVESTOR_TNC.map(({ title, body }) => (
                  <details
                    key={title}
                    className="group rounded-xl border border-brand-navy/10 bg-white overflow-hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-brand-navy text-sm select-none list-none">
                      {title}
                      <ChevronRight className="h-4 w-4 text-primary transition-transform group-open:rotate-90 shrink-0 ml-3" />
                    </summary>
                    <div className="border-t border-brand-navy/5 px-5 py-4 text-sm text-foreground/65 leading-relaxed">
                      {body}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* Partner T&C */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Handshake className="h-5 w-5" />
                </span>
                <h3 className="font-display text-xl font-bold text-brand-navy">Channel Partner Programme — T&C</h3>
              </div>
              <div className="space-y-4">
                {PARTNER_TNC.map(({ title, body }) => (
                  <details
                    key={title}
                    className="group rounded-xl border border-primary/15 bg-white overflow-hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-brand-navy text-sm select-none list-none">
                      {title}
                      <ChevronRight className="h-4 w-4 text-primary transition-transform group-open:rotate-90 shrink-0 ml-3" />
                    </summary>
                    <div className="border-t border-primary/10 px-5 py-4 text-sm text-foreground/65 leading-relaxed">
                      {body}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-10 flex items-start gap-4 rounded-2xl border border-amber-400/30 bg-amber-50/60 p-5">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800/80 leading-relaxed">
              <strong>Disclaimer:</strong> The above terms are indicative and for informational purposes only. Final
              agreements may vary based on project-specific conditions. Flash Renewable Energy Solutions Pvt. Ltd.
              (CIN: U35105TN2026PTC193634) strongly recommends that all parties seek independent legal and financial
              advice before entering into any binding agreement.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="py-16 bg-brand-navy-deep">
        <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
            Have questions before applying?
          </h2>
          <p className="text-white/65 mb-8 max-w-xl mx-auto">
            Our investment and partner relations team is available Mon–Sat, 9 AM – 6 PM IST.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+919150011428"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
            >
              <Phone className="h-4 w-4 text-primary" />
              +91 91500 11428
            </a>
            <a
              href="mailto:partners@flashrenewable.com"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 transition shadow-lg shadow-primary/30"
            >
              <Mail className="h-4 w-4" />
              partners@flashrenewable.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ─── Investor Form ─────────────────────────────────────────────────────────────
function InvestorForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    organisation: "",
    investmentRange: "",
    investmentType: "",
    timeline: "",
    message: "",
    agreeTerms: false,
  });

  const isDev = import.meta.env.DEV;
  const BACKEND_URL = isDev ? "http://localhost:4000" : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/investor_enquiries`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          organisation: form.organisation,
          investment_range: form.investmentRange,
          investment_type: form.investmentType,
          timeline: form.timeline,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Submission failed. Please try again.");
      }
      setSubmitted(true);
      toast.success("Enquiry submitted!", {
        description: "We'll contact you within 2 business days.",
      });
    } catch (err: any) {
      toast.error(err.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-brand-navy/15 bg-brand-navy-deep/3 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition";
  const labelClass = "block text-xs font-semibold text-brand-navy/70 uppercase tracking-wide mb-1.5";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 mb-6">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-navy mb-3">Application Received!</h3>
        <p className="text-foreground/60 max-w-md">
          Thank you for your interest in investing with Flash Renewable. Our investment relations team will contact you
          within 2 business days.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-primary font-semibold hover:underline"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <div id="form-investor" role="tabpanel" aria-labelledby="tab-investor">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-brand-navy-deep to-brand-navy px-8 py-6 md:px-10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/20 text-primary border border-primary/30">
            <TrendingUp className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold text-white">Investor Enquiry Form</h3>
            <p className="text-white/55 text-xs mt-0.5">
              All information is kept strictly confidential under NDA
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="inv-name" className={labelClass}>Full Name *</label>
            <input
              id="inv-name"
              type="text"
              required
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="inv-email" className={labelClass}>Email Address *</label>
            <input
              id="inv-email"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="inv-phone" className={labelClass}>Phone Number *</label>
            <input
              id="inv-phone"
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="inv-org" className={labelClass}>Organisation / Company</label>
            <input
              id="inv-org"
              type="text"
              placeholder="Company name (if applicable)"
              value={form.organisation}
              onChange={(e) => setForm({ ...form, organisation: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="inv-range" className={labelClass}>Investment Range *</label>
            <select
              id="inv-range"
              required
              value={form.investmentRange}
              onChange={(e) => setForm({ ...form, investmentRange: e.target.value })}
              className={inputClass}
            >
              <option value="" disabled>Select range</option>
              <option>₹25 Lakhs – ₹1 Crore</option>
              <option>₹1 Crore – ₹5 Crore</option>
              <option>₹5 Crore – ₹25 Crore</option>
              <option>₹25 Crore+</option>
            </select>
          </div>
          <div>
            <label htmlFor="inv-type" className={labelClass}>Preferred Investment Type *</label>
            <select
              id="inv-type"
              required
              value={form.investmentType}
              onChange={(e) => setForm({ ...form, investmentType: e.target.value })}
              className={inputClass}
            >
              <option value="" disabled>Select type</option>
              <option>Equity Investment</option>
              <option>Mezzanine / Debt</option>
              <option>Non-Convertible Debentures (NCDs)</option>
              <option>Joint Venture</option>
              <option>Not yet decided</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="inv-timeline" className={labelClass}>Investment Timeline</label>
            <select
              id="inv-timeline"
              value={form.timeline}
              onChange={(e) => setForm({ ...form, timeline: e.target.value })}
              className={inputClass}
            >
              <option value="" disabled>Select timeline</option>
              <option>Immediately (within 1 month)</option>
              <option>1–3 months</option>
              <option>3–6 months</option>
              <option>6 months+</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="inv-msg" className={labelClass}>Additional Notes</label>
          <textarea
            id="inv-msg"
            rows={4}
            placeholder="Tell us about your investment goals, sector preferences, or any questions..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={inputClass + " resize-none"}
          />
        </div>

        {/* T&C Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            required
            checked={form.agreeTerms}
            onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-brand-navy/30 text-primary focus:ring-primary cursor-pointer"
          />
          <span className="text-xs text-foreground/60 leading-relaxed">
            I have read and agree to the{" "}
            <button
              type="button"
              onClick={() => document.querySelector("[data-tnc]")?.scrollIntoView({ behavior: "smooth" })}
              className="text-primary font-semibold hover:underline"
            >
              Investor Programme Terms & Conditions
            </button>{" "}
            and consent to Flash Renewable Energy Solutions contacting me regarding investment opportunities.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-brand-navy-deep to-brand-navy py-4 text-sm font-bold text-white hover:brightness-110 transition shadow-lg shadow-brand-navy/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <TrendingUp className="h-4 w-4" />
          {loading ? "Submitting…" : "Submit Investor Enquiry"}
        </button>

        <p className="text-center text-xs text-foreground/40 flex items-center justify-center gap-1.5">
          <Shield className="h-3 w-3" />
          Your data is protected and will not be shared with third parties.
        </p>
      </form>
    </div>
  );
}

// ─── Partner Form ──────────────────────────────────────────────────────────────
function PartnerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    businessType: "",
    state: "",
    district: "",
    experience: "",
    partnerType: "",
    message: "",
    agreeTerms: false,
  });

  const isDev = import.meta.env.DEV;
  const BACKEND_URL = isDev ? "http://localhost:4000" : "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/partner_applications`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          business_name: form.business,
          business_type: form.businessType,
          partner_type: form.partnerType,
          state: form.state,
          district: form.district,
          experience: form.experience,
          message: form.message,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Submission failed. Please try again.");
      }
      setSubmitted(true);
      toast.success("Application submitted!", {
        description: "Our partner relations team will reach out within 48 hours.",
      });
    } catch (err: any) {
      toast.error(err.message || "Submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-primary/20 bg-primary/3 px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition";
  const labelClass = "block text-xs font-semibold text-brand-navy/70 uppercase tracking-wide mb-1.5";

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <div className="grid h-20 w-20 place-items-center rounded-full bg-primary/10 mb-6">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h3 className="font-display text-2xl font-bold text-brand-navy mb-3">Application Submitted!</h3>
        <p className="text-foreground/60 max-w-md">
          Thank you for applying to the Flash Channel Partner Programme. Our partner relations team will reach out
          within 48 hours to schedule an onboarding call.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-primary font-semibold hover:underline"
        >
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <div id="form-partner" role="tabpanel" aria-labelledby="tab-partner">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-primary to-brand-gold px-8 py-6 md:px-10">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/20 text-white border border-white/30">
            <Handshake className="h-5 w-5" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold text-primary-foreground">Channel Partner Application</h3>
            <p className="text-white/75 text-xs mt-0.5">Join 150+ active partners across India</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-10 space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="par-name" className={labelClass}>Full Name *</label>
            <input
              id="par-name"
              type="text"
              required
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="par-email" className={labelClass}>Email Address *</label>
            <input
              id="par-email"
              type="email"
              required
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="par-phone" className={labelClass}>Phone Number *</label>
            <input
              id="par-phone"
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="par-biz" className={labelClass}>Business Name *</label>
            <input
              id="par-biz"
              type="text"
              required
              placeholder="Registered business name"
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="par-btype" className={labelClass}>Business Type *</label>
            <select
              id="par-btype"
              required
              value={form.businessType}
              onChange={(e) => setForm({ ...form, businessType: e.target.value })}
              className={inputClass}
            >
              <option value="" disabled>Select type</option>
              <option>Proprietorship</option>
              <option>Partnership Firm</option>
              <option>LLP</option>
              <option>Private Limited</option>
              <option>Individual / Freelancer</option>
            </select>
          </div>
          <div>
            <label htmlFor="par-ptype" className={labelClass}>Partner Type *</label>
            <select
              id="par-ptype"
              required
              value={form.partnerType}
              onChange={(e) => setForm({ ...form, partnerType: e.target.value })}
              className={inputClass}
            >
              <option value="" disabled>Select role</option>
              <option>Sales / Referral Partner</option>
              <option>Installation / Technical Partner</option>
              <option>Distribution Partner</option>
              <option>Turnkey EPC Sub-Partner</option>
            </select>
          </div>
          <div>
            <label htmlFor="par-state" className={labelClass}>Operating State *</label>
            <input
              id="par-state"
              type="text"
              required
              placeholder="e.g. Tamil Nadu"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="par-dist" className={labelClass}>District / City *</label>
            <input
              id="par-dist"
              type="text"
              required
              placeholder="e.g. Chennai"
              value={form.district}
              onChange={(e) => setForm({ ...form, district: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="par-exp" className={labelClass}>Solar Industry Experience</label>
            <select
              id="par-exp"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              className={inputClass}
            >
              <option value="" disabled>Select experience</option>
              <option>No prior experience (willing to learn)</option>
              <option>Less than 1 year</option>
              <option>1–3 years</option>
              <option>3–5 years</option>
              <option>5+ years</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="par-msg" className={labelClass}>Tell us about yourself</label>
          <textarea
            id="par-msg"
            rows={4}
            placeholder="Describe your network, target customer segment, and why you want to partner with Flash..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Requirements checklist */}
        <div className="rounded-xl border border-primary/15 bg-primary/5 p-5">
          <p className="text-xs font-bold text-brand-navy/80 uppercase tracking-wide mb-3 flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-primary" />
            Required Documents at Onboarding
          </p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {["GST Registration Certificate", "PAN Card", "Business Registration Proof", "Bank Account Details (Cancelled Cheque)", "MSME / Udyam Certificate (preferred)", "Electrical Contractor License (if applicable)"].map((doc) => (
              <li key={doc} className="flex items-center gap-2 text-xs text-foreground/65">
                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                {doc}
              </li>
            ))}
          </ul>
        </div>

        {/* T&C Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.agreeTerms}
            onChange={(e) => setForm({ ...form, agreeTerms: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-primary/30 text-primary focus:ring-primary cursor-pointer"
          />
          <span className="text-xs text-foreground/60 leading-relaxed">
            I have read and agree to the{" "}
            <span className="text-primary font-semibold cursor-pointer hover:underline">
              Channel Partner Programme Terms & Conditions
            </span>{" "}
            and confirm that all information provided is accurate and complete.
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-gradient-to-r from-primary to-brand-gold py-4 text-sm font-bold text-primary-foreground hover:brightness-110 transition shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Handshake className="h-4 w-4" />
          {loading ? "Submitting…" : "Submit Partner Application"}
        </button>

        <p className="text-center text-xs text-foreground/40 flex items-center justify-center gap-1.5">
          <Shield className="h-3 w-3" />
          Your data is protected and will not be shared with third parties.
        </p>
      </form>
    </div>
  );
}
