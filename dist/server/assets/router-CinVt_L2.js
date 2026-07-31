import { t as Route$25 } from "./route-D__Hz9S1.js";
import { t as Route$26 } from "./services._slug-B8chUXud.js";
import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, redirect, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
//#region src/styles.css?url
var styles_default = "/assets/styles-Cd8YmkFy.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
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
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
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
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$24 = createRootRouteWithContext()({
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
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$24.useRouteContext();
	return /* @__PURE__ */ jsxs(QueryClientProvider, {
		client: queryClient,
		children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster, {
			position: "top-right",
			richColors: true,
			closeButton: true
		})]
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$22 = () => import("./routes-DMhw7mO6.js");
var Route$23 = createFileRoute("/")({
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
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
//#endregion
//#region src/routes/_authenticated/route.tsx
var $$splitComponentImporter$21 = () => import("./route-Di7iQBCH.js");
var Route$22 = createFileRoute("/_authenticated")({
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
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
//#endregion
//#region src/routes/about.tsx
var $$splitComponentImporter$20 = () => import("./about-dYGD5V50.js");
var Route$21 = createFileRoute("/about")({
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
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
//#endregion
//#region src/routes/contact.tsx
var $$splitComponentImporter$19 = () => import("./contact-TlV7HU0t.js");
var Route$20 = createFileRoute("/contact")({
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
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
//#endregion
//#region src/routes/expertise.tsx
var $$splitComponentImporter$18 = () => import("./expertise-BUS0RBit.js");
var Route$19 = createFileRoute("/expertise")({
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
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
//#endregion
//#region src/routes/login.tsx
var $$splitComponentImporter$17 = () => import("./login-CgjL7BpO.js");
var Route$18 = createFileRoute("/login")({
	head: () => ({ meta: [{ title: "Login | Flash Renewable Energy Solutions" }, {
		name: "description",
		content: "Log in to your Flash Renewable Energy admin dashboard."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
//#endregion
//#region src/routes/projects.tsx
var $$splitComponentImporter$16 = () => import("./projects-0vg8AfYT.js");
var Route$17 = createFileRoute("/projects")({
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
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
//#endregion
//#region src/routes/quote.tsx
var $$splitComponentImporter$15 = () => import("./quote-DYPIJpor.js");
var Route$16 = createFileRoute("/quote")({
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
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
//#endregion
//#region src/routes/sitemap[.]xml.ts
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
//#endregion
//#region src/routes/why-us.tsx
var $$splitComponentImporter$14 = () => import("./why-us-BvCsuFUz.js");
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
//#endregion
//#region src/routes/services.index.tsx
var $$splitComponentImporter$13 = () => import("./services.index-T7zEwsiL.js");
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
//#endregion
//#region src/routes/_authenticated/admin/index.tsx
var $$splitComponentImporter$12 = () => import("./admin-DWeG4zI-.js");
var Route$12 = createFileRoute("/_authenticated/admin/")({
	head: () => ({ meta: [{ title: "Admin Dashboard | Flash Renewable" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/messages.tsx
var $$splitComponentImporter$11 = () => import("./messages-Da44ErZo.js");
var Route$11 = createFileRoute("/_authenticated/admin/messages")({
	head: () => ({ meta: [{ title: "Messaging Center | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/settings.tsx
var $$splitComponentImporter$10 = () => import("./settings-CQoO9FOE.js");
var Route$10 = createFileRoute("/_authenticated/admin/settings")({
	head: () => ({ meta: [{ title: "Admin Settings | Flash" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/staff.tsx
var $$splitComponentImporter$9 = () => import("./staff-CP_ikDFD.js");
var Route$9 = createFileRoute("/_authenticated/admin/staff")({
	head: () => ({ meta: [{ title: "Manage Staff | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/team.tsx
var $$splitComponentImporter$8 = () => import("./team-BaGxyf5a.js");
var Route$8 = createFileRoute("/_authenticated/admin/team")({
	head: () => ({ meta: [{ title: "Team CMS | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/cms.faqs.tsx
var $$splitComponentImporter$7 = () => import("./cms.faqs-JKksntZX.js");
var Route$7 = createFileRoute("/_authenticated/admin/cms/faqs")({
	head: () => ({ meta: [{ title: "FAQs CMS | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/cms.pages.tsx
var $$splitComponentImporter$6 = () => import("./cms.pages-CM0eDm2a.js");
var Route$6 = createFileRoute("/_authenticated/admin/cms/pages")({
	head: () => ({ meta: [{ title: "Page Content | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/cms.projects.tsx
var $$splitComponentImporter$5 = () => import("./cms.projects-DZhG9qgy.js");
var Route$5 = createFileRoute("/_authenticated/admin/cms/projects")({
	head: () => ({ meta: [{ title: "Projects CMS | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/cms.services.tsx
var $$splitComponentImporter$4 = () => import("./cms.services-D4dwTMfe.js");
var Route$4 = createFileRoute("/_authenticated/admin/cms/services")({
	head: () => ({ meta: [{ title: "Services CMS | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/cms.testimonials.tsx
var $$splitComponentImporter$3 = () => import("./cms.testimonials-C6pDoWDA.js");
var Route$3 = createFileRoute("/_authenticated/admin/cms/testimonials")({
	head: () => ({ meta: [{ title: "Testimonials CMS | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/enquiries.contact.tsx
var $$splitComponentImporter$2 = () => import("./enquiries.contact-FR9lrpdA.js");
var Route$2 = createFileRoute("/_authenticated/admin/enquiries/contact")({
	head: () => ({ meta: [{ title: "Contact Messages | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/enquiries.quotes.tsx
var $$splitComponentImporter$1 = () => import("./enquiries.quotes-ZkX0HYeK.js");
var Route$1 = createFileRoute("/_authenticated/admin/enquiries/quotes")({
	head: () => ({ meta: [{ title: "Quote Requests | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
//#endregion
//#region src/routes/_authenticated/admin/enquiries.subscribers.tsx
var $$splitComponentImporter = () => import("./enquiries.subscribers-YUBCi_sS.js");
var Route = createFileRoute("/_authenticated/admin/enquiries/subscribers")({
	head: () => ({ meta: [{ title: "Newsletter | Flash Admin" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$23.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$24
});
var AuthenticatedRouteRoute = Route$22.update({
	id: "/_authenticated",
	getParentRoute: () => Route$24
});
var AboutRoute = Route$21.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$24
});
var ContactRoute = Route$20.update({
	id: "/contact",
	path: "/contact",
	getParentRoute: () => Route$24
});
var ExpertiseRoute = Route$19.update({
	id: "/expertise",
	path: "/expertise",
	getParentRoute: () => Route$24
});
var LoginRoute = Route$18.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$24
});
var ProjectsRoute = Route$17.update({
	id: "/projects",
	path: "/projects",
	getParentRoute: () => Route$24
});
var QuoteRoute = Route$16.update({
	id: "/quote",
	path: "/quote",
	getParentRoute: () => Route$24
});
var SitemapDotxmlRoute = Route$15.update({
	id: "/sitemap.xml",
	path: "/sitemap.xml",
	getParentRoute: () => Route$24
});
var WhyUsRoute = Route$14.update({
	id: "/why-us",
	path: "/why-us",
	getParentRoute: () => Route$24
});
var AuthenticatedAdminRouteRoute = Route$25.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => AuthenticatedRouteRoute
});
var ServicesIndexRoute = Route$13.update({
	id: "/services/",
	path: "/services/",
	getParentRoute: () => Route$24
});
var ServicesSlugRoute = Route$26.update({
	id: "/services/$slug",
	path: "/services/$slug",
	getParentRoute: () => Route$24
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
	LoginRoute,
	ProjectsRoute,
	QuoteRoute,
	SitemapDotxmlRoute,
	WhyUsRoute,
	ServicesSlugRoute,
	ServicesIndexRoute
};
var routeTree = Route$24._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
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
