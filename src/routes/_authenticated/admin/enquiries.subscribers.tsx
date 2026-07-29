import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/enquiries/subscribers")({
  head: () => ({ meta: [{ title: "Newsletter | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="newsletter_subscribers"
      title="Newsletter Subscribers"
      description="People subscribed via the footer newsletter."
      searchColumn="email"
      orderBy={{ column: "created_at", ascending: false }}
      displayColumns={[
        { key: "email", label: "Email" },
        { key: "active", label: "Active", render: (r) => (r.active ? "Yes" : "No") },
        {
          key: "created_at",
          label: "Subscribed",
          render: (r) => new Date(r.created_at as string).toLocaleString(),
        },
      ]}
      fields={[
        { key: "email", label: "Email", type: "text", required: true, colSpan: 2 },
        { key: "active", label: "Active", type: "boolean", placeholder: "Subscribed" },
      ]}
    />
  ),
});
