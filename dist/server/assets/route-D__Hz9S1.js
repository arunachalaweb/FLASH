import { createFileRoute, lazyRouteComponent, redirect } from "@tanstack/react-router";
//#region src/routes/_authenticated/admin/route.tsx
var $$splitComponentImporter = () => import("./route-CCwDQqy2.js");
var Route = createFileRoute("/_authenticated/admin")({
	ssr: false,
	beforeLoad: async () => {
		const hasLocalStorage = typeof localStorage !== "undefined";
		const adminToken = hasLocalStorage ? localStorage.getItem("admin_token") : null;
		const adminUser = hasLocalStorage ? localStorage.getItem("admin_user") : null;
		const adminRole = hasLocalStorage ? localStorage.getItem("admin_role") : null;
		if (adminToken && adminUser && (adminRole === "admin" || adminRole === "staff")) return {
			userId: "admin",
			email: adminUser
		};
		throw redirect({ to: "/" });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
