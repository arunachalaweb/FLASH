import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { C as Shield, K as Leaf, ht as Clock, jt as Award, nt as Headset, s as Users, yt as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as Header, t as Footer } from "./Footer-C7UDJlwR.mjs";
import { n as PageHero, t as FooterCTA } from "./PageHero-BAvrEB2y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/why-us-BlKuY1Xr.js
var import_jsx_runtime = require_jsx_runtime();
var reasons = [
	{
		icon: Users,
		title: "Experienced Engineering Team",
		desc: "Twenty-five plus solar engineers with hundreds of MW commissioned across sectors."
	},
	{
		icon: Shield,
		title: "MNRE-Compliant Solutions",
		desc: "Every design, module and inverter meets MNRE and BIS requirements out of the box."
	},
	{
		icon: Award,
		title: "High-Quality Components",
		desc: "Tier-1 modules, IEC-certified inverters, hot-dip galvanised structures — nothing else."
	},
	{
		icon: Clock,
		title: "Timely Project Delivery",
		desc: "Milestone-driven schedules with weekly progress reporting and on-time commissioning."
	},
	{
		icon: Headset,
		title: "24×7 Customer Support",
		desc: "Real remote O&M — you hear from us before you notice a performance dip."
	},
	{
		icon: Leaf,
		title: "Warranty & AMC Services",
		desc: "25-year panel warranty and flexible AMC packages to protect your yield long-term."
	}
];
function WhyUsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { overlay: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				title: "Why Choose Us",
				crumb: "Why Us",
				tagline: "Engineering-led solar EPC with proven delivery across every sector."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-2xl",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-primary font-semibold text-sm flex items-center gap-2 tracking-widest",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }), " WHY FLASH"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-3 font-display text-3xl md:text-5xl font-bold text-brand-navy leading-tight",
								children: [
									"A partner you can",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
										children: "count on"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground",
								children: "Six reasons India's homes, factories and utilities pick Flash for their solar journey."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
						children: reasons.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "group rounded-2xl border border-border bg-white p-7 shadow-[0_10px_30px_-15px_hsl(var(--brand-navy)/0.2)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_25px_60px_-20px_hsl(var(--primary)/0.45)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-14 w-14 rounded-xl grid place-items-center bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.6)] group-hover:scale-110 transition-transform duration-500",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(r.icon, {
										className: "h-6 w-6",
										strokeWidth: 2.25
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-5 font-display text-lg font-semibold text-brand-navy",
									children: r.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground leading-relaxed",
									children: r.desc
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-4 flex items-center gap-2 text-primary text-xs font-semibold uppercase tracking-wider",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Included in every project"]
								})
							]
						}, r.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCTA, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { WhyUsPage as component };
