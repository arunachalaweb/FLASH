import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ClipboardList, ChevronRight, X, FileText, CheckCircle, Zap, Plus, Trash2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/ecommerce/enquiries")({
  head: () => ({ meta: [{ title: "Enquiries & Quote Builder | Flash Admin" }] }),
  component: EnquiriesAdminPage,
});

interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  required_capacity: string;
  usage_type: string;
  monthly_bill: string;
  roof_type: string;
  installation_req: boolean;
  message: string;
  file_url: string | null;
  status: string;
  created_at: string;
}

interface QuoteItem {
  name: string;
  price: number;
  quantity: number;
}

function EnquiriesAdminPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEnq, setSelectedEnq] = useState<Enquiry | null>(null);

  // Quote builder states
  const [showQuoteBuilder, setShowQuoteBuilder] = useState(false);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([
    { name: "Solar PV Panels 550W", price: 17800, quantity: 6 },
    { name: "Grid-Tie Solar Inverter 3kW", price: 45000, quantity: 1 },
    { name: "HDG Rooftop Mounting Structure", price: 15000, quantity: 1 }
  ]);
  const [discount, setDiscount] = useState("0");
  const [submittingQuote, setSubmittingQuote] = useState(false);

  const isDev = import.meta.env.DEV;
  const BACKEND_URL = isDev ? "http://localhost:4000" : "";
  const token = localStorage.getItem("admin_token");

  async function loadEnquiries() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/solar_enquiries`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setEnquiries(data || []);
    } catch (e) {
      toast.error("Failed to load solar enquiries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEnquiries();
  }, []);

  const handleAddQuoteItem = () => {
    setQuoteItems([...quoteItems, { name: "", price: 0, quantity: 1 }]);
  };

  const handleRemoveQuoteItem = (idx: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== idx));
  };

  const handleItemChange = (idx: number, field: keyof QuoteItem, value: any) => {
    const next = [...quoteItems];
    next[idx] = { ...next[idx], [field]: value };
    setQuoteItems(next);
  };

  const handleGenerateQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEnq) return;

    setSubmittingQuote(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/admin/enquiries/convert-to-quote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          enquiryId: selectedEnq.id,
          items: quoteItems,
          discount: parseFloat(discount)
        })
      });

      if (!res.ok) throw new Error("Failed to generate quotation");

      toast.success(`Successfully converted enquiry into a formal quotation!`);
      setShowQuoteBuilder(false);
      setSelectedEnq(null);
      loadEnquiries();
    } catch (err: any) {
      toast.error(err.message || "Failed to create quote");
    } finally {
      setSubmittingQuote(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-navy">Solar Enquiries & Quote Builder</h1>
        <p className="text-slate-500 text-sm">Review incoming site parameters and convert raw client requests into itemized commercial quotations.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-8 items-start">
          
          {/* Enquiries Grid */}
          <div className="lg:col-span-2 bg-white border rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 border-b">
                  <tr>
                    <th className="text-left font-semibold px-5 py-4">Client Name</th>
                    <th className="text-left font-semibold px-5 py-4">Location</th>
                    <th className="text-center font-semibold px-5 py-4">Capacity</th>
                    <th className="text-center font-semibold px-5 py-4">Status</th>
                    <th className="w-10 px-5 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y text-slate-700">
                  {enquiries.map((e) => (
                    <tr
                      key={e.id}
                      onClick={() => { setSelectedEnq(e); setShowQuoteBuilder(false); }}
                      className={`hover:bg-slate-50/50 cursor-pointer transition ${
                        selectedEnq?.id === e.id ? "bg-slate-50 font-semibold" : ""
                      }`}
                    >
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">{e.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{e.email}</div>
                      </td>
                      <td className="px-5 py-4 text-xs font-medium">{e.location}</td>
                      <td className="px-5 py-4 text-center font-mono font-bold text-slate-800">{e.required_capacity}</td>
                      <td className="px-5 py-4 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          e.status === "quoted"
                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                            : e.status === "ordered"
                            ? "bg-green-50 text-green-600 border border-green-100"
                            : "bg-yellow-50 text-yellow-600 border border-yellow-100"
                        }`}>
                          {e.status}
                        </span>
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
            {selectedEnq ? (
              <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
                <div className="flex justify-between items-start border-b pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-450 block uppercase font-bold">Feasibility Request</span>
                    <h3 className="font-black text-slate-850 text-base">{selectedEnq.name}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedEnq(null)}
                    className="p-1 rounded hover:bg-slate-100 text-slate-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-450 block uppercase text-[9px] font-bold">Usage Type</span>
                      <strong className="text-slate-800 capitalize">{selectedEnq.usage_type}</strong>
                    </div>
                    <div>
                      <span className="text-slate-450 block uppercase text-[9px] font-bold">Monthly Bill</span>
                      <strong className="text-slate-800">₹{selectedEnq.monthly_bill}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-slate-450 block uppercase text-[9px] font-bold">Roof Mounting</span>
                      <strong className="text-slate-800 capitalize">{selectedEnq.roof_type}</strong>
                    </div>
                    <div>
                      <span className="text-slate-450 block uppercase text-[9px] font-bold">Installation EPC</span>
                      <strong className="text-slate-800">{selectedEnq.installation_req ? "Yes, Required" : "Supply Only"}</strong>
                    </div>
                  </div>

                  <div className="bg-slate-50 border rounded-xl p-3 text-slate-650 leading-relaxed font-serif">
                    "{selectedEnq.message || "No custom message provided."}"
                  </div>

                  {selectedEnq.file_url && (
                    <div className="pt-2">
                      <a
                        href={selectedEnq.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-primary font-bold hover:underline"
                      >
                        <FileText className="h-4 w-4" /> View Linked Layout/Bill Copy
                      </a>
                    </div>
                  )}

                  {/* Actions */}
                  {selectedEnq.status === "pending" && (
                    <div className="pt-4 border-t">
                      <button
                        onClick={() => setShowQuoteBuilder(true)}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-3 bg-primary text-slate-900 font-bold rounded-xl hover:bg-primary-hover transition text-xs shadow-sm"
                      >
                        <Zap className="h-4 w-4" /> Build Itemized Quotation
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-dashed rounded-2xl p-10 text-center text-slate-450 text-sm">
                Select an enquiry message from the list to review roof parameters and generate formal quotations.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quote Builder Overlay */}
      {showQuoteBuilder && selectedEnq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleGenerateQuote} className="bg-white rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 relative text-slate-800">
            <button
              type="button"
              onClick={() => setShowQuoteBuilder(false)}
              className="absolute top-4 right-4 p-1 rounded hover:bg-slate-100 text-slate-400"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <h3 className="text-lg font-black text-slate-850">Itemized Commercial Quotation</h3>
              <p className="text-slate-500 text-xs mt-1">Add materials, panel parts, logistics, and install service fees for {selectedEnq.name}.</p>
            </div>

            {/* Items Table */}
            <div className="space-y-4">
              <span className="font-bold text-xs text-slate-400 uppercase tracking-widest block">Quotation Line Items</span>
              <div className="space-y-3">
                {quoteItems.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <input
                      type="text"
                      required
                      placeholder="Item Description (e.g. Tata Panels)"
                      value={item.name}
                      onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                      className="flex-1 bg-slate-50 border rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-primary"
                    />
                    <input
                      type="number"
                      required
                      placeholder="Price"
                      value={item.price || ""}
                      onChange={(e) => handleItemChange(idx, "price", parseFloat(e.target.value) || 0)}
                      className="w-24 bg-slate-50 border rounded-lg px-2.5 py-2 text-xs text-right font-mono"
                    />
                    <input
                      type="number"
                      required
                      placeholder="Qty"
                      value={item.quantity || ""}
                      onChange={(e) => handleItemChange(idx, "quantity", parseInt(e.target.value, 10) || 1)}
                      className="w-16 bg-slate-50 border rounded-lg px-2.5 py-2 text-xs text-center font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveQuoteItem(idx)}
                      className="text-red-500 hover:text-red-400 p-1.5"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleAddQuoteItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-dashed rounded-lg text-xs font-bold text-primary hover:bg-slate-50 transition"
              >
                <Plus className="h-3.5 w-3.5" /> Add Custom Line
              </button>
            </div>

            {/* Discount */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-450 uppercase">Apply Discount (INR)</label>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full bg-slate-50 border rounded-lg px-2.5 py-2 text-xs focus:outline-none focus:border-primary font-mono text-right"
                />
              </div>

              <div className="text-right space-y-1">
                <span className="text-[10px] font-bold text-slate-450 uppercase block">Grand Total Estimation</span>
                <span className="text-xl font-black text-primary font-mono block">
                  ₹{(
                    quoteItems.reduce((sum, it) => sum + it.price * it.quantity, 0) - (parseFloat(discount) || 0)
                  ).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowQuoteBuilder(false)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg text-sm transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingQuote}
                className="flex-1 py-2.5 bg-primary text-slate-900 font-bold rounded-lg text-sm hover:bg-primary-hover transition"
              >
                {submittingQuote ? "Sending Quote..." : "Issue Quotation to Client"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
