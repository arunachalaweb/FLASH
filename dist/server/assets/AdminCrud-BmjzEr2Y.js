import { useEffect, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Loader2, Pencil, Plus, Save, Search, Trash2, X } from "lucide-react";
//#region src/components/admin/AdminCrud.tsx
function AdminCrud({ table, title, description, fields, displayColumns, orderBy = {
	column: "sort_order",
	ascending: true
}, searchColumn, storagePrefix }) {
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [q, setQ] = useState("");
	const [editing, setEditing] = useState(null);
	const [saving, setSaving] = useState(false);
	const BACKEND_URL = "";
	const useBackend = Boolean("https://seagreen-mongoose-262998.hostingersite.com");
	async function apiFetch(path, method = "GET", body) {
		const url = `${BACKEND_URL}/api/${table}${path}`;
		const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
		const opts = {
			method,
			headers: {}
		};
		if (body) {
			opts.headers["content-type"] = "application/json";
			opts.body = JSON.stringify(body);
		}
		if (token) opts.headers["authorization"] = `Bearer ${token}`;
		const res = await fetch(url, opts);
		if (!res.ok) {
			const txt = await res.text();
			throw new Error(txt || `Request failed: ${res.status}`);
		}
		try {
			return await res.json();
		} catch (e) {
			return null;
		}
	}
	async function load() {
		setLoading(true);
		try {
			const data = await apiFetch("", "GET");
			setRows(data ?? []);
		} catch (e) {
			toast.error(e.message ?? String(e));
		}
		setLoading(false);
	}
	useEffect(() => {
		load();
	}, [table]);
	const filtered = useMemo(() => {
		if (!q || !searchColumn) return rows;
		return rows.filter((r) => String(r[searchColumn] ?? "").toLowerCase().includes(q.toLowerCase()));
	}, [
		rows,
		q,
		searchColumn
	]);
	function newRow() {
		const blank = {};
		for (const f of fields) blank[f.key] = f.type === "boolean" ? true : f.type === "number" ? 0 : f.type === "array" ? [] : "";
		setEditing(blank);
	}
	async function save() {
		if (!editing) return;
		for (const f of fields) if (f.required && !editing[f.key] && editing[f.key] !== false && editing[f.key] !== 0) {
			toast.error(`${f.label} is required`);
			return;
		}
		setSaving(true);
		const payload = { ...editing };
		for (const f of fields) {
			if (f.type === "number") payload[f.key] = payload[f.key] === "" ? null : Number(payload[f.key]);
			if (f.type === "array" && typeof payload[f.key] === "string") payload[f.key] = payload[f.key].split(",").map((s) => s.trim()).filter(Boolean);
		}
		try {
			const { id, created_at, updated_at, ...rest } = payload;
			if (id) await apiFetch(`/${id}`, "PUT", rest);
			else await apiFetch("", "POST", rest);
		} catch (e) {
			setSaving(false);
			toast.error(e.message ?? String(e));
			return;
		}
		setSaving(false);
		toast.success("Saved");
		setEditing(null);
		load();
	}
	async function remove(id) {
		if (!confirm("Delete this item? This cannot be undone.")) return;
		try {
			await apiFetch(`/${id}`, "DELETE");
		} catch (e) {
			return toast.error(e.message ?? String(e));
		}
		toast.success("Deleted");
		load();
	}
	async function reorder(row, dir) {
		const next = Number(row.sort_order ?? row.sortOrder ?? 0) + dir;
		try {
			await apiFetch(`/${row.id}`, "PUT", { sortOrder: next });
		} catch (e) {
			return toast.error(e.message ?? String(e));
		}
		load();
	}
	async function uploadImage(file, key) {
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
				headers: { ...token ? { authorization: `Bearer ${token}` } : {} },
				body: formData
			});
			if (!res.ok) {
				const txt = await res.text();
				throw new Error(txt || `Upload failed: ${res.status}`);
			}
			const data = await res.json();
			setEditing((e) => ({
				...e ?? {},
				[key]: `${BACKEND_URL}${data.url}`
			}));
			toast.success("Image uploaded!");
		} catch (err) {
			toast.error(err.message ?? "Upload failed");
		}
	}
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-end justify-between gap-4 mb-6",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "font-display text-2xl md:text-3xl font-bold text-brand-navy",
				children: title
			}), description && /* @__PURE__ */ jsx("p", {
				className: "text-sm text-slate-500 mt-1",
				children: description
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [searchColumn && /* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-2.5 h-4 w-4 text-slate-400" }), /* @__PURE__ */ jsx("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search…",
						className: "pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm bg-white"
					})]
				}), /* @__PURE__ */ jsxs("button", {
					onClick: newRow,
					className: "inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 shadow-sm hover:brightness-95",
					children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), " Add new"]
				})]
			})]
		}),
		/* @__PURE__ */ jsx("div", {
			className: "rounded-2xl border bg-white overflow-hidden",
			children: loading ? /* @__PURE__ */ jsxs("div", {
				className: "p-10 text-center text-slate-500",
				children: [/* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin inline mr-2" }), "Loading…"]
			}) : filtered.length === 0 ? /* @__PURE__ */ jsx("div", {
				className: "p-10 text-center text-slate-500",
				children: "No records yet. Click \"Add new\" to create one."
			}) : /* @__PURE__ */ jsx("div", {
				className: "overflow-x-auto",
				children: /* @__PURE__ */ jsxs("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ jsx("thead", {
						className: "bg-slate-50 text-slate-600",
						children: /* @__PURE__ */ jsxs("tr", { children: [displayColumns.map((c) => /* @__PURE__ */ jsx("th", {
							className: "text-left font-semibold px-4 py-3",
							children: c.label
						}, c.key)), /* @__PURE__ */ jsx("th", { className: "w-40 px-4 py-3" })] })
					}), /* @__PURE__ */ jsx("tbody", { children: filtered.map((r) => /* @__PURE__ */ jsxs("tr", {
						className: "border-t hover:bg-slate-50/50",
						children: [displayColumns.map((c) => /* @__PURE__ */ jsx("td", {
							className: "px-4 py-3 max-w-sm truncate",
							children: c.render ? c.render(r) : String(r[c.key] ?? "—")
						}, c.key)), /* @__PURE__ */ jsx("td", {
							className: "px-4 py-3",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-1 justify-end",
								children: [
									"sort_order" in r && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("button", {
										onClick: () => reorder(r, -1),
										className: "p-1.5 hover:bg-slate-100 rounded",
										title: "Move up",
										children: /* @__PURE__ */ jsx(ArrowUp, { className: "h-3.5 w-3.5" })
									}), /* @__PURE__ */ jsx("button", {
										onClick: () => reorder(r, 1),
										className: "p-1.5 hover:bg-slate-100 rounded",
										title: "Move down",
										children: /* @__PURE__ */ jsx(ArrowDown, { className: "h-3.5 w-3.5" })
									})] }),
									/* @__PURE__ */ jsx("button", {
										onClick: () => setEditing(r),
										className: "p-1.5 hover:bg-slate-100 rounded text-slate-700",
										children: /* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" })
									}),
									/* @__PURE__ */ jsx("button", {
										onClick: () => remove(r.id),
										className: "p-1.5 hover:bg-red-50 rounded text-red-600",
										children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
									})
								]
							})
						})]
					}, String(r.id))) })]
				})
			})
		}),
		editing && /* @__PURE__ */ jsx("div", {
			className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto",
			onClick: () => setEditing(null),
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-3xl bg-white rounded-2xl shadow-2xl my-8",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between px-6 py-4 border-b",
						children: [/* @__PURE__ */ jsxs("h2", {
							className: "font-display font-bold text-lg text-brand-navy",
							children: [
								editing.id ? "Edit" : "Create",
								" ",
								title
							]
						}), /* @__PURE__ */ jsx("button", {
							onClick: () => setEditing(null),
							className: "p-1.5 hover:bg-slate-100 rounded",
							children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "p-6 grid grid-cols-1 md:grid-cols-2 gap-4",
						children: fields.map((f) => /* @__PURE__ */ jsxs("div", {
							className: f.colSpan === 2 || f.type === "textarea" ? "md:col-span-2" : "",
							children: [/* @__PURE__ */ jsx("label", {
								className: "text-xs font-semibold text-slate-600 uppercase tracking-wider",
								children: f.label
							}), /* @__PURE__ */ jsx(FieldInput, {
								field: f,
								value: editing[f.key],
								onChange: (v) => setEditing({
									...editing,
									[f.key]: v
								}),
								onUploadImage: (file) => uploadImage(file, f.key)
							})]
						}, f.key))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-end gap-2 px-6 py-4 border-t bg-slate-50",
						children: [/* @__PURE__ */ jsx("button", {
							onClick: () => setEditing(null),
							className: "px-4 py-2 rounded-lg text-sm border",
							children: "Cancel"
						}), /* @__PURE__ */ jsxs("button", {
							onClick: save,
							disabled: saving,
							className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground disabled:opacity-60",
							children: [
								saving ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }),
								" ",
								"Save"
							]
						})]
					})
				]
			})
		})
	] });
}
function FieldInput({ field, value, onChange, onUploadImage }) {
	const base = "mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary";
	if (field.type === "textarea") return /* @__PURE__ */ jsx("textarea", {
		rows: 4,
		className: base,
		value: value ?? "",
		onChange: (e) => onChange(e.target.value),
		placeholder: field.placeholder
	});
	if (field.type === "boolean") return /* @__PURE__ */ jsxs("label", {
		className: "mt-2 flex items-center gap-2 text-sm",
		children: [/* @__PURE__ */ jsx("input", {
			type: "checkbox",
			checked: !!value,
			onChange: (e) => onChange(e.target.checked),
			className: "h-4 w-4"
		}), /* @__PURE__ */ jsx("span", { children: field.placeholder ?? "Enabled" })]
	});
	if (field.type === "number") return /* @__PURE__ */ jsx("input", {
		type: "number",
		className: base,
		value: value ?? "",
		onChange: (e) => onChange(e.target.value === "" ? "" : Number(e.target.value))
	});
	if (field.type === "password") return /* @__PURE__ */ jsx("input", {
		type: "password",
		className: base,
		value: value ?? "",
		onChange: (e) => onChange(e.target.value),
		placeholder: field.placeholder
	});
	if (field.type === "select") return /* @__PURE__ */ jsxs("select", {
		className: base,
		value: value ?? "",
		onChange: (e) => onChange(e.target.value),
		children: [/* @__PURE__ */ jsx("option", {
			value: "",
			children: "—"
		}), field.options?.map((o) => /* @__PURE__ */ jsx("option", {
			value: o.value,
			children: o.label
		}, o.value))]
	});
	if (field.type === "date") return /* @__PURE__ */ jsx("input", {
		type: "date",
		className: base,
		value: value ?? "",
		onChange: (e) => onChange(e.target.value)
	});
	if (field.type === "array") return /* @__PURE__ */ jsx("input", {
		className: base,
		value: Array.isArray(value) ? value.join(", ") : value ?? "",
		onChange: (e) => onChange(e.target.value),
		placeholder: "Comma separated"
	});
	if (field.type === "image") return /* @__PURE__ */ jsxs("div", {
		className: "mt-1.5 space-y-2",
		children: [
			/* @__PURE__ */ jsx("input", {
				className: base,
				value: value ?? "",
				onChange: (e) => onChange(e.target.value),
				placeholder: "Image URL or upload below"
			}),
			/* @__PURE__ */ jsx("input", {
				type: "file",
				accept: "image/*",
				onChange: (e) => {
					const f = e.target.files?.[0];
					if (f) onUploadImage(f);
				},
				className: "text-xs"
			}),
			value && /* @__PURE__ */ jsx("img", {
				src: value,
				alt: "",
				className: "h-20 rounded-lg border"
			})
		]
	});
	return /* @__PURE__ */ jsx("input", {
		className: base,
		value: value ?? "",
		onChange: (e) => onChange(e.target.value),
		placeholder: field.placeholder
	});
}
//#endregion
export { AdminCrud as t };
