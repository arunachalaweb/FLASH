import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Send, H as LoaderCircle, xt as CircleAlert, yt as CircleCheck } from "../_libs/lucide-react.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ContactForm-C_CK_D-j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SERVICES = [
	"Rooftop Solar",
	"Ground-Mounted Solar",
	"Industrial Solar",
	"Solar Water Pump",
	"Battery Storage",
	"AMC / O&M"
];
var schema = objectType({
	name: stringType().trim().min(2, "Please enter your full name").max(100, "Name is too long"),
	phone: stringType().trim().min(7, "Enter a valid phone number").max(20, "Phone number is too long").regex(/^[+\d\s()-]+$/, "Only digits and + ( ) - are allowed"),
	email: stringType().trim().email("Enter a valid email").max(255),
	service: stringType().min(1, "Please choose a service"),
	message: stringType().trim().min(10, "Tell us a little more (min 10 chars)").max(1e3, "Message is too long"),
	city: stringType().trim().default(""),
	budget: stringType().trim().default(""),
	load_kw: stringType().trim().default(""),
	property_type: stringType().trim().default("")
});
var initial = {
	name: "",
	phone: "",
	email: "",
	service: "",
	message: "",
	city: "",
	budget: "",
	load_kw: "",
	property_type: ""
};
function ContactForm({ mode = "contact" } = {}) {
	const [values, setValues] = (0, import_react.useState)(initial);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [status, setStatus] = (0, import_react.useState)("idle");
	function update(k, v) {
		setValues((s) => ({
			...s,
			[k]: v
		}));
		if (errors[k]) setErrors((e) => ({
			...e,
			[k]: void 0
		}));
	}
	async function onSubmit(e) {
		e.preventDefault();
		const parsed = (mode === "quote" ? schema.extend({
			city: stringType().trim().min(2, "Please enter your city/location"),
			property_type: stringType().min(1, "Please select property type")
		}) : schema).safeParse(values);
		if (!parsed.success) {
			const next = {};
			for (const issue of parsed.error.issues) {
				const k = issue.path[0];
				if (!next[k]) next[k] = issue.message;
			}
			setErrors(next);
			setStatus("error");
			toast.error("Please fix the highlighted fields");
			return;
		}
		setStatus("submitting");
		const BACKEND_URL = "";
		const useBackend = Boolean("https://seagreen-mongoose-262998.hostingersite.com");
		try {
			if (useBackend) {
				let endpoint = "";
				let payload = {};
				if (mode === "quote") {
					endpoint = "/api/quote_requests";
					payload = {
						name: parsed.data.name,
						email: parsed.data.email,
						phone: parsed.data.phone,
						service_type: parsed.data.service,
						city: parsed.data.city,
						budget: parsed.data.budget,
						load_kw: parsed.data.load_kw,
						property_type: parsed.data.property_type,
						message: parsed.data.message
					};
				} else {
					endpoint = "/api/contact_enquiries";
					payload = {
						name: parsed.data.name,
						email: parsed.data.email,
						phone: parsed.data.phone,
						subject: parsed.data.service,
						message: parsed.data.message
					};
				}
				const res = await fetch(`${BACKEND_URL}${endpoint}`, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(payload)
				});
				if (!res.ok) {
					const txt = await res.text();
					throw new Error(txt || `Request failed: ${res.status}`);
				}
			} else throw new Error("Local backend URL not configured.");
			setStatus("success");
			toast.success(mode === "quote" ? "Quote request sent! We'll reply within 48 hours." : "Enquiry sent! We'll reach out within 24 hours.");
			setValues(initial);
		} catch (err) {
			setStatus("error");
			const message = err instanceof Error ? err.message : String(err);
			toast.error(message ?? "Something went wrong. Please try again.");
		}
	}
	const inputBase = "w-full rounded-lg bg-white/5 border px-3.5 py-3 text-sm text-white placeholder:text-white/45 outline-none transition focus:bg-white/10";
	const ok = "border-white/15 focus:border-primary";
	const bad = "border-red-400/70 focus:border-red-400";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		noValidate: true,
		className: "relative rounded-2xl overflow-hidden border border-white/10 bg-brand-navy-deep p-6 md:p-8 text-white shadow-[0_25px_60px_-25px_hsl(var(--primary)/0.4)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-xl md:text-2xl font-bold",
					children: mode === "quote" ? "Request a Free Solar Quote" : "Send Us an Enquiry"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-white/60",
					children: mode === "quote" ? "Get a technical proposal & payback estimate within 48 hours." : "We respond within one business day."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Your Name",
							error: errors.name,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: values.name,
								onChange: (e) => update("name", e.target.value),
								placeholder: "Ravi Menon",
								maxLength: 100,
								autoComplete: "name",
								className: `${inputBase} ${errors.name ? bad : ok}`,
								"aria-invalid": !!errors.name
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Phone Number",
							error: errors.phone,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: values.phone,
								onChange: (e) => update("phone", e.target.value),
								placeholder: "+91 91500 11428",
								inputMode: "tel",
								maxLength: 20,
								autoComplete: "tel",
								className: `${inputBase} ${errors.phone ? bad : ok}`,
								"aria-invalid": !!errors.phone
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email Address",
							error: errors.email,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: values.email,
								onChange: (e) => update("email", e.target.value),
								placeholder: "you@company.com",
								type: "email",
								maxLength: 255,
								autoComplete: "email",
								className: `${inputBase} ${errors.email ? bad : ok}`,
								"aria-invalid": !!errors.email
							})
						}),
						mode === "quote" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "City / Location",
							error: errors.city,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: values.city,
								onChange: (e) => update("city", e.target.value),
								placeholder: "Chennai",
								maxLength: 100,
								className: `${inputBase} ${errors.city ? bad : ok}`,
								"aria-invalid": !!errors.city
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Service Interested In",
							error: errors.service,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: values.service,
								onChange: (e) => update("service", e.target.value),
								className: `${inputBase} ${errors.service ? bad : ok} appearance-none cursor-pointer`,
								"aria-invalid": !!errors.service,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									className: "text-brand-navy",
									children: "Select a service…"
								}), SERVICES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									className: "text-brand-navy",
									children: s
								}, s))]
							})
						}),
						mode === "quote" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Property / Connection Type",
							error: errors.property_type,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: values.property_type,
								onChange: (e) => update("property_type", e.target.value),
								className: `${inputBase} ${errors.property_type ? bad : ok} appearance-none cursor-pointer`,
								"aria-invalid": !!errors.property_type,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										className: "text-brand-navy",
										children: "Select a property type…"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Residential",
										className: "text-brand-navy",
										children: "Residential"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Commercial",
										className: "text-brand-navy",
										children: "Commercial"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Industrial",
										className: "text-brand-navy",
										children: "Industrial"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Agricultural",
										className: "text-brand-navy",
										children: "Agricultural"
									})
								]
							})
						}),
						mode === "quote" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Approximate Load (kW / HP)",
							error: errors.load_kw,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: values.load_kw,
								onChange: (e) => update("load_kw", e.target.value),
								placeholder: "e.g. 5kW, 10HP",
								maxLength: 50,
								className: `${inputBase} ${errors.load_kw ? bad : ok}`,
								"aria-invalid": !!errors.load_kw
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Monthly Electricity Bill / Budget",
							error: errors.budget,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: values.budget,
								onChange: (e) => update("budget", e.target.value),
								placeholder: "e.g. ₹5,000",
								maxLength: 50,
								className: `${inputBase} ${errors.budget ? bad : ok}`,
								"aria-invalid": !!errors.budget
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
							label: mode === "quote" ? "Solar Site & Shade Details" : "Your Message",
							error: errors.message,
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: values.message,
								onChange: (e) => update("message", e.target.value),
								placeholder: mode === "quote" ? "Tell us about your roof area, shade issues, battery requirements or specific timeline…" : "Tell us about your site, load, and timeline…",
								rows: 4,
								maxLength: 1e3,
								className: `${inputBase} ${errors.message ? bad : ok} resize-none`,
								"aria-invalid": !!errors.message
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 text-[11px] text-white/45 text-right",
								children: [values.message.length, "/1000"]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: status === "submitting",
					className: "mt-6 group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-6 py-3.5 text-sm font-semibold text-brand-navy-deep shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.7)] hover:shadow-[0_20px_50px_-10px_hsl(var(--primary)/0.9)] transition disabled:opacity-70 disabled:cursor-not-allowed",
					children: status === "submitting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), " Sending…"] }) : status === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Sent"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						mode === "quote" ? "Request Quote" : "Send Message",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4 group-hover:translate-x-0.5 transition" })
					] })
				}),
				status === "success" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-start gap-2 rounded-lg border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-white animate-fade-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-primary mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mode === "quote" ? "Thanks! Your quote request has been received — expect a solar assessment within 48 hours." : "Thanks! Your enquiry is with our team — expect a reply within 24 hours." })]
				}),
				status === "error" && Object.keys(errors).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-start gap-2 rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-white animate-fade-in",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 text-red-400 mt-0.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "We couldn't send that. Please try again or call us directly." })]
				})
			]
		})]
	});
}
function Field({ label, error, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: `block ${className}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-[11px] font-semibold uppercase tracking-wider text-white/60",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1.5",
				children
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1.5 flex items-center gap-1.5 text-xs text-red-300 animate-fade-in",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-3.5 w-3.5" }), error]
			})
		]
	});
}
//#endregion
export { ContactForm as t };
