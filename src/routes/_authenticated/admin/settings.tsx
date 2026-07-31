import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, User, Loader2, Mail, Server, Key, ShieldCheck, ToggleLeft, ToggleRight, Database, Download, UploadCloud } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/settings")({
  head: () => ({ meta: [{ title: "Admin Settings | Flash" }] }),
  component: Settings,
});

type SmtpSettings = {
  smtp_enabled: string;
  smtp_host: string;
  smtp_port: string;
  smtp_user: string;
  smtp_pass: string;
  smtp_secure: string;
  smtp_from_email: string;
  smtp_to_email: string;
};

const initialSmtp: SmtpSettings = {
  smtp_enabled: "false",
  smtp_host: "",
  smtp_port: "587",
  smtp_user: "",
  smtp_pass: "",
  smtp_secure: "false",
  smtp_from_email: "",
  smtp_to_email: "",
};

function Settings() {
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [smtp, setSmtp] = useState<SmtpSettings>(initialSmtp);
  const [loading, setLoading] = useState(true);
  const username = typeof window !== "undefined" ? (localStorage.getItem("admin_user") || "admin") : "admin";

  const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL as string) || "http://localhost:4000";
  const token = typeof window !== "undefined" ? (localStorage.getItem("admin_token") || "default-admin-token") : "default-admin-token";

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/settings`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load settings");
        const data = await res.json();
        setSmtp({
          smtp_enabled: data.smtp_enabled || "false",
          smtp_host: data.smtp_host || "",
          smtp_port: data.smtp_port || "587",
          smtp_user: data.smtp_user || "",
          smtp_pass: data.smtp_pass || "",
          smtp_secure: data.smtp_secure || "false",
          smtp_from_email: data.smtp_from_email || "",
          smtp_to_email: data.smtp_to_email || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Could not fetch SMTP settings.");
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, [BACKEND_URL, token]);

  async function saveSettings() {
    setSaving(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(smtp),
      });
      if (!res.ok) throw new Error("Failed to save SMTP settings");
      toast.success("Settings saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save SMTP settings.");
    } finally {
      setSaving(false);
    }
  }

  async function testSmtp() {
    setTesting(true);
    try {
      const res = await fetch(`${BACKEND_URL}/api/settings/test_smtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(smtp),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "SMTP test failed");
      toast.success(data.message || "Test email sent successfully!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to verify SMTP server.");
    } finally {
      setTesting(false);
    }
  }

  async function handleDownloadDB() {
    try {
      // Trigger a direct download from the backend
      const res = await fetch(`${BACKEND_URL}/api/db/backup`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to download backup");
      
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `flash-db-backup-${new Date().toISOString().split('T')[0]}.db`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
      toast.success("Database backup downloaded!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to download backup");
    }
  }

  async function handleRestoreDB(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!window.confirm("Are you sure you want to restore this database? This will REPLACE all current data, including admins, projects, and settings. This cannot be undone!")) {
      e.target.value = '';
      return;
    }

    const toastId = toast.loading("Uploading and restoring database...");
    try {
      const formData = new FormData();
      formData.append("database", file);

      const res = await fetch(`${BACKEND_URL}/api/db/restore`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to restore database");
      
      toast.success("Database restored successfully!", { id: toastId });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to restore database", { id: toastId });
    } finally {
      e.target.value = '';
    }
  }

  function toggle(key: "smtp_enabled" | "smtp_secure") {
    setSmtp((s) => ({
      ...s,
      [key]: s[key] === "true" ? "false" : "true",
    }));
  }

  function update(key: keyof SmtpSettings, val: string) {
    setSmtp((s) => ({ ...s, [key]: val }));
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold text-brand-navy">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure SMTP email notifications and admin settings.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Admin Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border bg-white p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="grid place-items-center h-14 w-14 rounded-full bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep font-bold text-xl">
                {username.slice(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="font-semibold text-brand-navy">{username}</div>
                <div className="text-xs text-slate-500">Administrator</div>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Username
              </label>
              <input
                value={username}
                disabled
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none disabled:text-slate-500"
              />
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6">
            <div className="flex items-start gap-3">
              <User className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm text-slate-600">
                <div className="font-semibold text-brand-navy mb-1">Change password</div>
                <p>
                  To change the admin password, update the database directly or contact the
                  developer.
                </p>
                <p className="mt-2 text-xs text-slate-400">
                  Current default: admin / admin123
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: SMTP Settings Panel */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border bg-white p-6 space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <h2 className="font-display text-lg font-bold text-brand-navy">SMTP Configuration</h2>
              </div>
              <button
                type="button"
                onClick={() => toggle("smtp_enabled")}
                className="flex items-center gap-1.5 focus:outline-none"
              >
                {smtp.smtp_enabled === "true" ? (
                  <>
                    <span className="text-xs font-semibold text-green-600">Enabled</span>
                    <ToggleRight className="h-8 w-8 text-green-500" />
                  </>
                ) : (
                  <>
                    <span className="text-xs font-semibold text-slate-400">Disabled</span>
                    <ToggleLeft className="h-8 w-8 text-slate-300" />
                  </>
                )}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Server className="h-3.5 w-3.5" /> SMTP Host
                </label>
                <input
                  value={smtp.smtp_host}
                  onChange={(e) => update("smtp_host", e.target.value)}
                  placeholder="smtp.gmail.com or mail.privateemail.com"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  SMTP Port
                </label>
                <input
                  value={smtp.smtp_port}
                  onChange={(e) => update("smtp_port", e.target.value)}
                  placeholder="587 or 465"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-end pb-3">
                <button
                  type="button"
                  onClick={() => toggle("smtp_secure")}
                  className="flex items-center gap-2 focus:outline-none"
                >
                  {smtp.smtp_secure === "true" ? (
                    <ToggleRight className="h-7 w-7 text-primary" />
                  ) : (
                    <ToggleLeft className="h-7 w-7 text-slate-300" />
                  )}
                  <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Use SSL/TLS (Secure Connection)
                  </span>
                </button>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5" /> Username / Account Email
                </label>
                <input
                  value={smtp.smtp_user}
                  onChange={(e) => update("smtp_user", e.target.value)}
                  placeholder="info@flashrenewable.com"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5" /> Password
                </label>
                <input
                  type="password"
                  value={smtp.smtp_pass}
                  onChange={(e) => update("smtp_pass", e.target.value)}
                  placeholder="••••••••••••"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  From Address
                </label>
                <input
                  value={smtp.smtp_from_email}
                  onChange={(e) => update("smtp_from_email", e.target.value)}
                  placeholder="info@flashrenewable.com"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> Notification Recipient Email
                </label>
                <input
                  value={smtp.smtp_to_email}
                  onChange={(e) => update("smtp_to_email", e.target.value)}
                  placeholder="admin@flashrenewable.com"
                  className="mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <button
                type="button"
                onClick={testSmtp}
                disabled={testing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition disabled:opacity-60"
              >
                {testing && <Loader2 className="h-4 w-4 animate-spin" />}
                Test SMTP Connection
              </button>

              <button
                type="button"
                onClick={saveSettings}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Database Management Section */}
      <div className="rounded-2xl border bg-white p-6 space-y-6">
        <div className="flex items-center gap-2 border-b pb-4">
          <Database className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-bold text-brand-navy">Database Management</h2>
        </div>
        
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-3">
            <h3 className="font-semibold text-brand-navy">Backup Database</h3>
            <p className="text-sm text-slate-500">
              Download a full snapshot of your current database. Keep this file safe.
            </p>
            <button
              type="button"
              onClick={handleDownloadDB}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition"
            >
              <Download className="h-4 w-4" />
              Download Backup
            </button>
          </div>
          
          <div className="space-y-3">
            <h3 className="font-semibold text-brand-navy text-red-600">Restore Database</h3>
            <p className="text-sm text-slate-500">
              Upload a previous backup file to restore. <strong className="text-red-500">Warning:</strong> This will overwrite all current data!
            </p>
            <div className="relative">
              <input 
                type="file" 
                accept=".db"
                onChange={handleRestoreDB}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                title="Select a database backup file"
              />
              <button
                type="button"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition w-auto pointer-events-none"
              >
                <UploadCloud className="h-4 w-4" />
                Upload & Restore
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
