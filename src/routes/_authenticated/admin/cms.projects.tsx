import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/cms/projects")({
  head: () => ({ meta: [{ title: "Projects CMS | Flash Admin" }] }),
  component: ProjectsCms,
});

function ProjectsCms() {
  const [staffOptions, setStaffOptions] = useState<Array<{ value: string; label: string }>>([]);
  const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL as string) || "http://localhost:4000";

  useEffect(() => {
    async function loadStaff() {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${BACKEND_URL}/api/team_members`, {
          headers: token ? { authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          const options = data.map((m: any) => ({
            value: m.id,
            label: m.name + (m.role ? ` (${m.role})` : ""),
          }));
          setStaffOptions(options);
        }
      } catch (err) {
        console.error("Failed to load staff list", err);
      }
    }
    loadStaff();
  }, [BACKEND_URL]);

  return (
    <AdminCrud
      table="projects"
      title="Projects"
      description="Portfolio projects displayed in the gallery."
      searchColumn="title"
      displayColumns={[
        { key: "title", label: "Title" },
        { key: "sector", label: "Sector" },
        { key: "location", label: "Location" },
        { key: "capacity", label: "Capacity" },
        {
          key: "status",
          label: "Status",
          render: (r) => (
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                r.status === "completed"
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : r.status === "in_progress"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {r.status === "completed"
                ? "Completed"
                : r.status === "in_progress"
                  ? "In Progress"
                  : "Pending"}
            </span>
          ),
        },
        { key: "progress_percent", label: "Progress", render: (r) => `${r.progress_percent || 0}%` },
        { key: "published", label: "Published", render: (r) => (r.published ? "Yes" : "No") },
      ]}
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        {
          key: "sector",
          label: "Sector",
          type: "text",
          placeholder: "Commercial / Residential...",
        },
        { key: "location", label: "Location", type: "text" },
        { key: "capacity", label: "Capacity", type: "text", placeholder: "e.g. 250 kWp" },
        { key: "completion_date", label: "Completion date", type: "date" },
        {
          key: "assigned_staff_id",
          label: "Assigned Staff / Installer",
          type: "select",
          options: staffOptions,
        },
        {
          key: "status",
          label: "Installation Status",
          type: "select",
          options: [
            { value: "pending", label: "Pending" },
            { value: "in_progress", label: "In Progress" },
            { value: "completed", label: "Completed" },
          ],
        },
        { key: "progress_percent", label: "Progress Percentage (0-100)", type: "number" },
        { key: "installation_instructions", label: "Installation Instructions / Details", type: "textarea", colSpan: 2 },
        { key: "description", label: "Description", type: "textarea", colSpan: 2 },
        { key: "featured_image", label: "Featured image", type: "image", colSpan: 2 },
        { key: "gallery_images", label: "Gallery", type: "array", colSpan: 2 },
        { key: "sort_order", label: "Sort order", type: "number" },
        { key: "published", label: "Published", type: "boolean" },
      ]}
    />
  );
}
