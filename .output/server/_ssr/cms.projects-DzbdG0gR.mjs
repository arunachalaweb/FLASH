import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { t as AdminCrud } from "./AdminCrud-CIRTi2XI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms.projects-DzbdG0gR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProjectsCms() {
	const [staffOptions, setStaffOptions] = (0, import_react.useState)([]);
	const BACKEND_URL = "https://seagreen-mongoose-262998.hostingersite.com";
	(0, import_react.useEffect)(() => {
		async function loadStaff() {
			try {
				const token = localStorage.getItem("admin_token");
				const res = await fetch(`${BACKEND_URL}/api/team_members`, { headers: token ? { authorization: `Bearer ${token}` } : {} });
				if (res.ok) {
					const options = (await res.json()).map((m) => ({
						value: m.id,
						label: m.name + (m.role ? ` (${m.role})` : "")
					}));
					setStaffOptions(options);
				}
			} catch (err) {
				console.error("Failed to load staff list", err);
			}
		}
		loadStaff();
	}, [BACKEND_URL]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCrud, {
		table: "projects",
		title: "Projects",
		description: "Portfolio projects displayed in the gallery.",
		searchColumn: "title",
		displayColumns: [
			{
				key: "title",
				label: "Title"
			},
			{
				key: "sector",
				label: "Sector"
			},
			{
				key: "location",
				label: "Location"
			},
			{
				key: "capacity",
				label: "Capacity"
			},
			{
				key: "status",
				label: "Status",
				render: (r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${r.status === "completed" ? "bg-green-50 text-green-700 border border-green-200" : r.status === "in_progress" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`,
					children: r.status === "completed" ? "Completed" : r.status === "in_progress" ? "In Progress" : "Pending"
				})
			},
			{
				key: "progress_percent",
				label: "Progress",
				render: (r) => `${r.progress_percent || 0}%`
			},
			{
				key: "published",
				label: "Published",
				render: (r) => r.published ? "Yes" : "No"
			}
		],
		fields: [
			{
				key: "title",
				label: "Title",
				type: "text",
				required: true
			},
			{
				key: "slug",
				label: "Slug",
				type: "text",
				required: true
			},
			{
				key: "sector",
				label: "Sector",
				type: "text",
				placeholder: "Commercial / Residential..."
			},
			{
				key: "location",
				label: "Location",
				type: "text"
			},
			{
				key: "capacity",
				label: "Capacity",
				type: "text",
				placeholder: "e.g. 250 kWp"
			},
			{
				key: "completion_date",
				label: "Completion date",
				type: "date"
			},
			{
				key: "assigned_staff_id",
				label: "Assigned Staff / Installer",
				type: "select",
				options: staffOptions
			},
			{
				key: "status",
				label: "Installation Status",
				type: "select",
				options: [
					{
						value: "pending",
						label: "Pending"
					},
					{
						value: "in_progress",
						label: "In Progress"
					},
					{
						value: "completed",
						label: "Completed"
					}
				]
			},
			{
				key: "progress_percent",
				label: "Progress Percentage (0-100)",
				type: "number"
			},
			{
				key: "installation_instructions",
				label: "Installation Instructions / Details",
				type: "textarea",
				colSpan: 2
			},
			{
				key: "description",
				label: "Description",
				type: "textarea",
				colSpan: 2
			},
			{
				key: "featured_image",
				label: "Featured image",
				type: "image",
				colSpan: 2
			},
			{
				key: "gallery_images",
				label: "Gallery",
				type: "array",
				colSpan: 2
			},
			{
				key: "sort_order",
				label: "Sort order",
				type: "number"
			},
			{
				key: "published",
				label: "Published",
				type: "boolean"
			}
		]
	});
}
//#endregion
export { ProjectsCms as component };
