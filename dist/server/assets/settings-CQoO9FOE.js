import { useEffect, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Database, Download, Key, Loader2, Mail, Save, Server, ShieldCheck, ToggleLeft, ToggleRight, UploadCloud, User } from "lucide-react";
//#region src/routes/_authenticated/admin/settings.tsx?tsr-split=component
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
	const [saving, setSaving] = useState(false);
	const [testing, setTesting] = useState(false);
	const [smtp, setSmtp] = useState(initialSmtp);
	const [loading, setLoading] = useState(true);
	const username = typeof window !== "undefined" ? localStorage.getItem("admin_user") || "admin" : "admin";
	const BACKEND_URL = "https://seagreen-mongoose-262998.hostingersite.com";
	const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") || "default-admin-token" : "default-admin-token";
	useEffect(() => {
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
	async function handleDownloadDB() {
		try {
			const res = await fetch(`${BACKEND_URL}/api/db/backup`, { headers: { Authorization: `Bearer ${token}` } });
			if (!res.ok) throw new Error("Failed to download backup");
			const blob = await res.blob();
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = `flash-db-backup-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.db`;
			document.body.appendChild(a);
			a.click();
			window.URL.revokeObjectURL(url);
			a.remove();
			toast.success("Database backup downloaded!");
		} catch (err) {
			console.error(err);
			toast.error(err.message || "Failed to download backup");
		}
	}
	async function handleRestoreDB(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		if (!window.confirm("Are you sure you want to restore this database? This will REPLACE all current data, including admins, projects, and settings. This cannot be undone!")) {
			e.target.value = "";
			return;
		}
		const toastId = toast.loading("Uploading and restoring database...");
		try {
			const formData = new FormData();
			formData.append("database", file);
			const res = await fetch(`${BACKEND_URL}/api/db/restore`, {
				method: "POST",
				headers: { Authorization: `Bearer ${token}` },
				body: formData
			});
			const data = await res.json();
			if (!res.ok) throw new Error(data.error || "Failed to restore database");
			toast.success("Database restored successfully!", { id: toastId });
			setTimeout(() => {
				window.location.reload();
			}, 2e3);
		} catch (err) {
			console.error(err);
			toast.error(err.message || "Failed to restore database", { id: toastId });
		} finally {
			e.target.value = "";
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
	if (loading) return /* @__PURE__ */ jsx("div", {
		className: "flex h-64 items-center justify-center",
		children: /* @__PURE__ */ jsx(Loader2, { className: "h-8 w-8 animate-spin text-primary" })
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-4xl space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "font-display text-3xl font-bold text-brand-navy",
				children: "Settings"
			}), /* @__PURE__ */ jsx("p", {
				className: "text-sm text-slate-500 mt-1",
				children: "Configure SMTP email notifications and admin settings."
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 lg:grid-cols-3",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "lg:col-span-1 space-y-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border bg-white p-6 space-y-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ jsx("div", {
								className: "grid place-items-center h-14 w-14 rounded-full bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep font-bold text-xl",
								children: username.slice(0, 1).toUpperCase()
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "font-semibold text-brand-navy",
								children: username
							}), /* @__PURE__ */ jsx("div", {
								className: "text-xs text-slate-500",
								children: "Administrator"
							})] })]
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
							className: "text-xs font-semibold text-slate-600 uppercase tracking-wider",
							children: "Username"
						}), /* @__PURE__ */ jsx("input", {
							value: username,
							disabled: true,
							className: "mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none disabled:text-slate-500"
						})] })]
					}), /* @__PURE__ */ jsx("div", {
						className: "rounded-2xl border bg-white p-6",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-start gap-3",
							children: [/* @__PURE__ */ jsx(User, { className: "h-5 w-5 text-primary mt-0.5" }), /* @__PURE__ */ jsxs("div", {
								className: "text-sm text-slate-600",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "font-semibold text-brand-navy mb-1",
										children: "Change password"
									}),
									/* @__PURE__ */ jsx("p", { children: "To change the admin password, update the database directly or contact the developer." }),
									/* @__PURE__ */ jsx("p", {
										className: "mt-2 text-xs text-slate-400",
										children: "Current default: admin / admin123"
									})
								]
							})]
						})
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "lg:col-span-2",
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-2xl border bg-white p-6 space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between border-b pb-4",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx(Mail, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ jsx("h2", {
										className: "font-display text-lg font-bold text-brand-navy",
										children: "SMTP Configuration"
									})]
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => toggle("smtp_enabled"),
									className: "flex items-center gap-1.5 focus:outline-none",
									children: smtp.smtp_enabled === "true" ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
										className: "text-xs font-semibold text-green-600",
										children: "Enabled"
									}), /* @__PURE__ */ jsx(ToggleRight, { className: "h-8 w-8 text-green-500" })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
										className: "text-xs font-semibold text-slate-400",
										children: "Disabled"
									}), /* @__PURE__ */ jsx(ToggleLeft, { className: "h-8 w-8 text-slate-300" })] })
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ jsxs("label", {
											className: "text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5",
											children: [/* @__PURE__ */ jsx(Server, { className: "h-3.5 w-3.5" }), " SMTP Host"]
										}), /* @__PURE__ */ jsx("input", {
											value: smtp.smtp_host,
											onChange: (e) => update("smtp_host", e.target.value),
											placeholder: "smtp.gmail.com or mail.privateemail.com",
											className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
										})]
									}),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-semibold text-slate-600 uppercase tracking-wider",
										children: "SMTP Port"
									}), /* @__PURE__ */ jsx("input", {
										value: smtp.smtp_port,
										onChange: (e) => update("smtp_port", e.target.value),
										placeholder: "587 or 465",
										className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
									})] }),
									/* @__PURE__ */ jsx("div", {
										className: "flex items-end pb-3",
										children: /* @__PURE__ */ jsxs("button", {
											type: "button",
											onClick: () => toggle("smtp_secure"),
											className: "flex items-center gap-2 focus:outline-none",
											children: [smtp.smtp_secure === "true" ? /* @__PURE__ */ jsx(ToggleRight, { className: "h-7 w-7 text-primary" }) : /* @__PURE__ */ jsx(ToggleLeft, { className: "h-7 w-7 text-slate-300" }), /* @__PURE__ */ jsx("span", {
												className: "text-xs font-semibold text-slate-600 uppercase tracking-wider",
												children: "Use SSL/TLS (Secure Connection)"
											})]
										})
									}),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
										className: "text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx(Mail, { className: "h-3.5 w-3.5" }), " Username / Account Email"]
									}), /* @__PURE__ */ jsx("input", {
										value: smtp.smtp_user,
										onChange: (e) => update("smtp_user", e.target.value),
										placeholder: "info@flashrenewable.com",
										className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
										className: "text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx(Key, { className: "h-3.5 w-3.5" }), " Password"]
									}), /* @__PURE__ */ jsx("input", {
										type: "password",
										value: smtp.smtp_pass,
										onChange: (e) => update("smtp_pass", e.target.value),
										placeholder: "••••••••••••",
										className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-semibold text-slate-600 uppercase tracking-wider",
										children: "From Address"
									}), /* @__PURE__ */ jsx("input", {
										value: smtp.smtp_from_email,
										onChange: (e) => update("smtp_from_email", e.target.value),
										placeholder: "info@flashrenewable.com",
										className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("label", {
										className: "text-xs font-semibold text-slate-600 uppercase tracking-wider flex items-center gap-1.5",
										children: [/* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5" }), " Notification Recipient Email"]
									}), /* @__PURE__ */ jsx("input", {
										value: smtp.smtp_to_email,
										onChange: (e) => update("smtp_to_email", e.target.value),
										placeholder: "admin@flashrenewable.com",
										className: "mt-1.5 w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary"
									})] })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-wrap gap-3 pt-4 border-t",
								children: [/* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: testSmtp,
									disabled: testing,
									className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold border border-slate-200 text-slate-700 hover:bg-slate-50 transition disabled:opacity-60",
									children: [testing && /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), "Test SMTP Connection"]
								}), /* @__PURE__ */ jsxs("button", {
									type: "button",
									onClick: saveSettings,
									disabled: saving,
									className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-primary text-primary-foreground disabled:opacity-60",
									children: [saving ? /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Save, { className: "h-4 w-4" }), "Save Settings"]
								})]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "rounded-2xl border bg-white p-6 space-y-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 border-b pb-4",
					children: [/* @__PURE__ */ jsx(Database, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ jsx("h2", {
						className: "font-display text-lg font-bold text-brand-navy",
						children: "Database Management"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-6 sm:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-brand-navy",
								children: "Backup Database"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm text-slate-500",
								children: "Download a full snapshot of your current database. Keep this file safe."
							}),
							/* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: handleDownloadDB,
								className: "w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors",
								children: [/* @__PURE__ */ jsx(Download, { className: "h-4 w-4" }), "Download Backup"]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "space-y-3",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-semibold text-brand-navy text-red-600",
								children: "Restore Database"
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-sm text-slate-500",
								children: [
									"Upload a previous backup file to restore. ",
									/* @__PURE__ */ jsx("strong", {
										className: "text-red-500",
										children: "Warning:"
									}),
									" This will overwrite all current data!"
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsx("input", {
									type: "file",
									accept: ".db",
									onChange: handleRestoreDB,
									className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
									title: "Select a database backup file"
								}), /* @__PURE__ */ jsxs("button", {
									type: "button",
									className: "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition w-auto pointer-events-none",
									children: [/* @__PURE__ */ jsx(UploadCloud, { className: "h-4 w-4" }), "Upload & Restore"]
								})]
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Settings as component };
