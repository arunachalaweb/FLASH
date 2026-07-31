import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { ShieldCheck, Truck, Wrench, ChevronRight, Zap, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Solar System Packages | FLASH" },
      { name: "description", content: "Explore complete solar panel packages (1kW to 10kW On-grid, Hybrid, Water Pumps) with full delivery and installation." },
    ],
  }),
  component: SolarPackagesPage,
});

interface SolarPackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
  features: string; // JSON array
}

function SolarPackagesPage() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<SolarPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPackages() {
      try {
        const isDev = import.meta.env.DEV;
        const BACKEND_URL = isDev ? "http://localhost:4000" : "";
        const res = await fetch(`${BACKEND_URL}/api/solar_packages`);
        const data = await res.json();
        setPackages(data || []);
      } catch (err) {
        console.error("Failed to fetch solar packages:", err);
      } finally {
        setLoading(false);
      }
    }
    loadPackages();
  }, []);

  const handleEnquire = (pkg: SolarPackage) => {
    localStorage.setItem("enquiry_preset_package_id", pkg.id);
    localStorage.setItem("enquiry_preset_package_name", pkg.name);
    navigate({ to: "/enquiry" });
  };

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col justify-between">
      <div>
        <Header overlay />
        <PageHero
          title="Turnkey Solar Packages"
          crumb="Solar Packages"
          tagline="Ready-made solar systems designed for households, industrial facilities, and solar water pumps."
        />

        <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Core Perks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-border p-6 rounded-3xl flex items-start gap-4 shadow-sm">
              <div className="bg-primary/20 p-3 rounded-2xl text-brand-navy-deep">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-brand-navy">5-Year EPC Warranty</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Complete system performance assurance with proactive annual service checks.</p>
              </div>
            </div>

            <div className="bg-white border border-border p-6 rounded-3xl flex items-start gap-4 shadow-sm">
              <div className="bg-primary/20 p-3 rounded-2xl text-brand-navy-deep">
                <Wrench className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-brand-navy">Turnkey Installation</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Civil foundations, earthing, ACDB/DCDB boxes wiring, and DISCOM meter coordination handled by us.</p>
              </div>
            </div>

            <div className="bg-white border border-border p-6 rounded-3xl flex items-start gap-4 shadow-sm">
              <div className="bg-primary/20 p-3 rounded-2xl text-brand-navy-deep">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-brand-navy">Subsidy & Net-Metering</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Assistance with direct state and national government solar rooftop subsidy claims.</p>
              </div>
            </div>
          </div>

          {/* Packages Grid */}
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.map((pkg) => {
                const featuresList = JSON.parse(pkg.features || "[]");
                return (
                  <div key={pkg.id} className="bg-white border border-border rounded-3xl overflow-hidden flex flex-col h-full hover:border-primary/40 transition group shadow-[0_10px_35px_-15px_hsl(var(--brand-navy)/0.12)]">
                    <div className="aspect-video bg-slate-950 overflow-hidden relative">
                      <img src={pkg.image_url} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-103 transition duration-500" />
                      <div className="absolute top-4 right-4 bg-primary text-slate-900 px-3 py-1 rounded-full font-black text-xs">
                        Popular Kit
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1 space-y-6">
                      <div>
                        <h3 className="text-lg font-black text-brand-navy group-hover:text-primary transition">{pkg.name}</h3>
                        <p className="text-slate-550 text-xs mt-2 leading-relaxed">{pkg.description}</p>
                      </div>

                      <div className="space-y-2.5 flex-1 border-t border-slate-50 pt-4">
                        <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">What's Included</span>
                        {featuresList.map((feat: string, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-655">
                            <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] text-slate-450 block uppercase font-bold">Estimated Investment</span>
                          <span className="text-lg font-black font-mono text-slate-850">₹{pkg.price.toLocaleString("en-IN")}*</span>
                        </div>
                        <button
                          onClick={() => handleEnquire(pkg)}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep text-xs font-bold rounded-xl shadow-sm hover:shadow-md transition"
                        >
                          Enquire Package <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
