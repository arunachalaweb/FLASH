import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { gt as Clock, j as Phone, yt as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as Header, t as Footer } from "./Footer-CTni8_Gt.mjs";
import { n as PageHero, t as FooterCTA } from "./PageHero-BAvrEB2y.mjs";
import { t as ContactForm } from "./ContactForm-C_CK_D-j.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote-DYPIJpor.js
var import_jsx_runtime = require_jsx_runtime();
var perks = [
	{
		icon: CircleCheck,
		title: "Free site survey",
		desc: "Our engineer visits your site at no cost to measure roof, shade and load."
	},
	{
		icon: Clock,
		title: "48-hour proposal",
		desc: "Detailed technical + commercial proposal within two business days."
	},
	{
		icon: Phone,
		title: "One-on-one advisory",
		desc: "A dedicated engineer walks you through subsidies, financing and payback."
	}
];
function QuotePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { overlay: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				title: "Get a Free Quote",
				crumb: "Free Quote",
				tagline: "Tell us about your site — we'll respond with a personalised solar proposal within 48 hours."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-16 md:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 md:px-6 grid lg:grid-cols-[1fr_1.1fr] gap-10 items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-primary font-semibold text-sm flex items-center gap-2 tracking-widest",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }), " HOW IT WORKS"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy leading-tight",
							children: [
								"Zero obligation.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
									children: "Zero pressure."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted-foreground max-w-md",
							children: "Just an honest assessment of what solar can do for your bills, your roof and your business."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 space-y-4",
							children: perks.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-[0_15px_40px_-20px_hsl(var(--primary)/0.5)] transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "h-5 w-5" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display font-semibold text-brand-navy",
									children: p.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-1 text-sm text-muted-foreground leading-relaxed",
									children: p.desc
								})] })]
							}, p.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 rounded-2xl bg-brand-navy-deep text-white p-5 flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-6 w-6 text-primary shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-white/60",
									children: "Prefer to call?"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+919150011428",
									className: "font-display text-lg font-bold hover:text-primary transition",
									children: "+91 91500 11428"
								})]
							})]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, { mode: "quote" })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCTA, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { QuotePage as component };
