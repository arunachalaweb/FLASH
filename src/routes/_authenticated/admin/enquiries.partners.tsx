import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { AdminCrud } from "@/components/admin/AdminCrud";

function PartnerApplicationsPage() {
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
      table="partner_applications"
      title="Channel Partner Applications"
      description="Businesses and individuals who applied to the Flash Channel Partner Programme."
      searchColumn="name"
      orderBy={{ column: "created_at", ascending: false }}
      displayColumns={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "business_name", label: "Business" },
        { key: "partner_type", label: "Partner Type" },
        {
          key: "district",
          label: "Location",
          render: (r) => `${r.district}, ${r.state}`,
        },
        {
          key: "status",
          label: "Status",
          render: (r) => {
            const statusMap: Record<string, { label: string; color: string }> = {
              new: { label: "New", color: "bg-amber-100 text-amber-800" },
              under_review: { label: "Under Review", color: "bg-blue-100 text-blue-800" },
              approved: { label: "Approved", color: "bg-green-100 text-green-800" },
              rejected: { label: "Rejected", color: "bg-red-100 text-red-700" },
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
          label: "Applied",
          render: (r) => new Date(r.created_at as string).toLocaleString(),
        },
      ]}
      fields={[
        { key: "name", label: "Full Name", type: "text", required: true },
        { key: "email", label: "Email", type: "text", required: true },
        { key: "phone", label: "Phone", type: "text", required: true },
        { key: "business_name", label: "Business Name", type: "text", required: true },
        {
          key: "business_type",
          label: "Business Type",
          type: "select",
          options: [
            { value: "Proprietorship", label: "Proprietorship" },
            { value: "Partnership Firm", label: "Partnership Firm" },
            { value: "LLP", label: "LLP" },
            { value: "Private Limited", label: "Private Limited" },
            { value: "Individual / Freelancer", label: "Individual / Freelancer" },
          ],
        },
        {
          key: "partner_type",
          label: "Partner Type",
          type: "select",
          options: [
            { value: "Sales / Referral Partner", label: "Sales / Referral Partner" },
            { value: "Installation / Technical Partner", label: "Installation / Technical Partner" },
            { value: "Distribution Partner", label: "Distribution Partner" },
            { value: "Turnkey EPC Sub-Partner", label: "Turnkey EPC Sub-Partner" },
          ],
        },
        { key: "state", label: "Operating State", type: "text" },
        { key: "district", label: "District / City", type: "text" },
        {
          key: "experience",
          label: "Industry Experience",
          type: "select",
          options: [
            { value: "No prior experience (willing to learn)", label: "No prior experience" },
            { value: "Less than 1 year", label: "Less than 1 year" },
            { value: "1–3 years", label: "1–3 years" },
            { value: "3–5 years", label: "3–5 years" },
            { value: "5+ years", label: "5+ years" },
          ],
        },
        { key: "message", label: "About / Notes", type: "textarea", colSpan: 2 },
        {
          key: "status",
          label: "Application Status",
          type: "select",
          options: [
            { value: "new", label: "New" },
            { value: "under_review", label: "Under Review" },
            { value: "approved", label: "Approved" },
            { value: "rejected", label: "Rejected" },
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

export const Route = createFileRoute("/_authenticated/admin/enquiries/partners")({
  head: () => ({ meta: [{ title: "Partner Applications | Flash Admin" }] }),
  component: PartnerApplicationsPage,
});
