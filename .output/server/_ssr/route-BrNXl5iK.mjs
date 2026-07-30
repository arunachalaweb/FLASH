import { j as redirect, m as createFileRoute, p as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-BrNXl5iK.js
var $$splitComponentImporter = () => import("./route-CbJ4nB7T.mjs");
var Route = createFileRoute("/_authenticated/admin")({
	ssr: false,
	beforeLoad: async () => {
		const hasLocalStorage = typeof localStorage !== "undefined";
		const adminToken = hasLocalStorage ? localStorage.getItem("admin_token") : null;
		const adminUser = hasLocalStorage ? localStorage.getItem("admin_user") : null;
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
