import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Lock, Mail, User, Phone, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/customer/signup")({
  head: () => ({
    meta: [
      { title: "Register Account | FLASH Shop" },
      { name: "description", content: "Create an account to track your orders and manage solar purchases." },
    ],
  }),
  component: CustomerSignupPage,
});

function CustomerSignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/api/customers/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone })
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Signup failed");
      }

      // Store auth session
      localStorage.setItem("customer_token", data.token);
      localStorage.setItem("customer_user", JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email
      }));

      toast.success(`Welcome to FLASH, ${data.name}!`);
      
      // Redirect to customer dashboard
      navigate({ to: "/customer/dashboard" });
    } catch (err: any) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans flex flex-col justify-between">
      <div>
        <Header />
        <PageHero
          title="Create Customer Account"
          subtitle="Join FLASH Solar Shop to unlock advanced order tracking and custom corporate invoicing."
        />

        <main className="py-12 max-w-md mx-auto px-4">
          <div className="bg-slate-800/20 border border-slate-700/40 rounded-3xl p-6 md:p-8 space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white">Create Account</h2>
              <p className="text-xs text-slate-400 mt-1">Register in seconds to start shopping solar hardware.</p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ganesh Kumar"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white"
                  />
                </div>
              </div>

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
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
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
                    placeholder="Min. 8 characters"
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-slate-900 font-bold rounded-lg hover:bg-primary-hover transition flex items-center justify-center gap-2 shadow-lg disabled:bg-slate-700 disabled:text-slate-500 active:scale-[0.98]"
              >
                {loading ? "Registering..." : "Create Account"} <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="text-center text-xs text-slate-400 pt-4 border-t border-slate-700/40">
              Already have an account?{" "}
              <Link to="/customer/login" className="text-primary hover:underline font-bold">
                Log In
              </Link>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
