import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    // Check for admin/staff/user token
    const hasLocalStorage = typeof localStorage !== "undefined";
    const adminToken = hasLocalStorage ? localStorage.getItem("admin_token") : null;
    const adminUser = hasLocalStorage ? localStorage.getItem("admin_user") : null;
    const adminRole = hasLocalStorage ? (localStorage.getItem("admin_role") || "admin") : "admin";
    const adminId = hasLocalStorage ? (localStorage.getItem("admin_id") || "admin") : "admin";
    
    if (adminToken && adminUser) {
      return { user: { id: adminId, email: adminUser, role: adminRole } };
    }
    
    throw redirect({ to: "/login" });
  },
  component: () => <Outlet />,
});
