import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Send, F as MessageSquareQuote, H as LoaderCircle, N as Newspaper, Nt as ArrowUpRight, P as MessageSquare, R as Mail, _t as ClipboardList, at as FileText, bt as CircleCheckBig, d as TrendingUp, gt as Clock, q as Layers, s as Users, x as SlidersVertical, xt as CircleAlert } from "../_libs/lucide-react.mjs";
import { a as XAxis, c as Bar, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as Pie, n as PieChart, o as Area, p as Legend, r as BarChart, s as CartesianGrid, t as AreaChart, u as Cell } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DWeG4zI-.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BACKEND_URL = "";
async function apiFetch(endpoint, options) {
	const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
	const res = await fetch(`${BACKEND_URL}${endpoint}`, {
		...options,
		headers: {
			"Content-Type": "application/json",
			...token ? { Authorization: `Bearer ${token}` } : {},
			...options?.headers || {}
		}
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
function StaffDashboard({ staffId }) {
	const [projects, setProjects] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedProj, setSelectedProj] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("pending");
	const [progress, setProgress] = (0, import_react.useState)(0);
	const [updating, setUpdating] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [newMessage, setNewMessage] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const hasLocalStorage = typeof window !== "undefined";
	hasLocalStorage && localStorage.getItem("admin_token");
	const staffName = hasLocalStorage ? localStorage.getItem("admin_user") || "Staff" : "Staff";
	async function loadProjects() {
		setLoading(true);
		try {
			const assigned = (await apiFetch("/api/projects")).filter((p) => p.assigned_staff_id === staffId);
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
			const data = await apiFetch("/api/staff_messages");
			setMessages(data);
		} catch (err) {
			console.error(err);
		}
	}
	(0, import_react.useEffect)(() => {
		loadProjects();
		loadMessages();
		const interval = setInterval(loadMessages, 8e3);
		return () => clearInterval(interval);
	}, [staffId]);
	(0, import_react.useEffect)(() => {
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
				body: JSON.stringify({
					status,
					progress_percent: Number(progress)
				})
			});
			toast.success("Project status updated successfully!");
			loadProjects();
		} catch {
			toast.error("Failed to save progress");
		} finally {
			setUpdating(false);
		}
	}
	async function sendMessage(e) {
		e.preventDefault();
		if (!selectedProj || !newMessage.trim()) return;
		setSending(true);
		try {
			await apiFetch("/api/staff_messages", {
				method: "POST",
				body: JSON.stringify({
					project_id: selectedProj.id,
					sender_role: "staff",
					sender_name: staffName,
					recipient_id: "admin",
					message: newMessage.trim()
				})
			});
			setNewMessage("");
			loadMessages();
		} catch {
			toast.error("Failed to send message");
		} finally {
			setSending(false);
		}
	}
	const projectMessages = messages.filter((m) => m.project_id === selectedProj?.id).reverse();
	const completedCount = projects.filter((p) => p.status === "completed").length;
	const pendingCount = projects.filter((p) => p.status === "pending").length;
	const inProgressCount = projects.filter((p) => p.status === "in_progress").length;
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-96 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-10 w-10 animate-spin text-primary" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display text-3xl font-bold text-brand-navy",
				children: [
					"Welcome, ",
					staffName,
					"!"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-slate-500 mt-1",
				children: "Staff Workspace & Project Collaboration Center"
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border bg-white p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid place-items-center h-12 w-12 rounded-xl bg-blue-50 text-blue-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold text-brand-navy",
							children: projects.length
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-500 font-medium",
							children: "Total Projects"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border bg-white p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid place-items-center h-12 w-12 rounded-xl bg-amber-50 text-amber-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-6 w-6 animate-pulse" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold text-brand-navy",
							children: inProgressCount + pendingCount
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-500 font-medium",
							children: "Pending & In Progress"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border bg-white p-5 flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid place-items-center h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-2xl font-bold text-brand-navy",
							children: completedCount
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-500 font-medium",
							children: "Completed Projects"
						})] })]
					})
				]
			}),
			projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border border-dashed bg-white p-12 text-center text-slate-500",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-10 w-10 mx-auto text-slate-400 mb-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-brand-navy text-lg",
						children: "No Projects Assigned"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm mt-1",
						children: "Contact the administrator to assign installation projects to your queue."
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-1 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-bold text-brand-navy px-1",
						children: "Assigned Projects"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3",
						children: projects.map((p) => {
							const selected = p.id === selectedProj?.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setSelectedProj(p),
								className: `w-full text-left p-4 rounded-xl border transition ${selected ? "bg-brand-navy text-white border-brand-navy shadow-lg" : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-semibold text-sm line-clamp-1",
										children: p.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `text-xs mt-1 ${selected ? "text-slate-300" : "text-slate-500"}`,
										children: [
											p.location || "No location",
											" • ",
											p.capacity || "N/A Capacity"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: `inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${p.status === "completed" ? selected ? "bg-green-600/30 text-green-300" : "bg-green-50 text-green-700" : p.status === "in_progress" ? selected ? "bg-blue-600/30 text-blue-300" : "bg-blue-50 text-blue-700" : selected ? "bg-amber-600/30 text-amber-300" : "bg-amber-50 text-amber-700"}`,
											children: p.status === "completed" ? "Completed" : p.status === "in_progress" ? "In Progress" : "Pending"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `text-xs font-semibold ${selected ? "text-slate-300" : "text-slate-500"}`,
											children: [p.progress_percent || 0, "%"]
										})]
									})
								]
							}, p.id);
						})
					})]
				}), selectedProj && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:col-span-2 space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border bg-white p-6 space-y-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-bold text-brand-navy",
								children: selectedProj.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-slate-500 mt-1",
								children: [
									"Sector: ",
									selectedProj.sector || "N/A",
									" | Completion target: ",
									selectedProj.completion_date || "—"
								]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bg-slate-50 border rounded-xl p-4 space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 font-semibold text-xs text-brand-navy uppercase tracking-wider",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-4 w-4 text-primary" }), "Installation Instructions (From Admin)"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-slate-700 whitespace-pre-line leading-relaxed font-sans",
									children: selectedProj.installation_instructions || "No custom instructions provided by administrator."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t pt-5 space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
										className: "font-semibold text-brand-navy flex items-center gap-1.5 text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersVertical, { className: "h-4 w-4 text-primary" }), " Update Progress"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "text-xs font-semibold text-slate-500 uppercase",
											children: "Status"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: status,
											onChange: (e) => setStatus(e.target.value),
											className: "mt-1.5 w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "pending",
													children: "Pending"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "in_progress",
													children: "In Progress"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "completed",
													children: "Completed"
												})
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-xs font-semibold text-slate-500 uppercase flex justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Progress Percentage" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-primary font-bold",
												children: [progress, "%"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "range",
											min: "0",
											max: "100",
											value: progress,
											onChange: (e) => setProgress(Number(e.target.value)),
											className: "mt-3.5 w-full accent-primary"
										})] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										onClick: saveProgress,
										disabled: updating,
										className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground disabled:opacity-60 transition",
										children: [updating && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Save Progress Updates"]
									})
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border bg-white p-6 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold text-brand-navy flex items-center gap-2 text-sm border-b pb-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-4 w-4 text-primary" }), " Collaboration logs & Messages"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-64 overflow-y-auto border rounded-xl bg-slate-50/50 p-4 space-y-3 flex flex-col",
								children: projectMessages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "m-auto text-center text-slate-400 text-xs py-10",
									children: "No communications recorded for this project yet. Write a message below to coordinate."
								}) : projectMessages.map((m) => {
									const isMe = m.sender_role === "staff";
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${isMe ? "bg-brand-navy text-white self-end rounded-tr-none" : "bg-white text-slate-700 border self-start rounded-tl-none shadow-sm"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-[10px] font-bold opacity-60 mb-0.5",
											children: [
												isMe ? "You" : m.sender_name,
												" • ",
												new Date(m.created_at).toLocaleTimeString([], {
													hour: "2-digit",
													minute: "2-digit"
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: m.message })]
									}, m.id);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: sendMessage,
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: newMessage,
									onChange: (e) => setNewMessage(e.target.value),
									placeholder: "Report status or post a message...",
									className: "flex-1 rounded-lg border px-3 py-2 text-sm outline-none focus:border-primary",
									disabled: sending
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									disabled: sending || !newMessage.trim(),
									className: "grid place-items-center h-10 w-10 bg-primary text-primary-foreground rounded-lg disabled:opacity-50 transition",
									children: sending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "h-4 w-4" })
								})]
							})
						]
					})]
				})]
			})
		]
	});
}
function Dashboard() {
	const hasLocalStorage = typeof window !== "undefined";
	const role = hasLocalStorage ? localStorage.getItem("admin_role") || "admin" : "admin";
	const staffId = hasLocalStorage ? localStorage.getItem("admin_id") || "" : "";
	if (role === "staff") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffDashboard, { staffId });
	const [stats, setStats] = (0, import_react.useState)(null);
	const [recent, setRecent] = (0, import_react.useState)([]);
	const [recentQuotes, setRecentQuotes] = (0, import_react.useState)([]);
	const [series, setSeries] = (0, import_react.useState)([]);
	const [statusMix, setStatusMix] = (0, import_react.useState)([]);
	const [range, setRange] = (0, import_react.useState)(30);
	async function fetchTable(table) {
		try {
			return await apiFetch(`/api/${table}`);
		} catch (error) {
			console.error(`Error fetching ${table}:`, error);
			return [];
		}
	}
	(0, import_react.useEffect)(() => {
		(async () => {
			const [contacts, quotes, subscribers, services, projects] = await Promise.all([
				fetchTable("contact_enquiries"),
				fetchTable("quote_requests"),
				fetchTable("newsletter_subscribers"),
				fetchTable("services"),
				fetchTable("projects")
			]);
			setStats({
				contacts: contacts.length,
				newContacts: contacts.filter((c) => c.status === "new").length,
				quotes: quotes.length,
				newQuotes: quotes.filter((q) => q.status === "new").length,
				subscribers: subscribers.length,
				services: services.length,
				projects: projects.length
			});
			setRecent(contacts.slice(0, 5));
			setRecentQuotes(quotes.slice(0, 5));
		})();
	}, []);
	(0, import_react.useEffect)(() => {
		(async () => {
			const since = /* @__PURE__ */ new Date();
			since.setDate(since.getDate() - (range - 1));
			since.setHours(0, 0, 0, 0);
			since.toISOString();
			const fetchDates = async (table) => {
				return (await fetchTable(table)).filter((r) => new Date(r.created_at) >= since).map((r) => r.created_at);
			};
			const [contacts, quotes, subs] = await Promise.all([
				fetchDates("contact_enquiries"),
				fetchDates("quote_requests"),
				fetchDates("newsletter_subscribers")
			]);
			const days = [];
			for (let i = 0; i < range; i++) {
				const d = new Date(since);
				d.setDate(since.getDate() + i);
				const key = d.toISOString().slice(0, 10);
				days.push({
					key,
					label: d.toLocaleDateString(void 0, {
						month: "short",
						day: "numeric"
					}),
					contacts: 0,
					quotes: 0,
					subscribers: 0
				});
			}
			const idx = new Map(days.map((d, i) => [d.key, i]));
			const bump = (arr, field) => {
				for (const iso of arr) {
					const k = iso.slice(0, 10);
					const i = idx.get(k);
					if (i != null) days[i][field] += 1;
				}
			};
			bump(contacts, "contacts");
			bump(quotes, "quotes");
			bump(subs, "subscribers");
			setSeries(days);
			const all = [...contacts, ...quotes];
			const counts = {};
			for (const r of all) {
				const s = r.status ?? "new";
				counts[s] = (counts[s] ?? 0) + 1;
			}
			setStatusMix(Object.entries(counts).map(([name, value]) => ({
				name,
				value
			})));
		})();
	}, [range]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-bold text-brand-navy",
				children: "Dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate-500 mt-1",
				children: "Overview of enquiries, content and users."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Mail,
						label: "Contact Messages",
						value: stats?.contacts,
						badge: stats?.newContacts ? `${stats.newContacts} new` : void 0,
						tone: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: FileText,
						label: "Quote Requests",
						value: stats?.quotes,
						badge: stats?.newQuotes ? `${stats.newQuotes} new` : void 0,
						tone: "gold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Newspaper,
						label: "Subscribers",
						value: stats?.subscribers,
						tone: "navy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Users,
						label: "Site Users",
						value: 0,
						tone: "green"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						icon: Layers,
						label: "Services",
						value: stats?.services,
						tone: "slate"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Projects",
						value: stats?.projects,
						to: "/admin/cms/projects",
						icon: Layers
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Testimonials",
						value: 0,
						to: "/admin/cms/testimonials",
						icon: MessageSquareQuote
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Team Members",
						value: 0,
						to: "/admin/team",
						icon: Users
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Subscribers",
						value: stats?.subscribers,
						to: "/admin/enquiries/subscribers",
						icon: Newspaper
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartsSection, {
				series,
				statusMix,
				range,
				setRange
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Recent Contact Messages",
					to: "/admin/enquiries/contact",
					children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {}) : recent.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 py-3 border-b last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold text-sm text-brand-navy truncate",
								children: [
									r.name,
									" ·",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-500 font-normal",
										children: r.email
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs text-slate-500 truncate",
								children: r.subject || r.message
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: r.status })]
					}, String(r.id)))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Recent Quote Requests",
					to: "/admin/enquiries/quotes",
					children: recentQuotes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {}) : recentQuotes.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3 py-3 border-b last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-semibold text-sm text-brand-navy truncate",
								children: [
									r.name,
									" ·",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-slate-500 font-normal",
										children: r.service_type ?? "—"
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-xs text-slate-500 truncate",
								children: [
									r.city ?? "",
									" · ",
									r.load_kw ?? ""
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, { status: r.status })]
					}, String(r.id)))
				})]
			})
		]
	});
}
function StatCard({ icon: Icon, label, value, badge, tone }) {
	const tones = {
		primary: "from-primary/15 to-primary/5 text-primary",
		gold: "from-brand-gold/20 to-brand-gold/5 text-brand-gold",
		navy: "from-brand-navy/15 to-brand-navy/5 text-brand-navy",
		green: "from-emerald-500/15 to-emerald-500/5 text-emerald-600",
		slate: "from-slate-500/15 to-slate-500/5 text-slate-700"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-2xl border bg-white p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br ${tones[tone ?? "primary"]} blur-2xl opacity-70` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `grid place-items-center h-10 w-10 rounded-xl bg-gradient-to-br ${tones[tone ?? "primary"]}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
				}), badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-primary/10 text-primary",
					children: badge
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mt-4 text-3xl font-display font-bold text-brand-navy",
				children: value ?? "—"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative text-xs text-slate-500 mt-1",
				children: label
			})
		]
	});
}
function MiniStat({ label, value, to, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group flex items-center gap-3 rounded-xl border bg-white p-4 hover:border-primary hover:shadow-sm transition",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid place-items-center h-9 w-9 rounded-lg bg-slate-100 group-hover:bg-primary/10 text-slate-600 group-hover:text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-xs text-slate-500",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display font-bold text-lg text-brand-navy",
					children: value ?? "—"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "h-4 w-4 text-slate-400 group-hover:text-primary" })
		]
	});
}
function Panel({ title, to, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border bg-white overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-5 py-4 border-b",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-brand-navy",
					children: title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to,
				className: "text-xs text-primary font-semibold hover:underline",
				children: "View all →"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-5 py-2",
			children
		})]
	});
}
function Empty() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-8 text-center text-sm text-slate-400 flex flex-col items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "h-5 w-5" }), "No records yet."]
	});
}
function StatusPill({ status }) {
	const s = status ?? "new";
	const tones = {
		new: "bg-primary/10 text-primary",
		in_progress: "bg-brand-gold/15 text-brand-gold",
		resolved: "bg-emerald-100 text-emerald-700",
		archived: "bg-slate-100 text-slate-600"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${tones[s] ?? tones.new}`,
		children: s.replace("_", " ")
	});
}
var CHART_COLORS = [
	"#f97316",
	"#eab308",
	"#0ea5e9",
	"#10b981",
	"#8b5cf6",
	"#64748b"
];
function ChartsSection({ series, statusMix, range, setRange }) {
	const totals = series.reduce((a, d) => ({
		contacts: a.contacts + Number(d.contacts ?? 0),
		quotes: a.quotes + Number(d.quotes ?? 0),
		subscribers: a.subscribers + Number(d.subscribers ?? 0)
	}), {
		contacts: 0,
		quotes: 0,
		subscribers: 0
	});
	const tickEvery = Math.max(1, Math.floor(series.length / 8));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border bg-white overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "h-4 w-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-brand-navy",
						children: "Activity over time"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden md:flex items-center gap-3 text-[11px] text-slate-500",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legendish, {
								color: "#f97316",
								label: `Contacts ${totals.contacts}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legendish, {
								color: "#eab308",
								label: `Quotes ${totals.quotes}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legendish, {
								color: "#0ea5e9",
								label: `Subscribers ${totals.subscribers}`
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "inline-flex rounded-lg border bg-slate-50 p-0.5 text-xs",
						children: [
							7,
							30,
							90
						].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setRange(r),
							className: `px-3 py-1 rounded-md font-semibold transition ${range === r ? "bg-white shadow text-brand-navy" : "text-slate-500 hover:text-brand-navy"}`,
							children: [r, "d"]
						}, r))
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-72 p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
						data: series,
						margin: {
							top: 10,
							right: 16,
							left: -12,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: [
								["contacts", "#f97316"],
								["quotes", "#eab308"],
								["subscribers", "#0ea5e9"]
							].map(([k, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: `g-${k}`,
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: c,
									stopOpacity: .35
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: c,
									stopOpacity: 0
								})]
							}, k)) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								strokeDasharray: "3 3",
								stroke: "#e2e8f0",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								interval: tickEvery - 1,
								tick: {
									fill: "#64748b",
									fontSize: 11
								},
								tickLine: false,
								axisLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								allowDecimals: false,
								tick: {
									fill: "#64748b",
									fontSize: 11
								},
								tickLine: false,
								axisLine: false,
								width: 32
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								borderRadius: 12,
								border: "1px solid #e2e8f0",
								fontSize: 12
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "contacts",
								stroke: "#f97316",
								strokeWidth: 2,
								fill: "url(#g-contacts)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "quotes",
								stroke: "#eab308",
								strokeWidth: 2,
								fill: "url(#g-quotes)"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "subscribers",
								stroke: "#0ea5e9",
								strokeWidth: 2,
								fill: "url(#g-subscribers)"
							})
						]
					})
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-2 rounded-2xl border bg-white overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-5 py-4 border-b",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-brand-navy",
						children: "Contacts vs Quotes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-slate-500",
						children: [
							"Last ",
							range,
							" days"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64 p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: series,
							margin: {
								top: 10,
								right: 16,
								left: -12,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									strokeDasharray: "3 3",
									stroke: "#e2e8f0",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "label",
									interval: tickEvery - 1,
									tick: {
										fill: "#64748b",
										fontSize: 11
									},
									tickLine: false,
									axisLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									allowDecimals: false,
									tick: {
										fill: "#64748b",
										fontSize: 11
									},
									tickLine: false,
									axisLine: false,
									width: 32
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									borderRadius: 12,
									border: "1px solid #e2e8f0",
									fontSize: 12
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "contacts",
									fill: "#f97316",
									radius: [
										6,
										6,
										0,
										0
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "quotes",
									fill: "#eab308",
									radius: [
										6,
										6,
										0,
										0
									]
								})
							]
						})
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl border bg-white overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between px-5 py-4 border-b",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-brand-navy",
						children: "Enquiry status mix"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-64 p-4",
					children: statusMix.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full grid place-items-center text-sm text-slate-400",
						children: "No enquiries yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								borderRadius: 12,
								border: "1px solid #e2e8f0",
								fontSize: 12
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
								data: statusMix,
								dataKey: "value",
								nameKey: "name",
								innerRadius: 45,
								outerRadius: 80,
								paddingAngle: 3,
								children: statusMix.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: CHART_COLORS[i % CHART_COLORS.length] }, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: { fontSize: 12 } })
						] })
					})
				})]
			})]
		})]
	});
}
function Legendish({ color, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "inline-flex items-center gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "h-2 w-2 rounded-full",
			style: { background: color }
		}), label]
	});
}
//#endregion
export { Dashboard as component };
