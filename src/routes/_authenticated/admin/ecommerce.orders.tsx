import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Receipt, CreditCard, ChevronRight, X, ArrowRight, Eye, Check } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/ecommerce/orders")({
  head: () => ({ meta: [{ title: "Orders & Invoices | Flash Admin" }] }),
  component: OrdersAdminPage,
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

function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Credit note state
  const [showCNModal, setShowCNModal] = useState(false);
  const [cnAmount, setCnAmount] = useState("");
  const [cnReason, setCnReason] = useState("");
  const [generatingCN, setGeneratingCN] = useState(false);

  const isDev = import.meta.env.DEV;
  const BACKEND_URL = isDev ? "http://localhost:4000" : "";
  const token = localStorage.getItem("admin_token");

  async function loadOrders() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setOrders(data || []);
    } catch (e) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, field: "status" | "payment_status", value: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/orders/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ [field]: value })
      });

      if (!res.ok) throw new Error("Failed to update status");
      
      toast.success(`Successfully updated order ${field}`);
      loadOrders();
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev) => prev ? { ...prev, [field]: value } : null);
      }
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    }
  };

  const handleCreateCreditNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    setGeneratingCN(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/credit-notes/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: selectedOrder.id,
          amount: parseFloat(cnAmount),
          reason: cnReason
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to generate credit note");
      }

      toast.success("Credit Note issued successfully!");
      setShowCNModal(false);
      setCnAmount("");
      setCnReason("");
      
      // Auto refund order status if requested
      await handleUpdateStatus(selectedOrder.id, "status", "refunded");
    } catch (err: any) {
      toast.error(err.message || "Failed to generate credit note");
    } finally {
      setGeneratingCN(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-navy">Orders & Invoices</h1>
        <p className="text-slate-500 text-sm">Monitor client solar system hardware sales, update shipping tracking status, and review tax invoices.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 items-start">
          {/* Orders list */}
          <div className="lg:col-span-2 bg-white border rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 border-b">
                  <tr>
                    <th className="text-left font-semibold px-5 py-4">Order Ref</th>
                    <th className="text-left font-semibold px-5 py-4">Client</th>
                    <th className="text-center font-semibold px-5 py-4">Status</th>
                    <th className="text-right font-semibold px-5 py-4">Total</th>
                    <th className="w-10 px-5 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y text-slate-700">
                  {orders.map((o) => (
                    <tr
                      key={o.id}
                      onClick={() => setSelectedOrder(o)}
                      className={`hover:bg-slate-50/50 cursor-pointer transition ${
                        selectedOrder?.id === o.id ? "bg-slate-50/90 font-semibold" : ""
                      }`}
                    >
                      <td className="px-5 py-4 font-mono text-xs text-slate-500 font-bold">{o.order_number}</td>
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">{o.shipping_name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{o.shipping_city}, {o.shipping_state}</div>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          o.status === "completed"
                            ? "bg-green-50 text-green-600 border border-green-150"
                            : o.status === "processing"
                            ? "bg-blue-50 text-blue-600 border border-blue-150"
                            : "bg-yellow-50 text-yellow-600 border border-yellow-150"
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right font-mono font-bold text-slate-850">
                        ₹{Number(o.total_amount).toLocaleString("en-IN")}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details Sidebar Panel */}
          <div>
            {selectedOrder ? (
              <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-start border-b pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-450 block uppercase font-bold">Selected Order</span>
                    <h3 className="font-mono font-black text-slate-850 text-base">{selectedOrder.order_number}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="p-1 rounded hover:bg-slate-100 text-slate-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Status Dropdowns */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Order Status</label>
                    <select
                      value={selectedOrder.status}
                      onChange={(e) => handleUpdateStatus(selectedOrder.id, "status", e.target.value)}
                      className="w-full bg-slate-50 border rounded-lg p-2 text-xs focus:outline-none focus:border-primary"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-450 uppercase block">Payment Status</label>
                    <select
                      value={selectedOrder.payment_status}
                      onChange={(e) => handleUpdateStatus(selectedOrder.id, "payment_status", e.target.value)}
                      className="w-full bg-slate-50 border rounded-lg p-2 text-xs focus:outline-none focus:border-primary"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="refunded">Refunded</option>
                    </select>
                  </div>
                </div>

                {/* Shipping Details */}
                <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="font-bold text-[10px] text-slate-400 uppercase block">Delivery Location</span>
                  <div className="font-bold text-slate-800">{selectedOrder.shipping_name}</div>
                  <div className="leading-relaxed">
                    {selectedOrder.shipping_address}<br />
                    {selectedOrder.shipping_city}, {selectedOrder.shipping_state} - {selectedOrder.shipping_postal_code}
                  </div>
                  <div>Phone: <strong>{selectedOrder.shipping_phone}</strong></div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  <span className="font-bold text-[10px] text-slate-400 uppercase block">Purchased Hardware</span>
                  <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                    {selectedOrder.order_items.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs text-slate-650 border-b border-dashed pb-2 last:border-0 last:pb-0">
                        <span className="font-medium line-clamp-1">{item.product?.name || "Solar Item"} × {item.quantity}</span>
                        <span className="font-mono font-bold text-slate-800">
                          ₹{Number(item.total).toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Finance Docs Actions */}
                <div className="border-t pt-4 space-y-3">
                  <span className="font-bold text-[10px] text-slate-455 uppercase block">Financial Operations</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCNModal(true)}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 border border-red-200 rounded-lg text-xs font-bold text-red-600 hover:bg-red-100/50 transition"
                    >
                      <CreditCard className="h-3.5 w-3.5" /> Issue Refund
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-dashed rounded-2xl p-10 text-center text-slate-450 text-sm">
                Select an order from the list to review detailed client shipping documents and manage order status.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Credit Note Generation Modal */}
      {showCNModal && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateCreditNote} className="bg-white rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 relative">
            <button
              type="button"
              onClick={() => setShowCNModal(false)}
              className="absolute top-4 right-4 p-1 rounded hover:bg-slate-100 text-slate-400"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <h3 className="text-lg font-black text-slate-850">Issue Financial Refund</h3>
              <p className="text-slate-500 text-xs mt-1">This generates an official Credit Note connected to invoice ref: {selectedOrder.order_number}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-450 uppercase block">Refund Amount (INR)</label>
                <input
                  type="number"
                  required
                  max={selectedOrder.total_amount}
                  value={cnAmount}
                  onChange={(e) => setCnAmount(e.target.value)}
                  placeholder={`Max: ₹${selectedOrder.total_amount}`}
                  className="w-full bg-slate-50 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-450 uppercase block">Reason for Refund</label>
                <textarea
                  required
                  value={cnReason}
                  onChange={(e) => setCnReason(e.target.value)}
                  placeholder="Defective solar panel return, cancellation..."
                  className="w-full bg-slate-50 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary h-20 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCNModal(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg text-sm transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={generatingCN}
                className="flex-1 py-2.5 bg-primary text-slate-900 font-bold rounded-lg text-sm hover:bg-primary-hover transition disabled:bg-slate-350"
              >
                {generatingCN ? "Processing..." : "Generate Credit Note"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
