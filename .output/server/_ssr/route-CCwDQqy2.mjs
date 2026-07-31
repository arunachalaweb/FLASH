import { i as __toESM } from "../_runtime.mjs";
import { t as flash_logo_updated_default } from "./flash-logo-updated-DRWX-8Au.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { f as Outlet, g as Link, l as useRouterState, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as ChevronRight, F as MessageSquareQuote, I as Menu, K as LayoutDashboard, N as Newspaper, Q as Image, R as Mail, a as X, at as FileText, kt as Bell, l as UserCog, ot as FilePen, q as Layers, s as Users, vt as CircleQuestionMark, w as Settings, z as LogOut } from "../_libs/lucide-react.mjs";
import { t as Route } from "./route-D__Hz9S1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-CCwDQqy2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var adminSections = [
	{
		title: "Overview",
		items: [{
			to: "/admin",
			label: "Dashboard",
			icon: LayoutDashboard
		}]
	},
	{
		title: "Enquiries",
		items: [
			{
				to: "/admin/enquiries/contact",
				label: "Contact Messages",
				icon: Mail
			},
			{
				to: "/admin/enquiries/quotes",
				label: "Quote Requests",
				icon: FileText
			},
			{
				to: "/admin/enquiries/subscribers",
				label: "Newsletter",
				icon: Newspaper
			}
		]
	},
	{
		title: "CMS",
		items: [
			{
				to: "/admin/cms/pages",
				label: "Page Content",
				icon: FilePen
			},
			{
				to: "/admin/cms/services",
				label: "Services",
				icon: Layers
			},
			{
				to: "/admin/cms/projects",
				label: "Projects",
				icon: Image
			},
			{
				to: "/admin/cms/testimonials",
				label: "Testimonials",
				icon: MessageSquareQuote
			},
			{
				to: "/admin/cms/faqs",
				label: "FAQs",
				icon: CircleQuestionMark
			}
		]
	},
	{
		title: "People",
		items: [{
			to: "/admin/team",
			label: "Team Members",
			icon: Users
		}, {
			to: "/admin/staff",
			label: "Staff Directory",
			icon: UserCog
		}]
	},
	{
		title: "Account",
		items: [{
			to: "/admin/settings",
			label: "Settings",
			icon: Settings
		}]
	}
];
var staffSections = [{
	title: "Overview",
	items: [{
		to: "/admin",
		label: "Dashboard",
		icon: LayoutDashboard
	}]
}, {
	title: "Messaging",
	items: [{
		to: "/admin/messages",
		label: "Internal Messaging",
		icon: MessageSquareQuote
	}]
}];
function AdminShell({ email, children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const role = typeof window !== "undefined" ? localStorage.getItem("admin_role") || "admin" : "admin";
	const sections = role === "staff" ? staffSections : adminSections;
	const onSignOut = async () => {
		localStorage.removeItem("admin_token");
		localStorage.removeItem("admin_user");
		localStorage.removeItem("admin_role");
		localStorage.removeItem("admin_id");
		navigate({
			to: "/login",
			replace: true
		});
	};
	const isActive = (to) => to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-slate-50 text-slate-900 font-sans",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:hidden sticky top-0 z-40 flex items-center justify-between bg-white border-b px-4 h-14",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin",
				className: "flex items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: flash_logo_updated_default,
					alt: "Flash",
					className: "h-[46px] w-auto object-contain"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setOpen(true),
				className: "p-2 rounded-md hover:bg-slate-100",
				"aria-label": "Open menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "h-5 w-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: `fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-brand-navy-deep text-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between px-5 h-32 border-b border-white/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin",
								onClick: () => setOpen(false),
								className: "flex items-center px-1 mx-auto",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: flash_logo_updated_default,
									alt: "Flash Renewable Energy",
									className: "h-[100px] w-auto object-contain"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setOpen(false),
								className: "lg:hidden p-2 rounded-md hover:bg-white/10",
								"aria-label": "Close menu",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "p-3 space-y-6 overflow-y-auto h-[calc(100vh-4rem-4.5rem)]",
							children: sections.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40",
								children: section.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-0.5",
								children: section.items.map((it) => {
									const active = isActive(it.to);
									const Icon = it.icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: it.to,
										onClick: () => setOpen(false),
										className: `group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${active ? "bg-gradient-to-r from-primary/25 to-transparent text-white shadow-inner border-l-2 border-primary" : "text-white/70 hover:bg-white/5 hover:text-white"}`,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: `h-4 w-4 ${active ? "text-primary" : ""}` }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex-1",
												children: it.label
											}),
											active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-3.5 w-3.5 text-primary" })
										]
									}, it.to);
								})
							})] }, section.title))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-0 inset-x-0 p-3 border-t border-white/10 bg-black/20",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 px-2 py-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep font-bold text-sm",
										children: email.slice(0, 1).toUpperCase()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-xs font-semibold truncate",
											children: email
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-[10px] text-white/50",
											children: role === "staff" ? "Staff Installer" : "Administrator"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: onSignOut,
										className: "p-2 rounded-md hover:bg-white/10 text-white/70 hover:text-white",
										"aria-label": "Sign out",
										title: "Sign out",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "h-4 w-4" })
									})
								]
							})
						})
					]
				}),
				open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm",
					onClick: () => setOpen(false)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "flex-1 min-w-0 lg:ml-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden lg:flex sticky top-0 z-30 bg-white/90 backdrop-blur border-b h-16 items-center justify-between px-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-500",
							children: "Welcome back"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-brand-navy",
							children: "Flash Renewable Admin"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "text-xs text-slate-500 hover:text-primary",
								children: "View Site →"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "p-2 rounded-full hover:bg-slate-100",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-4 w-4 text-slate-600" })
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-4 md:p-6 lg:p-8",
						children
					})]
				})
			]
		})]
	});
}
function AdminLayout() {
	const { email } = Route.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, {
		email,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { AdminLayout as component };
