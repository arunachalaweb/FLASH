import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { User, LogOut, Package, MapPin, Receipt, ShieldCheck, X, FileText, ClipboardList, Check, Landmark } from "lucide-react";
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
  items: string; // JSON string array
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
  const [activeTab, setActiveTab] = useState<"orders" | "profile" | "enquiries" | "quotations">("orders");
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

  // Invoice modal state
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
      <div className="min-h-screen bg-slate-900 text-white flex flex-col justify-between">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col justify-between">
      <div>
        <Header />
        <PageHero
          title={`Welcome, ${profile?.name}`}
          subtitle="Manage solar orders, check issued quotations, and track active project custom enquiries."
        />

        <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            
            {/* Sidebar Tab Navigation */}
            <aside className="bg-slate-800/30 p-6 rounded-3xl border border-slate-700/40 h-fit mb-8 lg:mb-0 space-y-3">
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeTab === "orders" ? "bg-primary text-slate-900 shadow-lg" : "text-slate-350 hover:bg-slate-800"
                }`}
              >
                <Package className="h-4 w-4" /> My Orders
              </button>
              <button
                onClick={() => setActiveTab("quotations")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeTab === "quotations" ? "bg-primary text-slate-900 shadow-lg" : "text-slate-350 hover:bg-slate-800"
                }`}
              >
                <FileText className="h-4 w-4" /> Quotations
              </button>
              <button
                onClick={() => setActiveTab("enquiries")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeTab === "enquiries" ? "bg-primary text-slate-900 shadow-lg" : "text-slate-350 hover:bg-slate-800"
                }`}
              >
                <ClipboardList className="h-4 w-4" /> Custom Enquiries
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeTab === "profile" ? "bg-primary text-slate-900 shadow-lg" : "text-slate-350 hover:bg-slate-800"
                }`}
              >
                <MapPin className="h-4 w-4" /> Shipping Settings
              </button>
              
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-500/10 transition mt-6"
              >
                <LogOut className="h-4 w-4" /> Log Out
              </button>
            </aside>

            {/* Dashboard Content Pages */}
            <section className="lg:col-span-3">
              
              {/* Orders Panel */}
              {activeTab === "orders" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Purchase History</h3>
                  {orders.length === 0 ? (
                    <div className="text-center p-12 bg-slate-800/10 border border-dashed rounded-2xl text-slate-400">
                      No orders placed yet. Explore the shop!
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((o) => (
                        <div key={o.id} className="bg-slate-800/20 border border-slate-700/40 p-5 rounded-2xl space-y-4">
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-700/40 pb-3 gap-2">
                            <div>
                              <span className="text-[10px] font-mono text-slate-450 block uppercase">Order Reference</span>
                              <span className="font-mono text-sm font-bold text-white">{o.order_number}</span>
                            </div>
                            <div className="flex gap-3 items-center">
                              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                                o.status === "completed" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                              }`}>
                                {o.status}
                              </span>
                              <button
                                onClick={() => setInvoiceOrder(o)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-lg border border-slate-750 transition"
                              >
                                <Receipt className="h-3.5 w-3.5 text-primary" /> View Invoice
                              </button>
                            </div>
                          </div>

                          <div className="space-y-2.5">
                            {o.order_items.map((item) => (
                              <div key={item.id} className="flex justify-between text-xs text-slate-350">
                                <span>{item.product?.name || "Solar Item"} × {item.quantity}</span>
                                <span className="font-mono font-bold text-white">₹{item.total.toLocaleString("en-IN")}</span>
                              </div>
                            ))}
                          </div>

                          <div className="border-t border-slate-700/30 pt-3 flex justify-between text-xs">
                            <span className="text-slate-400">Total Paid Amount:</span>
                            <span className="font-mono font-black text-primary">₹{o.total_amount.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Quotations Panel */}
              {activeTab === "quotations" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Issued Quotations</h3>
                  {quotations.length === 0 ? (
                    <div className="text-center p-12 bg-slate-800/10 border border-dashed rounded-2xl text-slate-400">
                      No quotations issued yet. Submit an enquiry request to get custom quotes.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {quotations.map((q) => {
                        const items = JSON.parse(q.items || "[]");
                        return (
                          <div key={q.id} className="bg-slate-800/20 border border-slate-700/40 p-5 rounded-2xl space-y-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-700/40 pb-3 gap-2">
                              <div>
                                <span className="text-[10px] font-mono text-slate-450 block uppercase">Quotation Ref</span>
                                <span className="font-mono text-sm font-bold text-white">{q.quotation_number}</span>
                              </div>
                              <div>
                                {q.status === "sent" ? (
                                  <button
                                    onClick={() => handleAcceptQuotation(q.id)}
                                    disabled={acceptingQuoteId === q.id}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-slate-900 text-xs font-bold rounded-lg hover:bg-primary-hover transition"
                                  >
                                    <Check className="h-3.5 w-3.5" /> Approve & Place Order
                                  </button>
                                ) : (
                                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                                    q.status === "accepted" ? "bg-green-500/20 text-green-400" : "bg-slate-800 text-slate-400"
                                  }`}>
                                    {q.status}
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              {items.map((it: any, idx: number) => (
                                <div key={idx} className="flex justify-between text-xs text-slate-350">
                                  <span>{it.name} × {it.quantity}</span>
                                  <span className="font-mono font-bold text-white">₹{it.total.toLocaleString("en-IN")}</span>
                                </div>
                              ))}
                            </div>

                            <div className="border-t border-slate-700/30 pt-3 flex justify-between text-xs">
                              <span className="text-slate-400">Quoted Total:</span>
                              <span className="font-mono font-black text-primary">₹{q.total_amount.toLocaleString("en-IN")}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Custom Enquiries Panel */}
              {activeTab === "enquiries" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Custom Solar Enquiries</h3>
                  {enquiries.length === 0 ? (
                    <div className="text-center p-12 bg-slate-800/10 border border-dashed rounded-2xl text-slate-400">
                      No custom project enquiries submitted yet.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {enquiries.map((e) => (
                        <div key={e.id} className="bg-slate-800/20 border border-slate-700/40 p-5 rounded-2xl space-y-3">
                          <div className="flex justify-between items-center border-b border-slate-700/40 pb-2">
                            <span className="font-bold text-sm text-white">Enquiry for {e.required_capacity || "Solar System"}</span>
                            <span className="text-[10px] uppercase font-bold text-primary">{e.status}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-xs text-slate-350">
                            <div>Usage Type: <strong className="text-white capitalize">{e.usage_type}</strong></div>
                            {e.monthly_bill && <div>Avg Bill: <strong className="text-white">₹{e.monthly_bill}</strong></div>}
                            {e.roof_type && <div>Roof Type: <strong className="text-white capitalize">{e.roof_type}</strong></div>}
                            <div>Date: <strong>{new Date(e.created_at).toLocaleDateString()}</strong></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Shipping Settings Panel */}
              {activeTab === "profile" && (
                <form onSubmit={handleProfileUpdate} className="bg-slate-800/20 border border-slate-700/40 p-6 rounded-3xl space-y-6">
                  <h3 className="text-lg font-bold text-white uppercase tracking-wider">Shipping Settings</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Receiver Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">Phone Number</label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Address Line 1</label>
                    <input
                      type="text"
                      value={formData.address_line1}
                      onChange={(e) => setFormData(prev => ({ ...prev, address_line1: e.target.value }))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">City</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">State</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">PIN Code</label>
                      <input
                        type="text"
                        value={formData.postal_code}
                        onChange={(e) => setFormData(prev => ({ ...prev, postal_code: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-primary text-white font-mono"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary-hover transition text-xs"
                  >
                    Save Shipping Address
                  </button>
                </form>
              )}

            </section>

          </div>
        </main>
      </div>

      {/* Invoice Viewer Modal */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl p-6 md:p-8 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setInvoiceOrder(null)}
              className="absolute top-4 right-4 p-1 rounded hover:bg-slate-100 text-slate-400"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Print Header */}
            <div className="flex justify-between items-start border-b pb-6">
              <div>
                <h2 className="text-xl font-black uppercase text-slate-800">Flash Renewable Energy</h2>
                <p className="text-xs text-slate-500 mt-1">PAN-India MNRE Registered Solar Distributor</p>
                <p className="text-xs text-slate-450 mt-0.5">GSTIN: 33AAFCD9012K1Z5</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-450 block uppercase">Tax Invoice</span>
                <h3 className="font-mono font-bold text-slate-800 text-sm mt-0.5">INV-ORD-{invoiceOrder.order_number.split("-")[2]}</h3>
                <p className="text-xs text-slate-450 mt-1">Date: {new Date(invoiceOrder.created_at).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Invoice Meta */}
            <div className="grid grid-cols-2 gap-6 py-6 text-xs border-b">
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">Seller details</span>
                <p className="mt-1 font-semibold">FLASH RENEWABLE ENERGY SOLUTIONS</p>
                <p className="text-slate-500 mt-0.5 leading-relaxed">No. 12, Gandhi Nagar Bypass Road, Vellore, Tamil Nadu - 632006</p>
              </div>
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">Shipping details</span>
                <p className="mt-1 font-semibold">{invoiceOrder.shipping_name}</p>
                <p className="text-slate-500 mt-0.5 leading-relaxed">{invoiceOrder.shipping_address}, {invoiceOrder.shipping_city}, {invoiceOrder.shipping_state} - {invoiceOrder.shipping_postal_code}</p>
              </div>
            </div>

            {/* Invoice Items Table */}
            <table className="w-full text-xs text-left border-collapse mt-6">
              <thead>
                <tr className="border-b text-slate-450 font-bold uppercase text-[9px]">
                  <th className="py-2.5">Description</th>
                  <th className="py-2.5 text-center w-12">Qty</th>
                  <th className="py-2.5 text-right w-24">Unit Price</th>
                  <th className="py-2.5 text-right w-24">Taxable Value</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-700">
                {invoiceOrder.order_items.map((item) => {
                  const unitTaxable = item.price / 1.18;
                  const totalTaxable = unitTaxable * item.quantity;
                  return (
                    <tr key={item.id} className="py-2">
                      <td className="py-3">
                        <div className="font-semibold text-slate-800">{item.product?.name || "Solar Component"}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">SKU: {item.product?.sku || "—"}</div>
                      </td>
                      <td className="py-3 text-center">{item.quantity}</td>
                      <td className="py-3 text-right font-mono">₹{unitTaxable.toFixed(2)}</td>
                      <td className="py-3 text-right font-mono">₹{totalTaxable.toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Calculations Breakdown */}
            <div className="border-t pt-6 mt-6 flex justify-end">
              <div className="w-64 text-xs space-y-2.5 text-slate-600 font-mono">
                {/* 1.18 math */}
                <div className="flex justify-between">
                  <span>Taxable Subtotal:</span>
                  <span>₹{(invoiceOrder.total_amount / 1.18).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>CGST (9%):</span>
                  <span>₹{((invoiceOrder.total_amount / 1.18) * 0.09).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST (9%):</span>
                  <span>₹{((invoiceOrder.total_amount / 1.18) * 0.09).toFixed(2)}</span>
                </div>
                <hr className="border-slate-200" />
                <div className="flex justify-between font-bold text-slate-900 text-sm">
                  <span>Grand Total:</span>
                  <span>₹{invoiceOrder.total_amount.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Print trigger */}
            <div className="mt-8 pt-4 border-t flex justify-end gap-3">
              <button
                onClick={() => setInvoiceOrder(null)}
                className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-slate-50 transition"
              >
                Close View
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
