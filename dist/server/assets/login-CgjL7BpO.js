import { t as flash_logo_updated_default } from "./flash-logo-updated-DRWX-8Au.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail, Shield, Zap } from "lucide-react";
//#region src/routes/login.tsx?tsr-split=component
function SolarArt() {
	return /* @__PURE__ */ jsxs("div", {
		className: "relative w-full h-full flex items-center justify-center overflow-hidden select-none",
		children: [
			/* @__PURE__ */ jsx("style", { children: `
        @keyframes orbit1 { from { transform: rotate(0deg) translateX(120px) rotate(0deg); } to { transform: rotate(360deg) translateX(120px) rotate(-360deg); } }
        @keyframes orbit2 { from { transform: rotate(120deg) translateX(180px) rotate(-120deg); } to { transform: rotate(480deg) translateX(180px) rotate(-480deg); } }
        @keyframes orbit3 { from { transform: rotate(240deg) translateX(240px) rotate(-240deg); } to { transform: rotate(600deg) translateX(240px) rotate(-600deg); } }
        @keyframes orbit4 { from { transform: rotate(60deg) translateX(300px) rotate(-60deg); } to { transform: rotate(420deg) translateX(300px) rotate(-420deg); } }
        @keyframes sun-pulse { 0%,100%{box-shadow:0 0 60px 20px rgba(251,191,36,0.4),0 0 120px 40px rgba(247,147,30,0.2)} 50%{box-shadow:0 0 100px 40px rgba(251,191,36,0.6),0 0 200px 80px rgba(247,147,30,0.3)} }
        @keyframes ray-rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes float-tag { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes panel-shine { 0%{opacity:0.15} 50%{opacity:0.35} 100%{opacity:0.15} }
        .orbit-1 { animation: orbit1 8s linear infinite; }
        .orbit-2 { animation: orbit2 12s linear infinite; }
        .orbit-3 { animation: orbit3 16s linear infinite reverse; }
        .orbit-4 { animation: orbit4 20s linear infinite; }
        .sun-pulse { animation: sun-pulse 3s ease-in-out infinite; }
        .ray-rotate { animation: ray-rotate 20s linear infinite; }
        .float-tag { animation: float-tag 3s ease-in-out infinite; }
        .panel-shine { animation: panel-shine 4s ease-in-out infinite; }
      ` }),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0",
				style: { background: "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.12) 0%, transparent 70%)" }
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 flex items-center justify-center ray-rotate",
				children: Array.from({ length: 24 }).map((_, i) => /* @__PURE__ */ jsx("div", {
					className: "absolute origin-center",
					style: {
						width: "1.5px",
						height: "320px",
						background: `linear-gradient(to top, transparent, rgba(251,191,36,${i % 3 === 0 ? "0.25" : "0.1"}), transparent)`,
						transform: `rotate(${i * 15}deg)`
					}
				}, i))
			}),
			[
				120,
				180,
				240,
				300
			].map((r, i) => /* @__PURE__ */ jsx("div", {
				className: "absolute rounded-full border border-white/[0.06]",
				style: {
					width: r * 2,
					height: r * 2
				}
			}, r)),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 flex items-center justify-center",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative w-0 h-0",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "orbit-1 absolute",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-10 w-10 rounded-lg border border-primary/40 bg-brand-navy-deep/80 backdrop-blur flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.4)]",
								children: /* @__PURE__ */ jsxs("svg", {
									viewBox: "0 0 24 24",
									className: "h-5 w-5 fill-primary",
									children: [
										/* @__PURE__ */ jsx("rect", {
											x: "2",
											y: "7",
											width: "20",
											height: "10",
											rx: "1"
										}),
										/* @__PURE__ */ jsx("line", {
											x1: "2",
											y1: "12",
											x2: "22",
											y2: "12",
											stroke: "rgba(12,35,64,0.6)",
											strokeWidth: "1"
										}),
										/* @__PURE__ */ jsx("line", {
											x1: "8",
											y1: "7",
											x2: "8",
											y2: "17",
											stroke: "rgba(12,35,64,0.6)",
											strokeWidth: "1"
										}),
										/* @__PURE__ */ jsx("line", {
											x1: "16",
											y1: "7",
											x2: "16",
											y2: "17",
											stroke: "rgba(12,35,64,0.6)",
											strokeWidth: "1"
										})
									]
								})
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "orbit-2 absolute",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-9 w-9 rounded-full border border-amber-400/30 bg-amber-500/10 backdrop-blur flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.3)]",
								children: /* @__PURE__ */ jsx(Zap, { className: "h-4 w-4 text-amber-400" })
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "orbit-3 absolute",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-8 w-8 rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur flex items-center justify-center",
								children: /* @__PURE__ */ jsx("span", {
									className: "text-cyan-300 text-xs font-bold",
									children: "🌀"
								})
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "orbit-4 absolute",
							children: /* @__PURE__ */ jsx("div", {
								className: "h-7 w-7 rounded-full border border-emerald-400/30 bg-emerald-500/10 backdrop-blur flex items-center justify-center",
								children: /* @__PURE__ */ jsx("span", {
									className: "text-emerald-300 text-xs",
									children: "🌱"
								})
							})
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex flex-col items-center gap-6",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "sun-pulse rounded-full flex items-center justify-center",
						style: {
							width: 100,
							height: 100,
							background: "radial-gradient(circle, #fffde7 0%, #fbbf24 40%, #f97316 80%, #ea580c 100%)"
						},
						children: /* @__PURE__ */ jsx("div", { style: {
							width: 56,
							height: 56,
							borderRadius: "50%",
							background: "radial-gradient(circle, #fff 0%, #fcd34d 60%)"
						} })
					}),
					/* @__PURE__ */ jsx("svg", {
						viewBox: "0 0 160 60",
						className: "w-40 panel-shine",
						xmlns: "http://www.w3.org/2000/svg",
						children: [
							0,
							1,
							2,
							3
						].map((c) => /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("rect", {
							x: c * 38 + 4,
							y: 4,
							width: 32,
							height: 52,
							rx: 3,
							fill: "none",
							stroke: "rgba(251,191,36,0.5)",
							strokeWidth: "1.5"
						}), /* @__PURE__ */ jsx("line", {
							x1: c * 38 + 4,
							y1: 30,
							x2: c * 38 + 36,
							y2: 30,
							stroke: "rgba(251,191,36,0.3)",
							strokeWidth: "0.8"
						})] }, c))
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "float-tag text-center",
						children: [/* @__PURE__ */ jsx("p", {
							className: "font-display text-2xl font-bold text-white leading-tight",
							children: "Flash Renewable"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-primary text-sm font-semibold mt-1",
							children: "Energy Solutions Pvt. Ltd."
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex flex-wrap justify-center gap-2 max-w-[280px]",
						children: [
							"MNRE Compliant",
							"500+ Projects",
							"25-yr Warranty",
							"PAN India"
						].map((f) => /* @__PURE__ */ jsx("span", {
							className: "rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold text-white/70 uppercase tracking-wider",
							children: f
						}, f))
					})
				]
			})
		]
	});
}
function LoginPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPw, setShowPw] = useState(false);
	const [loading, setLoading] = useState(false);
	const onAdminLogin = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const backendUrl = window.location.origin;
			let backendSuccess = false;
			if (backendUrl) try {
				const res = await fetch(`${backendUrl}/api/login`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: email,
						password
					})
				});
				if (res.ok) {
					const data = await res.json();
					localStorage.setItem("admin_token", data.token);
					localStorage.setItem("admin_user", data.username);
					localStorage.setItem("admin_role", data.role || "admin");
					localStorage.setItem("admin_id", data.id || "admin");
					backendSuccess = true;
				} else {
					const errData = await res.json().catch(() => ({}));
					throw new Error(errData.error || "Invalid credentials");
				}
			} catch (backendErr) {
				throw backendErr;
			}
			if (!backendSuccess) throw new Error("Unable to connect to the login server.");
			toast.success("Logged in successfully");
			const role = localStorage.getItem("admin_role");
			if (role === "admin" || role === "staff") navigate({ to: "/admin" });
			else navigate({ to: "/" });
		} catch (err) {
			toast.error(err?.message || "Connection failed");
		} finally {
			setLoading(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen flex",
		style: { background: "#020c14" },
		children: [
			/* @__PURE__ */ jsx("style", { children: `
        @keyframes bg-shift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .input-glow:focus { border-color: rgba(251,191,36,0.6) !important; box-shadow: 0 0 0 3px rgba(251,191,36,0.1); }
      ` }),
			/* @__PURE__ */ jsxs("div", {
				className: "hidden lg:flex lg:w-1/2 relative",
				style: { background: "linear-gradient(135deg, #020c14 0%, #051a2b 50%, #03120e 100%)" },
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 opacity-[0.04]",
					style: {
						backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 66L0 50V16L28 0l28 16v34L28 66zM28 100L0 84V66l28 16 28-16v18L28 100z' fill='none' stroke='white' stroke-width='1'/%3E%3C/svg%3E")`,
						backgroundSize: "56px 100px"
					}
				}), /* @__PURE__ */ jsx(SolarArt, {})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex-1 flex items-center justify-center px-6 py-12",
				style: { background: "linear-gradient(180deg, #020c14 0%, #051a2b 100%)" },
				children: /* @__PURE__ */ jsxs("div", {
					className: "w-full max-w-md",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex justify-center mb-10",
							children: /* @__PURE__ */ jsx("img", {
								src: flash_logo_updated_default,
								alt: "Flash Renewable Energy",
								className: "h-[76px] md:h-[120px] w-auto object-contain"
							})
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "font-display text-4xl font-bold text-white mb-2",
							children: "Welcome back"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-white/50 text-sm mb-8",
							children: "Sign in to access your dashboard."
						}),
						/* @__PURE__ */ jsxs("form", {
							onSubmit: onAdminLogin,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("label", {
									className: "text-xs font-semibold uppercase tracking-wider text-white/50 block mb-2",
									children: "Username or Email"
								}), /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [/* @__PURE__ */ jsx(Mail, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" }), /* @__PURE__ */ jsx("input", {
										required: true,
										type: "text",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										placeholder: "admin",
										className: "input-glow w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-4 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition"
									})]
								})] }),
								/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between mb-2",
									children: [/* @__PURE__ */ jsx("label", {
										className: "text-xs font-semibold uppercase tracking-wider text-white/50",
										children: "Password"
									}), /* @__PURE__ */ jsx("a", {
										href: "#",
										className: "text-xs text-primary hover:underline",
										children: "Forgot password?"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "relative",
									children: [
										/* @__PURE__ */ jsx(Lock, { className: "absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" }),
										/* @__PURE__ */ jsx("input", {
											required: true,
											type: showPw ? "text" : "password",
											value: password,
											onChange: (e) => setPassword(e.target.value),
											placeholder: "••••••••",
											className: "input-glow w-full rounded-xl border border-white/10 bg-white/[0.05] pl-11 pr-12 py-3.5 text-sm text-white placeholder-white/25 focus:outline-none transition"
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setShowPw((v) => !v),
											className: "absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition",
											children: showPw ? /* @__PURE__ */ jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsx(Eye, { className: "h-4 w-4" })
										})
									]
								})] }),
								/* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: loading,
									className: "w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold text-brand-navy-deep transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-60",
									style: {
										background: "linear-gradient(135deg, #fbbf24, #f97316)",
										boxShadow: "0 12px 35px -8px rgba(247,147,30,0.6)"
									},
									children: loading ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin" }), " Signing in…"] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(LogIn, { className: "h-4 w-4" }), " Sign In"] })
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "my-6 flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-white/10" }),
								/* @__PURE__ */ jsx("span", {
									className: "text-white/30 text-xs",
									children: "or"
								}),
								/* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-white/10" })
							]
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "text-center text-sm text-white/40",
							children: [
								"Don't have an account?",
								" ",
								/* @__PURE__ */ jsx(Link, {
									to: "/signup",
									className: "text-primary font-semibold hover:text-amber-300 transition",
									children: "Create account"
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-8 flex items-center justify-center gap-2 text-white/25 text-xs",
							children: [/* @__PURE__ */ jsx(Shield, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ jsx("span", { children: "256-bit encrypted & secure connection" })]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { LoginPage as component };
