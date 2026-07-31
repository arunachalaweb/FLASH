import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database, Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, X, Save, Search, Loader2, ArrowUp, ArrowDown } from "lucide-react";

export type FieldType =
  "text" | "textarea" | "number" | "boolean" | "select" | "image" | "array" | "date";
export type Field = {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  colSpan?: 1 | 2;
  hidden?: boolean; // hide from table
};

type Row = Record<string, unknown>;

export function AdminCrud({
  table,
  title,
  description,
  fields,
  displayColumns,
  orderBy = { column: "sort_order", ascending: true },
  searchColumn,
  storagePrefix,
}: {
  table: string;
  title: string;
  description?: string;
  fields: Field[];
  displayColumns: { key: string; label: string; render?: (row: Row) => unknown }[];
  orderBy?: { column: string; ascending: boolean };
  searchColumn?: string;
  storagePrefix?: string;
}) {
  type RowT = Record<string, unknown>;
  const [rows, setRows] = useState<RowT[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Row | null>(null);
  const [saving, setSaving] = useState(false);
  const isDev = import.meta.env.DEV;
  const BACKEND_URL = isDev ? "http://localhost:4000" : "";
  const useBackend = Boolean(import.meta.env.VITE_BACKEND_URL);

  async function apiFetch(path: string, method = "GET", body?: any) {
    const url = `${BACKEND_URL}/api/${table}${path}`;
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    const opts: any = { method, headers: {} };
    if (body) {
      opts.headers["content-type"] = "application/json";
      opts.body = JSON.stringify(body);
    }
    if (token) {
      opts.headers["authorization"] = `Bearer ${token}`;
    }
    const res = await fetch(url, opts);
    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt || `Request failed: ${res.status}`);
    }
    // DELETE returns {ok:true}
    try {
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  async function load() {
    setLoading(true);
    try {
      if (useBackend) {
        const data = await apiFetch("", "GET");
        setRows(((data ?? []) as unknown) as Row[]);
      } else {
        const { data, error } = await supabase.from(table as any).select("*").order(orderBy.column, {
          ascending: orderBy.ascending,
        });
        if (error) toast.error(error.message);
        setRows(((data ?? []) as unknown) as Row[]);
      }
    } catch (e: any) {
      toast.error(e.message ?? String(e));
    }
    setLoading(false);
  }
  useEffect(() => {
    load(); /* eslint-disable-next-line */
  }, [table]);

  const filtered = useMemo(() => {
    if (!q || !searchColumn) return rows;
    return rows.filter((r) =>
      String(r[searchColumn] ?? "")
        .toLowerCase()
        .includes(q.toLowerCase()),
    );
  }, [rows, q, searchColumn]);

  function newRow() {
    const blank: Row = {};
    for (const f of fields) {
      (blank as any)[f.key] =
        f.type === "boolean" ? true : f.type === "number" ? 0 : f.type === "array" ? [] : "";
    }
    setEditing(blank);
  }

  async function save() {
    if (!editing) return;
    for (const f of fields) {
      if (f.required && !editing[f.key] && editing[f.key] !== false && editing[f.key] !== 0) {
        toast.error(`${f.label} is required`);
        return;
      }
    }
    setSaving(true);
    const payload: any = { ...editing };
    for (const f of fields) {
      if (f.type === "number")
        payload[f.key] = payload[f.key] === "" ? null : Number(payload[f.key]);
      if (f.type === "array" && typeof payload[f.key] === "string") {
        payload[f.key] = payload[f.key]
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean);
      }
    }
    try {
      if (useBackend) {
        const { id, created_at, updated_at, ...rest } = payload;
        if (id) {
          await apiFetch(`/${id}`, "PUT", rest);
        } else {
          await apiFetch("", "POST", rest);
        }
      } else {
        let error: any;
        if (payload.id) {
          const { id, created_at, updated_at, ...rest } = payload;
          ({ error } = await supabase.from(table as any).update(rest).eq("id", id));
        } else {
          const { id, created_at, updated_at, ...rest } = payload;
          ({ error } = await supabase.from(table as any).insert(rest));
        }
        if (error) throw error;
      }
    } catch (e: any) {
      setSaving(false);
      toast.error(e.message ?? String(e));
      return;
    }
    setSaving(false);
    toast.success("Saved");
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    try {
      if (useBackend) {
        await apiFetch(`/${id}`, "DELETE");
      } else {
        const { error } = await supabase.from(table as any).delete().eq("id", id as any);
        if (error) return toast.error(error.message);
      }
    } catch (e: any) {
      return toast.error(e.message ?? String(e));
    }
    toast.success("Deleted");
    load();
  }

  async function reorder(row: RowT, dir: -1 | 1) {
    const next = (Number((row as any).sort_order ?? (row as any).sortOrder ?? 0) as number) + dir;
    try {
      if (useBackend) {
        await apiFetch(`/${(row as any).id}`, "PUT", { sortOrder: next });
      } else {
        const { error } = await supabase.from(table as any).update({ sort_order: next }).eq("id", (row as any).id);
        if (error) return toast.error(error.message);
      }
    } catch (e: any) {
      return toast.error(e.message ?? String(e));
    }
    load();
  }

  async function uploadImage(file: File, key: string) {
    if (!useBackend) {
      toast.error("Uploads only supported via backend server in this configuration.");
      return;
    }
    
    const formData = new FormData();
    formData.append("file", file);

    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    try {
      const res = await fetch(`${BACKEND_URL}/api/upload`, {
        method: "POST",
        headers: {
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: formData,
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Upload failed: ${res.status}`);
      }
      const data = await res.json();
      setEditing((e) => ({ ...(e ?? {}), [key]: `${BACKEND_URL}${data.url}` }));
      toast.success("Image uploaded!");
    } catch (err: any) {
      toast.error(err.message ?? "Upload failed");
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-brand-navy">{title}</h1>
          {description && <p className="text-sm text-slate-500 mt-1">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          {searchColumn && (
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search…"
                className="pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
              />
            </div>
          )}
          <button
            onClick={newRow}
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 shadow-sm hover:brightness-95"
          >
            <Plus className="h-4 w-4" /> Add new
          </button>
        </div>
      </div>

      <div className="rounded-2xl border bg-white overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-slate-500">
            <Loader2 className="h-5 w-5 animate-spin inline mr-2" />
            Loading…
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No records yet. Click "Add new" to create one.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  {displayColumns.map((c) => (
                    <th key={c.key} className="text-left font-semibold px-4 py-3">
                      {c.label}
                    </th>
                  ))}
                  <th className="w-40 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={String((r as any).id)} className="border-t hover:bg-slate-50/50">
                    {displayColumns.map((c) => (
                      <td key={c.key} className="px-4 py-3 max-w-sm truncate">
                        {c.render ? (c.render(r) as any) : String((r as any)[c.key] ?? "—")}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 justify-end">
                        {"sort_order" in (r as any) && (
                          <>
                            <button
                              onClick={() => reorder(r, -1)}
                              className="p-1.5 hover:bg-slate-100 rounded"
                              title="Move up"
                            >
                              <ArrowUp className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => reorder(r, 1)}
                              className="p-1.5 hover:bg-slate-100 rounded"
                              title="Move down"
                            >
                              <ArrowDown className="h-3.5 w-3.5" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setEditing(r)}
                          className="p-1.5 hover:bg-slate-100 rounded text-slate-700"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => remove((r as any).id)}
                          className="p-1.5 hover:bg-red-50 rounded text-red-600"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {editing && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setEditing(null)}
        >
          <div
            className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h2 className="font-display font-bold text-lg text-brand-navy">
                {editing.id ? "Edit" : "Create"} {title}
              </h2>
              <button onClick={() => setEditing(null)} className="p-1.5 hover:bg-slate-100 rounded">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((f) => (
                <div
                  key={f.key}
                  className={f.colSpan === 2 || f.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    {f.label}
                  </label>
                  <FieldInput
                    field={f}
                    value={editing[f.key]}
                    onChange={(v) => setEditing({ ...editing, [f.key]: v })}
                    onUploadImage={(file) => uploadImage(file, f.key)}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t bg-slate-50">
              <button
                onClick={() => setEditing(null)}
                className="px-4 py-2 rounded-lg text-sm border"
              >
                Cancel
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground disabled:opacity-60"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}{" "}
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
  onUploadImage,
}: {
  field: Field;
  value: any;
  onChange: (v: any) => void;
  onUploadImage: (f: File) => void;
}) {
  const base =
    "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary";
  if (field.type === "textarea")
    return (
      <textarea
        rows={4}
        className={base}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
      />
    );
  if (field.type === "boolean")
    return (
      <label className="mt-2 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4"
        />
        <span>{field.placeholder ?? "Enabled"}</span>
      </label>
    );
  if (field.type === "number")
    return (
      <input
        type="number"
        className={base}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
      />
    );
  if (field.type === "password")
    return (
      <input
        type="password"
        className={base}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
      />
    );
  if (field.type === "select")
    return (
      <select className={base} value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
        <option value="">—</option>
        {field.options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  if (field.type === "date")
    return (
      <input
        type="date"
        className={base}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  if (field.type === "array")
    return (
      <input
        className={base}
        value={Array.isArray(value) ? value.join(", ") : (value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Comma separated"
      />
    );
  if (field.type === "image")
    return (
      <div className="mt-1.5 space-y-2">
        <input
          className={base}
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or upload below"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onUploadImage(f);
          }}
          className="text-xs"
        />
        {value && <img src={value as any} alt="" className="h-20 rounded-lg border" />}
      </div>
    );
  return (
    <input
      className={base}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
    />
  );
}
