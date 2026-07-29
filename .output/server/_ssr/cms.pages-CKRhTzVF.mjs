import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as AdminCrud } from "./AdminCrud-pK-ghQVB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cms.pages-CKRhTzVF.js
var import_jsx_runtime = require_jsx_runtime();
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCrud, {
	table: "page_content",
	title: "Page Content",
	description: "Edit headlines, descriptions and copy blocks.",
	searchColumn: "section_key",
	orderBy: {
		column: "page_slug",
		ascending: true
	},
	displayColumns: [
		{
			key: "page_slug",
			label: "Page"
		},
		{
			key: "section_key",
			label: "Section"
		},
		{
			key: "title",
			label: "Title"
		},
		{
			key: "subtitle",
			label: "Subtitle"
		}
	],
	fields: [
		{
			key: "page_slug",
			label: "Page slug",
			type: "text",
			required: true,
			placeholder: "home, about..."
		},
		{
			key: "section_key",
			label: "Section key",
			type: "text",
			required: true,
			placeholder: "hero, cta..."
		},
		{
			key: "title",
			label: "Title",
			type: "text",
			colSpan: 2
		},
		{
			key: "subtitle",
			label: "Subtitle",
			type: "text",
			colSpan: 2
		},
		{
			key: "body",
			label: "Body",
			type: "textarea",
			colSpan: 2
		},
		{
			key: "image_url",
			label: "Image",
			type: "image",
			colSpan: 2
		}
	]
});
//#endregion
export { SplitComponent as component };
