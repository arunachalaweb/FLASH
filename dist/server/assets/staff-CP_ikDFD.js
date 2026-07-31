import { t as AdminCrud } from "./AdminCrud-BmjzEr2Y.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_authenticated/admin/staff.tsx?tsr-split=component
var SplitComponent = () => /* @__PURE__ */ jsx(AdminCrud, {
	table: "admin_users",
	title: "Staff Users",
	description: "Manage system administrators and staff editor accounts.",
	searchColumn: "username",
	orderBy: {
		column: "created_at",
		ascending: true
	},
	displayColumns: [
		{
			key: "username",
			label: "Username"
		},
		{
			key: "full_name",
			label: "Full Name",
			render: (r) => r.full_name || "—"
		},
		{
			key: "email",
			label: "Email",
			render: (r) => r.email || "—"
		},
		{
			key: "phone",
			label: "Phone",
			render: (r) => r.phone || "—"
		},
		{
			key: "role",
			label: "Role",
			render: (r) => /* @__PURE__ */ jsx("span", {
				className: `inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${r.role === "admin" ? "bg-purple-50 text-purple-700 border border-purple-200" : "bg-blue-50 text-blue-700 border border-blue-200"}`,
				children: r.role === "admin" ? "Administrator" : "Editor"
			})
		},
		{
			key: "active",
			label: "Status",
			render: (r) => /* @__PURE__ */ jsx("span", {
				className: `inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${r.active === true || r.active === "true" || r.active === 1 ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"}`,
				children: r.active === true || r.active === "true" || r.active === 1 ? "Active" : "Suspended"
			})
		},
		{
			key: "created_at",
			label: "Joined",
			render: (r) => new Date(r.created_at).toLocaleDateString()
		}
	],
	fields: [
		{
			key: "username",
			label: "Username",
			type: "text",
			required: true
		},
		{
			key: "password",
			label: "Password",
			type: "password",
			required: true
		},
		{
			key: "full_name",
			label: "Full Name",
			type: "text"
		},
		{
			key: "email",
			label: "Email Address",
			type: "text"
		},
		{
			key: "phone",
			label: "Phone Number",
			type: "text"
		},
		{
			key: "role",
			label: "System Role",
			type: "select",
			required: true,
			options: [{
				value: "admin",
				label: "Administrator"
			}, {
				value: "editor",
				label: "Content Editor"
			}]
		},
		{
			key: "active",
			label: "Account Status",
			type: "select",
			required: true,
			options: [{
				value: "true",
				label: "Active"
			}, {
				value: "false",
				label: "Suspended"
			}]
		}
	]
});
//#endregion
export { SplitComponent as component };
