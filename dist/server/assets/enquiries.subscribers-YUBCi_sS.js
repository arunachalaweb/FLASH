import { t as AdminCrud } from "./AdminCrud-BmjzEr2Y.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_authenticated/admin/enquiries.subscribers.tsx?tsr-split=component
var SplitComponent = () => /* @__PURE__ */ jsx(AdminCrud, {
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
