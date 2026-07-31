import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { User, LogOut, Package, MapPin, Receipt, ShieldCheck, X, FileText, ClipboardList, Check, Landmark, Grid, Star, FileSpreadsheet, Building } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/dashboard")({
  head: () => ({
    meta: [
      { title: "Customer Dashboard | FLASH Shop" },
      { name: "description", content: "View solar orders, custom quotations, and manage account." },
    ],
  }),
  component: CustomerDashboardPage,
});

interface OrderItem {
  id: string;
  product?: { name: string; sku: string };
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  created_at: string;
  order_items: OrderItem[];
}

interface Enquiry {
  id: string;
  required_capacity: string;
  usage_type: string;
  monthly_bill: string;
  roof_type: string;
  installation_req: boolean;
  status: string;
  created_at: string;
}

interface Quotation {
  id: string;
  quotation_number: string;
  items: string; 
  total_amount: number;
  status: string;
  valid_until: string;
  created_at: string;
}

interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
}

function CustomerDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "profile" | "enquiries" | "quotations">("overview");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Profile form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: ""
  });

  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [acceptingQuoteId, setAcceptingQuoteId] = useState<string | null>(null);

  const isDev = import.meta.env.DEV;
  const BACKEND_URL = isDev ? "http://localhost:4000" : "";
  const token = typeof window !== "undefined" ? localStorage.getItem("customer_token") : null;

  async function loadDashboardData() {
    if (!token) return;
    try {
      const [profRes, ordRes, enqRes, quoteRes] = await Promise.all([
        fetch(`${BACKEND_URL}/api/customer/profile`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${BACKEND_URL}/api/customer/orders`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${BACKEND_URL}/api/solar_enquiries`, { headers: { "Authorization": `Bearer ${token}` } }),
        fetch(`${BACKEND_URL}/api/quotations`, { headers: { "Authorization": `Bearer ${token}` } })
      ]);

      const profileData = await profRes.json();
      if (profileData.error) throw new Error(profileData.error);
      setProfile(profileData);
      setFormData({
        name: profileData.name || "",
        phone: profileData.phone || "",
        address_line1: profileData.address_line1 || "",
        address_line2: profileData.address_line2 || "",
        city: profileData.city || "",
        state: profileData.state || "",
        postal_code: profileData.postal_code || ""
      });

      const ordersData = await ordRes.json();
      setOrders(ordersData || []);

      const enquiriesData = await enqRes.json();
      setEnquiries(enquiriesData || []);

      const quotationsData = await quoteRes.json();
      setQuotations(quotationsData || []);
    } catch (err: any) {
      console.error(err);
      toast.error("Session expired. Please log in again.");
      localStorage.removeItem("customer_token");
      localStorage.removeItem("customer_user");
      navigate({ to: "/customer/login" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      toast.error("Please login to access the customer dashboard.");
      navigate({ to: "/customer/login" });
      return;
    }
    loadDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer_user");
    toast.success("Successfully logged out.");
    navigate({ to: "/customer/login" });
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BACKEND_URL}/api/customer/profile/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Update failed");
      setProfile(data);
      toast.success("Profile details updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile details.");
    }
  };

  const handleAcceptQuotation = async (quotationId: string) => {
    setAcceptingQuoteId(quotationId);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/quotes/convert-to-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ quotationId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Quotation acceptance failed");

      toast.success(`Quote accepted! Order ${data.order.order_number} created.`);
      loadDashboardData();
    } catch (err: any) {
      toast.error(err.message || "Quotation conversion failed");
    } finally {
      setAcceptingQuoteId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
        <Header overlay />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground font-sans min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <PageHero
          title="Customer Dashboard"
          crumb="Account Dashboard"
          tagline={`Logged in as ${profile?.email}. View solar invoices, consultations, and quotations.`}
        />

        <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            
            {/* Left Sidebar - Styled like admin sidebar */}
            <aside className="lg:col-span-3 bg-white p-5 rounded-3xl border border-border h-fit mb-8 lg:mb-0 space-y-2 shadow-sm text-slate-800">
              <div className="pb-4 mb-4 border-b border-slate-100 flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-100 grid place-items-center font-bold text-slate-700">
                  {profile?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-brand-navy truncate max-w-[150px]">{profile?.name}</h4>
                  <span className="text-[10px] text-slate-400 block font-mono">Customer Portal</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "overview" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Grid className="h-4 w-4" /> Overview Dashboard
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "orders" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <Package className="h-4 w-4" /> My Solar Orders
              </button>
              <button
                onClick={() => setActiveTab("quotations")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "quotations" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <FileText className="h-4 w-4" /> Issued Quotations
              </button>
              <button
                onClick={() => setActiveTab("enquiries")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "enquiries" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <ClipboardList className="h-4 w-4" /> Feasibility Requests
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  activeTab === "profile" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
                }`}
              >
                <MapPin className="h-4 w-4" /> Shipping Settings
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition mt-6"
              >
                <LogOut className="h-4 w-4" /> Log Out Portal
              </button>
            </aside>

            {/* Main Content Area */}
            <section className="lg:col-span-9 space-y-8 text-slate-800">
              
              {/* Overview Tab (Admin Panel stats style) */}
              {activeTab === "overview" && (
                <div className="space-y-8 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="bg-white border border-border p-6 rounded-3xl shadow-xs space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Total Orders</span>
                      <h3 className="text-3xl font-black text-brand-navy">{orders.length} Orders</h3>
                      <p className="text-[10px] text-slate-500 mt-1">Industrial & domestic gear purchased.</p>
                    </div>

                    <div className="bg-white border border-border p-6 rounded-3xl shadow-xs space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Feasibility Audits</span>
                      <h3 className="text-3xl font-black text-brand-navy">{enquiries.length} Requests</h3>
                      <p className="text-[10px] text-slate-500 mt-1">Solar consultations logged.</p>
                    </div>

                    <div className="bg-white border border-border p-6 rounded-3xl shadow-xs space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Approved Quotes</span>
                      <h3 className="text-3xl font-black text-brand-navy">{quotations.filter(q => q.status === "approved").length} Approved</h3>
                      <p className="text-[10px] text-slate-500 mt-1">Pending order conversion quote items.</p>
                    </div>
                  </div>

                  <div className="bg-white border border-border rounded-3xl p-6 shadow-xs space-y-4">
                    <h3 className="font-bold text-sm text-brand-navy flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" /> Delivery Credentials Info
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Manage your defaults shipping address parameters under the **Shipping Settings** tab to instantly calculate logistics rates at cart checkouts.
                    </p>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-base font-black text-brand-navy">Order Purchases History</h3>
                  {orders.length === 0 ? (
                    <div className="text-center p-12 bg-white border border-dashed rounded-3xl text-slate-400">
                      No purchase entries logged yet. Explore our solar hardware shop!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((o) => (
                        <div key={o.id} className="bg-white border border-border p-5 rounded-2xl space-y-4 shadow-xs">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-3 gap-2">
                            <div>
                              <span className="text-[9px] font-mono text-slate-400 block uppercase">Order Reference</span>
                              <span className="font-mono text-xs font-bold text-slate-800">{o.order_number}</span>
                            </div>
                            <div className="flex gap-3 items-center">
                              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                                o.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                              }`}>
                                {o.status}
                              </span>
                              <button
                                onClick={() => setInvoiceOrder(o)}
                                className="inline-flex items-center gap-1 text-[11px] bg-slate-900 text-white font-bold px-3 py-1.5 rounded-lg transition"
                              >
                                <Receipt className="h-3.5 w-3.5" /> Download Tax Invoice
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {o.order_items.map((item) => (
                              <div key={item.id} className="flex justify-between text-xs text-slate-655">
                                <span>{item.product?.name || "Solar Component"} × {item.quantity}</span>
                                <span className="font-mono font-bold">₹{item.total.toLocaleString("en-IN")}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                            <span>Dispatch Zone: <strong>{o.shipping_city}, {o.shipping_state}</strong></span>
                            <span className="text-slate-800">Total investment: <strong className="font-mono text-sm text-primary">₹{o.total_amount.toLocaleString("en-IN")}</strong></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quotations Tab */}
              {activeTab === "quotations" && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-base font-black text-brand-navy">Administrative Solar Quotes</h3>
                  {quotations.length === 0 ? (
                    <div className="text-center p-12 bg-white border border-dashed rounded-3xl text-slate-400">
                      No administrative solar quotations logged for your account yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {quotations.map((q) => {
                        const itemsList = JSON.parse(q.items || "[]");
                        return (
                          <div key={q.id} className="bg-white border border-border p-5 rounded-2xl space-y-4 shadow-xs">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                              <div>
                                <span className="text-[9px] font-mono text-slate-400 block uppercase">Quote Code</span>
                                <span className="font-mono text-xs font-bold text-slate-800">{q.quotation_number}</span>
                              </div>
                              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                                q.status === "approved" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-650"
                              }`}>
                                {q.status}
                              </span>
                            </div>

                            <div className="space-y-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Line items</span>
                              {itemsList.map((item: any, idx: number) => (
                                <div key={idx} className="flex justify-between text-xs text-slate-655 border-b border-dashed pb-1.5 last:border-0 last:pb-0">
                                  <span>{item.name} × {item.qty}</span>
                                  <span className="font-mono">₹{item.total.toLocaleString("en-IN")}</span>
                                </div>
                              ))}
                            </div>

                            <div className="pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                              <span className="text-slate-400">Valid Until: <strong>{new Date(q.valid_until).toLocaleDateString()}</strong></span>
                              <div className="flex gap-2">
                                {q.status === "sent" && (
                                  <button
                                    onClick={() => handleAcceptQuotation(q.id)}
                                    disabled={acceptingQuoteId === q.id}
                                    className="px-4 py-2 bg-gradient-to-r from-primary to-brand-gold text-brand-navy-deep font-bold rounded-lg transition text-xs shadow-xs"
                                  >
                                    {acceptingQuoteId === q.id ? "Converting..." : "Accept Quote & Convert to Order"}
                                  </button>
                                )}
                                {q.status === "approved" && (
                                  <span className="text-green-600 font-bold flex items-center gap-1 text-xs">
                                    ✓ Order Confirmed
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Feasibility Enquiries Tab */}
              {activeTab === "enquiries" && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-base font-black text-brand-navy">Active Solar Feasibility Requests</h3>
                  {enquiries.length === 0 ? (
                    <div className="text-center p-12 bg-white border border-dashed rounded-3xl text-slate-400">
                      No custom solar consultations or feasibility requests logged.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {enquiries.map((e) => (
                        <div key={e.id} className="bg-white border border-border p-5 rounded-2xl space-y-3 shadow-xs">
                          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                            <span className="text-xs font-bold text-slate-700 capitalize">Load Requested: {e.required_capacity} ({e.usage_type})</span>
                            <span className="text-[10px] font-bold text-slate-450 uppercase font-mono">{new Date(e.created_at).toLocaleDateString()}</span>
                          </div>
                          
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-[11px] text-slate-550 pt-1">
                            <div>
                              <span className="text-slate-400 block">Roof Material</span>
                              <strong className="text-slate-700 capitalize">{e.roof_type}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Monthly Rate Bill</span>
                              <strong className="text-slate-700 font-mono">₹{e.monthly_bill}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Setup Support</span>
                              <strong className="text-slate-700">{e.installation_req ? "Turnkey Install" : "Supply Only"}</strong>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Audit Status</span>
                              <strong className="text-primary capitalize">{e.status}</strong>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Profile / Shipping Settings Tab */}
              {activeTab === "profile" && (
                <div className="space-y-6 animate-fade-in">
                  <h3 className="text-base font-black text-brand-navy">Edit Shipping Parameters</h3>
                  <form onSubmit={handleProfileUpdate} className="bg-white border border-border p-6 rounded-3xl space-y-5 shadow-xs">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Contact Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</label>
                        <input
                          type="text"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Primary Address Line 1</label>
                      <input
                        type="text"
                        required
                        value={formData.address_line1}
                        onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                        className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Address Line 2 (Optional)</label>
                      <input
                        type="text"
                        value={formData.address_line2}
                        onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
                        className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">City</label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">State</label>
                        <input
                          type="text"
                          required
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase">Pincode</label>
                        <input
                          type="text"
                          required
                          value={formData.postal_code}
                          onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                          className="w-full bg-slate-50 border border-border rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-primary text-slate-800 font-mono"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-850 transition text-xs shadow-xs"
                    >
                      Update Default Coordinates
                    </button>
                  </form>
                </div>
              )}

            </section>
          </div>
        </main>
      </div>

      {/* Printable Invoice Modal Template */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-8 space-y-6 relative overflow-y-auto max-h-[90vh] shadow-2xl">
            <button
              onClick={() => setInvoiceOrder(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 print:hidden"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Print trigger */}
            <div className="flex justify-between items-center border-b pb-4 print:hidden">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tax Invoice Preview</span>
              <button
                onClick={() => window.print()}
                className="bg-primary text-slate-900 px-4 py-2 rounded-xl text-xs font-bold transition hover:bg-primary-hover shadow-xs"
              >
                Print Invoice
              </button>
            </div>

            {/* Invoice Printable Body */}
            <div className="space-y-6 text-xs text-slate-800">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-xl font-black text-brand-navy">FLASH STORAGE</h2>
                  <p className="max-w-xs text-[10px] text-slate-500 leading-relaxed">
                    Door No.7, Plot No.102, Manirajan Street, Janaki Nagar, Alwarthirunagar, Valasaravakkam, Chennai, Tamil Nadu – 600087
                  </p>
                  <p className="text-[10px] text-slate-500">GSTIN: <strong className="font-mono text-slate-700">33AAFCT3878M1ZA</strong></p>
                </div>
                <div className="text-right space-y-1">
                  <h3 className="text-lg font-black text-primary">TAX INVOICE</h3>
                  <div>No: <span className="font-mono font-bold text-slate-800">{invoiceOrder.order_number}</span></div>
                  <div>Date: <span className="font-mono">{new Date(invoiceOrder.created_at).toLocaleDateString()}</span></div>
                </div>
              </div>

              <hr />

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Billed & Shipped To</span>
                  <div className="font-bold text-slate-800 mt-1">{invoiceOrder.shipping_name}</div>
                  <div className="text-slate-600 mt-0.5 leading-relaxed">
                    {invoiceOrder.shipping_address}, {invoiceOrder.shipping_city}, {invoiceOrder.shipping_state} - {invoiceOrder.shipping_postal_code}
                  </div>
                  <div className="mt-1">Phone: <strong className="text-slate-700">{invoiceOrder.shipping_phone}</strong></div>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Payment Information</span>
                  <div className="capitalize mt-1">Gateway: <strong className="text-slate-700">{invoiceOrder.payment_method}</strong></div>
                  <div>Status: <strong className="text-green-600 uppercase">{invoiceOrder.payment_status}</strong></div>
                </div>
              </div>

              {/* Table */}
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-y text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3 text-right">Unit Price</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceOrder.order_items.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-800">{item.product?.name || "Solar Component"}</div>
                        <div className="text-[9px] text-slate-400 font-mono">SKU: {item.product?.sku}</div>
                      </td>
                      <td className="py-3 px-3 text-right font-mono">₹{item.price.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-3 text-center font-mono">{item.quantity}</td>
                      <td className="py-3 px-3 text-right font-mono font-bold">₹{item.total.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals Table */}
              <div className="flex justify-end pt-2">
                <div className="w-64 space-y-2 text-right">
                  <div className="flex justify-between text-slate-500">
                    <span>Taxable Subtotal</span>
                    <span className="font-mono">₹{(invoiceOrder.total_amount / 1.18).toLocaleString("en-IN", {maximumFractionDigits: 2})}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>CGST (9%)</span>
                    <span className="font-mono">₹{(invoiceOrder.total_amount * 0.09 / 1.18).toLocaleString("en-IN", {maximumFractionDigits: 2})}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>SGST (9%)</span>
                    <span className="font-mono">₹{(invoiceOrder.total_amount * 0.09 / 1.18).toLocaleString("en-IN", {maximumFractionDigits: 2})}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-slate-800 font-black text-sm">
                    <span>Grand Total (Incl Tax)</span>
                    <span className="font-mono text-primary">₹{invoiceOrder.total_amount.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Footer Terms */}
              <div className="pt-8 border-t text-[10px] text-slate-400 text-center space-y-1">
                <p>This is a computer generated tax invoice and does not require signatures.</p>
                <p>Thank you for choosing FLASH storage for your green solar energy transitions!</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
