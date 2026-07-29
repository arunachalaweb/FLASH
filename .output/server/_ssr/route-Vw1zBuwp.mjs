import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-Vw1zBuwp.js
var $$splitComponentImporter = () => import("./route-C60YLwIF.mjs");
var Route = createFileRoute("/_authenticated/admin")({
	ssr: false,
	beforeLoad: async () => {
		const adminToken = localStorage.getItem("admin_token");
		const adminUser = localStorage.getItem("admin_user");
		if (adminToken && adminUser) return {
			userId: "admin",
			email: adminUser
		};
		throw redirect({ to: "/login" });
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
