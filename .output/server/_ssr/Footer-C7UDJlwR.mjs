import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DpsQrzSu.mjs";
import { t as flash_logo_updated_default } from "./flash-logo-updated-DRWX-8Au.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as LogOut, D as Send, L as Menu, M as Phone, Pt as ArrowRight, Q as Instagram, R as MapPin, V as LogIn, W as Linkedin, a as X, c as User, i as Youtube, l as UserPlus, ot as Globe, q as LayoutDashboard, ut as Facebook, yt as CircleCheck, z as Mail } from "../_libs/lucide-react.mjs";
import { n as stringType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Footer-C7UDJlwR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useAuth() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [user, setUser] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
			if (!mounted) return;
			setSession(s);
			setUser(s?.user ?? null);
			setLoading(false);
		});
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			setSession(data.session);
			setUser(data.session?.user ?? null);
			setLoading(false);
		});
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	return {
		session,
		user,
		loading
	};
}
function useIsAdmin(userId) {
	const [isAdmin, setIsAdmin] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!userId) {
			setIsAdmin(false);
			return;
		}
		let mounted = true;
		supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle().then(({ data }) => {
			if (mounted) setIsAdmin(!!data);
		});
		return () => {
			mounted = false;
		};
	}, [userId]);
	return isAdmin;
}
var nav = [
	{
		label: "Home",
		to: "/"
	},
	{
		label: "About Us",
		to: "/about"
	},
	{
		label: "Services",
		to: "/services"
	},
	{
		label: "Projects",
		to: "/projects"
	},
	{
		label: "Expertise",
		to: "/expertise"
	},
	{
		label: "Why Us",
		to: "/why-us"
	},
	{
		label: "Contact",
		to: "/contact"
	}
];
function Header({ overlay = false } = {}) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const { user } = useAuth();
	const isAdmin = useIsAdmin(user?.id);
	const [menuOpen, setMenuOpen] = (0, import_react.useState)(false);
	const signOut = async () => {
		await supabase.auth.signOut();
		setMenuOpen(false);
		setOpen(false);
	};
	(0, import_react.useEffect)(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);
	const navTextColor = overlay ? "text-white" : "text-brand-navy";
	const utilBarBg = overlay ? "bg-brand-navy/40 backdrop-blur border-b border-white/10" : "bg-brand-navy";
	const mainBarBg = overlay ? "bg-transparent" : "bg-white/95 backdrop-blur border-b border-border shadow-sm";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: `${overlay ? "absolute inset-x-0 top-0" : "sticky top-0"} z-50`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `hidden md:block ${utilBarBg} text-white/90 text-xs`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6 h-9 flex items-center justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 text-primary" }), "info@flashrenewable.com"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden lg:flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-primary" }), "PAN-India Solar EPC · MNRE Registered"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden lg:inline text-white/60",
								children: "Mon–Sat · 9:00 – 18:30"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "tel:+919150011428",
								className: "flex items-center gap-2 hover:text-primary transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5" }), " +91 91500 11428"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "h-4 w-px bg-white/20",
								"aria-hidden": "true"
							}),
							user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: () => setMenuOpen((v) => !v),
									className: "inline-flex items-center gap-2 hover:text-primary transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid place-items-center h-5 w-5 rounded-full bg-primary text-brand-navy-deep text-[10px] font-bold",
										children: (user.email ?? "?").slice(0, 1).toUpperCase()
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "max-w-[140px] truncate",
										children: user.email
									})]
								}), menuOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute right-0 top-7 z-50 w-56 rounded-xl border border-white/10 bg-brand-navy-deep shadow-2xl overflow-hidden text-white",
									onMouseLeave: () => setMenuOpen(false),
									children: [
										isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/admin",
											onClick: () => setMenuOpen(false),
											className: "flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-primary/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-3.5 w-3.5 text-primary" }), " Admin Dashboard"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/",
											onClick: () => setMenuOpen(false),
											className: "flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-primary/20",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-3.5 w-3.5 text-primary" }), " My Account"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: signOut,
											className: "w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-red-500/20 text-red-300 border-t border-white/10",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-3.5 w-3.5" }), " Sign out"]
										})
									]
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 text-xs font-medium",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/login",
										className: "inline-flex items-center gap-1.5 hover:text-primary transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-3.5 w-3.5" }), " Login"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white/40",
										"aria-hidden": "true",
										children: "|"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/signup",
										className: "inline-flex items-center gap-1.5 hover:text-primary transition-colors",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-3.5 w-3.5" }), " Signup"]
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: mainBarBg,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 h-[96px] md:h-[140px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "flex min-w-0 items-center",
								onClick: () => setOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: flash_logo_updated_default,
									alt: "Flash Renewable Energy Solutions",
									className: "h-[56px] md:h-[90px] w-auto object-contain shrink-0"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "hidden lg:flex items-center gap-8",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
									className: `flex items-center gap-6 text-sm font-medium ${navTextColor}`,
									children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: n.to,
										className: "relative py-2 hover:text-primary transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full",
										children: n.label
									}, n.label))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/quote",
									className: "group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-95 transition",
									children: ["Free Quote", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-0.5 transition-transform" })]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex lg:hidden items-center gap-2 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "tel:+919150011428",
									"aria-label": "Call",
									className: "grid place-items-center h-10 w-10 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-label": open ? "Close menu" : "Open menu",
									"aria-expanded": open,
									onClick: () => setOpen((v) => !v),
									className: "grid place-items-center h-10 w-10 rounded-full bg-brand-navy text-white hover:bg-primary transition",
									children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
								})]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `lg:hidden fixed inset-x-0 bottom-0 top-[80px] md:top-[calc(100px+36px)] z-40 bg-brand-navy/98 backdrop-blur-xl transition-all duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "h-full overflow-y-auto px-6 py-6 flex flex-col gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex flex-col divide-y divide-white/10",
							children: nav.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: n.to,
								onClick: () => setOpen(false),
								className: `group flex items-center justify-between py-5 min-h-[56px] text-lg font-medium text-white active:bg-white/5 hover:text-primary transition-all ${open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"}`,
								style: { transitionDelay: open ? `${i * 40}ms` : "0ms" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: n.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" })]
							}, n.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/quote",
									onClick: () => setOpen(false),
									className: "flex items-center justify-center gap-2 w-full rounded-full bg-primary px-6 py-4 min-h-[56px] text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30",
									children: ["Get a Free Quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "tel:+919150011428",
									className: "flex items-center justify-center gap-2 w-full rounded-full border border-white/20 px-6 py-4 min-h-[56px] text-base font-semibold text-white hover:bg-white/10 transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-primary" }), " +91 91500 11428"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid grid-cols-2 gap-3",
									children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [isAdmin && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/admin",
										onClick: () => setOpen(false),
										className: "col-span-2 flex items-center justify-center gap-2 rounded-full bg-primary/20 border border-primary/40 px-4 py-3 min-h-[52px] text-sm font-semibold text-white",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "h-4 w-4 text-primary" }), " Admin Dashboard"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: signOut,
										className: "col-span-2 flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 min-h-[52px] text-sm font-semibold text-white hover:bg-red-500/20 transition",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4 text-primary" }),
											" Sign out (",
											user.email,
											")"
										]
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/login",
										onClick: () => setOpen(false),
										className: "flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 min-h-[52px] text-sm font-semibold text-white hover:bg-white/10 transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogIn, { className: "h-4 w-4 text-primary" }), " Login"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/signup",
										onClick: () => setOpen(false),
										className: "flex items-center justify-center gap-2 rounded-full bg-white/10 border border-white/20 px-4 py-3 min-h-[52px] text-sm font-semibold text-white hover:bg-primary hover:border-primary transition",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "h-4 w-4 text-primary" }), " Signup"]
									})] })
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-auto pt-6 text-xs text-white/60 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 text-primary" }), " info@flashrenewable.com"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-3.5 w-3.5 text-primary" }), " PAN-India · MNRE Registered"]
							})]
						})
					]
				})
			})
		]
	});
}
function Footer() {
	const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep rounded-sm";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		role: "contentinfo",
		"aria-label": "Site footer",
		className: "bg-brand-navy-deep text-white/85",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsletterBand, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pt-10 pb-10 md:pt-12 md:pb-14 grid gap-8 grid-cols-2 lg:grid-cols-4 text-left",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "col-span-2 lg:col-span-1 flex flex-col items-start",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: flash_logo_updated_default,
								alt: "Flash Renewable Energy Solutions",
								className: "h-[80px] w-auto object-contain sm:-ml-1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-white/70 max-w-sm",
								children: "Powering tomorrow with clean energy. Delivering innovative and sustainable renewable energy solutions across India."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								"aria-label": "Social media",
								className: "mt-5 flex flex-wrap gap-3 list-none p-0",
								children: [
									{
										Icon: Facebook,
										label: "Follow us on Facebook",
										href: "#"
									},
									{
										Icon: Linkedin,
										label: "Connect with us on LinkedIn",
										href: "#"
									},
									{
										Icon: Instagram,
										label: "Follow us on Instagram",
										href: "#"
									},
									{
										Icon: Youtube,
										label: "Subscribe to our YouTube channel",
										href: "#"
									}
								].map(({ Icon, label, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href,
									target: "_blank",
									rel: "noopener noreferrer",
									"aria-label": label,
									className: `grid place-items-center h-11 w-11 rounded-full border border-white/20 hover:bg-primary hover:border-primary hover:text-primary-foreground transition ${focusRing}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
										className: "h-4 w-4",
										"aria-hidden": "true",
										focusable: "false"
									})
								}) }, label))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
						navLabel: "Quick links",
						title: "Quick Links",
						items: [
							{
								label: "Home",
								href: "/"
							},
							{
								label: "About Us",
								href: "/about",
								accent: true
							},
							{
								label: "Services",
								href: "/services"
							},
							{
								label: "Projects",
								href: "/projects"
							},
							{
								label: "Expertise",
								href: "/expertise"
							},
							{
								label: "Why Us",
								href: "/why-us"
							},
							{
								label: "Contact Us",
								href: "/contact"
							},
							{
								label: "Free Quote",
								href: "/quote"
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FooterCol, {
						navLabel: "Our services",
						title: "Our Services",
						items: [
							{
								label: "Solar EPC",
								href: "/services/solar-epc"
							},
							{
								label: "Rooftop Solar",
								href: "/services/rooftop-solar"
							},
							{
								label: "Ground-Mounted",
								href: "/services/ground-mounted"
							},
							{
								label: "Industrial Solar",
								href: "/services/industrial-solar"
							},
							{
								label: "Solar Water Pumping",
								href: "/services/solar-water-pumping"
							},
							{
								label: "Street Lighting",
								href: "/services/street-lighting"
							},
							{
								label: "Battery Storage",
								href: "/services/battery-storage"
							},
							{
								label: "O&M / AMC",
								href: "/services/om-amc"
							}
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", {
						className: "col-span-2 lg:col-span-1 not-italic",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							id: "footer-contact-heading",
							className: "text-white font-display font-semibold text-base mb-4 sm:mb-5 tracking-wide",
							children: "Contact Info"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							"aria-labelledby": "footer-contact-heading",
							className: "space-y-3.5 text-sm text-white/70",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3 min-w-0 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
										className: "h-5 w-5 text-primary shrink-0 mt-0.5",
										"aria-hidden": "true",
										focusable: "false"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "leading-relaxed",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "Address: "
										}), "FLASH STORAGE Door No.7, Plot No.102, Manirajan Street, Janaki Nagar, Alwarthirunagar, Valasaravakkam, Chennai, Tamil Nadu – 600087"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3 items-center min-w-0 justify-center sm:justify-start text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {
										className: "h-4 w-4 text-primary shrink-0",
										"aria-hidden": "true",
										focusable: "false"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "tel:+919150011428",
										"aria-label": "Call us at +91 91500 11428",
										className: `hover:text-primary transition truncate ${focusRing}`,
										children: "+91 91500 11428"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3 items-center min-w-0 justify-center sm:justify-start text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
										className: "h-4 w-4 text-primary shrink-0",
										"aria-hidden": "true",
										focusable: "false"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "mailto:info@flashrenewable.com",
										"aria-label": "Email us at info@flashrenewable.com",
										className: `hover:text-primary transition break-all ${focusRing}`,
										children: "info@flashrenewable.com"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3 items-center min-w-0 justify-center sm:justify-start text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, {
										className: "h-4 w-4 text-primary shrink-0",
										"aria-hidden": "true",
										focusable: "false"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "https://www.flashrenewable.com",
										target: "_blank",
										rel: "noopener noreferrer",
										"aria-label": "Visit our website",
										className: `truncate hover:text-primary transition ${focusRing}`,
										children: "www.flashrenewable.com"
									})]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-white/10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-3 text-xs text-white/60",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Flash Renewable Energy Solutions Pvt. Ltd. All Rights Reserved."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-white/40",
							children: "CIN: U35105TN2026PTC193634 · PAN: AAHCF0584G · TAN: CHEF08522D"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "hidden sm:block",
						children: "Valasaravakkam, Chennai, Tamil Nadu · India"
					})]
				})
			})
		]
	});
}
var emailSchema = stringType().trim().min(1, { message: "Email is required" }).email({ message: "Enter a valid email address" }).max(255, { message: "Email is too long" });
function NewsletterBand() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const onSubmit = async (e) => {
		e.preventDefault();
		const parsed = emailSchema.safeParse(email);
		if (!parsed.success) {
			const msg = parsed.error.issues[0]?.message ?? "Invalid email";
			setError(msg);
			requestAnimationFrame(() => {
				document.getElementById("newsletter-email")?.focus();
			});
			return;
		}
		setError(null);
		setStatus("loading");
		const BACKEND_URL = "https://seagreen-mongoose-262998.hostingersite.com";
		if (Boolean("https://seagreen-mongoose-262998.hostingersite.com")) try {
			const res = await fetch(`${BACKEND_URL}/api/newsletter_subscribers`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					email: parsed.data,
					active: true
				})
			});
			if (!res.ok) {
				if (res.status === 500) {
					toast.success("Subscribed!", { description: "You're already in our list or subscribed successfully." });
					setStatus("success");
					setEmail("");
					return;
				}
				const txt = await res.text();
				throw new Error(txt || `Request failed: ${res.status}`);
			}
		} catch (err) {
			setStatus("idle");
			setError(err.message);
			toast.error(err.message);
			return;
		}
		else {
			const { error: dbErr } = await supabase.from("newsletter_subscribers").upsert({
				email: parsed.data,
				active: true
			}, { onConflict: "email" });
			if (dbErr) {
				setStatus("idle");
				setError(dbErr.message);
				toast.error(dbErr.message);
				return;
			}
		}
		setStatus("success");
		setEmail("");
		toast.success("Subscribed!", { description: "You'll receive our latest solar updates and offers." });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		"aria-labelledby": "newsletter-heading",
		className: "border-b border-white/10 bg-gradient-to-r from-brand-navy-deep via-brand-navy to-brand-navy-deep",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12 grid gap-8 lg:gap-12 lg:grid-cols-2 items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "inline-block text-xs font-semibold tracking-[0.2em] uppercase text-primary",
					children: "Stay Powered"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					id: "newsletter-heading",
					className: "mt-3 font-display text-2xl md:text-3xl font-bold text-white leading-tight",
					children: "Get renewable energy insights, project updates & offers"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm md:text-base text-white/70 max-w-xl",
					children: "Join our newsletter for monthly updates on solar innovations, subsidy news and exclusive offers from Flash Renewable Energy Solutions."
				})
			] }), status === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				role: "status",
				"aria-live": "polite",
				"aria-atomic": "true",
				className: "flex items-start gap-3 rounded-2xl border border-primary/40 bg-primary/10 p-5 backdrop-blur-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
					className: "h-6 w-6 text-primary shrink-0 mt-0.5",
					"aria-hidden": "true",
					focusable: "false"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-white font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Success: "
						}), "You're subscribed!"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-white/75 mt-1",
						children: "Thanks for joining. Watch your inbox for our next update."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setStatus("idle"),
						className: "mt-3 text-xs font-semibold text-primary hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep rounded-sm",
						children: "Subscribe another email →"
					})
				] })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				noValidate: true,
				className: "w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row gap-3 p-2 sm:rounded-full sm:border sm:border-white/15 sm:bg-white/5 sm:backdrop-blur-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								htmlFor: "newsletter-email",
								className: "sr-only",
								children: "Email address"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								id: "newsletter-email",
								type: "email",
								inputMode: "email",
								autoComplete: "email",
								placeholder: "Enter your email address",
								value: email,
								onChange: (e) => {
									setEmail(e.target.value);
									if (error) setError(null);
								},
								"aria-invalid": !!error,
								"aria-describedby": `${error ? "newsletter-error " : ""}newsletter-hint`,
								"aria-errormessage": error ? "newsletter-error" : void 0,
								className: "flex-1 bg-white/5 sm:bg-transparent border border-white/15 sm:border-0 rounded-full sm:rounded-none px-5 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:focus:ring-0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "submit",
								disabled: status === "loading",
								"aria-label": status === "loading" ? "Subscribing to newsletter" : "Subscribe to newsletter",
								className: "inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 transition disabled:opacity-70 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {
									className: "h-4 w-4",
									"aria-hidden": "true",
									focusable: "false"
								}), status === "loading" ? "Subscribing…" : "Subscribe"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "newsletter-error",
						role: "alert",
						"aria-live": "assertive",
						"aria-atomic": "true",
						className: `mt-2 pl-2 text-xs text-red-300 ${error ? "" : "sr-only"}`,
						children: error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "sr-only",
							children: "Error: "
						}), error] }) : ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "status",
						"aria-live": "polite",
						className: "sr-only",
						children: status === "loading" ? "Subscribing, please wait." : ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						id: "newsletter-hint",
						className: "mt-3 pl-2 text-xs text-white/50",
						children: "We respect your privacy. Unsubscribe at any time."
					})
				]
			})]
		})
	});
}
function FooterCol({ title, items, navLabel }) {
	const headingId = `footer-col-${title.replace(/\s+/g, "-").toLowerCase()}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
		"aria-label": navLabel ?? title,
		"aria-labelledby": headingId,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
			id: headingId,
			className: "text-white font-display font-semibold text-base mb-4 sm:mb-5 tracking-wide",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2.5 sm:space-y-3 text-sm",
			children: items.map((it) => it.href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: it.href,
				className: (it.accent ? "text-primary hover:brightness-110" : "text-white/70 hover:text-primary transition") + " focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy-deep rounded-sm",
				children: it.label
			}) }, it.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "text-white/70",
				children: it.label
			}, it.label))
		})]
	});
}
//#endregion
export { Header as n, Footer as t };
