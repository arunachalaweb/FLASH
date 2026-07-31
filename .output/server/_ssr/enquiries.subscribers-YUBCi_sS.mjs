import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as AdminCrud } from "./AdminCrud-BmjzEr2Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enquiries.subscribers-YUBCi_sS.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCrud, {
	table: "newsletter_subscribers",
	title: "Newsletter Subscribers",
	description: "People subscribed via the footer newsletter.",
	searchColumn: "email",
	orderBy: {
		column: "created_at",
		ascending: false
	},
	displayColumns: [
		{
			key: "email",
			label: "Email"
		},
		{
			key: "active",
			label: "Active",
			render: (r) => r.active ? "Yes" : "No"
		},
		{
			key: "created_at",
			label: "Subscribed",
			render: (r) => new Date(r.created_at).toLocaleString()
		}
	],
	fields: [{
		key: "email",
		label: "Email",
		type: "text",
		required: true,
		colSpan: 2
	}, {
		key: "active",
		label: "Active",
		type: "boolean",
		placeholder: "Subscribed"
	}]
});
//#endregion
export { SplitComponent as component };
