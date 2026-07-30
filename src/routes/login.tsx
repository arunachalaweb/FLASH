import { createFileRoute, Link } from "@tanstack/react-router";
import { LogIn, Mail, Lock, Loader2, Eye, EyeOff, Zap, Sun, Shield } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import logo from "@/assets/flash-logo-updated.png";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login | Flash Renewable Energy Solutions" },
      { name: "description", content: "Log in to your Flash Renewable Energy admin dashboard." },
    ],
  }),
  component: LoginPage,
});

// ── Animated Solar Orbs on left panel ───────────────────
function SolarArt() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      <style>{`
        @keyframes orbit1 { from { transform: rotate(0deg) translateX(120px) rotate(0deg); } to { transform: rotate(360deg) translateX(120px) rotate(-360deg); } }
        @keyframes orbit2 { from { transform: rotate(120deg) translateX(180px) rotate(-120deg); } to { transform: rotate(480deg) translateX(180px) rotate(-480deg); } }
        @keyframes orbit3 { from { transform: rotate(240deg) translateX(240px) rotate(-240deg); } to { transform: rotate(600deg) translateX(240px) rotate(-600deg); } }
        @keyframes orbit4 { from { transform: rotate(60deg) translateX(300px) rotate(-60deg); } to { transform: rotate(420deg) translateX(300px) rotate(-420deg); } }
        @keyframes sun-pulse { 0%,100%{box-shadow:0 0 60px 20px rgba(251,191,36,0.4),0 0 120px 40px rgba(247,147,30,0.2)} 50%{box-shadow:0 0 100px 40px rgba(251,191,36,0.6),0 0 200px 80px rgba(247,147,30,0.3)} }
        @keyframes ray-rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes float-tag { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes panel-shine { 0%{opacity:0.15} 50%{opacity:0.35} 100%{opacity:0.15} }
        .orbit-1 { animation: orbit1 8s linear infinite; }
        .orbit-2 { animation: orbit2 12s linear infinite; }
        .orbit-3 { animation: orbit3 16s linear infinite reverse; }
        .orbit-4 { animation: orbit4 20s linear infinite; }
        .sun-pulse { animation: sun-pulse 3s ease-in-out infinite; }
        .ray-rotate { animation: ray-rotate 20s linear infinite; }
        .float-tag { animation: float-tag 3s ease-in-out infinite; }
        .panel-shine { animation: panel-shine 4s ease-in-out infinite; }
      `}</style>

      {/* Background glow */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.12) 0%, transparent 70%)" }} />

      {/* Rotating rays */}
      <div className="absolute inset-0 flex items-center justify-center ray-rotate">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="absolute origin-center" style={{
            width: "1.5px", height: "320px",
            background: `linear-gradient(to top, transparent, rgba(251,191,36,${i % 3 === 0 ? "0.25" : "0.1"}), transparent)`,
            transform: `rotate(${i * 15}deg)`,
          }} />
        ))}
      </div>

      {/* Orbit rings */}
      {[120, 180, 240, 300].map((r, i) => (
        <div key={r} className="absolute rounded-full border border-white/[0.06]" style={{ width: r * 2, height: r * 2 }} />
      ))}

      {/* Orbiting planets */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-0 h-0">
          {/* Orbit 1 — small solar panel icon */}
          <div className="orbit-1 absolute">
            <div className="h-10 w-10 rounded-lg border border-primary/40 bg-brand-navy-deep/80 backdrop-blur flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)]">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-primary"><rect x="2" y="7" width="20" height="10" rx="1"/><line x1="2" y1="12" x2="22" y2="12" stroke="rgba(12,35,64,0.6)" strokeWidth="1"/><line x1="8" y1="7" x2="8" y2="17" stroke="rgba(12,35,64,0.6)" strokeWidth="1"/><line x1="16" y1="7" x2="16" y2="17" stroke="rgba(12,35,64,0.6)" strokeWidth="1"/></svg>
            </div>
          </div>
          {/* Orbit 2 — zap bolt */}
          <div className="orbit-2 absolute">
            <div className="h-9 w-9 rounded-full border border-amber-400/30 bg-amber-500/10 backdrop-blur flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              <Zap className="h-4 w-4 text-amber-400" />
            </div>
          </div>
          {/* Orbit 3 — wind circle */}
          <div className="orbit-3 absolute">
            <div className="h-8 w-8 rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur flex items-center justify-center">
              <span className="text-cyan-300 text-xs font-bold">🌀</span>
            </div>
          </div>
          {/* Orbit 4 — leaf */}
          <div className="orbit-4 absolute">
            <div className="h-7 w-7 rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur flex items-center justify-center">
              <span className="text-emerald-300 text-xs">🌱</span>
            </div>
          </div>
        </div>
      </div>

      {/* Central sun */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="sun-pulse rounded-full flex items-center justify-center"
          style={{ width: 100, height: 100, background: "radial-gradient(circle, #fffde7 0%, #fbbf24 40%, #f97316 80%, #ea580c 100%)" }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "radial-gradient(circle, #fff 0%, #fcd34d 60%)" }} />
        </div>

        {/* Solar panel watermark SVG */}
        <svg viewBox="0 0 160 60" className="w-40 panel-shine" xmlns="http://www.w3.org/2000/svg">
          {[0,1,2,3].map(c => (
            <g key={c}>
              <rect x={c*38+4} y={4} width={32} height={52} rx={3} fill="none" stroke="rgba(251,191,36,0.5)" strokeWidth="1.5"/>
              <line x1={c*38+4} y1={30} x2={c*38+36} y2={30} stroke="rgba(251,191,36,0.3)" strokeWidth="0.8"/>
            </g>
          ))}
        </svg>

        {/* Floating tag */}
        <div className="float-tag text-center">
          <p className="font-display text-2xl font-bold text-white leading-tight">Flash Renewable</p>
          <p className="text-primary text-sm font-semibold mt-1">Energy Solutions Pvt. Ltd.</p>
        </div>

        {/* Feature chips */}
        <div className="flex flex-wrap justify-center gap-2 max-w-[280px]">
          {["MNRE Compliant", "500+ Projects", "25-yr Warranty", "PAN India"].map(f => (
            <span key={f} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold text-white/70 uppercase tracking-wider">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const onAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL;
      let backendSuccess = false;
      
      if (backendUrl) {
        // Use custom backend
        const res = await fetch(`${backendUrl}/api/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: email, password }),
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem("admin_token", data.token);
          localStorage.setItem("admin_user", data.username);
          localStorage.setItem("admin_role", data.role || "admin");
          localStorage.setItem("admin_id", data.id || "admin");
          backendSuccess = true;
        }
      } 
      
      if (!backendSuccess) {
        // Fallback: Use Supabase directly if backend failed or is unavailable
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast.error(error.message || "Invalid credentials");
          setLoading(false);
          return;
        }

        if (data.session) {
          localStorage.setItem("admin_token", data.session.access_token);
          localStorage.setItem("admin_user", data.user?.user_metadata?.full_name || email.split("@")[0]);
          localStorage.setItem("admin_role", "user"); // Regular user
          localStorage.setItem("admin_id", data.user?.id || "user");
        }
      }

      toast.success("Logged in successfully");
      const role = localStorage.getItem("admin_role");
      if (role === "admin" || role === "staff") {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/" });
      }
    } catch (err: any) {
      toast.error(err?.message || "Connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#020c14" }}>
      <style>{`
        @keyframes bg-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .input-glow:focus { border-color: rgba(251,191,36,0.6) !important; box-shadow: 0 0 0 3px rgba(251,191,36,0.1); }
      `}</style>

      {/* ── LEFT: Solar Art Panel ── */}
      <div className="hidden lg:flex lg:w-1/2 relative"
        style={{ background: "linear-gradient(135deg, #020c14 0%, #051a2b 50%, #03120e 100%)" }}>
        {/* hex grid */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zM28 100L0 84V66l28 16 28-16v18L28 100z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
          backgroundSize: "56px 100px",
        }} />
        <SolarArt />
      </div>

      {/* ── RIGHT: Login Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12" style={{ background: "linear-gradient(180deg, #020c14 0%, #051a2b 100%)" }}>
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex justify-center mb-10">
            <img src={logo} alt="Flash Renewable Energy" className="h-[76px] md:h-[120px] w-auto object-contain" />
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl font-bold text-white mb-2">Welcome back</h1>
          <p className="text-white/50 text-sm mb-8">Sign in to access your dashboard.</p>

          {/* Form */}
          <form onSubmit={onAdminLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-white/50 block mb-2">Username or Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  required
                  type="text"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin"
                  className="input-glow w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/50">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input
                  required
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-glow w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-12 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition"
                />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-brand-navy-deep transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, #fbbf24, #f97316)", boxShadow: "0 12px 35px -8px rgba(247,147,30,0.6)" }}
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : <><LogIn className="h-4 w-4" /> Sign In</>}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">or</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Signup link */}
          <p className="text-center text-sm text-white/40">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:text-amber-300 transition">
              Create account
            </Link>
          </p>

          {/* Security badge */}
          <div className="mt-8 flex items-center justify-center gap-2 text-white/25 text-xs">
            <Shield className="h-3.5 w-3.5" />
            <span>256-bit encrypted &amp; secure connection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
