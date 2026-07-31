import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminCrud } from "@/components/admin/AdminCrud";

function InvestorEnquiriesPage() {
  const [staffOptions, setStaffOptions] = useState<{ value: string; label: string }[]>([]);
  const [staffMap, setStaffMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    const isDev = import.meta.env.DEV;
    const BACKEND_URL = isDev ? "http://localhost:4000" : "";
    fetch(`${BACKEND_URL}/api/team_members`, {
      headers: { ...(token ? { authorization: `Bearer ${token}` } : {}) },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setStaffOptions([
            { value: "", label: "Unassigned / Admin" },
            ...data.map((m: any) => ({ value: m.id, label: `${m.name} (${m.role})` })),
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
      table="investor_enquiries"
      title="Investor Enquiries"
      description="Prospective investors who submitted the Investor Enquiry form on the Investors & Partners page."
      searchColumn="name"
      orderBy={{ column: "created_at", ascending: false }}
      displayColumns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "investment_range", label: "Investment Range" },
        { key: "investment_type", label: "Type" },
        { key: "organisation", label: "Organisation" },
        {
          key: "status",
          label: "Status",
          render: (r) => {
            const statusMap: Record<string, { label: string; color: string }> = {
              new: { label: "New", color: "bg-amber-100 text-amber-800" },
              contacted: { label: "Contacted", color: "bg-blue-100 text-blue-800" },
              qualified: { label: "Qualified", color: "bg-green-100 text-green-800" },
              closed: { label: "Closed", color: "bg-slate-100 text-slate-600" },
            };
            const s = statusMap[r.status as string] ?? { label: r.status as string, color: "bg-slate-100 text-slate-600" };
            return (
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${s.color}`}>
                {s.label}
              </span>
            );
          },
        },
        {
          key: "assigned_staff_id",
          label: "Assigned To",
          render: (r) => {
            const sid = r.assigned_staff_id as string;
            return sid ? staffMap[sid] || "Staff" : "Admin";
          },
        },
        {
          key: "created_at",
          label: "Received",
          render: (r) => new Date(r.created_at as string).toLocaleString(),
        },
      ]}
      fields={[
        { key: "name", label: "Full Name", type: "text", required: true },
        { key: "email", label: "Email", type: "text", required: true },
        { key: "phone", label: "Phone", type: "text", required: true },
        { key: "organisation", label: "Organisation / Company", type: "text" },
        {
          key: "investment_range",
          label: "Investment Range",
          type: "select",
          options: [
            { value: "₹25 Lakhs – ₹1 Crore", label: "₹25 Lakhs – ₹1 Crore" },
            { value: "₹1 Crore – ₹5 Crore", label: "₹1 Crore – ₹5 Crore" },
            { value: "₹5 Crore – ₹25 Crore", label: "₹5 Crore – ₹25 Crore" },
            { value: "₹25 Crore+", label: "₹25 Crore+" },
          ],
        },
        {
          key: "investment_type",
          label: "Investment Type",
          type: "select",
          options: [
            { value: "Equity Investment", label: "Equity Investment" },
            { value: "Mezzanine / Debt", label: "Mezzanine / Debt" },
            { value: "Non-Convertible Debentures (NCDs)", label: "Non-Convertible Debentures (NCDs)" },
            { value: "Joint Venture", label: "Joint Venture" },
            { value: "Not yet decided", label: "Not yet decided" },
          ],
        },
        {
          key: "timeline",
          label: "Investment Timeline",
          type: "select",
          options: [
            { value: "Immediately (within 1 month)", label: "Immediately (within 1 month)" },
            { value: "1–3 months", label: "1–3 months" },
            { value: "3–6 months", label: "3–6 months" },
            { value: "6 months+", label: "6 months+" },
          ],
        },
        { key: "message", label: "Additional Notes", type: "textarea", colSpan: 2 },
        {
          key: "status",
          label: "Status",
          type: "select",
          options: [
            { value: "new", label: "New" },
            { value: "contacted", label: "Contacted" },
            { value: "qualified", label: "Qualified" },
            { value: "closed", label: "Closed" },
          ],
        },
        {
          key: "assigned_staff_id",
          label: "Assign to Staff",
          type: "select",
          options: staffOptions,
        },
        { key: "admin_notes", label: "Admin Notes", type: "textarea", colSpan: 2 },
      ]}
    />
  );
}

export const Route = createFileRoute("/_authenticated/admin/enquiries/investors")({
  head: () => ({ meta: [{ title: "Investor Enquiries | Flash Admin" }] }),
  component: InvestorEnquiriesPage,
});
