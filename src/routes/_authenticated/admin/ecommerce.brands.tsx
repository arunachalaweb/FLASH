import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/ecommerce/brands")({
  head: () => ({ meta: [{ title: "Solar Brands CMS | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="brands"
      title="Solar Brands Management"
      description="Manage panel and inverter authorized manufacturing brands."
      searchColumn="name"
      orderBy={{ column: "name", ascending: true }}
      displayColumns={[
        { key: "name", label: "Brand Name" },
        { key: "slug", label: "Slug" },
        { key: "description", label: "Manufacturer Description" }
      ]}
      fields={[
        { key: "name", label: "Brand Name", type: "text", required: true },
        { key: "slug", label: "Slug (lowercase)", type: "text", required: true },
        { key: "logo_url", label: "Brand Logo Image URL", type: "text", colSpan: 2 },
        { key: "description", label: "Manufacturer Details", type: "textarea", colSpan: 2 }
      ]}
    />
  ),
});
