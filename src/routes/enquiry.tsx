import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Zap, HelpCircle, CheckCircle, FileText, UploadCloud, AlertCircle } from "lucide-react";
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
          <h1 className="text-3xl font-black text-brand-navy">Enquiry Received!</h1>
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

        <main className="py-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-border p-6 sm:p-8 rounded-3xl space-y-6 shadow-[0_10px_35px_-15px_hsl(var(--brand-navy)/0.15)] text-slate-800">
            
            {presetPackageName && (
              <div className="bg-primary/10 border border-primary/30 p-4 rounded-2xl flex items-center gap-3 text-xs text-brand-navy font-bold">
                <Zap className="h-4 w-4" /> Configured for package selection: {presetPackageName}
              </div>
            )}

            <form onSubmit={handleEnquirySubmit} className="space-y-6">
              {/* Coordinates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-700"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Rooftop Location (City/State)</label>
                  <input
                    type="text"
                    required
                    value={location}
                    placeholder="e.g. Vellore, Tamil Nadu"
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-700"
                  />
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Feasibility specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Required Load Capacity</label>
                  <select
                    value={requiredCapacity}
                    onChange={(e) => setRequiredCapacity(e.target.value)}
                    className="w-full bg-slate-50 border border-border rounded-xl p-2.5 text-xs text-slate-700"
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
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Monthly Electricity Bill (INR)</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 3500"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Usage Intent</label>
                  <select
                    value={usageType}
                    onChange={(e) => setUsageType(e.target.value)}
                    className="w-full bg-slate-50 border border-border rounded-xl p-2.5 text-xs text-slate-700"
                  >
                    <option value="residential">Residential Home</option>
                    <option value="commercial">Commercial/Industrial</option>
                    <option value="agricultural">Agricultural Pump</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Roof Mounting Type</label>
                  <select
                    value={roofType}
                    onChange={(e) => setRoofType(e.target.value)}
                    className="w-full bg-slate-50 border border-border rounded-xl p-2.5 text-xs text-slate-700"
                  >
                    <option value="concrete">Concrete Roof Slab</option>
                    <option value="tin_sheet">Metal / Tin Sheet</option>
                    <option value="ground_mount">Ground Mounted Open Space</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">EPC Setup Support</label>
                  <select
                    value={installationReq ? "yes" : "no"}
                    onChange={(e) => setInstallationReq(e.target.value === "yes")}
                    className="w-full bg-slate-50 border border-border rounded-xl p-2.5 text-xs text-slate-700"
                  >
                    <option value="yes">Installation Required</option>
                    <option value="no">Supply Only (Hardware only)</option>
                  </select>
                </div>
              </div>

              {/* Document Upload */}
              <div className="bg-slate-50 border border-border p-6 rounded-2xl space-y-4">
                <label className="text-xs font-bold text-slate-450 block uppercase">Upload Latest Electricity Bill / Rooftop Layout (Optional)</label>
                
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-6 bg-white relative hover:border-primary/45 transition">
                  <UploadCloud className="h-10 w-10 text-slate-400 mb-2" />
                  <span className="text-xs font-bold text-slate-655">{uploading ? "Uploading..." : "Click to select a file"}</span>
                  <span className="text-[10px] text-slate-400 mt-1">PDF, JPG, PNG up to 5MB</span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>

                {uploadedUrl && (
                  <p className="text-xs text-green-600 font-bold flex items-center gap-1.5 mt-2">
                    <CheckCircle className="h-3.5 w-3.5" /> File Linked: {uploadedUrl}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Special Message / Specific Load details</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="List special appliances, structural heights, or grid constraints..."
                  className="w-full bg-slate-50 border border-border rounded-xl p-2.5 text-xs h-24 resize-none focus:outline-none focus:border-primary text-slate-700"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep font-black rounded-2xl hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? "Registering system parameters..." : "Submit Feasibility Data"}
              </button>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
