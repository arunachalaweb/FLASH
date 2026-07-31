import { n as Header, t as Footer } from "./Footer-CTni8_Gt.js";
import { n as PageHero, t as FooterCTA } from "./PageHero-BAvrEB2y.js";
import { t as ContactForm } from "./ContactForm-C_CK_D-j.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
//#region src/routes/contact.tsx?tsr-split=component
function ContactPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-background text-foreground font-sans",
		children: [
			/* @__PURE__ */ jsx(Header, { overlay: true }),
			/* @__PURE__ */ jsx(PageHero, {
				title: "Contact Us",
				crumb: "Contact",
				tagline: "Free site assessment and a personalised proposal — no obligations."
			}),
			/* @__PURE__ */ jsx("section", {
				className: "relative py-20 bg-background",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-3 gap-8 items-start",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("p", {
								className: "text-primary font-semibold text-sm flex items-center gap-2 tracking-widest",
								children: [
									/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" }),
									" ",
									"REACH US"
								]
							}),
							/* @__PURE__ */ jsxs("h2", {
								className: "mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy leading-tight",
								children: [
									"Let's Switch to",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
										children: "Clean Energy"
									}),
									" ",
									"Together"
								]
							}),
							/* @__PURE__ */ jsxs("ul", {
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
								].map(({ icon: Icon, label, href }) => /* @__PURE__ */ jsxs("li", {
									className: "group flex items-center gap-3 rounded-xl border border-brand-navy/10 bg-white px-4 py-3 hover:border-primary/50 hover:shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.5)] transition",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep",
										children: /* @__PURE__ */ jsx(Icon, { className: "h-4 w-4" })
									}), href ? /* @__PURE__ */ jsx("a", {
										href,
										className: "font-medium text-brand-navy group-hover:text-primary transition",
										children: label
									}) : /* @__PURE__ */ jsx("span", {
										className: "font-medium text-brand-navy",
										children: label
									})]
								}, label)), /* @__PURE__ */ jsxs("li", {
									className: "flex gap-3 rounded-xl border border-brand-navy/10 bg-white px-4 py-3",
									children: [/* @__PURE__ */ jsx("span", {
										className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep",
										children: /* @__PURE__ */ jsx(MapPin, { className: "h-4 w-4" })
									}), /* @__PURE__ */ jsx("span", {
										className: "text-sm leading-relaxed text-brand-navy/85 text-left",
										children: "FLASH STORAGE Door No.7, Plot No.102, Manirajan Street, Janaki Nagar, Alwarthirunagar, Valasaravakkam, Chennai, Tamil Nadu – 600087"
									})]
								})]
							})
						] }),
						/* @__PURE__ */ jsx(ContactForm, {}),
						/* @__PURE__ */ jsxs("div", {
							className: "rounded-2xl overflow-hidden relative min-h-[420px] border border-brand-navy/10 shadow-[0_25px_60px_-30px_hsl(var(--brand-navy)/0.4)]",
							children: [/* @__PURE__ */ jsx("iframe", {
								title: "Flash Renewable Energy Solutions location",
								src: "https://www.google.com/maps?q=Valasaravakkam,+Chennai,+Tamil+Nadu&output=embed",
								className: "absolute inset-0 h-full w-full border-0",
								loading: "lazy"
							}), /* @__PURE__ */ jsxs("div", {
								className: "absolute top-4 left-4 max-w-[240px] rounded-xl bg-brand-navy-deep/95 backdrop-blur text-white p-4 text-xs leading-relaxed border border-white/10",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-primary font-semibold mb-1 tracking-wider",
									children: "OUR LOCATION"
								}), "FLASH STORAGE, Door No.7, Valasaravakkam, Chennai – 600087"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsx(FooterCTA, {}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { ContactPage as component };
