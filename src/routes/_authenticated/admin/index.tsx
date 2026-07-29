import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  Mail,
  FileText,
  Newspaper,
  Users,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Layers,
  MessageSquareQuote,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
  Sliders,
  MessageSquare,
  ClipboardList,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { toast } from "sonner";

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL as string) || "http://localhost:4000";

async function apiFetch(endpoint: string, options?: RequestInit) {
  const token = localStorage.getItem("admin_token");
  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers || {}),
    },
  });
  if (!res.ok) {
    if (res.status === 401) {
      localStorage.removeItem("admin_token");
      window.location.href = "/login";
    }
    throw new Error("API request failed");
  }
  return res.json();
}

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Admin Dashboard | Flash Renewable" }] }),
  component: Dashboard,
});

function StaffDashboard({ staffId }: { staffId: string }) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProj, setSelectedProj] = useState<any | null>(null);
  const [status, setStatus] = useState("pending");
  const [progress, setProgress] = useState(0);
  const [updating, setUpdating] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);

  const token = localStorage.getItem("admin_token");
  const staffName = localStorage.getItem("admin_user") || "Staff";

  async function loadProjects() {
    setLoading(true);
    try {
      const data = await apiFetch('/api/projects');
      const assigned = data.filter((p: any) => p.assigned_staff_id === staffId);
      setProjects(assigned);
      if (assigned.length > 0) {
        setSelectedProj(assigned[0]);
        setStatus(assigned[0].status || "pending");
        setProgress(assigned[0].progress_percent || 0);
      }
    } catch {
      toast.error("Failed to load assigned projects");
    } finally {
      setLoading(false);
    }
  }

  async function loadMessages() {
    try {
      const data = await apiFetch('/api/staff_messages');
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadProjects();
    loadMessages();
    const interval = setInterval(loadMessages, 8000);
    return () => clearInterval(interval);
  }, [staffId]);

  useEffect(() => {
    if (selectedProj) {
      setStatus(selectedProj.status || "pending");
      setProgress(selectedProj.progress_percent || 0);
    }
  }, [selectedProj]);

  async function saveProgress() {
    if (!selectedProj) return;
    setUpdating(true);
    try {
      await apiFetch(`/api/projects/${selectedProj.id}`, {
        method: "PUT",
        body: JSON.stringify({ status, progress_percent: Number(progress) }),
      });
      toast.success("Project status updated successfully!");
      loadProjects();
    } catch {
      toast.error("Failed to save progress");
    } finally {
      setUpdating(false);
    }
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProj || !newMessage.trim()) return;
    setSending(true);
    try {
      await apiFetch('/api/staff_messages', {
        method: "POST",
        body: JSON.stringify({
          project_id: selectedProj.id,
          sender_role: "staff",
          sender_name: staffName,
          recipient_id: "admin",
          message: newMessage.trim(),
        }),
      });
      setNewMessage("");
      loadMessages();
    } catch {
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  }

  const projectMessages = messages
    .filter((m) => m.project_id === selectedProj?.id)
    .reverse();

  const completedCount = projects.filter((p) => p.status === "completed").length;
  const pendingCount = projects.filter((p) => p.status === "pending").length;
  const inProgressCount = projects.filter((p) => p.status === "in_progress").length;

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-navy">Welcome, {staffName}!</h1>
        <p className="text-sm text-slate-500 mt-1">Staff Workspace & Project Collaboration Center</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 flex items-center gap-4">
          <div className="grid place-items-center h-12 w-12 rounded-xl bg-blue-50 text-blue-600">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-brand-navy">{projects.length}</div>
            <div className="text-xs text-slate-500 font-medium">Total Projects</div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 flex items-center gap-4">
          <div className="grid place-items-center h-12 w-12 rounded-xl bg-amber-50 text-amber-600">
            <Clock className="h-6 w-6 animate-pulse" />
          </div>
          <div>
            <div className="text-2xl font-bold text-brand-navy">{inProgressCount + pendingCount}</div>
            <div className="text-xs text-slate-500 font-medium">Pending & In Progress</div>
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 flex items-center gap-4">
          <div className="grid place-items-center h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="text-2xl font-bold text-brand-navy">{completedCount}</div>
            <div className="text-xs text-slate-500 font-medium">Completed Projects</div>
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-white p-12 text-center text-slate-500">
          <AlertCircle className="h-10 w-10 mx-auto text-slate-400 mb-3" />
          <h3 className="font-semibold text-brand-navy text-lg">No Projects Assigned</h3>
          <p className="text-sm mt-1">Contact the administrator to assign installation projects to your queue.</p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1 space-y-4">
            <h2 className="font-display text-lg font-bold text-brand-navy px-1">Assigned Projects</h2>
            <div className="space-y-3">
              {projects.map((p) => {
                const selected = p.id === selectedProj?.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProj(p)}
                    className={`w-full text-left p-4 rounded-xl border transition ${
                      selected
                        ? "bg-brand-navy text-white border-brand-navy shadow-lg"
                        : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="font-semibold text-sm line-clamp-1">{p.title}</div>
                    <div className={`text-xs mt-1 ${selected ? "text-slate-300" : "text-slate-500"}`}>
                      {p.location || "No location"} • {p.capacity || "N/A Capacity"}
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          p.status === "completed"
                            ? selected ? "bg-green-600/30 text-green-300" : "bg-green-50 text-green-700"
                            : p.status === "in_progress"
                              ? selected ? "bg-blue-600/30 text-blue-300" : "bg-blue-50 text-blue-700"
                              : selected ? "bg-amber-600/30 text-amber-300" : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {p.status === "completed" ? "Completed" : p.status === "in_progress" ? "In Progress" : "Pending"}
                      </span>
                      
                      <span className={`text-xs font-semibold ${selected ? "text-slate-300" : "text-slate-500"}`}>
                        {p.progress_percent || 0}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedProj && (
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border bg-white p-6 space-y-6">
                <div>
                  <h2 className="font-display text-xl font-bold text-brand-navy">{selectedProj.title}</h2>
                  <p className="text-xs text-slate-500 mt-1">Sector: {selectedProj.sector || "N/A"} | Completion target: {selectedProj.completion_date || "—"}</p>
                </div>

                <div className="bg-slate-50 border rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-xs text-brand-navy uppercase tracking-wider">
                    <FileText className="h-4 w-4 text-primary" />
                    Installation Instructions (From Admin)
                  </div>
                  <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                    {selectedProj.installation_instructions || "No custom instructions provided by administrator."}
                  </p>
                </div>

                <div className="border-t pt-5 space-y-4">
                  <h3 className="font-semibold text-brand-navy flex items-center gap-1.5 text-sm">
                    <Sliders className="h-4 w-4 text-primary" /> Update Progress
                  </h3>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase">Status</label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-500 uppercase flex justify-between">
                        <span>Progress Percentage</span>
                        <span className="text-primary font-bold">{progress}%</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e) => setProgress(Number(e.target.value))}
                        className="mt-3.5 w-full accent-primary"
                      />
                    </div>
                  </div>

                  <button
                    onClick={saveProgress}
                    disabled={updating}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground disabled:opacity-60 transition"
                  >
                    {updating && <Loader2 className="h-4 w-4 animate-spin" />}
                    Save Progress Updates
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border bg-white p-6 space-y-4">
                <h3 className="font-semibold text-brand-navy flex items-center gap-2 text-sm border-b pb-3">
                  <MessageSquare className="h-4 w-4 text-primary" /> Collaboration logs & Messages
                </h3>

                <div className="h-64 overflow-y-auto border rounded-xl bg-slate-50/50 p-4 space-y-3 flex flex-col">
                  {projectMessages.length === 0 ? (
                    <div className="m-auto text-center text-slate-400 text-xs py-10">
                      No communications recorded for this project yet. Write a message below to coordinate.
                    </div>
                  ) : (
                    projectMessages.map((m) => {
                      const isMe = m.sender_role === "staff";
                      return (
                        <div
                          key={m.id}
                          className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                            isMe
                              ? "bg-brand-navy text-white self-end rounded-tr-none"
                              : "bg-white text-slate-700 border self-start rounded-tl-none shadow-sm"
                          }`}
                        >
                          <div className="text-[10px] font-bold opacity-60 mb-0.5">
                            {isMe ? "You" : m.sender_name} • {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                          <div>{m.message}</div>
                        </div>
                      );
                    })
                  )}
                </div>

                <form onSubmit={sendMessage} className="flex gap-2">
                  <input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Report status or post a message..."
                    className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary"
                    disabled={sending}
                  />
                  <button
                    type="submit"
                    disabled={sending || !newMessage.trim()}
                    className="grid place-items-center h-10 w-10 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 transition"
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Dashboard() {
  const role = localStorage.getItem("admin_role") || "admin";
  const staffId = localStorage.getItem("admin_id") || "";

  if (role === "staff") {
    return <StaffDashboard staffId={staffId} />;
  }

  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [recent, setRecent] = useState<any[]>([]);
  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);
  const [series, setSeries] = useState<Array<Record<string, number | string>>>([]);
  const [statusMix, setStatusMix] = useState<Array<{ name: string; value: number }>>([]);
  const [range, setRange] = useState<7 | 30 | 90>(30);

  async function fetchTable(table: string) {
    try {
      return await apiFetch(`/api/${table}`);
    } catch (error) {
      console.error(`Error fetching ${table}:`, error);
      return [];
    }
  }

  useEffect(() => {
    (async () => {
      const [contacts, quotes, subscribers, services, projects] = await Promise.all([
        fetchTable("contact_enquiries"),
        fetchTable("quote_requests"),
        fetchTable("newsletter_subscribers"),
        fetchTable("services"),
        fetchTable("projects"),
      ]);
      setStats({
        contacts: contacts.length,
        newContacts: contacts.filter((c: any) => c.status === "new").length,
        quotes: quotes.length,
        newQuotes: quotes.filter((q: any) => q.status === "new").length,
        subscribers: subscribers.length,
        services: services.length,
        projects: projects.length,
      });
      setRecent(contacts.slice(0, 5));
      setRecentQuotes(quotes.slice(0, 5));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const since = new Date();
      since.setDate(since.getDate() - (range - 1));
      since.setHours(0, 0, 0, 0);
      const sinceIso = since.toISOString();

      const fetchDates = async (table: string) => {
        const all = await fetchTable(table);
        return all
          .filter((r: any) => new Date(r.created_at) >= since)
          .map((r: any) => r.created_at);
      };

      const [contacts, quotes, subs] = await Promise.all([
        fetchDates("contact_enquiries"),
        fetchDates("quote_requests"),
        fetchDates("newsletter_subscribers"),
      ]);

      type Day = {
        key: string;
        label: string;
        contacts: number;
        quotes: number;
        subscribers: number;
      };
      const days: Day[] = [];
      for (let i = 0; i < range; i++) {
        const d = new Date(since);
        d.setDate(since.getDate() + i);
        const key = d.toISOString().slice(0, 10);
        days.push({
          key,
          label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
          contacts: 0,
          quotes: 0,
          subscribers: 0,
        });
      }
      const idx = new Map(days.map((d, i) => [d.key, i]));
      const bump = (arr: string[], field: "contacts" | "quotes" | "subscribers") => {
        for (const iso of arr) {
          const k = iso.slice(0, 10);
          const i = idx.get(k);
          if (i != null) (days[i][field] as number) += 1;
        }
      };
      bump(contacts, "contacts");
      bump(quotes, "quotes");
      bump(subs, "subscribers");
      setSeries(days);

      // Status mix
      const all = [...contacts, ...quotes];
      const counts: Record<string, number> = {};
      for (const r of all) {
        const s = r.status ?? "new";
        counts[s] = (counts[s] ?? 0) + 1;
      }
      setStatusMix(Object.entries(counts).map(([name, value]) => ({ name, value })));
    })();
  }, [range]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-navy">Dashboard</h1>
        <p className="text-slate-500 mt-1">Overview of enquiries, content and users.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          icon={Mail}
          label="Contact Messages"
          value={stats?.contacts}
          badge={stats?.newContacts ? `${stats.newContacts} new` : undefined}
          tone="primary"
        />
        <StatCard
          icon={FileText}
          label="Quote Requests"
          value={stats?.quotes}
          badge={stats?.newQuotes ? `${stats.newQuotes} new` : undefined}
          tone="gold"
        />
        <StatCard icon={Newspaper} label="Subscribers" value={stats?.subscribers} tone="navy" />
        <StatCard icon={Users} label="Site Users" value={0} tone="green" />
        <StatCard icon={Layers} label="Services" value={stats?.services} tone="slate" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MiniStat label="Projects" value={stats?.projects} to="/admin/cms/projects" icon={Layers} />
        <MiniStat
          label="Testimonials"
          value={0}
          to="/admin/cms/testimonials"
          icon={MessageSquareQuote}
        />
        <MiniStat label="Team Members" value={0} to="/admin/team" icon={Users} />
        <MiniStat
          label="Subscribers"
          value={stats?.subscribers}
          to="/admin/enquiries/subscribers"
          icon={Newspaper}
        />
      </div>

      <ChartsSection series={series} statusMix={statusMix} range={range} setRange={setRange} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Panel title="Recent Contact Messages" to="/admin/enquiries/contact">
          {recent.length === 0 ? (
            <Empty />
          ) : (
            recent.map((r) => (
              <div
                key={String(r.id)}
                className="flex items-start justify-between gap-3 py-3 border-b last:border-0"
              >
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-brand-navy truncate">
                    {r.name} ·{" "}
                    <span className="text-slate-500 font-normal">{r.email}</span>
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {r.subject || r.message}
                  </div>
                </div>
                <StatusPill status={r.status} />
              </div>
            ))
          )}
        </Panel>
        <Panel title="Recent Quote Requests" to="/admin/enquiries/quotes">
          {recentQuotes.length === 0 ? (
            <Empty />
          ) : (
            recentQuotes.map((r) => (
              <div
                key={String(r.id)}
                className="flex items-start justify-between gap-3 py-3 border-b last:border-0"
              >
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-brand-navy truncate">
                    {r.name} ·{" "}
                    <span className="text-slate-500 font-normal">{r.service_type ?? "—"}</span>
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {r.city ?? ""} · {r.load_kw ?? ""}
                  </div>
                </div>
                <StatusPill status={r.status} />
              </div>
            ))
          )}
        </Panel>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  badge,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value?: number | string | null;
  badge?: string;
  tone?: string;
}) {
  const tones: Record<string, string> = {
    primary: "from-primary/15 to-primary/5 text-primary",
    gold: "from-brand-gold/20 to-brand-gold/5 text-brand-gold",
    navy: "from-brand-navy/15 to-brand-navy/5 text-brand-navy",
    green: "from-emerald-500/15 to-emerald-500/5 text-emerald-600",
    slate: "from-slate-500/15 to-slate-500/5 text-slate-700",
  };
  return (
    <div className="relative overflow-hidden rounded-2xl border bg-white p-5">
      <div
        className={`absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br ${tones[tone ?? "primary"]} blur-2xl opacity-70`}
      />
      <div className="relative flex items-center justify-between">
        <div
          className={`grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br ${tones[tone ?? "primary"]}`}
        >
          <Icon className="h-5 w-5" />
        </div>
        {badge && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary">
            {badge}
          </span>
        )}
      </div>
      <div className="relative mt-4 text-3xl font-display font-bold text-brand-navy">
        {value ?? "—"}
      </div>
      <div className="relative text-xs text-slate-500 mt-1">{label}</div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  to,
  icon: Icon,
}: {
  label: string;
  value?: number | string | null;
  to: string;
  icon: React.ElementType;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-xl border bg-white p-4 hover:border-primary hover:shadow-sm transition"
    >
      <div className="grid place-items-center h-9 w-9 rounded-lg bg-slate-100 group-hover:bg-primary/10 text-slate-600 group-hover:text-primary">
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs text-slate-500">{label}</div>
        <div className="font-display font-bold text-lg text-brand-navy">{value ?? "—"}</div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-primary" />
    </Link>
  );
}

function Panel({
  title,
  to,
  children,
}: {
  title: string;
  to?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-brand-navy">{title}</h3>
        </div>
        <Link to={to} className="text-xs text-primary font-semibold hover:underline">
          View all →
        </Link>
      </div>
      <div className="px-5 py-2">{children}</div>
    </div>
  );
}

function Empty() {
  return (
    <div className="py-8 text-center text-sm text-slate-400 flex flex-col items-center gap-2">
      <Clock className="h-5 w-5" />
      No records yet.
    </div>
  );
}

function StatusPill({ status }: { status?: string }) {
  const s = status ?? "new";
  const tones: Record<string, string> = {
    new: "bg-primary/10 text-primary",
    in_progress: "bg-brand-gold/15 text-brand-gold",
    resolved: "bg-emerald-100 text-emerald-700",
    archived: "bg-slate-100 text-slate-600",
  };
  return (
    <span
      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${tones[s] ?? tones.new}`}
    >
      {s.replace("_", " ")}
    </span>
  );
}

const CHART_COLORS = ["#f97316", "#eab308", "#0ea5e9", "#10b981", "#8b5cf6", "#64748b"];

function ChartsSection({
  series,
  statusMix,
  range,
  setRange,
}: {
  series: Array<Record<string, number | string>>;
  statusMix: Array<{ name: string; value: number }>;
  range: 7 | 30 | 90;
  setRange: (r: 7 | 30 | 90) => void;
}) {
  const totals = series.reduce(
    (
      a: { contacts: number; quotes: number; subscribers: number },
      d: Record<string, number | string>,
    ) => ({
      contacts: a.contacts + Number(d.contacts ?? 0),
      quotes: a.quotes + Number(d.quotes ?? 0),
      subscribers: a.subscribers + Number(d.subscribers ?? 0),
    }),
    { contacts: 0, quotes: 0, subscribers: 0 },
  );
  const tickEvery = Math.max(1, Math.floor(series.length / 8));
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-white overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-brand-navy">Activity over time</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-500">
              <Legendish color="#f97316" label={`Contacts ${totals.contacts}`} />
              <Legendish color="#eab308" label={`Quotes ${totals.quotes}`} />
              <Legendish color="#0ea5e9" label={`Subscribers ${totals.subscribers}`} />
            </div>
            <div className="inline-flex rounded-lg border bg-slate-50 p-0.5 text-xs">
              {([7, 30, 90] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 rounded-md font-semibold transition ${
                    range === r
                      ? "bg-white shadow text-brand-navy"
                      : "text-slate-500 hover:text-brand-navy"
                  }`}
                >
                  {r}d
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="h-72 p-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 10, right: 16, left: -12, bottom: 0 }}>
              <defs>
                {[
                  ["contacts", "#f97316"],
                  ["quotes", "#eab308"],
                  ["subscribers", "#0ea5e9"],
                ].map(([k, c]) => (
                  <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c} stopOpacity={0.35} />
                    <stop offset="100%" stopColor={c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis
                dataKey="label"
                interval={tickEvery - 1}
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                width={32}
              />
              <Tooltip
                contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="contacts"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#g-contacts)"
              />
              <Area
                type="monotone"
                dataKey="quotes"
                stroke="#eab308"
                strokeWidth={2}
                fill="url(#g-quotes)"
              />
              <Area
                type="monotone"
                dataKey="subscribers"
                stroke="#0ea5e9"
                strokeWidth={2}
                fill="url(#g-subscribers)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h3 className="font-semibold text-brand-navy">Contacts vs Quotes</h3>
            <span className="text-xs text-slate-500">Last {range} days</span>
          </div>
          <div className="h-64 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={series} margin={{ top: 10, right: 16, left: -12, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis
                  dataKey="label"
                  interval={tickEvery - 1}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  width={32}
                />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="contacts" fill="#f97316" radius={[6, 6, 0, 0]} />
                <Bar dataKey="quotes" fill="#eab308" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border bg-white overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <h3 className="font-semibold text-brand-navy">Enquiry status mix</h3>
          </div>
          <div className="h-64 p-4">
            {statusMix.length === 0 ? (
              <div className="h-full grid place-items-center text-sm text-slate-400">
                No enquiries yet.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 12 }}
                  />
                  <Pie
                    data={statusMix}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={80}
                    paddingAngle={3}
                  >
                    {statusMix.map((_, i: number) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Legendish({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
