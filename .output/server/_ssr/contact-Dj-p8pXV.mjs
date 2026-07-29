import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { M as Phone, R as MapPin, ot as Globe, z as Mail } from "../_libs/lucide-react.mjs";
import { n as Header, t as Footer } from "./Footer-C7UDJlwR.mjs";
import { n as PageHero, t as FooterCTA } from "./PageHero-BAvrEB2y.mjs";
import { t as ContactForm } from "./ContactForm-DvHR0C-O.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-Dj-p8pXV.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { overlay: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHero, {
				title: "Contact Us",
				crumb: "Contact",
				tagline: "Free site assessment and a personalised proposal — no obligations."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative py-20 bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-3 gap-8 items-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-primary font-semibold text-sm flex items-center gap-2 tracking-widest",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" }),
									" ",
									"REACH US"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy leading-tight",
								children: [
									"Let's Switch to",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
										children: "Clean Energy"
									}),
									" ",
									"Together"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-8 space-y-3 text-sm",
								children: [[
									{
										icon: Phone,
										label: "+91 91500 11428",
										href: "tel:+919150011428"
									},
									{
										icon: Mail,
										label: "info@flashrenewable.com",
										href: "mailto:info@flashrenewable.com"
									},
									{
										icon: Globe,
										label: "www.flashrenewable.com"
									}
								].map(({ icon: Icon, label, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "group flex items-center gap-3 rounded-xl border border-brand-navy/10 bg-white px-4 py-3 hover:border-primary/50 hover:shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.5)] transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
									}), href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href,
										className: "font-medium text-brand-navy group-hover:text-primary transition",
										children: label
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-brand-navy",
										children: label
									})]
								}, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3 rounded-xl border border-brand-navy/10 bg-white px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm leading-relaxed text-brand-navy/85 text-left",
										children: "FLASH STORAGE Door No.7, Plot No.102, Manirajan Street, Janaki Nagar, Alwarthirunagar, Valasaravakkam, Chennai, Tamil Nadu – 600087"
									})]
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl overflow-hidden relative min-h-[420px] border border-brand-navy/10 shadow-[0_25px_60px_-30px_hsl(var(--brand-navy)/0.4)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								title: "Flash Renewable Energy Solutions location",
								src: "https://www.google.com/maps?q=Valasaravakkam,+Chennai,+Tamil+Nadu&output=embed",
								className: "absolute inset-0 h-full w-full border-0",
								loading: "lazy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-4 left-4 max-w-[240px] rounded-xl bg-brand-navy-deep/95 backdrop-blur text-white p-4 text-xs leading-relaxed border border-white/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-primary font-semibold mb-1 tracking-wider",
									children: "OUR LOCATION"
								}), "FLASH STORAGE, Door No.7, Valasaravakkam, Chennai – 600087"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCTA, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { ContactPage as component };
