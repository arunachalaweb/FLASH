import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as AdminCrud } from "./AdminCrud-BmjzEr2Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms.slides-h3SoqJrw.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCrud, {
	table: "hero_slides",
	title: "Hero Banner Sliders",
	description: "Manage background banner images and overlay text for main page hero sections.",
	searchColumn: "title",
	orderBy: {
		column: "sort_order",
		ascending: true
	},
	displayColumns: [
		{
			key: "page_slug",
			label: "Page"
		},
		{
			key: "title",
			label: "Title"
		},
		{
			key: "image_url",
			label: "Image",
			render: (row) => {
				const src = row.image_url ? row.image_url.startsWith("/") ? `${row.image_url}` : row.image_url : "";
				return src ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					className: "w-16 h-10 object-cover rounded",
					alt: "Slide"
				}) : null;
			}
		},
		{
			key: "sort_order",
			label: "Order"
		}
	],
	fields: [
		{
			key: "page_slug",
			label: "Page slug",
			type: "text",
			required: true,
			placeholder: "home, services..."
		},
		{
			key: "title",
			label: "Title",
			type: "text",
			colSpan: 2
		},
		{
			key: "subtitle",
			label: "Subtitle/Description",
			type: "textarea",
			colSpan: 2
		},
		{
			key: "image_url",
			label: "Slide Image",
			type: "image",
			required: true,
			colSpan: 2
		},
		{
			key: "button_text",
			label: "Button Label",
			type: "text"
		},
		{
			key: "button_link",
			label: "Button Redirection Link",
			type: "text"
		},
		{
			key: "sort_order",
			label: "Display Order",
			type: "number",
			required: true
		}
	]
});
//#endregion
export { SplitComponent as component };
