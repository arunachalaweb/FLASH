import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { MessageSquare, Send, Loader2, ClipboardList } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/messages")({
  head: () => ({ meta: [{ title: "Messaging Center | Flash Admin" }] }),
  component: MessagesCenter,
});

function MessagesCenter() {
  const [projects, setProjects] = useState<any[]>([]);
  const [selectedProj, setSelectedProj] = useState<any | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const isDev = import.meta.env.DEV;
  const BACKEND_URL = isDev ? "http://localhost:4000" : "";
  const hasLocalStorage = typeof window !== "undefined";
  const token = hasLocalStorage ? localStorage.getItem("admin_token") : null;
  const role = hasLocalStorage ? (localStorage.getItem("admin_role") || "admin") : "admin";
  const myId = hasLocalStorage ? (localStorage.getItem("admin_id") || "") : "";
  const myName = hasLocalStorage ? (localStorage.getItem("admin_user") || "Admin") : "Admin";

  async function loadData() {
    setLoading(true);
    try {
      const projRes = await fetch(`${BACKEND_URL}/api/projects`, {
        headers: token ? { authorization: `Bearer ${token}` } : {},
      });
      if (!projRes.ok) throw new Error();
      const projData = await projRes.json();
      
      const filteredProj = projData.filter((p: any) => {
        if (role === "staff") return p.assigned_staff_id === myId;
        return !!p.assigned_staff_id;
      });
      setProjects(filteredProj);

      if (filteredProj.length > 0) {
        setSelectedProj(filteredProj[0]);
      }
    } catch {
      toast.error("Failed to load messaging data");
    } finally {
      setLoading(false);
    }
  }

  async function loadMessages() {
    try {
      const msgRes = await fetch(`${BACKEND_URL}/api/staff_messages`, {
        headers: token ? { authorization: `Bearer ${token}` } : {},
      });
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadData();
    loadMessages();
    const interval = setInterval(loadMessages, 8000);
    return () => clearInterval(interval);
  }, [BACKEND_URL, role, myId]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProj || !newMessage.trim()) return;
    setSending(true);
    try {
      const recipient = role === "admin" ? selectedProj.assigned_staff_id : "admin";
      const res = await fetch(`${BACKEND_URL}/api/staff_messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          project_id: selectedProj.id,
          sender_role: role,
          sender_name: myName,
          recipient_id: recipient,
          message: newMessage.trim(),
        }),
      });
      if (!res.ok) throw new Error();
      setNewMessage("");
      loadMessages();
    } catch {
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  }

  const activeMessages = messages
    .filter((m) => m.project_id === selectedProj?.id)
    .reverse();

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-navy">Messaging Center</h1>
        <p className="text-sm text-slate-500 mt-1">Coordinate installation instructions and track milestones.</p>
      </div>

      {projects.length === 0 ? (
        <div className="rounded-2xl border border-dashed bg-white p-12 text-center text-slate-500">
          <MessageSquare className="h-10 w-10 mx-auto text-slate-400 mb-3" />
          <h3 className="font-semibold text-brand-navy text-lg">No Conversations Active</h3>
          <p className="text-sm mt-1">
            {role === "admin"
              ? "Assign projects to installers first to initiate communications."
              : "No projects have been assigned to your queue yet."}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-4 border rounded-2xl bg-white overflow-hidden min-h-[600px]">
          <div className="lg:col-span-1 border-r bg-slate-50/50 p-4 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2">Active Projects</h3>
            <div className="space-y-1">
              {projects.map((p) => {
                const active = p.id === selectedProj?.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedProj(p)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition ${
                      active
                        ? "bg-brand-navy text-white"
                        : "hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <div className="truncate">{p.title}</div>
                    <div className={`text-[10px] font-medium mt-0.5 ${active ? "text-slate-300" : "text-slate-500"}`}>
                      Status: {p.status || "pending"} ({p.progress_percent || 0}%)
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {selectedProj && (
            <div className="lg:col-span-3 flex flex-col justify-between h-[600px]">
              <div className="p-4 border-b flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-brand-navy">{selectedProj.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Location: {selectedProj.location || "N/A"}</p>
                </div>
                <span
                  className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    selectedProj.status === "completed"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : selectedProj.status === "in_progress"
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  {selectedProj.status}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 flex flex-col">
                {activeMessages.length === 0 ? (
                  <div className="m-auto text-center text-slate-400 text-xs py-10 max-w-sm">
                    No log events recorded. Send a message to start coordinating.
                  </div>
                ) : (
                  activeMessages.map((m) => {
                    const isMe = m.sender_role === role;
                    return (
                      <div
                        key={m.id}
                        className={`max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${
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

              <form onSubmit={handleSend} className="p-4 border-t flex gap-2">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
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
          )}
        </div>
      )}
    </div>
  );
}
