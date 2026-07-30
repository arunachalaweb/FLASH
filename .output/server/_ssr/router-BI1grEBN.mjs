import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, m as createFileRoute, p as lazyRouteComponent, s as Scripts, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$28 } from "./route-BrNXl5iK.mjs";
import { t as Route$29 } from "./services._slug-BGe19XnQ.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-BI1grEBN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-CtgK54Z5.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$27 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Flash Renewable Energy Solutions Pvt. Ltd." },
			{
				name: "description",
				content: "End-to-end EPC solar and renewable energy solutions for homes, businesses and industries across India."
			},
			{
				name: "author",
				content: "Flash Renewable Energy Solutions"
			},
			{
				property: "og:title",
				content: "Flash Renewable Energy Solutions"
			},
			{
				property: "og:description",
				content: "Powering tomorrow with clean energy. Solar EPC, rooftop, industrial and utility-scale projects."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon-flash.png?v=2"
			},
			{
				rel: "apple-touch-icon",
				href: "/favicon-flash.png?v=2"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$27.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
			position: "top-right",
			richColors: true,
			closeButton: true
		})]
	});
}
var $$splitComponentImporter$25 = () => import("./routes-DCXDM6bz.mjs");
var Route$26 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Flash Renewable Energy Solutions | Solar EPC across India" },
		{
			name: "description",
			content: "Innovative, sustainable and reliable end-to-end renewable energy solutions for homes, businesses and industries. 500+ projects delivered."
		},
		{
			property: "og:title",
			content: "Flash Renewable Energy Solutions"
		},
		{
			property: "og:description",
			content: "End-to-end solar EPC — rooftop, ground-mounted, industrial and utility-scale."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./route-Di7iQBCH.mjs");
var Route$25 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async () => {
		const hasLocalStorage = typeof localStorage !== "undefined";
		const adminToken = hasLocalStorage ? localStorage.getItem("admin_token") : null;
		const adminUser = hasLocalStorage ? localStorage.getItem("admin_user") : null;
		const adminRole = hasLocalStorage ? localStorage.getItem("admin_role") || "admin" : "admin";
		const adminId = hasLocalStorage ? localStorage.getItem("admin_id") || "admin" : "admin";
		if (adminToken && adminUser) return { user: {
			id: adminId,
			email: adminUser,
			role: adminRole
		} };
		throw redirect({ to: "/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./about-CVnlg7K1.mjs");
var Route$24 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Us | Flash Renewable Energy Solutions" },
		{
			name: "description",
			content: "Learn about Flash Renewable Energy Solutions Pvt. Ltd. — a dedicated renewable energy company delivering innovative solar EPC solutions across India."
		},
		{
			property: "og:title",
			content: "About Flash Renewable Energy Solutions"
		},
		{
			property: "og:description",
			content: "Leading the way towards a sustainable future."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./contact-Dj-p8pXV.mjs");
var Route$23 = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{ title: "Contact Us | Flash Renewable Energy Solutions" },
			{
				name: "description",
				content: "Get in touch with Flash Renewable Energy Solutions — free site assessment and personalised solar proposals within 48 hours."
			},
			{
				property: "og:title",
				content: "Contact Flash Renewable Energy"
			},
			{
				property: "og:description",
				content: "Free site visit and proposal within 48 hours."
			},
			{
				property: "og:url",
				content: "https://www.flashrenewable.com/contact"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://www.flashrenewable.com/contact"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./expertise-CKlpmyRE.mjs");
var Route$22 = createFileRoute("/expertise")({
	head: () => ({
		meta: [
			{ title: "Our Expertise & 5-Step Process | Flash Renewable Energy" },
			{
				name: "description",
				content: "How we deliver solar EPC projects — a five-step process covering consultation, engineering, installation, monitoring and continuous innovation."
			},
			{
				property: "og:title",
				content: "Our Expertise — Flash Renewable Energy"
			},
			{
				property: "og:description",
				content: "A rigorous five-step process from consultation to continuous innovation."
			},
			{
				property: "og:url",
				content: "https://www.flashrenewable.com/expertise"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://www.flashrenewable.com/expertise"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./forgot-password-CH91-kLG.mjs");
var Route$21 = createFileRoute("/forgot-password")({
	head: () => ({ meta: [
		{ title: "Reset Password | Flash Renewable Energy Solutions" },
		{
			name: "description",
			content: "Request a password reset link for your Flash Renewable Energy account."
		},
		{
			property: "og:title",
			content: "Reset Password | Flash Renewable Energy"
		},
		{
			property: "og:description",
			content: "Recover access to your Flash Renewable Energy account."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./login-CiJsqhSH.mjs");
var Route$20 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Login | Flash Renewable Energy Solutions" }, {
		name: "description",
		content: "Log in to your Flash Renewable Energy admin dashboard."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./projects-DeRTKsPu.mjs");
var Route$19 = createFileRoute("/projects")({
	head: () => ({
		meta: [
			{ title: "Projects | Flash Renewable Energy Solutions" },
			{
				name: "description",
				content: "Explore Flash Renewable Energy's residential, commercial, industrial and utility-scale solar installations across India."
			},
			{
				property: "og:title",
				content: "Our Projects — Flash Renewable Energy"
			},
			{
				property: "og:description",
				content: "Powering every sector — residential, commercial, industrial and utility-scale."
			},
			{
				property: "og:url",
				content: "https://www.flashrenewable.com/projects"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://www.flashrenewable.com/projects"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./quote-DKMqasuO.mjs");
var Route$18 = createFileRoute("/quote")({
	head: () => ({
		meta: [
			{ title: "Get a Free Quote | Flash Renewable Energy Solutions" },
			{
				name: "description",
				content: "Request a free solar quote from Flash Renewable Energy — free site visit, personalised proposal and payback estimate within 48 hours."
			},
			{
				property: "og:title",
				content: "Free Solar Quote — Flash Renewable Energy"
			},
			{
				property: "og:description",
				content: "Free site visit, personalised proposal and payback estimate within 48 hours."
			},
			{
				property: "og:url",
				content: "https://www.flashrenewable.com/quote"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://www.flashrenewable.com/quote"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./reset-password-DL5_XCVx.mjs");
var Route$17 = createFileRoute("/reset-password")({
	head: () => ({ meta: [
		{ title: "Set New Password | Flash Renewable Energy Solutions" },
		{
			name: "description",
			content: "Choose a new password for your Flash Renewable Energy account."
		},
		{
			property: "og:title",
			content: "Set New Password | Flash Renewable Energy"
		},
		{
			property: "og:description",
			content: "Complete your password reset."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./signup-BIe3SeBV.mjs");
var Route$16 = createFileRoute("/signup")({
	head: () => ({ meta: [{ title: "Create Account | Flash Renewable Energy Solutions" }, {
		name: "description",
		content: "Create your Flash Renewable Energy account to start your solar journey."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var BASE_URL = "";
var Route$15 = createFileRoute("/sitemap.xml")({ server: { handlers: { GET: async () => {
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[{
		path: "/",
		changefreq: "weekly",
		priority: "1.0"
	}, {
		path: "/about",
		changefreq: "monthly",
		priority: "0.8"
	}].map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`).join("\n")}\n</urlset>`;
	return new Response(xml, { headers: {
		"Content-Type": "application/xml",
		"Cache-Control": "public, max-age=3600"
	} });
} } } });
var $$splitComponentImporter$14 = () => import("./why-us-BlKuY1Xr.mjs");
var Route$14 = createFileRoute("/why-us")({
	head: () => ({
		meta: [
			{ title: "Why Choose Flash Renewable Energy Solutions" },
			{
				name: "description",
				content: "Experienced engineering team, MNRE-compliant designs, high-quality components, timely delivery and 24×7 support — the reasons clients choose Flash."
			},
			{
				property: "og:title",
				content: "Why Choose Us — Flash Renewable Energy"
			},
			{
				property: "og:description",
				content: "Engineering-led solar EPC with proven delivery across India."
			},
			{
				property: "og:url",
				content: "https://www.flashrenewable.com/why-us"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://www.flashrenewable.com/why-us"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./services.index-C2m2khvS.mjs");
var Route$13 = createFileRoute("/services/")({
	head: () => ({
		meta: [
			{ title: "Solar EPC Services | Flash Renewable Energy Solutions" },
			{
				name: "description",
				content: "End-to-end solar EPC services — rooftop, ground-mounted, industrial, water pumps, street lighting, battery storage and O&M across India."
			},
			{
				property: "og:title",
				content: "Our Services — Flash Renewable Energy"
			},
			{
				property: "og:description",
				content: "Complete renewable energy solutions for every sector."
			},
			{
				property: "og:url",
				content: "https://www.flashrenewable.com/services"
			}
		],
		links: [{
			rel: "canonical",
			href: "https://www.flashrenewable.com/services"
		}]
	}),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./admin-CPxDDYwX.mjs");
var Route$12 = createFileRoute("/_authenticated/admin/")({
	head: () => ({ meta: [{ title: "Admin Dashboard | Flash Renewable" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./messages-BeumJbdb.mjs");
var Route$11 = createFileRoute("/_authenticated/admin/messages")({
	head: () => ({ meta: [{ title: "Messaging Center | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./settings-B6UmqIeV.mjs");
var Route$10 = createFileRoute("/_authenticated/admin/settings")({
	head: () => ({ meta: [{ title: "Admin Settings | Flash" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./staff-DEJiEWWR.mjs");
var Route$9 = createFileRoute("/_authenticated/admin/staff")({
	head: () => ({ meta: [{ title: "Manage Staff | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./team-BeFNjbJ7.mjs");
var Route$8 = createFileRoute("/_authenticated/admin/team")({
	head: () => ({ meta: [{ title: "Team CMS | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./cms.faqs-CQrIVooL.mjs");
var Route$7 = createFileRoute("/_authenticated/admin/cms/faqs")({
	head: () => ({ meta: [{ title: "FAQs CMS | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./cms.pages-ByCKgqtK.mjs");
var Route$6 = createFileRoute("/_authenticated/admin/cms/pages")({
	head: () => ({ meta: [{ title: "Page Content | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./cms.projects-DzbdG0gR.mjs");
var Route$5 = createFileRoute("/_authenticated/admin/cms/projects")({
	head: () => ({ meta: [{ title: "Projects CMS | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./cms.services-DOUja3sk.mjs");
var Route$4 = createFileRoute("/_authenticated/admin/cms/services")({
	head: () => ({ meta: [{ title: "Services CMS | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./cms.testimonials-B_aRFief.mjs");
var Route$3 = createFileRoute("/_authenticated/admin/cms/testimonials")({
	head: () => ({ meta: [{ title: "Testimonials CMS | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./enquiries.contact-D6BmJ3vK.mjs");
var Route$2 = createFileRoute("/_authenticated/admin/enquiries/contact")({
	head: () => ({ meta: [{ title: "Contact Messages | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./enquiries.quotes-CZpTAJ8g.mjs");
var Route$1 = createFileRoute("/_authenticated/admin/enquiries/quotes")({
	head: () => ({ meta: [{ title: "Quote Requests | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./enquiries.subscribers-D6R58y0F.mjs");
var Route = createFileRoute("/_authenticated/admin/enquiries/subscribers")({
	head: () => ({ meta: [{ title: "Newsletter | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$26.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$27
});
var AuthenticatedRouteRoute = Route$25.update({
	id: "/_authenticated",
	getParentRoute: () => Route$27
});
var AboutRoute = Route$24.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$27
});
var ContactRoute = Route$23.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$27
});
var ExpertiseRoute = Route$22.update({
	id: "/expertise",
	path: "/expertise",
	getParentRoute: () => Route$27
});
var ForgotPasswordRoute = Route$21.update({
	id: "/forgot-password",
	path: "/forgot-password",
	getParentRoute: () => Route$27
});
var LoginRoute = Route$20.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$27
});
var ProjectsRoute = Route$19.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => Route$27
});
var QuoteRoute = Route$18.update({
	id: "/quote",
	path: "/quote",
	getParentRoute: () => Route$27
});
var ResetPasswordRoute = Route$17.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$27
});
var SignupRoute = Route$16.update({
	id: "/signup",
	path: "/signup",
	getParentRoute: () => Route$27
});
var SitemapDotxmlRoute = Route$15.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$27
});
var WhyUsRoute = Route$14.update({
	id: "/why-us",
	path: "/why-us",
	getParentRoute: () => Route$27
});
var AuthenticatedAdminRouteRoute = Route$28.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ServicesIndexRoute = Route$13.update({
	id: "/services/",
	path: "/services/",
	getParentRoute: () => Route$27
});
var ServicesSlugRoute = Route$29.update({
	id: "/services/$slug",
	path: "/services/$slug",
	getParentRoute: () => Route$27
});
var AuthenticatedAdminIndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => AuthenticatedAdminRouteRoute
});
var AuthenticatedAdminRouteRouteChildren = {
	AuthenticatedAdminMessagesRoute: Route$11.update({
		id: "/messages",
		path: "/messages",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminSettingsRoute: Route$10.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminStaffRoute: Route$9.update({
		id: "/staff",
		path: "/staff",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminTeamRoute: Route$8.update({
		id: "/team",
		path: "/team",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminIndexRoute,
	AuthenticatedAdminCmsFaqsRoute: Route$7.update({
		id: "/cms/faqs",
		path: "/cms/faqs",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminCmsPagesRoute: Route$6.update({
		id: "/cms/pages",
		path: "/cms/pages",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminCmsProjectsRoute: Route$5.update({
		id: "/cms/projects",
		path: "/cms/projects",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminCmsServicesRoute: Route$4.update({
		id: "/cms/services",
		path: "/cms/services",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminCmsTestimonialsRoute: Route$3.update({
		id: "/cms/testimonials",
		path: "/cms/testimonials",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminEnquiriesContactRoute: Route$2.update({
		id: "/enquiries/contact",
		path: "/enquiries/contact",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminEnquiriesQuotesRoute: Route$1.update({
		id: "/enquiries/quotes",
		path: "/enquiries/quotes",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	}),
	AuthenticatedAdminEnquiriesSubscribersRoute: Route.update({
		id: "/enquiries/subscribers",
		path: "/enquiries/subscribers",
		getParentRoute: () => AuthenticatedAdminRouteRoute
	})
};
var AuthenticatedRouteRouteChildren = { AuthenticatedAdminRouteRoute: AuthenticatedAdminRouteRoute._addFileChildren(AuthenticatedAdminRouteRouteChildren) };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	ContactRoute,
	ExpertiseRoute,
	ForgotPasswordRoute,
	LoginRoute,
	ProjectsRoute,
	QuoteRoute,
	ResetPasswordRoute,
	SignupRoute,
	SitemapDotxmlRoute,
	WhyUsRoute,
	ServicesSlugRoute,
	ServicesIndexRoute
};
var routeTree = Route$27._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
