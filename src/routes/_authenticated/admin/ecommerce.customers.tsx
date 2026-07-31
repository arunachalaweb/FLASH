import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/ecommerce/customers")({
  head: () => ({ meta: [{ title: "Customer Directory | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="customers"
      title="Customers Registry"
      description="Registered retail and commercial clients."
      searchColumn="name"
      orderBy={{ column: "created_at", ascending: false }}
      displayColumns={[
        { key: "name", label: "Client Name" },
        { key: "email", label: "Email Address" },
        { key: "phone", label: "Phone" },
        { key: "city", label: "City" },
        { key: "state", label: "State" },
        { key: "created_at", label: "Joined Date", render: (r) => new Date(r.created_at as string).toLocaleDateString() }
      ]}
      fields={[
        { key: "name", label: "Client Name", type: "text", required: true },
        { key: "email", label: "Email Address", type: "text", required: true },
        { key: "phone", label: "Phone", type: "text" },
        { key: "address_line1", label: "Address line 1", type: "text", colSpan: 2 },
        { key: "city", label: "City", type: "text" },
        { key: "state", label: "State", type: "text" },
        { key: "postal_code", label: "Postal PIN Code", type: "text" }
      ]}
    />
  ),
});
