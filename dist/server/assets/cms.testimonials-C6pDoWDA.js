import { t as AdminCrud } from "./AdminCrud-BmjzEr2Y.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_authenticated/admin/cms.testimonials.tsx?tsr-split=component
var SplitComponent = () => /* @__PURE__ */ jsx(AdminCrud, {
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
