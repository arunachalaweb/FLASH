import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as AdminCrud } from "./AdminCrud-CIRTi2XI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms.testimonials-B_aRFief.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCrud, {
	table: "testimonials",
	title: "Testimonials",
	description: "Client testimonials shown on the homepage.",
	searchColumn: "author_name",
	displayColumns: [
		{
			key: "author_name",
			label: "Author"
		},
		{
			key: "author_role",
			label: "Role"
		},
		{
			key: "rating",
			label: "Rating"
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
			key: "author_name",
			label: "Author name",
			type: "text",
			required: true
		},
		{
			key: "author_role",
			label: "Role / company",
			type: "text"
		},
		{
			key: "author_image",
			label: "Author image",
			type: "image",
			colSpan: 2
		},
		{
			key: "quote",
			label: "Quote",
			type: "textarea",
			colSpan: 2,
			required: true
		},
		{
			key: "rating",
			label: "Rating (1-5)",
			type: "number"
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
