import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as Send, F as MessageSquare, U as LoaderCircle } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/messages-BeumJbdb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MessagesCenter() {
	const [projects, setProjects] = (0, import_react.useState)([]);
	const [selectedProj, setSelectedProj] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [newMessage, setNewMessage] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [sending, setSending] = (0, import_react.useState)(false);
	const BACKEND_URL = "https://seagreen-mongoose-262998.hostingersite.com";
	const hasLocalStorage = typeof window !== "undefined";
	const token = hasLocalStorage ? localStorage.getItem("admin_token") : null;
	const role = hasLocalStorage ? localStorage.getItem("admin_role") || "admin" : "admin";
	const myId = hasLocalStorage ? localStorage.getItem("admin_id") || "" : "";
	const myName = hasLocalStorage ? localStorage.getItem("admin_user") || "Admin" : "Admin";
	async function loadData() {
		setLoading(true);
		try {
			const projRes = await fetch(`${BACKEND_URL}/api/projects`, { headers: token ? { authorization: `Bearer ${token}` } : {} });
			if (!projRes.ok) throw new Error();
			const filteredProj = (await projRes.json()).filter((p) => {
				if (role === "staff") return p.assigned_staff_id === myId;
				return !!p.assigned_staff_id;
			});
			setProjects(filteredProj);
			if (filteredProj.length > 0) setSelectedProj(filteredProj[0]);
		} catch {
			toast.error("Failed to load messaging data");
		} finally {
			setLoading(false);
		}
	}
	async function loadMessages() {
		try {
			const msgRes = await fetch(`${BACKEND_URL}/api/staff_messages`, { headers: token ? { authorization: `Bearer ${token}` } : {} });
			if (msgRes.ok) {
				const msgData = await msgRes.json();
				setMessages(msgData);
			}
		} catch (err) {
			console.error(err);
		}
	}
	(0, import_react.useEffect)(() => {
		loadData();
		loadMessages();
		const interval = setInterval(loadMessages, 8e3);
		return () => clearInterval(interval);
	}, [
		BACKEND_URL,
		role,
		myId
	]);
	async function handleSend(e) {
		e.preventDefault();
		if (!selectedProj || !newMessage.trim()) return;
		setSending(true);
		try {
			const recipient = role === "admin" ? selectedProj.assigned_staff_id : "admin";
			if (!(await fetch(`${BACKEND_URL}/api/staff_messages`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					project_id: selectedProj.id,
					sender_role: role,
					sender_name: myName,
					recipient_id: recipient,
					message: newMessage.trim()
				})
			})).ok) throw new Error();
			setNewMessage("");
			loadMessages();
		} catch {
			toast.error("Failed to send message");
		} finally {
			setSending(false);
		}
	}
	const activeMessages = messages.filter((m) => m.project_id === selectedProj?.id).reverse();
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-96 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-10 w-10 animate-spin text-primary" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-6xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold text-brand-navy",
			children: "Messaging Center"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-slate-500 mt-1",
			children: "Coordinate installation instructions and track milestones."
		})] }), projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-2xl border border-dashed bg-white p-12 text-center text-slate-500",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "h-10 w-10 mx-auto text-slate-400 mb-3" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold text-brand-navy text-lg",
					children: "No Conversations Active"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm mt-1",
					children: role === "admin" ? "Assign projects to installers first to initiate communications." : "No projects have been assigned to your queue yet."
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-4 border rounded-2xl bg-white overflow-hidden min-h-[600px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-1 border-r bg-slate-50/50 p-4 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-bold text-slate-400 uppercase tracking-wider px-2",
					children: "Active Projects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-1",
					children: projects.map((p) => {
						const active = p.id === selectedProj?.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setSelectedProj(p),
							className: `w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold transition ${active ? "bg-brand-navy text-white" : "hover:bg-slate-100 text-slate-700"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "truncate",
								children: p.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `text-[10px] font-medium mt-0.5 ${active ? "text-slate-300" : "text-slate-500"}`,
								children: [
									"Status: ",
									p.status || "pending",
									" (",
									p.progress_percent || 0,
									"%)"
								]
							})]
						}, p.id);
					})
				})]
			}), selectedProj && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-3 flex flex-col justify-between h-[600px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4 border-b flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-brand-navy",
							children: selectedProj.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-slate-500 mt-0.5",
							children: ["Location: ", selectedProj.location || "N/A"]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${selectedProj.status === "completed" ? "bg-green-50 text-green-700 border border-green-200" : selectedProj.status === "in_progress" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-amber-50 text-amber-700 border border-amber-200"}`,
							children: selectedProj.status
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/50 flex flex-col",
						children: activeMessages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "m-auto text-center text-slate-400 text-xs py-10 max-w-sm",
							children: "No log events recorded. Send a message to start coordinating."
						}) : activeMessages.map((m) => {
							const isMe = m.sender_role === role;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `max-w-[70%] rounded-2xl px-4 py-2.5 text-sm ${isMe ? "bg-brand-navy text-white self-end rounded-tr-none" : "bg-white text-slate-700 border self-start rounded-tl-none shadow-sm"}`,
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
						onSubmit: handleSend,
						className: "p-4 border-t flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: newMessage,
							onChange: (e) => setNewMessage(e.target.value),
							placeholder: "Type your message...",
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
	});
}
//#endregion
export { MessagesCenter as component };
