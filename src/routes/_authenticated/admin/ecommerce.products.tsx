import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/ecommerce/products")({
  head: () => ({ meta: [{ title: "Products Manager | Flash Admin" }] }),
  component: ProductsAdminPage,
});

interface Category {
  id: string;
  name: string;
}

function ProductsAdminPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const isDev = import.meta.env.DEV;
        const BACKEND_URL = isDev ? "http://localhost:4000" : "";
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BACKEND_URL}/api/categories`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        setCategories(data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  const categoryOptions = categories.map((cat) => ({
    value: cat.id,
    label: cat.name
  }));

  return (
    <div className="space-y-12">
      {/* Products CRUD */}
      <AdminCrud
        table="products"
        title="Products Catalog"
        description="Manage solar panel modules, power inverters, mounting structures, and wires."
        searchColumn="name"
        orderBy={{ column: "created_at", ascending: false }}
        displayColumns={[
          { key: "name", label: "Product Name" },
          { key: "sku", label: "SKU" },
          { key: "price", label: "Price (₹)", render: (r) => `₹${Number(r.price).toLocaleString("en-IN")}` },
          { key: "sale_price", label: "Sale Price (₹)", render: (r) => r.sale_price ? `₹${Number(r.sale_price).toLocaleString("en-IN")}` : "—" },
          { key: "stock_quantity", label: "Stock" },
          { key: "published", label: "Active", render: (r) => r.published ? "Yes" : "No" }
        ]}
        fields={[
          { key: "name", label: "Product Name", type: "text", required: true, colSpan: 2 },
          { key: "slug", label: "URL Slug (lowercase, hyphens)", type: "text", required: true },
          { key: "sku", label: "SKU / Code", type: "text", required: true },
          { key: "price", label: "Regular Price (INR)", type: "number", required: true },
          { key: "sale_price", label: "Sale Price (INR, Optional)", type: "number" },
          { key: "stock_quantity", label: "Initial Stock Quantity", type: "number", required: true },
          { key: "manage_stock", label: "Manage Stock levels", type: "boolean" },
          { key: "category_id", label: "Product Category", type: "select", options: categoryOptions },
          { key: "published", label: "Published (Visible on Shop)", type: "boolean" },
          { key: "images", label: "Featured Image Link (URL)", type: "text", colSpan: 2 },
          { key: "description", label: "Detailed Description", type: "textarea", colSpan: 2, required: true }
        ]}
      />

      <hr className="border-slate-200" />

      {/* Categories CRUD */}
      <AdminCrud
        table="categories"
        title="Product Categories"
        description="Organize your shop catalog into high level categories."
        searchColumn="name"
        orderBy={{ column: "name", ascending: true }}
        displayColumns={[
          { key: "name", label: "Category Name" },
          { key: "slug", label: "Slug" },
          { key: "description", label: "Description" }
        ]}
        fields={[
          { key: "name", label: "Category Name", type: "text", required: true },
          { key: "slug", label: "URL Slug", type: "text", required: true },
          { key: "description", label: "Short Description", type: "textarea", colSpan: 2 }
        ]}
      />
    </div>
  );
}
