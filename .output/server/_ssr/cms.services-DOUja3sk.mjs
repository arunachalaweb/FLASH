import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as AdminCrud } from "./AdminCrud-CIRTi2XI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms.services-DOUja3sk.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCrud, {
	table: "services",
	title: "Services",
	description: "Manage the services shown on the site.",
	searchColumn: "title",
	displayColumns: [
		{
			key: "title",
			label: "Title"
		},
		{
			key: "slug",
			label: "Slug"
		},
		{
			key: "sort_order",
			label: "Order"
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
			required: true,
			placeholder: "solar-rooftop"
		},
		{
			key: "icon_name",
			label: "Icon (lucide)",
			type: "text"
		},
		{
			key: "short_description",
			label: "Short description",
			type: "textarea",
			colSpan: 2
		},
		{
			key: "long_description",
			label: "Long description",
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
			label: "Gallery images",
			type: "array",
			colSpan: 2,
			placeholder: "URLs, comma separated"
		},
		{
			key: "benefits",
			label: "Benefits",
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
//#endregion
export { SplitComponent as component };
