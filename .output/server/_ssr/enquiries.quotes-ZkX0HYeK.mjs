import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as AdminCrud } from "./AdminCrud-BmjzEr2Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquiries.quotes-ZkX0HYeK.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCrud, {
	table: "quote_requests",
	title: "Quote Requests",
	description: "Free quote requests from prospective clients.",
	searchColumn: "name",
	orderBy: {
		column: "created_at",
		ascending: false
	},
	displayColumns: [
		{
			key: "name",
			label: "Name"
		},
		{
			key: "email",
			label: "Email"
		},
		{
			key: "phone",
			label: "Phone"
		},
		{
			key: "service_type",
			label: "Service"
		},
		{
			key: "load_kw",
			label: "Load kW"
		},
		{
			key: "city",
			label: "City"
		},
		{
			key: "status",
			label: "Status"
		},
		{
			key: "created_at",
			label: "Received",
			render: (r) => new Date(r.created_at).toLocaleString()
		}
	],
	fields: [
		{
			key: "name",
			label: "Name",
			type: "text",
			required: true
		},
		{
			key: "email",
			label: "Email",
			type: "text",
			required: true
		},
		{
			key: "phone",
			label: "Phone",
			type: "text"
		},
		{
			key: "service_type",
			label: "Service type",
			type: "select",
			options: [
				{
					value: "Rooftop Solar",
					label: "Rooftop Solar"
				},
				{
					value: "Ground-Mounted Solar",
					label: "Ground-Mounted Solar"
				},
				{
					value: "Industrial Solar",
					label: "Industrial Solar"
				},
				{
					value: "Solar Water Pump",
					label: "Solar Water Pump"
				},
				{
					value: "Battery Storage",
					label: "Battery Storage"
				},
				{
					value: "AMC / O&M",
					label: "AMC / O&M"
				}
			]
		},
		{
			key: "load_kw",
			label: "Load kW",
			type: "text"
		},
		{
			key: "city",
			label: "City",
			type: "text"
		},
		{
			key: "budget",
			label: "Budget",
			type: "text"
		},
		{
			key: "property_type",
			label: "Property type",
			type: "select",
			options: [
				{
					value: "Residential",
					label: "Residential"
				},
				{
					value: "Commercial",
					label: "Commercial"
				},
				{
					value: "Industrial",
					label: "Industrial"
				},
				{
					value: "Agricultural",
					label: "Agricultural"
				}
			]
		},
		{
			key: "message",
			label: "Message",
			type: "textarea"
		},
		{
			key: "status",
			label: "Status",
			type: "select",
			options: [
				{
					value: "new",
					label: "New"
				},
				{
					value: "in_progress",
					label: "In progress"
				},
				{
					value: "resolved",
					label: "Resolved"
				},
				{
					value: "archived",
					label: "Archived"
				}
			]
		},
		{
			key: "admin_notes",
			label: "Admin notes",
			type: "textarea"
		}
	]
});
//#endregion
export { SplitComponent as component };
