import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/enquiries/contact")({
  head: () => ({ meta: [{ title: "Contact Messages | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="contact_enquiries"
      title="Contact Messages"
      description="Enquiries submitted via the site contact form."
      searchColumn="name"
      orderBy={{ column: "created_at", ascending: false }}
      displayColumns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "subject", label: "Service Interested In" },
        { key: "status", label: "Status" },
        {
          key: "created_at",
          label: "Received",
          render: (r) => new Date(r.created_at as string).toLocaleString(),
        },
      ]}
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "email", label: "Email", type: "text", required: true },
        { key: "phone", label: "Phone", type: "text" },
        { 
          key: "subject", 
          label: "Service Interested In", 
          type: "select",
          options: [
            { value: "Rooftop Solar", label: "Rooftop Solar" },
            { value: "Ground-Mounted Solar", label: "Ground-Mounted Solar" },
            { value: "Industrial Solar", label: "Industrial Solar" },
            { value: "Solar Water Pump", label: "Solar Water Pump" },
            { value: "Battery Storage", label: "Battery Storage" },
            { value: "AMC / O&M", label: "AMC / O&M" },
          ],
          colSpan: 2 
        },
        { key: "message", label: "Message", type: "textarea" },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "new", label: "New" },
            { value: "in_progress", label: "In progress" },
            { value: "resolved", label: "Resolved" },
            { value: "archived", label: "Archived" },
          ],
        },
        { key: "admin_notes", label: "Admin notes", type: "textarea" },
      ]}
    />
  ),
});
