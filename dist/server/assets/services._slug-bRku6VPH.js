import { n as Header, t as Footer } from "./Footer-CTni8_Gt.js";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowLeft } from "lucide-react";
//#region src/routes/services.$slug.tsx?tsr-split=notFoundComponent
function ServiceNotFound() {
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-background text-foreground font-sans min-h-screen",
		children: [
			/* @__PURE__ */ jsx(Header, {}),
			/* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-3xl px-4 py-32 text-center",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "font-display text-4xl font-bold",
						children: "Service not found"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-4 text-muted-foreground",
						children: "The service you're looking for doesn't exist."
					}),
					/* @__PURE__ */ jsxs(Link, {
						to: "/services",
						className: "mt-8 inline-flex items-center gap-2 text-primary font-semibold",
						children: [/* @__PURE__ */ jsx(ArrowLeft, { className: "h-4 w-4" }), " Back to Services"]
					})
				]
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { ServiceNotFound as notFoundComponent };
