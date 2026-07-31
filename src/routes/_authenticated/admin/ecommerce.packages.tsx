import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/ecommerce/packages")({
  head: () => ({ meta: [{ title: "Solar Packages CMS | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="solar_packages"
      title="Solar Turnkey Packages"
      description="Create pre-configured rooftop/ground-mount systems (e.g. 3kW On-Grid Package) with itemized features."
      searchColumn="name"
      orderBy={{ column: "price", ascending: true }}
      displayColumns={[
        { key: "name", label: "Package Name" },
        { key: "price", label: "Estimated Price (₹)", render: (r) => `₹${Number(r.price).toLocaleString("en-IN")}` },
        { key: "features", label: "Key Features Included", render: (r) => {
          try {
            const list = typeof r.features === "string" ? JSON.parse(r.features) : r.features;
            if (Array.isArray(list)) return list.join(" · ");
          } catch(e){}
          return String(r.features || "");
        }}
      ]}
      fields={[
        { key: "name", label: "Package Name", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        { key: "price", label: "Estimated Price (INR)", type: "number", required: true },
        { key: "image_url", label: "Package Image URL", type: "text", colSpan: 2 },
        { key: "features", label: "Features List (JSON String Array)", type: "textarea", colSpan: 2, required: true },
        { key: "description", label: "Package Description / target audience", type: "textarea", colSpan: 2 }
      ]}
    />
  ),
});
