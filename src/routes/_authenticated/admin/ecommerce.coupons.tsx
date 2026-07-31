import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/ecommerce/coupons")({
  head: () => ({ meta: [{ title: "Coupons CMS | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="coupons"
      title="Coupons & Discount Codes"
      description="Manage promotional codes to apply fixed-value or percentage-based discounts to shopping cart subtotals."
      searchColumn="code"
      orderBy={{ column: "created_at", ascending: false }}
      displayColumns={[
        { key: "code", label: "Promo Code" },
        { key: "discount_type", label: "Type", render: (r) => String(r.discount_type).toUpperCase() },
        { key: "discount_value", label: "Value", render: (r) => r.discount_type === "percentage" ? `${r.discount_value}%` : `₹${r.discount_value}` },
        { key: "min_order_val", label: "Min Order Subtotal (₹)", render: (r) => `₹${Number(r.min_order_val).toLocaleString("en-IN")}` },
        { key: "active", label: "Active Status", render: (r) => r.active ? "Yes" : "No" }
      ]}
      fields={[
        { key: "code", label: "Promo Code (uppercase)", type: "text", required: true },
        { key: "discount_type", label: "Discount Type", type: "select", options: [{ value: "fixed", label: "Fixed Amount" }, { value: "percentage", label: "Percentage %" }], required: true },
        { key: "discount_value", label: "Discount Value", type: "number", required: true },
        { key: "min_order_val", label: "Min Order Subtotal Required", type: "number" },
        { key: "active", label: "Active", type: "boolean" }
      ]}
    />
  ),
});
