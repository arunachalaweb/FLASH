import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as IndianRupee, Et as Check, M as Phone, O as Search, Pt as ArrowRight, Y as Landmark, at as Hammer, b as Sparkles, bt as CircleCheckBig, c as User, ct as FilePen, f as TrendingUp, it as HardHat, mt as Cog, r as Zap, st as FileText, vt as CircleQuestionMark } from "../_libs/lucide-react.mjs";
import { n as Header, t as Footer } from "./Footer-C7UDJlwR.mjs";
import { t as FooterCTA } from "./PageHero-BAvrEB2y.mjs";
import { i as services, t as getService } from "./services-data-oIchF6z1.mjs";
import { t as Route } from "./services._slug-BGe19XnQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services._slug-qq2o2Ef0.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var journeySteps = [
	{
		id: 1,
		title: "Consumer Registration",
		desc: "Sign up to start your application journey",
		role: "Consumer",
		icon: User,
		color: "bg-blue-500 text-white"
	},
	{
		id: 2,
		title: "Application Submission",
		desc: "Submit your Application",
		role: "Consumer",
		icon: FileText,
		color: "bg-blue-500 text-white"
	},
	{
		id: 3,
		title: "Feasibility Approval",
		desc: "Check if your location is solar-ready",
		role: "DISCOM",
		icon: Zap,
		color: "bg-orange-500 text-white"
	},
	{
		id: 4,
		title: "Vendor Selection",
		desc: "Choose the best vendor for installation",
		role: "Consumer",
		icon: Search,
		color: "bg-blue-500 text-white"
	},
	{
		id: 5,
		title: "Work Start",
		desc: "Begin the installation process",
		role: "Vendor",
		icon: Hammer,
		color: "bg-teal-500 text-white"
	},
	{
		id: 6,
		title: "Solar Installation Details",
		desc: "Provide details for your Solar Rooftop Installation",
		role: "Vendor",
		icon: FilePen,
		color: "bg-teal-500 text-white"
	},
	{
		id: 7,
		title: "Project Inspection",
		desc: "DISCOM to inspect site for compliance",
		role: "DISCOM",
		icon: Search,
		color: "bg-orange-500 text-white"
	},
	{
		id: 8,
		title: "Project Commissioning",
		desc: "DISCOM to certify your Solar Rooftop Installation",
		role: "DISCOM",
		icon: CircleCheckBig,
		color: "bg-orange-500 text-white"
	},
	{
		id: 9,
		title: "Subsidy Request",
		desc: "Redeem your Subsidy",
		role: "Consumer",
		icon: IndianRupee,
		color: "bg-blue-500 text-white"
	},
	{
		id: 10,
		title: "Subsidy Disbursal",
		desc: "Subsidy Approval",
		role: "REC",
		icon: Landmark,
		color: "bg-purple-500 text-white"
	}
];
function ConsumerJourney() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-3xl md:text-4xl font-display font-bold text-brand-navy-deep",
					children: "Consumer Application Journey"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-muted-foreground max-w-2xl mx-auto",
					children: "A complete step-by-step transparent process from your first registration to the final subsidy disbursal."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap justify-center gap-4 mb-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 border border-blue-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-4 w-4 text-blue-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold text-blue-700",
							children: "Consumer"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-full bg-teal-50 px-4 py-2 border border-teal-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HardHat, { className: "h-4 w-4 text-teal-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold text-teal-700",
							children: "Vendor"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2 border border-orange-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "h-4 w-4 text-orange-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold text-orange-700",
							children: "DISCOM"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-full bg-purple-50 px-4 py-2 border border-purple-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-4 w-4 text-purple-500" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold text-purple-700",
							children: "REC"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative max-w-4xl mx-auto pb-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-border/60 -translate-x-1/2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-8",
					children: journeySteps.map((step, index) => {
						const isEven = index % 2 === 0;
						const Icon = step.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex items-center md:justify-between w-full",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `hidden md:block w-[45%] ${isEven ? "text-right pr-10" : "invisible"}`,
									children: isEven && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition group",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs font-bold uppercase tracking-widest text-primary mb-2",
												children: ["Step ", step.id]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-lg font-display font-bold text-brand-navy-deep",
												children: step.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-muted-foreground",
												children: step.desc
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-4 border-background shadow-sm z-10 bg-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `flex items-center justify-center w-full h-full rounded-full ${step.color}`,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `pl-20 md:pl-0 md:w-[45%] ${isEven ? "md:invisible" : "md:text-left md:pl-10"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `bg-card rounded-2xl p-6 border border-border shadow-sm hover:shadow-md transition group ${isEven ? "md:hidden" : ""}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs font-bold uppercase tracking-widest text-primary mb-2",
												children: ["Step ", step.id]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-lg font-display font-bold text-brand-navy-deep",
												children: step.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-sm text-muted-foreground",
												children: step.desc
											})
										]
									})
								})
							]
						}, step.id);
					})
				})]
			})
		]
	});
}
function ServiceDetailPage() {
	const { slug } = Route.useParams();
	const service = getService(slug);
	const [active, setActive] = (0, import_react.useState)(0);
	const Icon = service.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { overlay: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative min-h-[560px] md:min-h-[640px] overflow-hidden pt-[220px] md:pt-[260px] pb-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: service.image,
						alt: service.label,
						className: "absolute inset-0 h-full w-full object-cover"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-brand-navy-deep/95 via-brand-navy-deep/80 to-brand-navy-deep/50" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-10 left-1/4 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-7xl px-4 md:px-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-white/80",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/",
										className: "hover:text-primary",
										children: "Home"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-2 text-white/40",
										children: "/"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/services",
										className: "hover:text-primary",
										children: "Services"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mx-2 text-white/40",
										children: "/"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-primary",
										children: service.label
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-14 w-14 rounded-xl grid place-items-center bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.8)]",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "h-7 w-7",
										strokeWidth: 2.25
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" }),
										" ",
										service.tag
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-6 font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-4xl",
								children: service.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 text-lg text-white/80 max-w-2xl",
								children: service.intro
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/quote",
									className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-6 py-3.5 text-sm font-semibold text-brand-navy-deep shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.8)] hover:-translate-y-0.5 transition",
									children: ["Get a Free Quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "tel:+919150011428",
									className: "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " +91 91500 11428"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl",
								children: service.specs.map((sp) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase tracking-widest text-white/50",
										children: sp.label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-lg text-white font-semibold",
										children: sp.value
									})]
								}, sp.label))
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative bg-background py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-3 gap-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-primary font-semibold text-sm tracking-widest",
								children: "OVERVIEW"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "font-display text-3xl md:text-4xl font-bold text-brand-navy-deep leading-tight",
								children: ["Why choose Flash for ", service.label.toLowerCase()]
							}),
							service.overview.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground leading-relaxed",
								children: p
							}, i))
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-6 shadow-sm h-fit",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-primary font-semibold text-sm tracking-widest",
								children: "KEY FEATURES"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-xl font-bold text-brand-navy-deep",
								children: "What's included"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-3",
								children: service.features.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-3 text-sm text-foreground/80",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
											className: "h-3 w-3",
											strokeWidth: 3
										})
									}), f]
								}, f))
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative bg-muted/30 py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-primary font-semibold text-sm tracking-widest",
								children: "KEY BENEFITS"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl md:text-4xl font-bold text-brand-navy-deep",
							children: "What you gain"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
							children: service.benefits.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "group relative rounded-2xl border border-border bg-card p-6 hover:-translate-y-1 hover:shadow-lg hover:border-primary/50 transition",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "h-10 w-10 rounded-lg grid place-items-center bg-primary/10 text-primary font-display font-bold text-sm",
										children: ["0", i + 1]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-4 font-display text-lg font-semibold text-brand-navy-deep",
										children: b.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted-foreground leading-relaxed",
										children: b.desc
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-primary via-brand-gold to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" })
								]
							}, b.title))
						}),
						service.slug === "rooftop-solar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-16 bg-card rounded-2xl shadow-sm border border-border p-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid lg:grid-cols-2 gap-10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl font-display font-bold text-brand-navy-deep mb-6",
									children: "Subsidy Benefits"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-lg font-semibold text-brand-navy mb-3",
											children: "Subsidy for Residential Households"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
											className: "space-y-2 text-muted-foreground text-sm",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-start gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), " Rs. 30,000 per kW up to 2 kW"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-start gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), " Rs. 18,000 per kW for additional capacity up to 3 kW"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
													className: "flex items-start gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), " Rs. 78,000 Total subsidy for systems larger than 3 kW capped at"]
												})
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-lg font-semibold text-brand-navy mb-3",
											children: "Subsidy for GHS/RWA"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-2 text-muted-foreground text-sm",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), " Rs. 18,000 per kW for common facilities, including EV charging, up to 500 kW capacity (@3 kW per house) with the upper limit being inclusive of individual rooftop plants installed by individual residents in the GHS/RWA"]
											})
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "bg-primary/5 rounded-lg p-4 border border-primary/20",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-brand-navy-deep text-sm font-semibold",
												children: "For special states, an additional 10% Subsidy will be applicable per kW"
											})
										})
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl font-display font-bold text-brand-navy-deep mb-6",
									children: "Suitable Rooftop Solar Plant Capacity for households"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "overflow-hidden rounded-xl border border-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
										className: "w-full text-left border-collapse text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: "bg-muted/50 border-b border-border",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4 font-semibold text-brand-navy",
												children: "Average Monthly Electricity Consumption (units)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "p-4 font-semibold text-brand-navy border-l border-border",
												children: "Suitable Rooftop Solar Plant Capacity"
											})]
										}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "border-b border-border hover:bg-muted/30",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 text-muted-foreground",
													children: "0-150"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 font-medium text-brand-navy-deep border-l border-border",
													children: "1-2 kw"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "border-b border-border hover:bg-muted/30",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 text-muted-foreground",
													children: "150-300"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 font-medium text-brand-navy-deep border-l border-border",
													children: "2-3 kw"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
												className: "hover:bg-muted/30",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 text-muted-foreground",
													children: ">300"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "p-4 font-medium text-brand-navy-deep border-l border-border",
													children: "Above 3 kw"
												})]
											})
										] })]
									})
								})] })]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative bg-background py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-primary font-semibold text-sm tracking-widest",
							children: "GALLERY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl md:text-4xl font-bold text-brand-navy-deep",
							children: "Project imagery"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid gap-4 lg:grid-cols-[1.6fr_1fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[16/10] overflow-hidden rounded-2xl border border-border shadow-lg",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: service.gallery[active],
										alt: `${service.label} gallery ${active + 1}`,
										className: "h-full w-full object-cover transition-opacity duration-500"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-navy-deep/70 to-transparent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "absolute bottom-4 left-4 rounded-full bg-brand-navy-deep/80 backdrop-blur px-3 py-1 text-xs font-semibold text-white",
										children: [
											active + 1,
											" / ",
											service.gallery.length
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-3 lg:grid-cols-2 gap-3",
								children: service.gallery.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setActive(i),
									className: `group relative aspect-[4/3] overflow-hidden rounded-xl border transition-all ${active === i ? "border-primary ring-2 ring-primary/40" : "border-border hover:border-primary/60"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: g,
										alt: "",
										className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									}), active !== i && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-brand-navy-deep/30 group-hover:bg-brand-navy-deep/10 transition" })]
								}, i))
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative bg-muted/30 py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-primary font-semibold text-sm tracking-widest",
							children: "HOW WE DELIVER"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl md:text-4xl font-bold text-brand-navy-deep",
							children: "Our process"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5",
							children: service.process.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative rounded-2xl border border-border bg-card p-5 hover:-translate-y-1 hover:shadow-lg transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-9 w-9 rounded-lg grid place-items-center bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep font-display font-bold",
									children: i + 1
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-lg font-semibold text-brand-navy-deep",
									children: p.title
								})]
							}, p.title))
						}),
						service.slug === "rooftop-solar" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsumerJourney, {})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative bg-background py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-2 gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card p-8 shadow-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cog, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-primary font-semibold text-sm tracking-widest",
									children: "TECHNOLOGY STACK"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 font-display text-2xl font-bold text-brand-navy-deep",
								children: "Best-in-class components"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: "We only use Tier-1, MNRE-approved and internationally certified equipment."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 flex flex-wrap gap-2",
								children: service.techStack.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-brand-navy-deep",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary" }),
										" ",
										t
									]
								}, t))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-brand-navy-deep to-brand-navy p-8 text-white shadow-lg",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary/25 blur-3xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-brand-gold/20 blur-3xl" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-primary font-semibold text-sm tracking-widest",
											children: "CASE STUDY"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-2 font-display text-2xl font-bold",
										children: service.caseStudy.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-5 grid grid-cols-2 gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur px-4 py-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] uppercase tracking-widest text-white/50",
												children: "Location"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-display text-sm text-white font-semibold",
												children: service.caseStudy.location
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur px-4 py-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[10px] uppercase tracking-widest text-white/50",
												children: "Capacity"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 font-display text-sm text-white font-semibold",
												children: service.caseStudy.capacity
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-5 text-white/80 leading-relaxed",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-primary font-semibold",
											children: "Result: "
										}), service.caseStudy.result]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/projects",
										className: "mt-6 inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all",
										children: ["View more projects ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative bg-muted/30 py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl px-4 md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-primary font-semibold text-sm tracking-widest",
								children: "FAQ"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-center font-display text-3xl md:text-4xl font-bold text-brand-navy-deep",
							children: "Questions we hear a lot"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 space-y-3",
							children: service.faqs.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
								className: "group rounded-xl border border-border bg-card p-5 open:shadow-md transition-shadow",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", {
									className: "flex cursor-pointer items-center justify-between gap-4 font-display text-base md:text-lg font-semibold text-brand-navy-deep list-none",
									children: [f.q, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary font-bold text-lg group-open:rotate-45 transition-transform",
										children: "+"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-muted-foreground leading-relaxed",
									children: f.a
								})]
							}, i))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-brand-navy-deep py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-brand-gold/15" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-5xl px-4 md:px-6 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-display text-3xl md:text-4xl font-bold text-white leading-tight",
								children: [
									"Ready for a",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
										children: service.label.toLowerCase()
									}),
									" ",
									"proposal?"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-white/70 max-w-2xl mx-auto",
								children: "Get a detailed quote with capacity sizing, ROI projection and delivery timeline — free within 48 hours."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-7 flex flex-wrap justify-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/quote",
									className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-7 py-3.5 text-sm font-semibold text-brand-navy-deep shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.8)] hover:-translate-y-0.5 transition",
									children: ["Request Free Quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur px-7 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition",
									children: "Contact Engineers"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative bg-muted/30 py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between flex-wrap gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-primary font-semibold text-sm tracking-widest",
							children: "EXPLORE MORE"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl font-bold text-brand-navy-deep",
							children: "Related services"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/services",
							className: "text-sm font-semibold text-primary inline-flex items-center gap-2",
							children: ["All services ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: services.filter((s) => s.slug !== service.slug).slice(0, 3).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/services/$slug",
							params: { slug: s.slug },
							className: "group relative rounded-2xl overflow-hidden border border-border bg-card hover:-translate-y-1 hover:shadow-xl transition",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative aspect-[16/10] overflow-hidden",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: s.image,
										alt: s.label,
										className: "h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-navy-deep/80 via-brand-navy-deep/20 to-transparent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "absolute left-5 bottom-4 right-5 font-display text-lg font-semibold text-white",
										children: s.label
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 text-sm text-muted-foreground flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.tag }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1.5 text-primary font-semibold",
									children: ["View ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})]
							})]
						}, s.slug))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCTA, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { ServiceDetailPage as component };
