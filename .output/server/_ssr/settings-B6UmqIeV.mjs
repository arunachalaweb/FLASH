import { i as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Server, U as LoaderCircle, X as Key, c as User, h as ToggleLeft, k as Save, m as ToggleRight, w as ShieldCheck, z as Mail } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-B6UmqIeV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initialSmtp = {
	smtp_enabled: "false",
	smtp_host: "",
	smtp_port: "587",
	smtp_user: "",
	smtp_pass: "",
	smtp_secure: "false",
	smtp_from_email: "",
	smtp_to_email: ""
};
function Settings() {
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [testing, setTesting] = (0, import_react.useState)(false);
	const [smtp, setSmtp] = (0, import_react.useState)(initialSmtp);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const username = typeof window !== "undefined" ? localStorage.getItem("admin_user") || "admin" : "admin";
	const BACKEND_URL = "https://seagreen-mongoose-262998.hostingersite.com";
	const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") || "default-admin-token" : "default-admin-token";
	(0, import_react.useEffect)(() => {
		async function fetchSettings() {
			try {
				const res = await fetch(`${BACKEND_URL}/api/settings`, { headers: { Authorization: `Bearer ${token}` } });
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
					smtp_to_email: data.smtp_to_email || ""
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
			if (!(await fetch(`${BACKEND_URL}/api/settings`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(smtp)
			})).ok) throw new Error("Failed to save SMTP settings");
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
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(smtp)
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "SMTP test failed");
			toast.success(data.message || "Test email sent successfully!");
		} catch (err) {
			console.error(err);
			toast.error(err.message || "Failed to verify SMTP server.");
		} finally {
			setTesting(false);
		}
	}
	function toggle(key) {
		setSmtp((s) => ({
			...s,
			[key]: s[key] === "true" ? "false" : "true"
		}));
	}
	function update(key, val) {
		setSmtp((s) => ({
			...s,
			[key]: val
		}));
	}
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-64 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-4xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl font-bold text-brand-navy",
			children: "Settings"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-slate-500 mt-1",
			children: "Configure SMTP email notifications and admin settings."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:col-span-1 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border bg-white p-6 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid place-items-center h-14 w-14 rounded-full bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep font-bold text-xl",
							children: username.slice(0, 1).toUpperCase()
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-semibold text-brand-navy",
							children: username
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-slate-500",
							children: "Administrator"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-xs font-semibold text-slate-600 uppercase tracking-wider",
						children: "Username"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: username,
						disabled: true,
						className: "mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none disabled:text-slate-500"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border bg-white p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-primary mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-sm text-slate-600",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-semibold text-brand-navy mb-1",
									children: "Change password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "To change the admin password, update the database directly or contact the developer." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-slate-400",
									children: "Current default: admin / admin123"
								})
							]
						})]
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "lg:col-span-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border bg-white p-6 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-lg font-bold text-brand-navy",
									children: "SMTP Configuration"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => toggle("smtp_enabled"),
								className: "flex items-center gap-1.5 focus:outline-none",
								children: smtp.smtp_enabled === "true" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-green-600",
									children: "Enabled"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRight, { className: "h-8 w-8 text-green-500" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs font-semibold text-slate-400",
									children: "Disabled"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleLeft, { className: "h-8 w-8 text-slate-300" })] })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Server, { className: "h-3.5 w-3.5" }), " SMTP Host"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: smtp.smtp_host,
										onChange: (e) => update("smtp_host", e.target.value),
										placeholder: "smtp.gmail.com or mail.privateemail.com",
										className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-slate-600 uppercase tracking-wider",
									children: "SMTP Port"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: smtp.smtp_port,
									onChange: (e) => update("smtp_port", e.target.value),
									placeholder: "587 or 465",
									className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-end pb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => toggle("smtp_secure"),
										className: "flex items-center gap-2 focus:outline-none",
										children: [smtp.smtp_secure === "true" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleRight, { className: "h-7 w-7 text-primary" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToggleLeft, { className: "h-7 w-7 text-slate-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs font-semibold text-slate-600 uppercase tracking-wider",
											children: "Use SSL/TLS (Secure Connection)"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5" }), " Username / Account Email"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: smtp.smtp_user,
									onChange: (e) => update("smtp_user", e.target.value),
									placeholder: "info@flashrenewable.com",
									className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Key, { className: "h-3.5 w-3.5" }), " Password"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "password",
									value: smtp.smtp_pass,
									onChange: (e) => update("smtp_pass", e.target.value),
									placeholder: "••••••••••••",
									className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-semibold text-slate-600 uppercase tracking-wider",
									children: "From Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: smtp.smtp_from_email,
									onChange: (e) => update("smtp_from_email", e.target.value),
									placeholder: "info@flashrenewable.com",
									className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), " Notification Recipient Email"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: smtp.smtp_to_email,
									onChange: (e) => update("smtp_to_email", e.target.value),
									placeholder: "admin@flashrenewable.com",
									className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-3 pt-4 border-t",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: testSmtp,
								disabled: testing,
								className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition disabled:opacity-60",
								children: [testing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }), "Test SMTP Connection"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: saveSettings,
								disabled: saving,
								className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground disabled:opacity-60",
								children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "h-4 w-4" }), "Save Settings"]
							})]
						})
					]
				})
			})]
		})]
	});
}
//#endregion
export { Settings as component };
