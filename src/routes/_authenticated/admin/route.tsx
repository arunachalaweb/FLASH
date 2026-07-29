import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { AdminShell } from "@/components/admin/AdminShell";

export const Route = createFileRoute("/_authenticated/admin")({
  ssr: false,
  beforeLoad: async () => {
    // Check for admin token (local auth)
    const adminToken = localStorage.getItem("admin_token");
    const adminUser = localStorage.getItem("admin_user");
    if (adminToken && adminUser) {
      return { userId: "admin", email: adminUser };
    }
    
    throw redirect({ to: "/login" });
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
