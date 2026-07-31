import { t as project_residential_default } from "./project-residential-BUNYnuq8.js";
import { n as Header, t as Footer } from "./Footer-CTni8_Gt.js";
import { t as hero_solar_default } from "./hero-solar-qEXskxdk.js";
import { t as about_engineers_default } from "./about-engineers-0ZLqikfi.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Award, Headphones, Headset, Leaf, Lightbulb, Shield, Sun, Target, UserCheck, Users, Zap } from "lucide-react";
//#region src/routes/about.tsx?tsr-split=component
var stats = [
	{
		icon: Sun,
		value: "500+",
		label: "Projects Completed"
	},
	{
		icon: Zap,
		value: "100MW+",
		label: "Installed Capacity"
	},
	{
		icon: Users,
		value: "25+",
		label: "Expert Engineers"
	},
	{
		icon: Headset,
		value: "24×7",
		label: "Customer Support"
	}
];
var values = [
	{
		icon: Leaf,
		title: "Sustainability",
		desc: "Committed to a better and cleaner tomorrow."
	},
	{
		icon: Shield,
		title: "Integrity",
		desc: "Honest, transparent and ethical in every action."
	},
	{
		icon: Lightbulb,
		title: "Innovation",
		desc: "Creating intelligent energy technology and solutions."
	},
	{
		icon: Award,
		title: "Quality",
		desc: "Delivering excellence in every project we undertake."
	},
	{
		icon: UserCheck,
		title: "Customer Focus",
		desc: "Customer satisfaction is at the heart of our business."
	}
];
function AboutPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-background text-foreground font-sans",
		children: [
			/* @__PURE__ */ jsx(Header, { overlay: true }),
			/* @__PURE__ */ jsxs("section", {
				className: "relative min-h-[440px] md:min-h-[520px] overflow-hidden pt-[220px] md:pt-[260px] pb-16",
				children: [
					/* @__PURE__ */ jsx("img", {
						src: hero_solar_default,
						alt: "Renewable energy",
						className: "absolute inset-0 h-full w-full object-cover"
					}),
					/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-brand-navy-deep/92 via-brand-navy-deep/75 to-brand-navy/40" }),
					/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary/25 blur-3xl" }),
					/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-10 left-1/4 h-64 w-64 rounded-full bg-brand-gold/20 blur-3xl" }),
					/* @__PURE__ */ jsxs("div", {
						className: "relative mx-auto max-w-7xl px-4 md:px-6",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight",
							children: "About Us"
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-3 text-sm text-white/80",
							children: [
								/* @__PURE__ */ jsx("a", {
									href: "/",
									className: "hover:text-primary",
									children: "Home"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "mx-2 text-white/40",
									children: "/"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "text-primary",
									children: "About Us"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-20",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6 space-y-16",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "grid lg:grid-cols-2 gap-12 items-center",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-primary font-semibold text-sm",
								children: "WHO WE ARE"
							}),
							/* @__PURE__ */ jsxs("h2", {
								className: "mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy leading-tight",
								children: [
									"Leading the Way Towards",
									/* @__PURE__ */ jsx("br", {}),
									" a Sustainable Future"
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 text-muted-foreground leading-relaxed",
								children: "Flash Renewable Energy Solutions Pvt Ltd, incorporated on 25th May 2026 under the Companies Act, 2013, is dedicated to advancing renewable energy technologies across India."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-muted-foreground leading-relaxed",
								children: "We specialize in solar, solar tiles, solar fences, turbine, wind and hybrid energy systems, offering end-to-end solutions from consultation to maintenance. Our mission is to make renewable energy accessible, affordable, sustainable and impactful."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-muted-foreground leading-relaxed",
								children: "We also planning to partner with Educational Institutions and Government Organisations, enabling them to adopt innovative solutions such as floating solar systems, solar fences, smart pole solar (Hybrid) lights, wall turbines and large scale utility solar to meet sustainability goals for the green future."
							})
						] }), /* @__PURE__ */ jsx("img", {
							src: about_engineers_default,
							alt: "Flash engineering team",
							className: "rounded-2xl w-full object-cover shadow-lg max-h-[480px]",
							loading: "lazy"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border border-slate-200 bg-slate-50/50 p-8 shadow-inner",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-display text-xl font-bold text-brand-navy border-b pb-3 mb-6",
							children: "Company Registration & Credentials"
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-sm text-slate-600",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider",
									children: "Corporate Identity Number (CIN)"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-semibold text-brand-navy text-base",
									children: "U35105TN2026PTC193634"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider",
									children: "PAN & TAN"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-semibold text-brand-navy text-base",
									children: "AAHCF0584G / CHEF08522D"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider",
									children: "Contact Phone"
								}), /* @__PURE__ */ jsx("a", {
									href: "tel:+919150011428",
									className: "font-semibold text-brand-navy text-base hover:text-primary transition",
									children: "+91 91500 11428"
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider",
									children: "Email & Website"
								}), /* @__PURE__ */ jsxs("div", {
									className: "space-y-0.5",
									children: [/* @__PURE__ */ jsx("a", {
										href: "mailto:Flashenergypvt.ltd@gmail.com",
										className: "block font-semibold text-primary hover:underline truncate",
										children: "Flashenergypvt.ltd@gmail.com"
									}), /* @__PURE__ */ jsx("a", {
										href: "https://www.flashrenewable.com",
										target: "_blank",
										rel: "noopener noreferrer",
										className: "block font-semibold text-primary hover:underline",
										children: "www.flashrenewable.com"
									})]
								})] }),
								/* @__PURE__ */ jsxs("div", {
									className: "sm:col-span-2 lg:col-span-4 border-t pt-4",
									children: [/* @__PURE__ */ jsx("span", {
										className: "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5",
										children: "Registered Office Address"
									}), /* @__PURE__ */ jsx("span", {
										className: "font-semibold text-brand-navy leading-relaxed",
										children: "FLASH STORAGE, Door No.7, Plot No.102, Manirajan Street, Janaki Nagar, Alwarthirunagar, Valasaravakkam, Chennai, Tamil Nadu – 600087"
									})]
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "pb-6",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6",
					children: /* @__PURE__ */ jsx("div", {
						className: "rounded-xl bg-brand-navy-deep grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10",
						children: stats.map((s) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4 px-6 py-6",
							children: [/* @__PURE__ */ jsx(s.icon, { className: "h-10 w-10 text-primary shrink-0" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-white text-2xl font-bold",
								children: s.value
							}), /* @__PURE__ */ jsx("div", {
								className: "text-white/70 text-sm",
								children: s.label
							})] })]
						}, s.label))
					})
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-14",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-xl border border-border bg-card grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border shadow-sm",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex gap-5 p-8",
							children: [/* @__PURE__ */ jsx(Target, { className: "h-12 w-12 text-primary shrink-0" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-display text-xl font-bold text-brand-navy",
								children: "Our Mission"
							}), /* @__PURE__ */ jsxs("ul", {
								className: "mt-3.5 space-y-2 text-sm text-muted-foreground leading-relaxed list-none p-0",
								children: [
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "shrink-0 mt-0.5",
											children: "🌱"
										}), /* @__PURE__ */ jsx("span", { children: "Deliver non-polluted, eco-friendly green energy." })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "shrink-0 mt-0.5",
											children: "🌞"
										}), /* @__PURE__ */ jsx("span", { children: "Powering to Serve a bright and sustainable future for the country." })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "shrink-0 mt-0.5",
											children: "⚡"
										}), /* @__PURE__ */ jsx("span", { children: "Provide innovative, reliable, and scalable renewable energy solutions." })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "shrink-0 mt-0.5",
											children: "🤝"
										}), /* @__PURE__ */ jsx("span", { children: "Partner with communities, industries, corporates, and governments to drive clean green energy adoption." })]
									})
								]
							})] })]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex gap-5 p-8",
							children: [/* @__PURE__ */ jsx(Leaf, { className: "h-12 w-12 text-primary shrink-0" }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-display text-xl font-bold text-brand-navy",
								children: "Our Vision"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-3.5 text-sm text-muted-foreground leading-relaxed",
								children: "To be India’s most trusted renewable energy partner, driving innovation and a sustainable country for cleaner future generations."
							})] })]
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-14",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6",
					children: [/* @__PURE__ */ jsx("div", {
						className: "text-center",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-center gap-4",
							children: [
								/* @__PURE__ */ jsx("span", { className: "h-px w-16 bg-primary/50" }),
								/* @__PURE__ */ jsx("h2", {
									className: "font-display text-3xl md:text-4xl font-bold text-brand-navy",
									children: "Our Values"
								}),
								/* @__PURE__ */ jsx("span", { className: "h-px w-16 bg-primary/50" })
							]
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-10 grid grid-cols-2 md:grid-cols-5 gap-6",
						children: values.map((v) => /* @__PURE__ */ jsxs("div", {
							className: "text-center",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "mx-auto grid place-items-center h-16 w-16 rounded-full border-2 border-primary/30 text-primary",
									children: /* @__PURE__ */ jsx(v.icon, { className: "h-7 w-7" })
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-4 font-semibold text-brand-navy",
									children: v.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-xs text-muted-foreground leading-relaxed px-2",
									children: v.desc
								})
							]
						}, v.title))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "py-14",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-xl bg-brand-navy-deep overflow-hidden grid md:grid-cols-[1.5fr_1fr] items-center",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "p-8 md:p-10",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-4",
									children: [/* @__PURE__ */ jsx(Headphones, { className: "h-12 w-12 text-primary" }), /* @__PURE__ */ jsx("h3", {
										className: "font-display text-2xl md:text-3xl font-bold text-white",
										children: "Need a Custom Solar Solution?"
									})]
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-3 text-white/75 text-sm",
									children: "Our experts are here to help you choose the best solution for your needs."
								}),
								/* @__PURE__ */ jsxs("a", {
									href: "/#contact",
									className: "mt-6 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-primary-foreground font-semibold hover:brightness-95 transition",
									children: ["Get a Free Consultation ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
								})
							]
						}), /* @__PURE__ */ jsx("img", {
							src: project_residential_default,
							alt: "Solar home",
							className: "h-full w-full object-cover",
							loading: "lazy"
						})]
					})
				})
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { AboutPage as component };
