import { n as Header, t as Footer } from "./Footer-CTni8_Gt.js";
import { n as PageHero, t as FooterCTA } from "./PageHero-BAvrEB2y.js";
import { t as ProjectsGallery } from "./ProjectsGallery-DPP5PD0n.js";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/routes/projects.tsx?tsr-split=component
function ProjectsPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-background text-foreground font-sans",
		children: [
			/* @__PURE__ */ jsx(Header, { overlay: true }),
			/* @__PURE__ */ jsx(PageHero, {
				title: "Our Projects",
				crumb: "Projects",
				tagline: "A curated look at recent installations. Tap any tile for full project details."
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "relative overflow-hidden bg-brand-navy-deep text-white py-20",
				children: [
					/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" }),
					/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/15 blur-3xl" }),
					/* @__PURE__ */ jsx("div", {
						className: "relative mx-auto max-w-7xl px-4 md:px-6",
						children: /* @__PURE__ */ jsx(ProjectsGallery, {})
					})
				]
			}),
			/* @__PURE__ */ jsx(FooterCTA, {}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { ProjectsPage as component };
