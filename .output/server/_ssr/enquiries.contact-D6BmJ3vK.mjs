import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as AdminCrud } from "./AdminCrud-CIRTi2XI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquiries.contact-D6BmJ3vK.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCrud, {
	table: "contact_enquiries",
	title: "Contact Messages",
	description: "Enquiries submitted via the site contact form.",
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
			key: "subject",
			label: "Service Interested In"
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
			key: "subject",
			label: "Service Interested In",
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
			],
			colSpan: 2
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
