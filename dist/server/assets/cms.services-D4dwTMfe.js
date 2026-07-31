import { t as AdminCrud } from "./AdminCrud-BmjzEr2Y.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_authenticated/admin/cms.services.tsx?tsr-split=component
var SplitComponent = () => /* @__PURE__ */ jsx(AdminCrud, {
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
