import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus, Mail, Lock, User, Loader2, Eye, EyeOff, Sun, Shield, CheckCircle2, Circle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import logo from "@/assets/flash-logo-updated.png";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account | Flash Renewable Energy Solutions" },
      { name: "description", content: "Create your Flash Renewable Energy account to start your solar journey." },
    ],
  }),
  component: SignupPage,
});

// ── Password strength checker ───────────────────────────
function pwStrength(pw: string): { score: number; label: string; color: string } {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  const map: Record<number, { label: string; color: string }> = {
    0: { label: "Too short", color: "#ef4444" },
    1: { label: "Weak", color: "#f97316" },
    2: { label: "Fair", color: "#eab308" },
    3: { label: "Good", color: "#22c55e" },
    4: { label: "Strong 🔒", color: "#16a34a" },
  };
  return { score: s, ...map[s] };
}

// ── Animated solar building illustration on right ──────
function SolarBuildingArt() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden select-none">
      <style>{`
        @keyframes sun-rise2 { 0%{transform:translateY(40px);opacity:0} 100%{transform:translateY(0);opacity:1} }
        @keyframes ray-s { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes ray-s2 { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
        @keyframes cloud-drift { 0%,100%{transform:translateX(0)} 50%{transform:translateX(12px)} }
        @keyframes panel-blink { 0%,100%{fill:rgba(251,191,36,0.3)} 50%{fill:rgba(251,191,36,0.7)} }
        @keyframes energy-flow { 0%{stroke-dashoffset:100} 100%{stroke-dashoffset:0} }
        @keyframes bounce-chip { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .sun-rise2 { animation: sun-rise2 1.2s cubic-bezier(0.23,1,0.32,1) forwards; }
        .ray-s { animation: ray-s 25s linear infinite; }
        .ray-s2 { animation: ray-s2 18s linear infinite; }
        .cloud-drift { animation: cloud-drift 5s ease-in-out infinite; }
        .panel-blink { animation: panel-blink 2.5s ease-in-out infinite; }
        .energy-flow { stroke-dasharray: 100; animation: energy-flow 2s linear infinite; }
        .bounce-chip { animation: bounce-chip 2.5s ease-in-out infinite; }
        .bounce-chip2 { animation: bounce-chip 3s ease-in-out infinite 0.8s; }
        .bounce-chip3 { animation: bounce-chip 3.5s ease-in-out infinite 1.4s; }
      `}</style>

      {/* Background aurora */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(34,197,94,0.12) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(251,191,36,0.1) 0%, transparent 55%)" }} />

      {/* hex grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='70'%3E%3Cpath d='M20 46L0 35V11L20 0l20 11v24L20 46zM20 70L0 59V46l20 11 20-11v13L20 70z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
        backgroundSize: "40px 70px",
      }} />

      <div className="relative z-10 flex flex-col items-center gap-8 px-8">
        {/* Sun + rotating rays */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center ray-s">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="absolute origin-center" style={{
                width: "2px", height: "68px",
                background: "linear-gradient(to top, rgba(251,191,36,0.6), transparent)",
                transform: `rotate(${i * 20}deg)`,
              }} />
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center ray-s2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="absolute origin-center" style={{
                width: "1.5px", height: "45px",
                background: "linear-gradient(to top, rgba(247,147,30,0.4), transparent)",
                transform: `rotate(${i * 30}deg)`,
              }} />
            ))}
          </div>
          <div className="sun-rise2 relative z-10 rounded-full flex items-center justify-center"
            style={{ width: 80, height: 80, background: "radial-gradient(circle, #fffde7 0%, #fbbf24 45%, #f97316 100%)", boxShadow: "0 0 60px 20px rgba(251,191,36,0.4)" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "radial-gradient(circle, #fff 0%, #fef08a 60%)" }} />
          </div>
        </div>

        {/* Illustrated building with solar panels */}
        <svg viewBox="0 0 260 180" className="w-full max-w-[280px]" xmlns="http://www.w3.org/2000/svg">
          {/* Sky gradient */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(2,12,20,0)" />
              <stop offset="100%" stopColor="rgba(5,26,43,0.4)" />
            </linearGradient>
          </defs>
          {/* Ground */}
          <rect x="0" y="150" width="260" height="30" fill="rgba(251,191,36,0.06)" rx="4"/>
          {/* Building 1 */}
          <rect x="30" y="70" width="70" height="80" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" rx="3"/>
          {/* Windows */}
          {[0,1,2].map(r => [0,1].map(c => (
            <rect key={`w${r}${c}`} x={42+c*28} y={82+r*22} width="16" height="14" rx="2" fill="rgba(251,191,36,0.15)" stroke="rgba(251,191,36,0.2)" strokeWidth="0.5"/>
          )))}
          {/* Solar panels on building 1 */}
          {[0,1,2].map(i => (
            <rect key={`p1${i}`} x={33+i*22} y="60" width="18" height="10" rx="2" fill="none" stroke="rgba(251,191,36,0.5)" strokeWidth="1.2" className="panel-blink" style={{ animationDelay: `${i*0.4}s` }}/>
          ))}

          {/* Building 2 — taller */}
          <rect x="120" y="30" width="90" height="120" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" rx="3"/>
          {[0,1,2,3].map(r => [0,1,2].map(c => (
            <rect key={`w2${r}${c}`} x={128+c*28} y={40+r*26} width="18" height="18" rx="2" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.2)" strokeWidth="0.5"/>
          )))}
          {/* Solar panels on building 2 */}
          {[0,1,2,3].map(i => (
            <rect key={`p2${i}`} x={124+i*22} y="20" width="18" height="10" rx="2" fill="rgba(251,191,36,0.6)" stroke="rgba(251,191,36,0.8)" strokeWidth="1" className="panel-blink" style={{ animationDelay: `${i*0.3}s` }}/>
          ))}

          {/* Energy flow lines */}
          <path d="M65 60 Q100 20 130 20" fill="none" stroke="rgba(251,191,36,0.4)" strokeWidth="1.5" strokeDasharray="4 3" className="energy-flow"/>
          <path d="M95 65 Q110 50 124 20" fill="none" stroke="rgba(251,191,36,0.3)" strokeWidth="1" strokeDasharray="3 4" className="energy-flow" style={{ animationDelay: "0.5s" }}/>
        </svg>

        {/* Floating stat chips */}
        <div className="flex flex-wrap justify-center gap-3">
          <div className="bounce-chip rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-center">
            <div className="text-xl font-display font-black text-primary">500+</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Projects</div>
          </div>
          <div className="bounce-chip2 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-4 py-2 text-center">
            <div className="text-xl font-display font-black text-emerald-400">100MW+</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">Installed</div>
          </div>
          <div className="bounce-chip3 rounded-xl border border-sky-400/30 bg-sky-500/10 px-4 py-2 text-center">
            <div className="text-xl font-display font-black text-sky-400">PAN</div>
            <div className="text-[10px] text-white/50 uppercase tracking-wider">India</div>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs max-w-[220px] leading-relaxed">
          Join thousands of homes &amp; businesses powering a cleaner tomorrow.
        </p>
      </div>
    </div>
  );
}

function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const strength = pwStrength(password);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin, data: { full_name: name } },
      });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created — check your email to confirm.");
        navigate({ to: "/" });
      }
    } catch (err: any) {
      // Supabase not configured or network issue
      toast.error("Sign-up service is not available right now. Please contact us directly at info@flashrenewable.com");
    } finally {
      setLoading(false);
    }
  };

  const onGoogle = async () => {
    try {
      const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
      if (res.error) toast.error(res.error.message ?? "Google sign-in failed");
    } catch {
      toast.error("Google sign-in is not available right now.");
    }
  };

  const pwRules = [
    { ok: password.length >= 8, label: "At least 8 characters" },
    { ok: /[A-Z]/.test(password), label: "One uppercase letter" },
    { ok: /[0-9]/.test(password), label: "One number" },
    { ok: /[^A-Za-z0-9]/.test(password), label: "One special character" },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: "#020c14" }}>
      <style>{`
        .input-glow2:focus { border-color: rgba(34,197,94,0.6) !important; box-shadow: 0 0 0 3px rgba(34,197,94,0.08); }
      `}</style>

      {/* ── LEFT: Signup Form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 order-2 lg:order-1"
        style={{ background: "linear-gradient(180deg, #020c14 0%, #03120e 100%)" }}>
        <div className="w-full max-w-md">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="Flash Renewable Energy" className="h-[76px] md:h-[120px] w-auto object-contain" />
          </div>

          <h1 className="font-display text-4xl font-bold text-white mb-2">Start your solar journey</h1>
          <p className="text-white/50 text-sm mb-8">Create an account in under 2 minutes.</p>

          {/* Google sign-in */}
          <button
            type="button"
            onClick={onGoogle}
            className="w-full flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition mb-5"
          >
            <svg className="h-4 w-4 flex-shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs">or with email</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-white/50 block mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input required type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your full name"
                  className="input-glow2 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition" />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-white/50 block mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input required type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-glow2 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-white/50 block mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input required type={showPw ? "text" : "password"} minLength={8} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="input-glow2 w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-12 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition" />
                <button type="button" onClick={() => setShowPw(v => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Strength bar */}
              {password.length > 0 && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 flex-1 mr-3">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="h-1 flex-1 rounded-full transition-all duration-400"
                          style={{ background: i <= strength.score ? strength.color : "rgba(255,255,255,0.1)" }} />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold" style={{ color: strength.color }}>{strength.label}</span>
                  </div>
                  {/* Rules checklist */}
                  <div className="grid grid-cols-2 gap-1">
                    {pwRules.map(r => (
                      <div key={r.label} className="flex items-center gap-1.5 text-[10px]">
                        {r.ok
                          ? <CheckCircle2 className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                          : <Circle className="h-3 w-3 text-white/20 flex-shrink-0" />
                        }
                        <span className={r.ok ? "text-emerald-400" : "text-white/30"}>{r.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60 mt-2"
              style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)", boxShadow: "0 12px 35px -8px rgba(34,197,94,0.5)" }}
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating…</> : <><UserPlus className="h-4 w-4" /> Create Account</>}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-white/40">
            Already have an account?{" "}
            <Link to="/login" className="text-emerald-400 font-semibold hover:text-emerald-300 transition">Sign in</Link>
          </p>

          <div className="mt-6 flex items-center justify-center gap-2 text-white/25 text-xs">
            <Shield className="h-3.5 w-3.5" />
            <span>Your data is encrypted &amp; never shared</span>
          </div>
        </div>
      </div>

      {/* ── RIGHT: Solar Building Art ── */}
      <div className="hidden lg:flex lg:w-1/2 relative order-1 lg:order-2"
        style={{ background: "linear-gradient(135deg, #020c14 0%, #03120e 50%, #051a2b 100%)" }}>
        <SolarBuildingArt />
      </div>
    </div>
  );
}
