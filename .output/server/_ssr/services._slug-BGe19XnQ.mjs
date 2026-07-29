import { P as notFound, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as getService } from "./services-data-oIchF6z1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services._slug-BGe19XnQ.js
var $$splitNotFoundComponentImporter = () => import("./services._slug-BSIqtQP_.mjs");
var $$splitComponentImporter = () => import("./services._slug-qq2o2Ef0.mjs");
var Route = createFileRoute("/services/$slug")({
	loader: ({ params }) => {
		const service = getService(params.slug);
		if (!service) throw notFound();
		return {
			slug: service.slug,
			label: service.label,
			intro: service.intro,
			image: service.image
		};
	},
	head: ({ loaderData }) => {
		if (!loaderData) return { meta: [{ title: "Service not found" }, {
			name: "robots",
			content: "noindex"
		}] };
		const s = loaderData;
		const url = `https://www.flashrenewable.com/services/${s.slug}`;
		const image = s.image?.startsWith("http") ? s.image : `https://www.flashrenewable.com${s.image?.startsWith("/") ? "" : "/"}${s.image ?? ""}`;
		const title = `${s.label} — Flash Renewable Energy Solutions`;
		return {
			meta: [
				{ title },
				{
					name: "description",
					content: s.intro
				},
				{
					property: "og:title",
					content: title
				},
				{
					property: "og:description",
					content: s.intro
				},
				{
					property: "og:url",
					content: url
				},
				{
					property: "og:type",
					content: "article"
				},
				{
					property: "og:image",
					content: image
				},
				{
					property: "og:site_name",
					content: "Flash Renewable Energy Solutions"
				},
				{
					name: "twitter:card",
					content: "summary_large_image"
				},
				{
					name: "twitter:title",
					content: title
				},
				{
					name: "twitter:description",
					content: s.intro
				},
				{
					name: "twitter:image",
					content: image
				}
			],
			links: [{
				rel: "canonical",
				href: url
			}],
			scripts: [{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Service",
					name: s.label,
					description: s.intro,
					url,
					image,
					provider: {
						"@type": "Organization",
						name: "Flash Renewable Energy Solutions",
						url: "https://www.flashrenewable.com"
					},
					areaServed: {
						"@type": "Country",
						name: "India"
					}
				})
			}, {
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "BreadcrumbList",
					itemListElement: [
						{
							"@type": "ListItem",
							position: 1,
							name: "Home",
							item: "https://www.flashrenewable.com/"
						},
						{
							"@type": "ListItem",
							position: 2,
							name: "Services",
							item: "https://www.flashrenewable.com/services"
						},
						{
							"@type": "ListItem",
							position: 3,
							name: s.label,
							item: url
						}
					]
				})
			}]
		};
	},
	component: lazyRouteComponent($$splitComponentImporter, "component"),
	notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
//#endregion
export { Route as t };
