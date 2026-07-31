import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminCrud } from "@/components/admin/AdminCrud";

function ContactEnquiriesPage() {
  const [staffOptions, setStaffOptions] = useState<{ value: string; label: string }[]>([]);
  const [staffMap, setStaffMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    const isDev = import.meta.env.DEV;
    const BACKEND_URL = isDev ? "http://localhost:4000" : "";
    fetch(`${BACKEND_URL}/api/team_members`, {
      headers: {
        ...(token ? { authorization: `Bearer ${token}` } : {})
      }
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setStaffOptions([
            { value: "", label: "Unassigned / Admin" },
            ...data.map((m: any) => ({ value: m.id, label: `${m.name} (${m.role})` }))
          ]);
          const map: Record<string, string> = {};
          data.forEach((m: any) => { map[m.id] = m.name; });
          setStaffMap(map);
        }
      })
      .catch(console.error);
  }, []);

  return (
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
          key: "assigned_staff_id",
          label: "Assigned To",
          render: (r) => {
            const sid = r.assigned_staff_id as string;
            return sid ? staffMap[sid] || "Staff" : "Admin";
          }
        },
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
        {
          key: "assigned_staff_id",
          label: "Assign/Forward to Staff",
          type: "select",
          options: staffOptions
        },
        { key: "admin_notes", label: "Admin notes", type: "textarea" },
      ]}
    />
  );
}

export const Route = createFileRoute("/_authenticated/admin/enquiries/contact")({
  head: () => ({ meta: [{ title: "Contact Messages | Flash Admin" }] }),
  component: ContactEnquiriesPage
});
