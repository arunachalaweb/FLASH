import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Lock, Loader2, KeyRound, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Set New Password | Flash Renewable Energy Solutions" },
      {
        name: "description",
        content: "Choose a new password for your Flash Renewable Energy account.",
      },
      { property: "og:title", content: "Set New Password | Flash Renewable Energy" },
      { property: "og:description", content: "Complete your password reset." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase sends a recovery link; when it lands here, either the hash
    // contains tokens (auto-processed) or PASSWORD_RECOVERY fires.
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const isRecovery = hash.includes("type=recovery") || hash.includes("access_token");
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
      else if (!isRecovery) setInvalid(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) return toast.error("Password must be at least 8 characters");
    if (password !== confirm) return toast.error("Passwords do not match");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    setDone(true);
    toast.success("Password updated");
    await supabase.auth.signOut();
    setTimeout(() => navigate({ to: "/login" }), 1800);
  };

  return (
    <div className="bg-background text-foreground font-sans">
      <Header overlay />
      <PageHero
        title="Set New Password"
        crumb="Reset Password"
        tagline="Choose a strong new password for your account."
      />
      <section className="py-20">
        <div className="mx-auto max-w-md px-4">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-11 w-11 rounded-2xl bg-primary/10 text-primary">
                <KeyRound className="h-5 w-5" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-brand-navy">
                  Choose a new password
                </h1>
                <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
              </div>
            </div>

            {done ? (
              <div
                className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-brand-navy flex items-start gap-3"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold">Password updated</p>
                  <p className="text-muted-foreground">Redirecting you to login…</p>
                </div>
              </div>
            ) : invalid ? (
              <div
                className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-brand-navy"
                role="alert"
              >
                <p className="font-semibold mb-1">Invalid or expired link</p>
                <p className="text-muted-foreground">
                  Please{" "}
                  <Link
                    to="/forgot-password"
                    className="text-primary font-semibold hover:underline"
                  >
                    request a new reset link
                  </Link>
                  .
                </p>
              </div>
            ) : !ready ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" /> Verifying reset link…
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <label className="block text-sm">
                  <span className="text-brand-navy font-medium">New password</span>
                  <div className="mt-1 flex items-center gap-2 rounded-lg border border-input bg-background px-3">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex-1 bg-transparent py-2.5 text-sm focus:outline-none"
                      placeholder="At least 8 characters"
                    />
                  </div>
                </label>
                <label className="block text-sm">
                  <span className="text-brand-navy font-medium">Confirm password</span>
                  <div className="mt-1 flex items-center gap-2 rounded-lg border border-input bg-background px-3">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="flex-1 bg-transparent py-2.5 text-sm focus:outline-none"
                      placeholder="Repeat your password"
                    />
                  </div>
                </label>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground hover:brightness-110 transition disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Updating…
                    </>
                  ) : (
                    "Update password"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
