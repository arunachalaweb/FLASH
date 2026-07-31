import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/ecommerce/inventory")({
  head: () => ({ meta: [{ title: "Stock & Inventory Control | Flash Admin" }] }),
  component: InventoryAdminPage,
});

interface Product {
  id: string;
  name: string;
  sku: string;
  stock_quantity: number;
  manage_stock: boolean;
}

function InventoryAdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [adjustments, setAdjustments] = useState<Record<string, number>>({});
  const [saving, setSaving] = useState<string | null>(null);

  const isDev = import.meta.env.DEV;
  const BACKEND_URL = isDev ? "http://localhost:4000" : "";
  const token = localStorage.getItem("admin_token");

  async function loadProducts() {
    try {
      const res = await fetch(`${BACKEND_URL}/api/products`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      setProducts(data || []);
    } catch (e) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAdjustmentChange = (id: string, value: string) => {
    const val = parseInt(value, 10);
    setAdjustments((prev) => ({ ...prev, [id]: isNaN(val) ? 0 : val }));
  };

  const handleSaveStock = async (product: Product) => {
    const adjust = adjustments[product.id] || 0;
    if (adjust === 0) return;

    setSaving(product.id);
    const newQty = product.stock_quantity + adjust;

    try {
      const res = await fetch(`${BACKEND_URL}/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          stock_quantity: newQty
        })
      });

      if (!res.ok) throw new Error("Failed to save stock quantity");
      
      toast.success(`Updated stock for ${product.name} to ${newQty}`);
      setAdjustments((prev) => ({ ...prev, [product.id]: 0 }));
      loadProducts();
    } catch (err: any) {
      toast.error(err.message || "Failed to update stock");
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-brand-navy">Inventory & Stock Control</h1>
        <p className="text-slate-500 text-sm">Quickly manage solar panel modules, structure supplies, and accessories stock levels.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 border-b">
                <tr>
                  <th className="text-left font-semibold px-6 py-4">SKU</th>
                  <th className="text-left font-semibold px-6 py-4">Product Details</th>
                  <th className="text-center font-semibold px-6 py-4">Status</th>
                  <th className="text-center font-semibold px-6 py-4">Current Stock</th>
                  <th className="text-center font-semibold px-6 py-4">Quick Adjust (+ / -)</th>
                  <th className="w-24 px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {products.map((p) => {
                  const adjust = adjustments[p.id] || 0;
                  const newPreview = p.stock_quantity + adjust;
                  const isLow = p.manage_stock && p.stock_quantity <= 5;
                  const out = p.manage_stock && p.stock_quantity <= 0;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/50">
                      <td className="px-6 py-4 font-mono text-xs font-bold text-slate-500">{p.sku || "—"}</td>
                      <td className="px-6 py-4 font-semibold text-slate-800">{p.name}</td>
                      <td className="px-6 py-4 text-center">
                        {!p.manage_stock ? (
                          <span className="text-xs font-medium text-slate-400">Not Managed</span>
                        ) : out ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold bg-red-50 text-red-600 px-2 py-0.5 rounded border border-red-100">
                            <AlertTriangle className="h-3 w-3" /> Out of stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold bg-amber-50 text-amber-600 px-2 py-0.5 rounded border border-amber-100">
                            <AlertTriangle className="h-3 w-3" /> Low stock
                          </span>
                        ) : (
                          <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">Optimal</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center font-mono font-bold text-base">
                        {p.manage_stock ? p.stock_quantity : "—"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {p.manage_stock ? (
                          <div className="flex items-center justify-center gap-3">
                            <input
                              type="number"
                              placeholder="0"
                              value={adjustments[p.id] || ""}
                              onChange={(e) => handleAdjustmentChange(p.id, e.target.value)}
                              className="w-20 border rounded-lg px-2.5 py-1.5 text-center text-sm font-semibold focus:outline-none focus:border-primary"
                            />
                            {adjust !== 0 && (
                              <span className="text-xs text-slate-500 font-bold">
                                Preview: <strong className="text-primary-hover font-mono">{newPreview}</strong>
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400 text-xs font-light">Unlimited</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {p.manage_stock && adjust !== 0 && (
                          <button
                            onClick={() => handleSaveStock(p)}
                            disabled={saving === p.id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-slate-900 font-bold text-xs rounded-lg hover:bg-primary-hover transition disabled:bg-slate-300"
                          >
                            <Save className="h-3.5 w-3.5" /> Save
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
