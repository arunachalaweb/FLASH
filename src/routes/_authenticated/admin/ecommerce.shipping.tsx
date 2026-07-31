import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/ecommerce/shipping")({
  head: () => ({ meta: [{ title: "Logistics Zones | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="shipping_zones"
      title="Logistics Delivery Zones"
      description="Configure shipping charges based on destination pincodes. Ideal for heavy loads like solar panels and batteries."
      searchColumn="pincode"
      orderBy={{ column: "pincode", ascending: true }}
      displayColumns={[
        { key: "pincode", label: "Pincode / Zip" },
        { key: "base_charge", label: "Base Cargo Fee (₹)", render: (r) => `₹${r.base_charge}` },
        { key: "per_kg_rate", label: "Logistics Per-Kg Rate (₹/kg)", render: (r) => `₹${r.per_kg_rate}/kg` },
        { key: "available", label: "Accepting Orders", render: (r) => r.available ? "Yes" : "No" }
      ]}
      fields={[
        { key: "pincode", label: "6-digit Postal Pincode", type: "text", required: true },
        { key: "base_charge", label: "Base Cargo Freight Charge (INR)", type: "number", required: true },
        { key: "per_kg_rate", label: "Logistics Rate Per Kg (INR)", type: "number", required: true },
        { key: "available", label: "Logistics Delivery Available", type: "boolean" }
      ]}
    />
  ),
});
