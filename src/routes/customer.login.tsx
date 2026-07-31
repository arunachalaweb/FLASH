import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/login")({
  head: () => ({
    meta: [
      { title: "Customer Login | FLASH Solar Shop" },
      { name: "description", content: "Access your customer account to track orders and retrieve invoices." },
    ],
  }),
  component: CustomerLoginPage,
});

function CustomerLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/customers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Login failed");
      }

      // Store auth session
      localStorage.setItem("customer_token", data.token);
      localStorage.setItem("customer_user", JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email
      }));

      toast.success(`Welcome back, ${data.name}!`);
      
      // Redirect to customer dashboard
      navigate({ to: "/customer/dashboard" });
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col justify-between">
      <div>
        <Header />
        <PageHero
          title="Customer Portal"
          subtitle="Access your orders, download GST invoices, and edit shipping preferences."
        />

        <main className="py-12 max-w-md mx-auto px-4">
          <div className="bg-slate-800/20 border border-slate-700/40 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">Welcome Back</h2>
              <p className="text-xs text-slate-400 mt-1">Log in to manage your solar hardware purchases.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary-hover transition flex items-center justify-center gap-2 shadow-lg disabled:bg-slate-700 disabled:text-slate-500 active:scale-[0.98]"
              >
                {loading ? "Logging in..." : "Log In"} <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-700/40">
              New customer?{" "}
              <Link to="/customer/signup" className="text-primary hover:underline font-bold">
                Create an Account
              </Link>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
