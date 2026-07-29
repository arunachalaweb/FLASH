import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, Loader2, KeyRound, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Password | Flash Renewable Energy Solutions" },
      {
        name: "description",
        content: "Request a password reset link for your Flash Renewable Energy account.",
      },
      { property: "og:title", content: "Reset Password | Flash Renewable Energy" },
      {
        property: "og:description",
        content: "Recover access to your Flash Renewable Energy account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    setSent(true);
    toast.success("Password reset email sent");
  };

  return (
    <div className="bg-background text-foreground font-sans">
      <Header overlay />
      <PageHero
        title="Forgot Password"
        crumb="Forgot Password"
        tagline="We'll email you a secure link to reset your password."
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
                  Reset your password
                </h1>
                <p className="text-xs text-muted-foreground">Enter your account email</p>
              </div>
            </div>

            {sent ? (
              <div
                className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-brand-navy"
                role="status"
                aria-live="polite"
              >
                <p className="font-semibold mb-1">Check your inbox</p>
                <p className="text-muted-foreground">
                  If an account exists for{" "}
                  <span className="font-medium text-brand-navy">{email}</span>, you'll receive a
                  password reset link shortly. The link is valid for a limited time.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <label className="block text-sm">
                  <span className="text-brand-navy font-medium">Email</span>
                  <div className="mt-1 flex items-center gap-2 rounded-lg border border-input bg-background px-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent py-2.5 text-sm focus:outline-none"
                      placeholder="you@example.com"
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
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                    </>
                  ) : (
                    "Send reset link"
                  )}
                </button>
              </form>
            )}

            <p className="text-center text-xs text-muted-foreground">
              <Link
                to="/login"
                className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
              >
                <ArrowLeft className="h-3 w-3" /> Back to login
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
