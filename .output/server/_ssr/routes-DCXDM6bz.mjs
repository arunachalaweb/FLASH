import { i as __toESM } from "../_runtime.mjs";
import { t as project_residential_default } from "./project-residential-BUNYnuq8.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Quote, G as Lightbulb, K as Leaf, M as Phone, Pt as ArrowRight, R as MapPin, ht as Clock, jt as Award, ot as Globe, r as Zap, rt as Headphones, v as Sun, x as Smile, y as Star, yt as CircleCheck, z as Mail } from "../_libs/lucide-react.mjs";
import { n as Header, t as Footer } from "./Footer-C7UDJlwR.mjs";
import { t as about_engineers_default } from "./about-engineers-0ZLqikfi.mjs";
import { t as ContactForm } from "./ContactForm-DvHR0C-O.mjs";
import { r as project_utility_default, t as project_commercial_default } from "./project-utility-CoJD2s69.mjs";
import { t as ProjectsGallery } from "./ProjectsGallery-DPP5PD0n.mjs";
import { a as solar_house_3d_default, i as services, n as hero_2_default, r as hero_3_default } from "./services-data-oIchF6z1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DCXDM6bz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TESTIMONIALS = [
	{
		quote: "Flash delivered our 420 kWp rooftop plant two weeks ahead of schedule. Monitoring, billing and payback have all played out exactly as promised.",
		name: "Ravi Menon",
		role: "Facilities Director",
		location: "Bengaluru Tech Park",
		initials: "RM"
	},
	{
		quote: "The engineering team walked us through every decision — from module choice to HT synchronisation. Genuine EPC partners, not just installers.",
		name: "Anitha Krishnan",
		role: "Plant Head",
		location: "Coimbatore Textiles",
		initials: "AK"
	},
	{
		quote: "Clean installation on our villa rooftop, zero mess and perfectly documented. Our electricity bill dropped by 82% in the first quarter.",
		name: "Vikram Shah",
		role: "Homeowner",
		location: "Chennai",
		initials: "VS"
	},
	{
		quote: "24×7 remote O&M is real with Flash. Any performance dip and we hear from them before we notice it ourselves. Highly recommended.",
		name: "Priya Deshpande",
		role: "Operations Manager",
		location: "Pune Warehousing",
		initials: "PD"
	}
];
function Testimonials() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		id: "testimonials",
		className: "relative overflow-hidden bg-background py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-96 w-[40rem] rounded-full bg-primary/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto max-w-7xl px-4 md:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-2xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-primary font-semibold text-sm flex items-center gap-2 tracking-widest",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" }), "TESTIMONIALS"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mt-3 font-display text-3xl md:text-5xl font-bold leading-tight text-brand-navy",
						children: [
							"Trusted by clients",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
								children: "across India"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-muted-foreground max-w-xl",
						children: "Real voices from homeowners, plant heads and facility managers powering their operations with Flash."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
				children: TESTIMONIALS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
					className: "group relative rounded-2xl border border-brand-navy/10 bg-white p-7 shadow-[0_10px_30px_-15px_hsl(var(--brand-navy)/0.25)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_25px_60px_-20px_hsl(var(--primary)/0.45)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-x-7 top-0 h-0.5 bg-gradient-to-r from-primary via-brand-gold to-primary rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Quote, {
							className: "h-9 w-9 text-primary/25 group-hover:text-primary/70 group-hover:-rotate-6 transition-all duration-500",
							strokeWidth: 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex gap-0.5",
							"aria-label": "5 star rating",
							children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "h-4 w-4 fill-brand-gold text-brand-gold" }, i))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
							className: "mt-4 text-sm leading-relaxed text-brand-navy/85",
							children: [
								"\"",
								t.quote,
								"\""
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", {
							className: "mt-6 flex items-center gap-3 border-t border-brand-navy/10 pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep font-bold text-sm shadow-[0_8px_20px_-8px_hsl(var(--primary)/0.7)] group-hover:scale-110 transition-transform duration-500",
								children: t.initials
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-sm font-semibold text-brand-navy truncate",
									children: t.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-xs text-muted-foreground truncate",
									children: [
										t.role,
										" · ",
										t.location
									]
								})]
							})]
						})
					]
				}, t.name))
			})]
		})]
	});
}
var flash_1_default = "/assets/flash-1-DdsvOgD_.png";
var stats = [
	{
		icon: Sun,
		value: "500+",
		label: "Projects Completed"
	},
	{
		icon: Zap,
		value: "100MW+",
		label: "Installed Capacity"
	},
	{
		icon: Headphones,
		value: "24×7",
		label: "Customer Support"
	},
	{
		icon: MapPin,
		value: "PAN India",
		label: "Service Network"
	}
];
var values = [
	{
		icon: Leaf,
		title: "Sustainable Solutions"
	},
	{
		icon: Award,
		title: "Quality Assurance"
	},
	{
		icon: Clock,
		title: "Timely Delivery"
	},
	{
		icon: Smile,
		title: "Customer Satisfaction"
	}
];
var process = [
	{
		n: "01",
		title: "Consultation & Feasibility Study",
		desc: "We analyze your energy needs and site feasibility.",
		green: true
	},
	{
		n: "02",
		title: "Design & Engineering",
		desc: "Customized system design with precise engineering.",
		green: false
	},
	{
		n: "03",
		title: "Installation & Commissioning",
		desc: "Professional installation & testing for performance.",
		green: true
	},
	{
		n: "04",
		title: "Monitoring & Maintenance",
		desc: "Real-time monitoring and regular maintenance.",
		green: false
	},
	{
		n: "05",
		title: "Continuous Innovation",
		desc: "Upgrading technology for better efficiency always.",
		green: true
	}
];
var heroSlides = [
	{
		img: flash_1_default,
		tag: "Powering a Bright & Green Future",
		headline: [
			"Clean Energy,",
			"Engineered for",
			"India's Future."
		],
		accent: "India's Future.",
		sub: "Delivering innovative solar, wind, and clean energy solutions for a sustainable tomorrow.",
		cta: "Get Free Consultation",
		ctaHref: "#contact"
	},
	{
		img: hero_2_default,
		tag: "Solar Panel Excellence",
		headline: [
			"From Rooftop",
			"to Utility Scale —",
			"We Power All."
		],
		accent: "We Power All.",
		sub: "Mono, Poly, TOPCon, BIFACIAL, Thin Film, Glass Panels & BIPV Roof Tiles — every solar technology under one roof.",
		cta: "Explore Technologies",
		ctaHref: "/services"
	},
	{
		img: hero_3_default,
		tag: "Wind & Hybrid Systems",
		headline: [
			"Wind Turbines,",
			"Wall Turbines &",
			"Hybrid Systems."
		],
		accent: "Hybrid Systems.",
		sub: "Portable & static wind turbines, vertical wall turbines and hybrid solar-wind systems — clean energy 24×7.",
		cta: "View Services",
		ctaHref: "/services"
	},
	{
		img: solar_house_3d_default,
		tag: "Institutional & Government",
		headline: [
			"Floating Solar,",
			"Schools, Campuses",
			"& Public Infra."
		],
		accent: "& Public Infra.",
		sub: "Floating solar systems on ponds and lakes, wall turbines for schools and universities, smart highway street lighting.",
		cta: "See Projects",
		ctaHref: "/projects"
	},
	{
		img: about_engineers_default,
		tag: "Trusted EPC Partner",
		headline: [
			"500+ Projects,",
			"PAN India",
			"Service Network."
		],
		accent: "Service Network.",
		sub: "MNRE-compliant, quality-assured, delivered on time — backed by a 24×7 support team and 25-year panel warranty.",
		cta: "About Us",
		ctaHref: "/about"
	}
];
var whyus = [
	"Experienced Engineering Team",
	"MNRE-Compliant Solutions",
	"High-Quality Components",
	"Timely Project Delivery",
	"24×7 Customer Support",
	"Warranty & AMC Services"
];
function HeroSection() {
	const [active, setActive] = (0, import_react.useState)(0);
	const [billAmount, setBillAmount] = (0, import_react.useState)("");
	const [calcResult, setCalcResult] = (0, import_react.useState)(null);
	const timerRef = (0, import_react.useRef)(null);
	const startTimer = () => {
		if (timerRef.current) clearInterval(timerRef.current);
		timerRef.current = setInterval(() => setActive((a) => (a + 1) % heroSlides.length), 6e3);
	};
	(0, import_react.useEffect)(() => {
		startTimer();
		return () => {
			if (timerRef.current) clearInterval(timerRef.current);
		};
	}, []);
	const goTo = (i) => {
		setActive(i);
		startTimer();
	};
	const slide = heroSlides[active];
	const calculateSolar = (e) => {
		e.preventDefault();
		const bill = parseFloat(billAmount) || 0;
		if (bill <= 0) return;
		const sizeKw = Math.max(1, Math.round(bill / 960 * 10) / 10);
		const cost = sizeKw * 6e4;
		const savingsYearly = bill * 12;
		setCalcResult({
			size: sizeKw,
			cost,
			savings: savingsYearly
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden min-h-screen flex flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { overlay: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-0",
				children: [
					heroSlides.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 transition-opacity duration-1000 overflow-hidden",
						style: { opacity: i === active ? 1 : 0 },
						children: s.video ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: s.video,
							autoPlay: true,
							loop: true,
							muted: true,
							playsInline: true,
							className: `h-full w-full object-cover transition-transform duration-[10000ms] ease-out ${i === active ? "scale-110" : "scale-100"}`
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: s.img,
							alt: s.tag,
							className: `h-full w-full object-cover transition-transform duration-[10000ms] ease-out ${i === active ? "scale-110" : "scale-100"}`
						})
					}, i)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-brand-navy-deep/97 via-brand-navy-deep/80 to-brand-navy-deep/40" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-navy-deep/90 via-transparent to-brand-navy-deep/50" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden md:block pointer-events-none absolute inset-0 w-full h-full overflow-hidden",
				style: {
					maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
					WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
          @keyframes cinematic-rise { 
            0% { transform: translate(-50%, 180px) scale(0.9); opacity: 0; } 
            20% { transform: translate(-50%, 60px) scale(1); opacity: 1; }
            100% { transform: translate(-50%, -30px) scale(1.05); opacity: 1; }
          }
          @keyframes cloud-drift-slow {
            0% { transform: translateX(5%); }
            50% { transform: translateX(-5%); }
            100% { transform: translateX(5%); }
          }
          @keyframes cloud-drift-fast {
            0% { transform: translateX(-10%); }
            50% { transform: translateX(10%); }
            100% { transform: translateX(-10%); }
          }
          @keyframes bird-fly {
            0% { transform: translate(-50px, 150px) scale(0.4) rotate(-10deg); opacity: 0; }
            10% { opacity: 0.8; }
            80% { opacity: 0.8; }
            100% { transform: translate(1200px, -200px) scale(0.7) rotate(15deg); opacity: 0; }
          }
          @keyframes plane-fly {
            0% { transform: translate(1200px, 150px) scale(0.4) rotate(-82deg); opacity: 0; }
            10% { opacity: 0.6; }
            90% { opacity: 0.6; }
            100% { transform: translate(-300px, -50px) scale(0.4) rotate(-82deg); opacity: 0; }
          }
          @keyframes rocket-fly {
            0% { transform: translate(-100px, 600px) scale(0.5) rotate(45deg); opacity: 0; }
            20% { opacity: 0.9; }
            80% { opacity: 0.9; }
            100% { transform: translate(1000px, -400px) scale(0.3) rotate(45deg); opacity: 0; }
          }
          @keyframes smoke-fade {
            0% { opacity: 0; transform: scaleX(0.5); }
            20% { opacity: 0.5; transform: scaleX(1); }
            80% { opacity: 0.5; transform: scaleX(1); }
            100% { opacity: 0; transform: scaleX(0.8); }
          }
          @keyframes outer-flash {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.4); opacity: 0.7; }
          }
          @keyframes inner-pulse {
            0%, 100% { transform: scale(0.95); opacity: 0.8; }
            50% { transform: scale(1.05); opacity: 1; }
          }
          @keyframes hero-text-in{0%{opacity:0;transform:translateY(24px)}100%{opacity:1;transform:translateY(0)}}
          .hero-text-in{animation:hero-text-in 0.7s cubic-bezier(0.23,1,0.32,1) forwards;}
        ` }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute top-[20%] left-1/2 w-[450px] h-[450px] flex items-center justify-center",
						style: { animation: "cinematic-rise 40s cubic-bezier(0.1, 0.8, 0.9, 1) forwards" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute rounded-full bg-brand-gold/30 mix-blend-screen",
								style: {
									width: "400px",
									height: "400px",
									filter: "blur(50px)",
									animation: "outer-flash 8s ease-in-out infinite"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute rounded-full bg-orange-500/40 mix-blend-screen",
								style: {
									width: "250px",
									height: "250px",
									filter: "blur(30px)",
									animation: "outer-flash 6s ease-in-out infinite reverse"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative rounded-full flex items-center justify-center",
								style: {
									width: "140px",
									height: "140px",
									background: "radial-gradient(circle at 35% 35%, #fff9c4 0%, #fbbf24 40%, #ea580c 85%, #9a3412 100%)",
									boxShadow: "0 0 80px 25px rgba(251,191,36,0.6), inset -15px -15px 40px rgba(154,52,18,0.6)",
									animation: "inner-pulse 5s ease-in-out infinite"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
									width: "75px",
									height: "75px",
									borderRadius: "50%",
									background: "radial-gradient(circle, #ffffff 0%, #fffde7 20%, transparent 80%)",
									filter: "blur(4px)"
								} })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-y-0 w-[120%] -left-[10%] opacity-60 mix-blend-screen",
						style: { animation: "cloud-drift-slow 60s ease-in-out infinite" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 800 600",
							className: "w-full h-full",
							preserveAspectRatio: "none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M-100,650 Q100,450 300,500 T700,400 T1000,550 L1000,700 L-100,700 Z",
								fill: "rgba(249,115,22,0.3)",
								filter: "blur(20px)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M0,700 Q200,350 450,450 T900,300 L900,700 L0,700 Z",
								fill: "rgba(251,191,36,0.2)",
								filter: "blur(30px)"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-y-0 w-[120%] -left-[10%] opacity-80",
						style: { animation: "cloud-drift-fast 45s ease-in-out infinite" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 800 600",
							className: "w-full h-full",
							preserveAspectRatio: "none",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M-50,650 Q150,400 400,450 T850,350 L850,700 L-50,700 Z",
								fill: "rgba(234,88,12,0.4)",
								filter: "blur(15px)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M100,650 Q300,380 500,480 T950,400 L950,700 L100,700 Z",
								fill: "rgba(154,52,18,0.5)",
								filter: "blur(25px)"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-y-0 w-[120%] -left-[10%]",
						style: { animation: "cloud-drift-slow 70s ease-in-out infinite reverse" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							viewBox: "0 0 800 600",
							className: "w-full h-full",
							preserveAspectRatio: "none",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M-200,650 Q50,450 250,550 T650,450 T1100,600 L1100,700 L-200,700 Z",
								fill: "rgba(0,31,63,0.7)",
								filter: "blur(10px)"
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 pointer-events-none overflow-hidden",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-[35%] left-[20%]",
								style: { animation: "bird-fly 20s linear infinite" },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "40",
									height: "40",
									viewBox: "0 0 24 24",
									fill: "currentColor",
									className: "text-brand-navy-deep opacity-80 drop-shadow-md",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M2.5 12c2.5-1.5 5-2 7.5-1.5 1.5 3.5 2.5 5 4.5 4.5-1.5-2-2-4-1-6 2 1.5 4 2.5 6 2 1.5-.5 2.5-1 2-2-2-2.5-4-3-6-2.5-1.5 2-2.5 4-2 6-2 0-3.5-1.5-4.5-4C8.5 7 6.5 7.5 4 9c-1 1-1.5 2-1.5 3z" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-[10%] left-[0] flex flex-col items-center",
								style: { animation: "plane-fly 35s linear infinite 5s" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									width: "60",
									height: "60",
									viewBox: "0 0 24 24",
									fill: "currentColor",
									className: "text-brand-navy-deep opacity-60 drop-shadow-lg z-10",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-[3px] h-[150px] mt-[-15px] rounded-full bg-gradient-to-b from-white/30 to-transparent",
									style: { filter: "blur(1px)" }
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-[60%] left-[10%] flex flex-col items-center",
								style: { animation: "rocket-fly 18s ease-in infinite 12s" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "50",
									height: "50",
									viewBox: "0 0 24 24",
									fill: "currentColor",
									className: "text-brand-navy-deep opacity-90 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] z-10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13.13 2.13l3.18 3.18c2.14 2.15 3.2 5.09 3.03 8.04l-1.35 1.35-6.88-6.88 1.35-1.35c2.95-.17 5.89.89 8.04 3.03l3.18 3.18c.39.39.39 1.02 0 1.41l-2.12 2.12c-.39.39-1.02.39-1.41 0l-3.18-3.18c-2.15-2.14-5.09-3.2-8.04-3.03l-1.35 1.35 6.88 6.88-1.35 1.35c-2.95.17-5.89-.89-8.04-3.03l-3.18-3.18c-.39-.39-.39-1.02 0-1.41l2.12-2.12c.39-.39 1.02-.39 1.41 0l3.18 3.18c2.14 2.15 3.2 5.09 3.03 8.04l1.35-1.35-6.88-6.88-1.35 1.35c-2.95.17-5.89-.89-8.04-3.03L2.13 10.87c-.39-.39-.39-1.02 0-1.41l2.12-2.12c.39-.39 1.02-.39 1.41 0z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2.01c-1.33 0-2.58.52-3.52 1.46l-4.94 4.94c-1.07 1.07-1.57 2.62-1.36 4.14L3.6 19.4c.16.89.94 1.55 1.84 1.6h.17l6.85-1.42c1.52.21 3.07-.29 4.14-1.36l4.94-4.94c.94-.94 1.46-2.19 1.46-3.52s-.52-2.58-1.46-3.52l-4.94-4.94C14.58 2.53 13.33 2.01 12 2.01zm5.66 11.3l-4.94 4.94c-.66.66-1.61.97-2.55.84l-5.74 1.19 1.19-5.74c-.13-.94.18-1.89.84-2.55l4.94-4.94c.62-.62 1.45-.96 2.33-.96s1.71.34 2.33.96l1.6 1.6c1.28 1.29 1.28 3.38 0 4.66z" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-[10px] h-[80px] mt-[-10px] rounded-full bg-gradient-to-b from-orange-500/80 via-white/40 to-transparent",
									style: { filter: "blur(3px)" }
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1 mx-auto max-w-7xl w-full px-4 md:px-6 pt-[140px] md:pt-[170px] lg:pt-[190px] pb-12 flex flex-col lg:flex-row gap-10 lg:gap-16 items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 max-w-2xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-text-in inline-flex items-center gap-2 rounded-full border border-primary/40 bg-white/5 backdrop-blur px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-primary uppercase",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }), slide.tag]
						}, `tag-${active}`),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight",
							children: slide.headline.map((line, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block hero-text-in",
								style: {
									animationDelay: `${li * .1 + .05}s`,
									opacity: 0
								},
								children: line === slide.accent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-gradient-gold",
									children: line
								}) : line
							}, `${active}-${li}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "hero-text-in mt-6 text-white/75 text-base md:text-lg leading-relaxed max-w-xl",
							style: {
								animationDelay: "0.35s",
								opacity: 0
							},
							children: slide.sub
						}, `sub-${active}`),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hero-text-in mt-8 flex flex-wrap gap-3",
							style: {
								animationDelay: "0.45s",
								opacity: 0
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: slide.ctaHref,
								className: "group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-7 py-3.5 text-sm font-bold text-brand-navy-deep shadow-[0_12px_35px_-10px_rgba(247,147,30,0.7)] hover:shadow-[0_18px_45px_-10px_rgba(247,147,30,0.9)] hover:-translate-y-0.5 transition-all duration-300",
								children: [
									slide.cta,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 group-hover:translate-x-1 transition" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#contact",
								className: "inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 backdrop-blur text-white px-7 py-3.5 text-sm font-semibold hover:bg-white/10 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " +91 91500 11428"]
							})]
						}, `cta-${active}`),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 flex flex-wrap gap-x-6 gap-y-2 text-white/60 text-xs",
							children: [
								"MNRE Compliant",
								"25-Year Panel Warranty",
								"PAN-India Delivery",
								"24×7 Support"
							].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-3.5 w-3.5 text-primary" }),
									" ",
									b
								]
							}, b))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => goTo((active - 1 + heroSlides.length) % heroSlides.length),
									className: "h-9 w-9 rounded-full border border-white/20 bg-white/5 backdrop-blur grid place-items-center text-white hover:bg-primary hover:border-primary transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 rotate-180" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex items-center gap-2",
									children: heroSlides.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => goTo(i),
										className: `rounded-full transition-all duration-400 ${i === active ? "w-8 h-2.5 bg-primary dot-active" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"}`
									}, i))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => goTo((active + 1) % heroSlides.length),
									className: "h-9 w-9 rounded-full border border-white/20 bg-white/5 backdrop-blur grid place-items-center text-white hover:bg-primary hover:border-primary transition",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-white/40 text-xs ml-1",
									children: [
										active + 1,
										" / ",
										heroSlides.length
									]
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full lg:w-[380px] xl:w-[420px] flex-shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-2xl p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }), " Solar Calculator"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 font-display text-xl font-bold text-white",
									children: "Estimate Your Savings"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-white/50 text-xs mt-1",
									children: "Find out what size system you need."
								})
							]
						}), calcResult ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-in fade-in slide-in-from-bottom-4 duration-500",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl border border-primary/20 bg-primary/10 p-4 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-white/60 text-xs uppercase tracking-wider mb-1",
										children: "Recommended System"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-3xl font-display font-bold text-white",
										children: [
											calcResult.size,
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-primary text-xl",
												children: "kW"
											})
										]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-2 text-center divide-x divide-white/10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-white/50 text-[10px] uppercase",
										children: "Est. Cost"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-white font-semibold",
										children: [
											"₹",
											(calcResult.cost / 1e5).toFixed(2),
											"L"
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-white/50 text-[10px] uppercase",
										children: "Yearly Savings"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-emerald-400 font-semibold",
										children: ["₹", calcResult.savings.toLocaleString()]
									})] })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => setCalcResult(null),
									className: "w-full rounded-xl border border-white/20 bg-transparent py-3 text-sm font-bold text-white hover:bg-white/5 transition-all",
									children: "Recalculate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#contact",
									className: "w-full rounded-xl bg-gradient-to-r from-primary to-brand-gold py-3 text-sm font-bold text-brand-navy-deep shadow-[0_10px_30px_-8px_rgba(247,147,30,0.6)] hover:shadow-[0_14px_40px_-8px_rgba(247,147,30,0.8)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2",
									children: ["Get Final Quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: calculateSolar,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-[10px] font-semibold uppercase tracking-wider text-white/50 block mb-2",
									children: "Average Monthly Electricity Bill (₹)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-medium",
										children: "₹"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "number",
										min: "500",
										step: "100",
										placeholder: "e.g. 2500",
										value: billAmount,
										onChange: (e) => setBillAmount(e.target.value),
										className: "w-full rounded-xl border border-white/15 bg-white/5 pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-primary/60 focus:bg-white/10 transition"
									})]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "submit",
									className: "w-full rounded-xl bg-gradient-to-r from-primary to-brand-gold py-3 text-sm font-bold text-brand-navy-deep shadow-[0_10px_30px_-8px_rgba(247,147,30,0.6)] hover:shadow-[0_14px_40px_-8px_rgba(247,147,30,0.8)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "h-4 w-4" }), " Calculate Now"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] text-white/40 text-center leading-relaxed",
									children: "* This is an approximate estimate based on average solar generation in India. Actual system size may vary."
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "tel:+919150011428",
							className: "flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white/70 hover:bg-white/[0.09] hover:text-white transition text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-3.5 w-3.5 text-primary flex-shrink-0" }), " +91 91500 11428"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "mailto:info@flashrenewable.com",
							className: "flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 text-white/70 hover:bg-white/[0.09] hover:text-white transition text-xs truncate",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-3.5 w-3.5 text-primary flex-shrink-0" }), " info@flashrenewable.com"]
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative mx-auto max-w-7xl w-full px-4 md:px-6 pb-10 z-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden",
					children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 px-6 py-5 group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid place-items-center h-12 w-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, { className: "h-6 w-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-white text-2xl font-display font-bold",
							children: s.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-white/50 text-xs uppercase tracking-wider",
							children: s.label
						})] })]
					}, s.label))
				})
			})
		]
	});
}
function HomeComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-background text-foreground font-sans",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "about",
				className: "py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-primary font-semibold text-sm flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }), " ABOUT US"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy",
							children: [
								"Flash Renewable Energy",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								" Solutions Pvt. Ltd."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 text-muted-foreground leading-relaxed",
							children: "We are a leading renewable energy company delivering high-quality, cost-effective and sustainable solar solutions. From rooftop installations to large-scale solar power plants, we provide end-to-end EPC services with the highest standards of safety and performance."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6",
							children: values.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto grid place-items-center h-14 w-14 rounded-full border-2 border-primary/30 text-primary",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(v.icon, { className: "h-6 w-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 text-sm font-semibold text-brand-navy leading-tight",
									children: v.title
								})]
							}, v.title))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-3 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "col-span-2 relative rounded-2xl overflow-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: about_engineers_default,
								alt: "Engineers inspecting solar panels",
								className: "h-full w-full object-cover",
								loading: "lazy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute left-4 bottom-4 bg-white rounded-lg px-4 py-3 flex items-center gap-2 shadow-lg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, { className: "h-6 w-6 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-xs text-primary font-semibold",
									children: "Clean Energy"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-sm font-bold text-brand-navy",
									children: "Better Tomorrow"
								})] })]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-rows-3 gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: project_residential_default,
									alt: "Rooftop solar",
									className: "rounded-xl h-full w-full object-cover",
									loading: "lazy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: project_commercial_default,
									alt: "Commercial solar",
									className: "rounded-xl h-full w-full object-cover",
									loading: "lazy"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: project_utility_default,
									alt: "Utility solar",
									className: "rounded-xl h-full w-full object-cover",
									loading: "lazy"
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden bg-brand-navy-deep text-white",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute top-[40%] -right-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/15 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-40 -left-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-0 opacity-[0.05]",
						style: {
							backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
							backgroundSize: "48px 48px"
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "services",
						className: "relative py-24",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto max-w-7xl px-4 md:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-primary font-semibold text-sm flex items-center gap-2 tracking-widest",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" }), "OUR SERVICES"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "mt-3 font-display text-3xl md:text-5xl font-bold leading-tight",
										children: [
											"Complete Renewable",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
												children: "Energy Solutions"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-white/70 max-w-xl",
										children: "From consultation to commissioning — a full-stack solar EPC partner delivering measurable performance across every sector."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#contact",
									className: "hidden md:inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur px-5 py-3 text-sm font-semibold hover:bg-primary hover:border-primary transition",
									children: ["Request a Consultation ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
								children: services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/services/$slug",
									params: { slug: s.slug },
									className: "group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_25px_70px_-20px_hsl(var(--primary)/0.55)]",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative aspect-[4/3] overflow-hidden",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: s.image,
													alt: s.label,
													width: 1024,
													height: 768,
													loading: "lazy",
													className: "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy-deep/50 to-transparent" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-brand-navy-deep/25 group-hover:bg-brand-navy-deep/10 transition-colors duration-500" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-brand-navy-deep/80 backdrop-blur border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" }),
														" ",
														s.tag
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute top-4 right-4 h-11 w-11 rounded-xl grid place-items-center bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.8)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s.icon, {
														className: "h-5 w-5",
														strokeWidth: 2.25
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
													className: "absolute left-5 right-5 bottom-4 font-display text-xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]",
													children: s.label
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "p-5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-white/70 leading-relaxed min-h-[64px]",
												children: s.desc
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 flex items-center justify-between border-t border-white/10 pt-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300",
													children: ["Learn more ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs uppercase tracking-widest text-white/45 group-hover:text-white transition",
													children: "Details"
												})]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-primary via-brand-gold to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" })
									]
								}, s.slug))
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "relative py-12 md:py-20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative mx-auto max-w-7xl px-4 md:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center mb-12",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-primary font-semibold text-sm inline-flex items-center gap-2 tracking-widest",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" }), "WHAT MAKES US DIFFERENT"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
										className: "mt-3 font-display text-3xl md:text-5xl font-bold leading-tight",
										children: [
											"Our",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
												children: "Highlights"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 text-white/60 max-w-2xl mx-auto text-base",
										children: "Innovative technologies and community-focused initiatives that set Flash Renewable Energy Solutions apart."
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5",
								children: [
									{
										emoji: "🌊",
										title: "Floating Solar Systems",
										desc: "Harnessing water surfaces for solar installations — reducing land dependency, saving water evaporation and boosting overall system efficiency.",
										color: "from-sky-500/20 to-blue-600/10",
										border: "hover:border-sky-400/50",
										glow: "group-hover:shadow-[0_25px_60px_-20px_rgba(56,189,248,0.4)]"
									},
									{
										emoji: "🌀",
										title: "Turbines & Wall Turbines",
										desc: "Vertical-axis wind turbines designed for compact spaces — ideal for schools, universities, highway lights, and urban & rural street lighting.",
										color: "from-emerald-500/20 to-teal-600/10",
										border: "hover:border-emerald-400/50",
										glow: "group-hover:shadow-[0_25px_60px_-20px_rgba(52,211,153,0.4)]"
									},
									{
										emoji: "🏛️",
										title: "Institutional & Government Focus",
										desc: "Supporting sustainable energy adoption in educational institutions and public infrastructure projects across India.",
										color: "from-amber-500/20 to-orange-600/10",
										border: "hover:border-amber-400/50",
										glow: "group-hover:shadow-[0_25px_60px_-20px_rgba(251,191,36,0.4)]"
									},
									{
										emoji: "🤝",
										title: "Community Impact",
										desc: "Demonstrated through real-world projects featured on our Instagram reel, inspiring clean energy adoption across communities in India.",
										color: "from-primary/20 to-brand-gold/10",
										border: "hover:border-primary/50",
										glow: "group-hover:shadow-[0_25px_60px_-20px_hsl(var(--primary)/0.4)]"
									}
								].map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `group relative rounded-2xl border border-white/10 bg-gradient-to-br ${h.color} backdrop-blur-xl p-6 flex flex-col gap-4 transition-all duration-500 hover:-translate-y-1.5 ${h.border} ${h.glow}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-4xl leading-none",
											children: h.emoji
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300",
											children: h.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-white/65 text-sm leading-relaxed",
											children: h.desc
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-primary via-brand-gold to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" })
									]
								}, h.title))
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "process",
				className: "py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-[1.7fr_1fr] gap-10 items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-primary font-semibold text-sm flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" }), " OUR PROCESS"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 font-display text-3xl md:text-4xl font-bold text-brand-navy",
							children: "Our 5-Step Process"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid grid-cols-2 md:grid-cols-5 gap-6",
							children: process.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `mx-auto h-16 w-16 rounded-full grid place-items-center font-bold text-lg text-white ${p.green ? "bg-primary" : "bg-brand-navy"}`,
										children: p.n
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-4 font-semibold text-brand-navy text-sm leading-tight",
										children: p.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted-foreground leading-relaxed",
										children: p.desc
									})
								]
							}, p.n))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: solar_house_3d_default,
						alt: "Solar powered home",
						className: "w-full max-w-md mx-auto",
						loading: "lazy"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "projects",
				className: "relative overflow-hidden bg-brand-navy-deep text-white py-24",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/15 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-7xl px-4 md:px-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col md:flex-row md:items-end md:justify-between gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-primary font-semibold text-sm flex items-center gap-2 tracking-widest",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" }), "OUR PROJECTS"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "mt-3 font-display text-3xl md:text-5xl font-bold leading-tight",
									children: [
										"Powering",
										" ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
											children: "Every Sector"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-white/70 max-w-xl",
									children: "A curated look at recent installations — tap any tile for full project details."
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								id: "why",
								className: "hidden lg:grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 max-w-md",
								children: whyus.slice(0, 4).map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2 text-xs text-white/85",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-primary shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: w })]
								}, w))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsGallery, {})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Testimonials, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "contact",
				className: "relative py-24 bg-background",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-3 gap-8 items-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-primary font-semibold text-sm flex items-center gap-2 tracking-widest",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" }), "CONTACT US"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "mt-3 font-display text-3xl md:text-5xl font-bold text-brand-navy leading-tight",
								children: [
									"Let's Switch to",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
										children: "Clean Energy"
									}),
									" ",
									"Together"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-muted-foreground max-w-md",
								children: "Get a free site assessment and a personalised proposal — no obligations."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mt-8 space-y-3 text-sm",
								children: [[
									{
										icon: Phone,
										label: "+91 91500 11428",
										href: "tel:+919150011428"
									},
									{
										icon: Mail,
										label: "info@flashrenewable.com",
										href: "mailto:info@flashrenewable.com"
									},
									{
										icon: Globe,
										label: "www.flashrenewable.com"
									}
								].map(({ icon: Icon, label, href }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "group flex items-center gap-3 rounded-xl border border-brand-navy/10 bg-white px-4 py-3 hover:border-primary/50 hover:shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.5)] transition",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
									}), href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href,
										className: "font-medium text-brand-navy group-hover:text-primary transition",
										children: label
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-brand-navy",
										children: label
									})]
								}, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3 rounded-xl border border-brand-navy/10 bg-white px-4 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm leading-relaxed text-brand-navy/85 text-left",
										children: "FLASH STORAGE Door No.7, Plot No.102, Manirajan Street, Janaki Nagar, Alwarthirunagar, Valasaravakkam, Chennai, Tamil Nadu – 600087"
									})]
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactForm, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl overflow-hidden relative min-h-[420px] border border-brand-navy/10 shadow-[0_25px_60px_-30px_hsl(var(--brand-navy)/0.4)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
								title: "Flash Renewable Energy Solutions location",
								src: "https://www.google.com/maps?q=Valasaravakkam,+Chennai,+Tamil+Nadu&output=embed",
								className: "absolute inset-0 h-full w-full border-0",
								loading: "lazy"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-4 left-4 max-w-[240px] rounded-xl bg-brand-navy-deep/95 backdrop-blur text-white p-4 text-xs leading-relaxed border border-white/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-primary font-semibold mb-1 tracking-wider",
									children: "OUR LOCATION"
								}), "FLASH STORAGE, Door No.7, Valasaravakkam, Chennai – 600087"]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden bg-brand-navy-deep py-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-brand-gold/15" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-primary/25 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-brand-gold/20 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto max-w-6xl px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-display text-2xl md:text-4xl font-bold text-white leading-tight",
							children: [
								"Ready to power up with",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
									children: "clean energy?"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-white/70 text-sm md:text-base",
							children: "Talk to our engineers today — free site visit and proposal within 48 hours."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#contact",
								className: "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-brand-gold px-6 py-3.5 text-sm font-semibold text-brand-navy-deep shadow-[0_15px_40px_-10px_hsl(var(--primary)/0.8)] hover:shadow-[0_20px_50px_-10px_hsl(var(--primary))] hover:-translate-y-0.5 transition",
								children: ["Get a Free Quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "tel:+919150011428",
								className: "inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10 transition",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4" }), " +91 91500 11428"]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
var SplitComponent = HomeComponent;
//#endregion
export { SplitComponent as component };
