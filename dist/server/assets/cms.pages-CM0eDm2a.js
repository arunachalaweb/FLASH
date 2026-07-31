import { t as AdminCrud } from "./AdminCrud-BmjzEr2Y.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_authenticated/admin/cms.pages.tsx?tsr-split=component
var SplitComponent = () => /* @__PURE__ */ jsx(AdminCrud, {
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
