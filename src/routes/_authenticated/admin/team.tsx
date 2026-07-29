import { createFileRoute } from "@tanstack/react-router";
import { AdminCrud } from "@/components/admin/AdminCrud";

export const Route = createFileRoute("/_authenticated/admin/team")({
  head: () => ({ meta: [{ title: "Team CMS | Flash Admin" }] }),
  component: () => (
    <AdminCrud
      table="team_members"
      title="Team & Staff Members"
      description="Manage the company team list, full biodata portfolios, and login credentials."
      searchColumn="name"
      orderBy={{ column: "sort_order", ascending: true }}
      displayColumns={[
        { key: "name", label: "Name" },
        { key: "role", label: "Role" },
        { key: "email", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "domain_core", label: "Core Domain", render: (r) => r.domain_core || "—" },
        { key: "joining_date", label: "Joined", render: (r) => r.joining_date ? new Date(r.joining_date as string).toLocaleDateString() : "—" },
        { key: "published", label: "Published", render: (r) => (r.published ? "Yes" : "No") },
      ]}
      fields={[
        { key: "name", label: "Full Name", type: "text", required: true },
        { key: "role", label: "Company Role / Title", type: "text", required: true, placeholder: "e.g. Lead Installation Engineer" },
        { key: "email", label: "Email Address", type: "text" },
        { key: "phone", label: "Phone Number", type: "text" },
        { key: "photo_url", label: "Profile Photo URL", type: "image", colSpan: 2 },
        { key: "bio", label: "Short Professional Bio", type: "textarea", colSpan: 2 },
        
        // Biodata Fields
        { key: "domain_core", label: "Core Specialization Domain", type: "text", placeholder: "e.g. Solar PV Commissioning, High Voltage Systems" },
        { key: "education", label: "Education & Qualifications", type: "text", placeholder: "e.g. B.Tech in Electrical Engineering" },
        { key: "experience", label: "Work Experience Summary", type: "text", placeholder: "e.g. 5+ Years in Grid-tied Solar System Design" },
        { key: "dob", label: "Date of Birth", type: "date" },
        { key: "joining_date", label: "Joining Date", type: "date" },
        { key: "address", label: "Residential Address", type: "text", colSpan: 2 },
        
        // Login Credentials
        { key: "username", label: "System Login Username", type: "text", placeholder: "For login, e.g. rajesh_solar" },
        { key: "password", label: "System Login Password", type: "password", placeholder: "Create secure staff password" },
        
        { key: "sort_order", label: "Sort Order", type: "number" },
        { key: "published", label: "Show on Public Site", type: "boolean" },
      ]}
    />
  ),
});
