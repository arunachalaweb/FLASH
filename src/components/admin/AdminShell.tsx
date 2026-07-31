import { useState, type ReactNode } from "react";
import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Mail,
  FileText,
  Image as ImageIcon,
  MessageSquareQuote,
  HelpCircle,
  Users,
  UserCog,
  Settings,
  LogOut,
  Menu,
  X,
  Layers,
  FileEdit,
  ChevronRight,
  Bell,
  Newspaper,
  TrendingUp,
  Handshake,
  ShoppingBag,
  Package,
  ClipboardList,
  CreditCard,
} from "lucide-react";
import logo from "@/assets/flash-logo-updated.png";

type Item = { to: string; label: string; icon: React.ElementType };
type Section = { title: string; items: Item[] };

const adminSections: Section[] = [
  {
    title: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "E-Commerce",
    items: [
      { to: "/admin/ecommerce/products", label: "Products Manager", icon: ShoppingBag },
      { to: "/admin/ecommerce/inventory", label: "Inventory (Stock)", icon: Package },
      { to: "/admin/ecommerce/packages", label: "Packages Manager", icon: Layers },
      { to: "/admin/ecommerce/orders", label: "Orders & Invoices", icon: ClipboardList },
      { to: "/admin/ecommerce/enquiries", label: "Enquiries & Quotes", icon: FileText },
      { to: "/admin/ecommerce/coupons", label: "Coupons & Codes", icon: Newspaper },
      { to: "/admin/ecommerce/shipping", label: "Logistics Zones", icon: Settings },
      { to: "/admin/ecommerce/credit-notes", label: "Credit Notes", icon: CreditCard },
      { to: "/admin/ecommerce/customers", label: "Customers Registry", icon: Users },
    ]
  },
  {
    title: "Enquiries",
    items: [
      { to: "/admin/enquiries/contact", label: "Contact Messages", icon: Mail },
      { to: "/admin/enquiries/quotes", label: "Quote Requests", icon: FileText },
      { to: "/admin/enquiries/subscribers", label: "Newsletter", icon: Newspaper },
      { to: "/admin/enquiries/investors", label: "Investor Enquiries", icon: TrendingUp },
      { to: "/admin/enquiries/partners", label: "Partner Applications", icon: Handshake },
    ],
  },
  {
    title: "CMS",
    items: [
      { to: "/admin/cms/pages", label: "Page Content", icon: FileEdit },
      { to: "/admin/cms/slides", label: "Hero Sliders", icon: ImageIcon },
      { to: "/admin/cms/services", label: "Services", icon: Layers },
      { to: "/admin/cms/projects", label: "Projects", icon: ImageIcon },
      { to: "/admin/cms/testimonials", label: "Testimonials", icon: MessageSquareQuote },
      { to: "/admin/cms/faqs", label: "FAQs", icon: HelpCircle },
    ],
  },
  {
    title: "People",
    items: [
      { to: "/admin/team", label: "Team Members", icon: Users },
      { to: "/admin/staff", label: "Staff Directory", icon: UserCog },
    ],
  },
  {
    title: "Account",
    items: [{ to: "/admin/settings", label: "Settings", icon: Settings }],
  },
];

const staffSections: Section[] = [
  {
    title: "Overview",
    items: [{ to: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Assigned Leads",
    items: [
      { to: "/admin/enquiries/contact", label: "Contact Messages", icon: Mail },
      { to: "/admin/enquiries/quotes", label: "Quote Requests", icon: FileText },
    ],
  },
  {
    title: "Messaging",
    items: [{ to: "/admin/messages", label: "Internal Messaging", icon: MessageSquareQuote }],
  },
];

export function AdminShell({ email, children }: { email: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const role = typeof window !== "undefined" ? (localStorage.getItem("admin_role") || "admin") : "admin";
  const sections = role === "staff" ? staffSections : adminSections;

  const onSignOut = async () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_role");
    localStorage.removeItem("admin_id");
    navigate({ to: "/login", replace: true });
  };

  const isActive = (to: string) =>
    to === "/admin" ? pathname === "/admin" : pathname.startsWith(to);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between bg-white border-b px-4 h-14">
        <Link to="/admin" className="flex items-center">
          <img src={logo} alt="Flash" className="h-[46px] w-auto object-contain" />
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={onSignOut}
            className="p-2 rounded-md hover:bg-slate-100 text-slate-500"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
          <button
            onClick={() => setOpen(true)}
            className="p-2 rounded-md hover:bg-slate-100"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-brand-navy-deep text-white transition-transform lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 h-32 border-b border-white/10">
            <Link to="/admin" onClick={() => setOpen(false)} className="flex items-center px-1 mx-auto">
              <img src={logo} alt="Flash Renewable Energy" className="h-[100px] w-auto object-contain" />
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-white/10"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav — scrolls freely, no bottom clip */}
          <nav className="admin-nav-scroll p-3 space-y-6 overflow-y-auto h-[calc(100vh-8rem-4.5rem)] pb-6">
            {sections.map((section) => (
              <div key={section.title}>
                <div className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  {section.title}
                </div>
                <div className="space-y-0.5">
                  {section.items.map((it) => {
                    const active = isActive(it.to);
                    const Icon = it.icon;
                    return (
                      <Link
                        key={it.to}
                        to={it.to}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                          active
                            ? "bg-gradient-to-r from-primary/25 to-transparent text-white shadow-inner border-l-2 border-primary"
                            : "text-white/70 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <Icon className={`h-4 w-4 ${active ? "text-primary" : ""}`} />
                        <span className="flex-1">{it.label}</span>
                        {active && <ChevronRight className="h-3.5 w-3.5 text-primary" />}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Bottom bar — user info only, no logout (logout is in top header) */}
          <div className="absolute bottom-0 inset-x-0 p-3 border-t border-white/10 bg-black/20">
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="grid place-items-center h-9 w-9 rounded-full bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep font-bold text-sm flex-shrink-0">
                {email.slice(0, 1).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold truncate">{email}</div>
                <div className="text-[10px] text-white/50">
                  {role === "staff" ? "Staff Installer" : "Administrator"}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {open && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}

        {/* Main */}
        <main className="flex-1 min-w-0 lg:ml-0">
          <div className="hidden lg:flex sticky top-0 z-30 bg-white/90 backdrop-blur border-b h-16 items-center justify-between px-8">
            <div>
              <div className="text-xs text-slate-500">Welcome back</div>
              <div className="font-semibold text-brand-navy">Flash Renewable Admin</div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/" className="text-xs text-slate-500 hover:text-primary">
                View Site →
              </Link>
              <button className="p-2 rounded-full hover:bg-slate-100">
                <Bell className="h-4 w-4 text-slate-600" />
              </button>
              {/* Logout button — top bar, always visible */}
              <button
                onClick={onSignOut}
                title="Sign out"
                aria-label="Sign out"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-200 hover:border-red-200 transition"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          </div>
          <div className="p-4 md:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
