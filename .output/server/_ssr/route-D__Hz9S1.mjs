import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-D__Hz9S1.js
var $$splitComponentImporter = () => import("./route-CCwDQqy2.mjs");
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
