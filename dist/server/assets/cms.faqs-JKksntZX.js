import { t as AdminCrud } from "./AdminCrud-BmjzEr2Y.js";
import { jsx } from "react/jsx-runtime";
//#region src/routes/_authenticated/admin/cms.faqs.tsx?tsr-split=component
var SplitComponent = () => /* @__PURE__ */ jsx(AdminCrud, {
	table: "faqs",
	title: "FAQs",
	description: "Frequently asked questions grouped by category.",
	searchColumn: "question",
	displayColumns: [
		{
			key: "category",
			label: "Category"
		},
		{
			key: "question",
			label: "Question"
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
			key: "category",
			label: "Category",
			type: "text",
			placeholder: "General, Pricing..."
		},
		{
			key: "question",
			label: "Question",
			type: "text",
			required: true,
			colSpan: 2
		},
		{
			key: "answer",
			label: "Answer",
			type: "textarea",
			colSpan: 2,
			required: true
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
