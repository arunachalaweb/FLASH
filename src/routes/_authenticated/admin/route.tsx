import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    // Check for admin/staff token
    const hasLocalStorage = typeof localStorage !== "undefined";
    const adminToken = hasLocalStorage ? localStorage.getItem("admin_token") : null;
    const adminUser = hasLocalStorage ? localStorage.getItem("admin_user") : null;
    const adminRole = hasLocalStorage ? localStorage.getItem("admin_role") : null;
    
    if (adminToken && adminUser && (adminRole === "admin" || adminRole === "staff")) {
      return { userId: "admin", email: adminUser };
    }
    
    throw redirect({ to: "/" });
  },
  component: AdminLayout,
});

function AdminLayout() {
  const { email } = Route.useRouteContext();
  return (
    <AdminShell email={email}>
      <Outlet />
    </AdminShell>
  );
}
