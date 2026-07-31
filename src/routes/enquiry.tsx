import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Zap, HelpCircle, CheckCircle, FileText, UploadCloud, ShieldCheck, Sun, CheckCircle2, PhoneCall, Award, Users } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Solar Feasibility & Consultation Enquiry | FLASH" },
      { name: "description", content: "Request a custom solar rooftop design quotation. Provide bill details, usage, and rooftop parameters." },
    ],
  }),
  component: SolarEnquiryFormPage,
});

function SolarEnquiryFormPage() {
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [requiredCapacity, setRequiredCapacity] = useState("3kW");
  const [usageType, setUsageType] = useState("residential");
  const [monthlyBill, setMonthlyBill] = useState("");
  const [roofType, setRoofType] = useState("concrete");
  const [installationReq, setInstallationReq] = useState(true);
  const [message, setMessage] = useState("");
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Preset package linkage
  const [presetPackageId, setPresetPackageId] = useState<string | null>(null);
  const [presetPackageName, setPresetPackageName] = useState<string | null>(null);

  useEffect(() => {
    const pkgId = localStorage.getItem("enquiry_preset_package_id");
    const pkgName = localStorage.getItem("enquiry_preset_package_name");
    if (pkgId && pkgName) {
      setPresetPackageId(pkgId);
      setPresetPackageName(pkgName);
      setRequiredCapacity(pkgName.split(" ")[0] || "3kW");
      
      // Clean storage
      localStorage.removeItem("enquiry_preset_package_id");
      localStorage.removeItem("enquiry_preset_package_name");
    }

    // Prefill user details if logged in
    const customer = localStorage.getItem("customer_user");
    if (customer) {
      try {
        const user = JSON.parse(customer);
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
      } catch (e) {}
    }
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const isDev = import.meta.env.DEV;
      const BACKEND_URL = isDev ? "http://localhost:4000" : "";
      
      const res = await fetch(`${BACKEND_URL}/api/upload`, {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "File upload failed");
      
      setUploadedUrl(data.url);
      toast.success("Electricity bill copy / document uploaded successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload file");
    } finally {
      setUploading(false);
    }
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const customerToken = localStorage.getItem("customer_token");
    const isDev = import.meta.env.DEV;
    const BACKEND_URL = isDev ? "http://localhost:4000" : "";

    const payload = {
      name,
      phone,
      email,
      location,
      required_capacity: requiredCapacity,
      usage_type: usageType,
      monthly_bill: monthlyBill,
      roof_type: roofType,
      installation_req: installationReq,
      message: presetPackageName 
        ? `Requesting turnkey install package: ${presetPackageName}. Detail: ${message}`
        : message,
      file_url: uploadedUrl || undefined,
      package_id: presetPackageId || undefined
    };

    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (customerToken) {
        headers["Authorization"] = `Bearer ${customerToken}`;
      }

      const res = await fetch(`${BACKEND_URL}/api/solar_enquiries`, {
        method: "POST",
        headers,
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Enquiry submission failed");

      setCompleted(true);
      toast.success("Solar consultation enquiry submitted successfully!");
    } catch (err: any) {
      toast.error(err.message || "Enquiry submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (completed) {
    return (
      <div className="bg-background text-foreground min-h-screen flex flex-col justify-between font-sans">
        <Header overlay />
        <main className="py-20 max-w-xl mx-auto px-4 text-center space-y-6">
          <CheckCircle className="h-20 w-20 text-primary mx-auto" />
          <h1 className="text-3xl font-black text-brand-navy">Consultation Registered!</h1>
          <p className="text-slate-550 leading-relaxed text-sm">
            Your feasibility data and bill copy has been successfully logged. Our engineers are reviewing your roof capacity parameters and will compile a custom itemized PDF quotation shortly.
          </p>
          <div className="pt-6">
            <Link to="/products" className="px-6 py-3 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep font-bold rounded-full transition shadow-lg">
              Return to Catalog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col justify-between">
      <div>
        <Header overlay />
        <PageHero
          title="Feasibility Consultation"
          crumb="Feasibility Consultation"
          tagline="Submit your site requirements, average bill rates, and roof characteristics to receive a customized solar proposal."
        />

        <main className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Highly informative guidelines cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-brand-navy-deep text-white p-6 sm:p-8 rounded-3xl space-y-6 shadow-lg relative overflow-hidden">
                <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-primary/20 blur-2xl" />
                <h3 className="font-display text-xl font-bold flex items-center gap-2 text-primary">
                  <Sun className="h-5 w-5" /> Rooftop Feasibility Guidelines
                </h3>
                <p className="text-xs text-white/70 leading-relaxed">
                  We check your local DISCOM feeder capacity and shadow-free roof area measurements to design your optimized structure.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex gap-3">
                    <span className="h-6 w-6 shrink-0 rounded-full bg-primary/25 text-primary grid place-items-center font-bold text-xs">1</span>
                    <div>
                      <h4 className="text-xs font-bold">DISCOM Feeder Checks</h4>
                      <p className="text-[10px] text-white/50 mt-0.5">We check standard solar net-metering grid injection parameters in Vellore / Chennai zones.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="h-6 w-6 shrink-0 rounded-full bg-primary/25 text-primary grid place-items-center font-bold text-xs">2</span>
                    <div>
                      <h4 className="text-xs font-bold">Shadow-Free Space Analysis</h4>
                      <p className="text-[10px] text-white/50 mt-0.5">Concrete slab roof require approx 100 sq.ft per 1kW solar panels structure installation.</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="h-6 w-6 shrink-0 rounded-full bg-primary/25 text-primary grid place-items-center font-bold text-xs">3</span>
                    <div>
                      <h4 className="text-xs font-bold">Payback Timelines</h4>
                      <p className="text-[10px] text-white/50 mt-0.5">On-grid systems yield full investment payback inside 3.5 to 4.5 years with 25-yr warranties.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subsidy Info Table */}
              <div className="bg-slate-50 border border-border p-6 rounded-3xl space-y-4 shadow-sm">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-primary" /> National Subsidy Structure
                </h4>
                <div className="space-y-2 text-xs text-slate-655">
                  <div className="flex justify-between border-b pb-1">
                    <span>1 kW to 2 kW Systems</span>
                    <span className="font-mono font-bold text-brand-navy">₹18,000 / kW</span>
                  </div>
                  <div className="flex justify-between border-b pb-1">
                    <span>3 kW System</span>
                    <span className="font-mono font-bold text-brand-navy">₹54,000 Flat</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Above 3 kW to 10 kW</span>
                    <span className="font-mono font-bold text-brand-navy">Max ₹78,000 Cap</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-400">Note: Applicable only for grid-connected residential rooftop solar under PM-Surya Ghar program.</p>
              </div>

              {/* Contact Info Block */}
              <div className="bg-white border border-border p-6 rounded-3xl flex items-center justify-between shadow-sm">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Need Immediate Help?</h4>
                  <p className="text-[10px] text-slate-500 mt-1">Talk to our project manager directly.</p>
                </div>
                <a
                  href="tel:+919150011428"
                  className="inline-flex items-center gap-1.5 text-xs bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl transition"
                >
                  <PhoneCall className="h-3.5 w-3.5" /> Call +91 91500
                </a>
              </div>
            </div>

            {/* Right Column: Custom styled Consultation Form */}
            <div className="lg:col-span-7">
              <form 
                onSubmit={handleEnquirySubmit} 
                className="relative rounded-2xl overflow-hidden border border-white/10 bg-brand-navy-deep p-6 md:p-8 text-white shadow-[0_25px_60px_-25px_hsl(var(--primary)/0.4)]"
              >
                <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
                <div className="relative space-y-6">
                  
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold">Rooftop Consultation Setup</h3>
                    <p className="text-xs text-white/60 mt-1">Provide your details to receive an itemized civil and solar hardware quote.</p>
                  </div>

                  {presetPackageName && (
                    <div className="bg-white/5 border border-primary/30 p-3 rounded-xl flex items-center gap-2 text-xs text-primary font-bold">
                      <Zap className="h-4 w-4" /> Selected Preset Package: {presetPackageName}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/15 px-3.5 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/15 px-3.5 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/15 px-3.5 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">Rooftop Location (City / State)</label>
                      <input
                        type="text"
                        required
                        value={location}
                        placeholder="e.g. Vellore, TN"
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/15 px-3.5 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">Required Load Capacity</label>
                      <select
                        value={requiredCapacity}
                        onChange={(e) => setRequiredCapacity(e.target.value)}
                        className="w-full rounded-lg bg-slate-900 border border-white/15 px-3.5 py-3 text-sm text-white outline-none transition focus:bg-white/10 focus:border-primary"
                      >
                        <option value="1kW">1 kW Package</option>
                        <option value="2kW">2 kW Package</option>
                        <option value="3kW">3 kW Package</option>
                        <option value="5kW">5 kW Package</option>
                        <option value="10kW">10 kW Commercial Package</option>
                        <option value="Other">Other / Larger systems</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">Monthly Electricity Bill (INR)</label>
                      <input
                        type="number"
                        required
                        placeholder="e.g. 3500"
                        value={monthlyBill}
                        onChange={(e) => setMonthlyBill(e.target.value)}
                        className="w-full rounded-lg bg-white/5 border border-white/15 px-3.5 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">Usage Intent</label>
                      <select
                        value={usageType}
                        onChange={(e) => setUsageType(e.target.value)}
                        className="w-full rounded-lg bg-slate-900 border border-white/15 px-3 py-2 text-xs text-white outline-none transition focus:bg-white/10 focus:border-primary"
                      >
                        <option value="residential">Residential Home</option>
                        <option value="commercial">Commercial/Industrial</option>
                        <option value="agricultural">Agricultural Pump</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">Roof Mounting Type</label>
                      <select
                        value={roofType}
                        onChange={(e) => setRoofType(e.target.value)}
                        className="w-full rounded-lg bg-slate-900 border border-white/15 px-3 py-2 text-xs text-white outline-none transition focus:bg-white/10 focus:border-primary"
                      >
                        <option value="concrete">Concrete Roof Slab</option>
                        <option value="tin_sheet">Metal / Tin Sheet</option>
                        <option value="ground_mount">Ground Mounted Open</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/50 uppercase">EPC Setup Support</label>
                      <select
                        value={installationReq ? "yes" : "no"}
                        onChange={(e) => setInstallationReq(e.target.value === "yes")}
                        className="w-full rounded-lg bg-slate-900 border border-white/15 px-3 py-2 text-xs text-white outline-none transition focus:bg-white/10 focus:border-primary"
                      >
                        <option value="yes">Installation Required</option>
                        <option value="no">Supply Only (Hardware)</option>
                      </select>
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-3">
                    <label className="text-[10px] font-bold text-white/60 block uppercase">Upload Latest Electricity Bill / Rooftop Layout (Optional)</label>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-6 bg-white/[0.02] relative hover:border-primary/45 transition">
                      <UploadCloud className="h-8 w-8 text-white/40 mb-2" />
                      <span className="text-xs font-bold text-white/80">{uploading ? "Uploading..." : "Click to select a file"}</span>
                      <span className="text-[9px] text-white/45 mt-0.5">PDF, JPG, PNG up to 5MB</span>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                    </div>
                    {uploadedUrl && (
                      <p className="text-xs text-green-400 font-bold flex items-center gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Document Linked successfully!
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/50 uppercase">Special Message / Specific Load details</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="List appliance counts or special structural height requests..."
                      className="w-full rounded-lg bg-white/5 border border-white/15 px-3.5 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:bg-white/10 focus:border-primary h-24 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep font-black rounded-2xl hover:shadow-lg transition disabled:opacity-50"
                  >
                    {loading ? "Registering system parameters..." : "Submit Feasibility Data"}
                  </button>
                </div>
              </form>
            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
