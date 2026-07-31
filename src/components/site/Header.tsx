import { Link } from "@tanstack/react-router";
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  ArrowRight,
  LogIn,
  LayoutDashboard,
  LogOut,
  ShoppingCart,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/flash-logo-updated.png";
import { getCart } from "@/lib/cart";

const nav = [
  { label: "Home", to: "/" },
  { label: "Products", to: "/products" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Expertise", to: "/expertise" },
  { label: "Why Us", to: "/why-us" },
  { label: "Contact", to: "/contact" },
];

export function Header({ overlay = false }: { overlay?: boolean } = {}) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminUser, setAdminUser] = useState<string | null>(null);

  // Customer states
  const [customerToken, setCustomerToken] = useState<string | null>(null);
  const [customerUser, setCustomerUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setAdminToken(localStorage.getItem("admin_token"));
      setAdminUser(localStorage.getItem("admin_user"));
      
      setCustomerToken(localStorage.getItem("customer_token"));
      try {
        setCustomerUser(JSON.parse(localStorage.getItem("customer_user") || "null"));
      } catch (e) {}

      // Cart initial load
      const cart = getCart();
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    }

    // Listen for cart changes
    const updateCart = () => {
      const cart = getCart();
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
    };
    window.addEventListener("flash_cart_update", updateCart);
    return () => window.removeEventListener("flash_cart_update", updateCart);
  }, []);

  const signOut = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    localStorage.removeItem("admin_role");
    localStorage.removeItem("admin_id");
    setAdminToken(null);
    setAdminUser(null);
    setMenuOpen(false);
    setOpen(false);
  };

  const customerSignOut = () => {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer_user");
    setCustomerToken(null);
    setCustomerUser(null);
    setOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navTextColor = overlay ? "text-white" : "text-brand-navy";
  const utilBarBg = overlay
    ? "bg-brand-navy/40 backdrop-blur border-b border-white/10"
    : "bg-brand-navy";
  const mainBarBg = overlay
    ? "bg-transparent"
    : "bg-white/95 backdrop-blur border-b border-border shadow-sm";

  return (
    <header className={`${overlay ? "absolute inset-x-0 top-0" : "sticky top-0"} z-50`}>
      {/* Top utility bar */}
      <div className={`hidden md:block ${utilBarBg} text-white/90 text-xs`}>
        <div className="mx-auto max-w-7xl px-6 h-9 flex items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-primary" />
              info@flashrenewable.com
            </span>
            <span className="hidden lg:flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              PAN-India Solar EPC · MNRE Registered
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden lg:inline text-white/60">Mon–Sat · 9:00 – 18:30</span>
            <a
              href="tel:+919150011428"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Phone className="h-3.5 w-3.5" /> +91 91500 11428
            </a>
            <span className="h-4 w-px bg-white/20" aria-hidden="true" />
            
            {/* Customer Authentication */}
            {customerToken ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/customer/dashboard"
                  className="inline-flex items-center gap-1.5 hover:text-primary transition-colors text-xs font-bold"
                >
                  <UserIcon className="h-3.5 w-3.5 text-primary" /> Dashboard ({customerUser?.name?.split(" ")[0]})
                </Link>
                <button
                  onClick={customerSignOut}
                  className="hover:text-red-400 transition-colors text-xs flex items-center gap-1"
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </button>
              </div>
            ) : (
              <Link
                to="/customer/login"
                className="inline-flex items-center gap-1.5 hover:text-primary transition-colors text-xs"
              >
                <UserIcon className="h-3.5 w-3.5" /> Shop Login
              </Link>
            )}

            <span className="h-4 w-px bg-white/20" aria-hidden="true" />
            {adminToken ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="inline-flex items-center gap-2 hover:text-primary transition-colors"
                >
                  <span className="grid place-items-center h-5 w-5 rounded-full bg-primary text-brand-navy-deep text-[10px] font-bold">
                    {(adminUser ?? "?").slice(0, 1).toUpperCase()}
                  </span>
                  <span className="max-w-[140px] truncate">{adminUser}</span>
                </button>
                {menuOpen && (
                  <div
                    className="absolute right-0 top-7 z-50 w-56 rounded-xl border border-white/10 bg-brand-navy-deep shadow-2xl overflow-hidden text-white"
                    onMouseLeave={() => setMenuOpen(false)}
                  >
                    <Link
                      to="/admin"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-primary/20"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5 text-primary" /> Admin Dashboard
                    </Link>
                    <button
                      onClick={signOut}
                      className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-xs hover:bg-red-500/20 text-red-300 border-t border-white/10"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className={mainBarBg}>
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 h-[96px] md:h-[140px]">
            {/* Logo */}
            <Link to="/" className="flex min-w-0 items-center" onClick={() => setOpen(false)}>
              <img
                src={logo}
                alt="Flash Renewable Energy Solutions"
                className="h-[56px] md:h-[90px] w-auto object-contain shrink-0"
              />
            </Link>

            {/* Desktop nav + CTA */}
            <div className="hidden lg:flex items-center gap-8">
              <nav className={`flex items-center gap-6 text-sm font-medium ${navTextColor}`}>
                {nav.map((n) => (
                  <Link
                    key={n.label}
                    to={n.to}
                    className="relative py-2 hover:text-primary transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full"
                  >
                    {n.label}
                  </Link>
                ))}
              </nav>
              
              {/* Shopping Cart Icon */}
              <Link
                to="/cart"
                className="relative p-2 text-brand-navy hover:text-primary transition-colors flex items-center justify-center bg-slate-100 rounded-full h-11 w-11"
              >
                <ShoppingCart className="h-5 w-5 text-brand-navy" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[10px] h-5 w-5 rounded-full flex items-center justify-center shadow-lg border border-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link
                to="/quote"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:brightness-95 transition"
              >
                Free Quote
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile: call + cart + hamburger */}
            <div className="flex lg:hidden items-center gap-2 shrink-0">
              <Link
                to="/cart"
                aria-label="Cart"
                className="relative grid place-items-center h-10 w-10 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition"
              >
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-[9px] h-4.5 w-4.5 rounded-full flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </Link>
              <a
                href="tel:+919150011428"
                aria-label="Call"
                className="grid place-items-center h-10 w-10 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition"
              >
                <Phone className="h-4 w-4" />
              </a>
              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="grid place-items-center h-10 w-10 rounded-full bg-brand-navy text-white hover:bg-primary transition"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`lg:hidden fixed inset-x-0 bottom-0 top-[80px] md:top-[calc(100px+36px)] z-40 bg-brand-navy/98 backdrop-blur-xl transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full overflow-y-auto px-6 py-6 flex flex-col gap-6">
          <nav className="flex flex-col divide-y divide-white/10">
            {nav.map((n, i) => (
              <Link
                key={n.label}
                to={n.to}
                onClick={() => setOpen(false)}
                className={`group flex items-center justify-between py-5 min-h-[56px] text-lg font-medium text-white active:bg-white/5 hover:text-primary transition-all ${
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              >
                <span>{n.label}</span>
                <ArrowRight className="h-4 w-4 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </Link>
            ))}
          </nav>
          <div className="space-y-3">
            <Link
              to="/quote"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full rounded-full bg-primary px-6 py-4 min-h-[56px] text-base font-semibold text-primary-foreground shadow-lg shadow-primary/30"
            >
              Get a Free Quote <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="tel:+919150011428"
              className="flex items-center justify-center gap-2 w-full rounded-full border border-white/20 px-6 py-4 min-h-[56px] text-base font-semibold text-white hover:bg-white/10 transition"
            >
              <Phone className="h-4 w-4 text-primary" /> +91 91500 11428
            </a>
            <div className="grid grid-cols-1 gap-3">
              {customerToken ? (
                <>
                  <Link
                    to="/customer/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-primary/20 border border-primary/40 px-4 py-3 min-h-[52px] text-sm font-semibold text-white"
                  >
                    <UserIcon className="h-4 w-4 text-primary" /> Customer Dashboard ({customerUser?.name?.split(" ")[0]})
                  </Link>
                  <button
                    onClick={customerSignOut}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 min-h-[52px] text-sm font-semibold text-white hover:bg-red-500/25 transition"
                  >
                    <LogOut className="h-4 w-4 text-primary" /> Sign out Shop Account
                  </button>
                </>
              ) : (
                <Link
                  to="/customer/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 min-h-[52px] text-sm font-semibold text-white hover:bg-white/10 transition"
                >
                  <UserIcon className="h-4 w-4 text-primary" /> Shop Login / Register
                </Link>
              )}

              {adminToken ? (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-primary/20 border border-primary/45 px-4 py-3 min-h-[52px] text-sm font-semibold text-white"
                  >
                    <LayoutDashboard className="h-4 w-4 text-primary" /> Admin Dashboard
                  </Link>
                  <button
                    onClick={signOut}
                    className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 min-h-[52px] text-sm font-semibold text-white hover:bg-red-500/20 transition"
                  >
                    <LogOut className="h-4 w-4 text-primary" /> Sign out Admin ({adminUser})
                  </button>
                </>
              ) : null}
            </div>
          </div>
          <div className="mt-auto pt-6 text-xs text-white/60 space-y-2">
            <p className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-primary" /> info@flashrenewable.com
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary" /> PAN-India · MNRE Registered
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
