import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    // Check for admin/staff token
    const adminToken = localStorage.getItem("admin_token");
    const adminUser = localStorage.getItem("admin_user");
    const adminRole = localStorage.getItem("admin_role") || "admin";
    const adminId = localStorage.getItem("admin_id") || "admin";
    
    if (adminToken && adminUser) {
      return { user: { id: adminId, email: adminUser, role: adminRole } };
    }
    
    throw redirect({ to: "/login" });
  },
  component: () => <Outlet />,
});
