import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { User, LogOut, Package, MapPin, Receipt, ShieldCheck, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/dashboard")({
  head: () => ({
    meta: [
      { title: "Customer Dashboard | FLASH Shop" },
      { name: "description", content: "View solar orders, download GST invoices, and modify shipping details." },
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
  const [activeTab, setActiveTab] = useState<"orders" | "profile">("orders");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
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

  useEffect(() => {
    const token = localStorage.getItem("customer_token");
    if (!token) {
      toast.error("Please login to access the customer dashboard.");
      navigate({ to: "/customer/login" });
      return;
    }

    async function loadDashboardData() {
      try {
        const profRes = await fetch("http://localhost:4000/api/customer/profile", {
          headers: { "Authorization": `Bearer ${token}` }
        });
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

        const ordRes = await fetch("http://localhost:4000/api/customer/orders", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const ordersData = await ordRes.json();
        setOrders(ordersData);
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
    const token = localStorage.getItem("customer_token");
    try {
      const res = await fetch("http://localhost:4000/api/customer/profile/update", {
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
          subtitle="Manage your solar orders, billing documentation, and configuration."
        />

        <main className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Sidebar Controls */}
            <aside className="bg-slate-800/30 p-6 rounded-3xl border border-slate-700/40 h-fit mb-8 lg:mb-0 space-y-4">
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeTab === "orders" ? "bg-primary text-slate-900 shadow-lg" : "text-slate-350 hover:bg-slate-800"
                }`}
              >
                <Package className="h-4 w-4" /> My Orders
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

            {/* Dashboard Content */}
            <section className="lg:col-span-3">
              {activeTab === "orders" ? (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <Package className="h-6 w-6 text-primary" /> Order History
                  </h2>

                  {orders.length === 0 ? (
                    <div className="text-center py-16 bg-slate-800/10 rounded-2xl border border-slate-750">
                      <Package className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400">You haven't placed any orders yet.</p>
                      <Link to="/products" className="mt-4 inline-block text-sm text-primary font-bold hover:underline">
                        Explore Solar Products →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-slate-800/20 border border-slate-700/40 rounded-3xl p-6 space-y-4"
                        >
                          {/* Order metadata Header */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-700/40 pb-4 gap-2">
                            <div>
                              <span className="text-xs text-slate-500 font-mono">Order Number</span>
                              <h4 className="font-bold text-white font-mono">{order.order_number}</h4>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                                order.status === "completed"
                                  ? "bg-green-500/20 text-green-400 border border-green-500/20"
                                  : order.status === "processing"
                                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"
                              }`}>
                                {order.status}
                              </span>
                              <button
                                onClick={() => setInvoiceOrder(order)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition"
                              >
                                <Receipt className="h-3.5 w-3.5 text-primary" /> View Invoice
                              </button>
                            </div>
                          </div>

                          {/* Order items */}
                          <div className="space-y-3">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="flex justify-between items-center text-sm">
                                <div>
                                  <span className="font-semibold text-slate-200">{item.product?.name || "Solar Item"}</span>
                                  <span className="text-xs text-slate-450 block font-mono">SKU: {item.product?.sku}</span>
                                </div>
                                <span className="text-slate-350">
                                  {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Grand total */}
                          <div className="flex justify-between items-center border-t border-slate-700/40 pt-4 text-sm font-bold">
                            <span className="text-slate-400">Total Paid (incl. GST)</span>
                            <span className="text-primary text-base">₹{order.total_amount.toLocaleString("en-IN")}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary" /> Shipping Settings
                  </h2>

                  <form onSubmit={handleProfileUpdate} className="bg-slate-800/20 border border-slate-700/40 rounded-3xl p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Receiver Name</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Receiver Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Address Line 1</label>
                        <input
                          type="text"
                          value={formData.address_line1}
                          onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
                          placeholder="Building, flat, or street address"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white"
                        />
                      </div>

                      <div className="sm:col-span-2 space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Address Line 2 (Optional)</label>
                        <input
                          type="text"
                          value={formData.address_line2}
                          onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
                          placeholder="Apartment, suite, or unit details"
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">City</label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">State</label>
                        <input
                          type="text"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Postal Code (PIN)</label>
                        <input
                          type="text"
                          value={formData.postal_code}
                          onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary-hover transition shadow-lg active:scale-[0.98]"
                    >
                      Save Configuration
                    </button>
                  </form>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      {/* Invoice Modal Overlay */}
      {invoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setInvoiceOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-750 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Invoice Design */}
            <div className="space-y-6 text-sm">
              <div className="flex justify-between items-start border-b pb-6">
                <div>
                  <h2 className="text-2xl font-black text-slate-800">TAX INVOICE</h2>
                  <span className="text-xs text-slate-500 font-mono">Invoice Ref: FL-INV-{invoiceOrder.order_number.replace("FL-ORD-", "")}</span>
                </div>
                <div className="text-right">
                  <h3 className="font-extrabold text-primary-hover text-lg">FLASH RENEWABLE ENERGY</h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Chennai Head Office, Tamil Nadu, India<br />
                    GSTIN: 33AAAAA1111A1Z1
                  </p>
                </div>
              </div>

              {/* Bill To & Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-450 uppercase block mb-1">Billed To</span>
                  <div className="font-semibold text-slate-800">{invoiceOrder.shipping_name}</div>
                  <div className="text-slate-500 leading-relaxed mt-1">
                    {invoiceOrder.shipping_address}<br />
                    {invoiceOrder.shipping_city}, {invoiceOrder.shipping_state} - {invoiceOrder.shipping_postal_code}<br />
                    Phone: {invoiceOrder.shipping_phone}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-450 uppercase block mb-1">Invoice Details</span>
                  <div className="space-y-1">
                    <div><span className="text-slate-500">Order Number:</span> <strong className="font-semibold">{invoiceOrder.order_number}</strong></div>
                    <div><span className="text-slate-500">Date:</span> <strong className="font-semibold">{new Date(invoiceOrder.created_at).toLocaleDateString()}</strong></div>
                    <div><span className="text-slate-500">Payment:</span> <strong className="font-semibold uppercase">{invoiceOrder.payment_method}</strong></div>
                  </div>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left border-collapse mt-4">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 font-semibold border-b text-xs uppercase">
                    <th className="py-2.5 px-3">Item Name</th>
                    <th className="py-2.5 px-3 text-center">Qty</th>
                    <th className="py-2.5 px-3 text-right">Price</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y text-slate-700">
                  {invoiceOrder.order_items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-3 px-3 font-medium">
                        {item.product?.name || "Solar Item"}
                        <span className="text-[10px] text-slate-400 block font-mono">SKU: {item.product?.sku}</span>
                      </td>
                      <td className="py-3 px-3 text-center">{item.quantity}</td>
                      <td className="py-3 px-3 text-right">₹{item.price.toLocaleString("en-IN")}</td>
                      <td className="py-3 px-3 text-right font-semibold">₹{item.total.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Calculation sub-table */}
              <div className="w-fit ml-auto space-y-2 border-t pt-4 min-w-[200px] text-xs font-semibold">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>₹{(invoiceOrder.total_amount / 1.18).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>CGST (9%)</span>
                  <span>₹{((invoiceOrder.total_amount / 1.18) * 0.09).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>SGST (9%)</span>
                  <span>₹{((invoiceOrder.total_amount / 1.18) * 0.09).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-slate-800 border-t pt-2">
                  <span>Grand Total</span>
                  <span className="text-primary-hover">₹{invoiceOrder.total_amount.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="border-t pt-6 text-center text-[10px] text-slate-400 space-y-1">
                <div className="flex items-center justify-center gap-1 text-slate-650 font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5 text-green-500" /> Digitally verified solar procurement invoice.
                </div>
                <p>This is a computer-generated tax invoice. No physical signature is required.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
