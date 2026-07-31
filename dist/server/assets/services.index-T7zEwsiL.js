import { n as services } from "./services-data-oIchF6z1.js";
import { n as Header, t as Footer } from "./Footer-CTni8_Gt.js";
import { n as PageHero, t as FooterCTA } from "./PageHero-BAvrEB2y.js";
import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
//#region src/routes/services.index.tsx?tsr-split=component
var solarTechs = [
	{
		emoji: "🔆",
		name: "Poly-Crystalline Solar Panels",
		description: "Constructed from multiple silicon crystals, offering a cost-effective alternative to mono-crystalline panels.",
		advantages: "Affordable, reliable, and widely available.",
		bestUse: "Large-scale commercial and industrial projects.",
		efficiency: "14–18%",
		power: "Up to 330W",
		strength: "Budget-friendly & Less effective",
		lifespan: "20–25 years"
	},
	{
		emoji: "🔆",
		name: "Mono-Crystalline Solar Panels",
		description: "Made from single-crystal silicon, known for high efficiency and a sleek black finish.",
		advantages: "Space-saving, long lifespan, excellent performance in limited installation areas.",
		bestUse: "Residential rooftops and premium installations.",
		efficiency: "18–23%",
		power: "400–700W",
		strength: "Expensive & Better Performance",
		lifespan: "25–30 years"
	},
	{
		emoji: "🔆",
		name: "Thin Film Solar Panels",
		description: "Lightweight and flexible panels that can be integrated into building materials.",
		advantages: "Perform well in low-light conditions, adaptable to modern architecture.",
		bestUse: "Utility-scale projects and innovative building designs.",
		efficiency: "11–13%",
		power: "100–300W",
		strength: "Flexible, easy to install & lower performance",
		lifespan: "10 years"
	},
	{
		emoji: "🔆",
		name: "Sticker Panels",
		description: "Compact, adhesive-backed panels designed for portability and convenience.",
		advantages: "Easy installation, portable energy source.",
		bestUse: "Consumer gadgets, vehicles, and temporary setups.",
		efficiency: "10%",
		power: "100W",
		strength: "Flexible, easy to install & lower performance",
		lifespan: "5–10 years"
	},
	{
		emoji: "🔆",
		name: "Glass Panels",
		description: "Durable panels encased in protective glass for enhanced longevity.",
		advantages: "Aesthetic appeal, strong performance, premium quality.",
		bestUse: "High-end residential and commercial projects.",
		efficiency: "20–23%",
		power: "Up to 400W",
		strength: "Transparent, tempered toughness, captures reflected light from both sides",
		lifespan: "20–25 years"
	},
	{
		emoji: "🔆",
		name: "Roof Solar Tiles (BIPV)",
		description: "Building-Integrated Photovoltaic (BIPV) tiles combine clean energy generation with the structural protection of traditional roof tiles.",
		advantages: "Aesthetics, Durability, Efficiency.",
		bestUse: "Regions with tropical hill stations and traditional home structures.",
		efficiency: "12–20%",
		power: "38–70W per tile (varies by size & model)",
		strength: "Weather resistance, replaces roofing material, ultra-lightweight & space-saving",
		lifespan: "25–30 years"
	},
	{
		emoji: "🔆",
		name: "Turbine Integration",
		description: "Hybrid systems combining solar panels with wind turbines for consistent 24/7 power generation.",
		advantages: "Ensures consistent power supply by balancing solar and wind inputs.",
		bestUse: "Regions with variable weather conditions.",
		efficiency: "Up to 30–40% (wind-dependent)",
		power: "Up to 900W (wind-dependent)",
		strength: "High efficiency, 24/7 continuous generation & space-saving",
		lifespan: "20–25 years"
	},
	{
		emoji: "🔆",
		name: "Windmill Systems",
		description: "Portable windmills (small, mobile units for temporary/remote needs) and static windmills (larger, fixed installations for continuous generation).",
		advantages: "Reliable renewable energy source, complements solar systems.",
		bestUse: "Rural electrification, industrial sites, and hybrid projects.",
		efficiency: "Up to 30–40% (wind-dependent)",
		power: "2.6–3.9 million kWh per MW of capacity annually",
		strength: "Aerodynamic & gravitational load, survival mechanism",
		lifespan: "20–25 years (with component replacement & repowering extensions up to 35+ years)"
	},
	{
		emoji: "🔆",
		name: "Hybrid Solar Inverters",
		description: "Advanced inverters that manage both solar and wind inputs seamlessly.",
		advantages: "Stable energy conversion, efficient storage, uninterrupted power supply.",
		bestUse: "Residential and industrial setups requiring consistent energy.",
		efficiency: "–",
		power: "–",
		strength: "Seamless multi-source management",
		lifespan: "–"
	}
];
var innovations = [{
	emoji: "🌊",
	title: "Floating Solar Systems",
	desc: "Panels installed on water bodies, reducing land usage and improving efficiency. Ideal for large campuses and government projects."
}, {
	emoji: "🌀",
	title: "Turbines & Wall Turbines",
	desc: "Compact vertical-axis wind turbines designed for rural, urban and institutional applications, providing clean energy in limited spaces."
}];
var sectorApplications = [
	{
		sector: "Residential",
		apps: "Roof tiles, rooftop solar panels & vertical wind turbines for homes."
	},
	{
		sector: "Commercial",
		apps: "Banks, private offices, government offices, MNC companies, IT Parks, malls, integrated buildings and complexes."
	},
	{
		sector: "Industrial",
		apps: "Factories and large-scale manufacturing operations."
	},
	{
		sector: "Utility (Large Scale)",
		apps: "Solar plants, solar fencing and wind farms powering entire communities."
	},
	{
		sector: "Educational Institutions",
		apps: "Solar systems for campuses, wall turbines for schools and universities, enabling sustainable energy adoption."
	},
	{
		sector: "Government Organisations",
		apps: "Large-scale floating solar on seas and ponds, wind turbines for street lights and highway lighting with battery backup, wall turbine projects for public infrastructure — reducing carbon footprint and supporting national sustainability goals."
	}
];
function TechCard({ tech }) {
	const [open, setOpen] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden transition-all duration-300 hover:border-primary/40",
		children: [/* @__PURE__ */ jsxs("button", {
			onClick: () => setOpen((v) => !v),
			className: "w-full flex items-center gap-4 p-5 text-left group",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "text-3xl",
					children: tech.emoji
				}),
				/* @__PURE__ */ jsx("span", {
					className: "flex-1 font-display text-lg font-semibold text-white group-hover:text-primary transition-colors",
					children: tech.name
				}),
				open ? /* @__PURE__ */ jsx(ChevronUp, { className: "h-5 w-5 text-white/40 group-hover:text-primary transition-colors" }) : /* @__PURE__ */ jsx(ChevronDown, { className: "h-5 w-5 text-white/40 group-hover:text-primary transition-colors" })
			]
		}), open && /* @__PURE__ */ jsxs("div", {
			className: "px-5 pb-6 border-t border-white/10 pt-4 space-y-4",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-white/75 text-sm leading-relaxed",
					children: tech.description
				}),
				/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 gap-3",
					children: [
						{
							label: "Efficiency",
							value: tech.efficiency
						},
						{
							label: "Power Output",
							value: tech.power
						},
						{
							label: "Lifespan",
							value: tech.lifespan
						}
					].map((s) => /* @__PURE__ */ jsxs("div", {
						className: "rounded-xl bg-primary/10 border border-primary/20 px-3 py-2 text-center",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-[10px] uppercase tracking-widest text-primary/70 mb-0.5",
							children: s.label
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm font-bold text-white",
							children: s.value
						})]
					}, s.label))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-primary/80 font-semibold",
								children: "Best Use:"
							}),
							" ",
							/* @__PURE__ */ jsx("span", {
								className: "text-white/70",
								children: tech.bestUse
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-primary/80 font-semibold",
								children: "Advantages:"
							}),
							" ",
							/* @__PURE__ */ jsx("span", {
								className: "text-white/70",
								children: tech.advantages
							})
						] }),
						/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-primary/80 font-semibold",
								children: "Strength:"
							}),
							" ",
							/* @__PURE__ */ jsx("span", {
								className: "text-white/70",
								children: tech.strength
							})
						] })
					]
				})
			]
		})]
	});
}
function ServicesPage() {
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-background text-foreground font-sans",
		children: [
			/* @__PURE__ */ jsx(Header, { overlay: true }),
			/* @__PURE__ */ jsx(PageHero, {
				title: "Our Services",
				crumb: "Services",
				tagline: "Full-stack solar EPC — designed, delivered and maintained by an experienced engineering team."
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "relative overflow-hidden bg-brand-navy-deep text-white py-20",
				children: [
					/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-40 -left-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl" }),
					/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/20 blur-3xl" }),
					/* @__PURE__ */ jsx("div", {
						className: "pointer-events-none absolute inset-0 opacity-[0.06]",
						style: {
							backgroundImage: "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
							backgroundSize: "48px 48px"
						}
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative mx-auto max-w-7xl px-4 md:px-6",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "text-primary font-semibold text-sm flex items-center gap-2 tracking-widest",
								children: [
									/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" }),
									" ",
									"WHAT WE DO"
								]
							}),
							/* @__PURE__ */ jsxs("h2", {
								className: "mt-3 font-display text-3xl md:text-5xl font-bold leading-tight max-w-3xl",
								children: [
									"Complete Renewable",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
										children: "Energy Solutions"
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6",
								children: services.map((s) => /* @__PURE__ */ jsxs(Link, {
									to: "/services/$slug",
									params: { slug: s.slug },
									className: "group relative rounded-2xl overflow-hidden border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_25px_70px_-20px_hsl(var(--primary)/0.55)]",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "relative aspect-[4/3] overflow-hidden",
											children: [
												/* @__PURE__ */ jsx("img", {
													src: s.image,
													alt: s.label,
													width: 1024,
													height: 768,
													loading: "lazy",
													className: "h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
												}),
												/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy-deep/50 to-transparent" }),
												/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-brand-navy-deep/25 group-hover:bg-brand-navy-deep/10 transition-colors duration-500" }),
												/* @__PURE__ */ jsxs("span", {
													className: "absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-brand-navy-deep/80 backdrop-blur border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary",
													children: [
														/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" }),
														" ",
														s.tag
													]
												}),
												/* @__PURE__ */ jsx("div", {
													className: "absolute top-4 right-4 h-11 w-11 rounded-xl grid place-items-center bg-gradient-to-br from-primary to-brand-gold text-brand-navy-deep shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.8)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500",
													children: /* @__PURE__ */ jsx(s.icon, {
														className: "h-5 w-5",
														strokeWidth: 2.25
													})
												}),
												/* @__PURE__ */ jsx("h3", {
													className: "absolute left-5 right-5 bottom-4 font-display text-xl font-semibold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]",
													children: s.label
												})
											]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "p-5",
											children: [/* @__PURE__ */ jsx("p", {
												className: "text-sm text-white/70 leading-relaxed min-h-[64px]",
												children: s.desc
											}), /* @__PURE__ */ jsxs("div", {
												className: "mt-4 flex items-center justify-between border-t border-white/10 pt-4",
												children: [/* @__PURE__ */ jsxs("span", {
													className: "inline-flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all duration-300",
													children: ["Learn more ", /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4" })]
												}), /* @__PURE__ */ jsx("span", {
													className: "text-xs uppercase tracking-widest text-white/45 group-hover:text-white transition",
													children: "Details"
												})]
											})]
										}),
										/* @__PURE__ */ jsx("span", { className: "pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-primary via-brand-gold to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" })
									]
								}, s.slug))
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx(FooterCTA, {}),
			/* @__PURE__ */ jsxs("section", {
				className: "relative overflow-hidden bg-brand-navy-deep text-white py-24",
				children: [
					/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-40 -right-32 h-96 w-96 rounded-full bg-primary/15 blur-3xl" }),
					/* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/10 blur-3xl" }),
					/* @__PURE__ */ jsxs("div", {
						className: "relative mx-auto max-w-7xl px-4 md:px-6",
						children: [
							/* @__PURE__ */ jsxs("p", {
								className: "text-primary font-semibold text-sm flex items-center gap-2 tracking-widest",
								children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-primary shadow-[0_0_12px_hsl(var(--primary))]" }), "OUR TECHNOLOGY PORTFOLIO"]
							}),
							/* @__PURE__ */ jsxs("h2", {
								className: "mt-3 font-display text-3xl md:text-5xl font-bold leading-tight max-w-4xl",
								children: [
									"Types of",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "bg-gradient-to-r from-primary via-brand-gold to-primary bg-clip-text text-transparent",
										children: "Solar Technologies"
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-white/65 max-w-3xl text-base leading-relaxed",
								children: "At Flash Renewable Energy Solutions Pvt Ltd, we provide a diverse portfolio of solar and hybrid technologies tailored to meet residential, commercial, industrial, and utility-scale needs. Each technology is designed to balance efficiency, cost, and sustainability."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-12 grid grid-cols-1 lg:grid-cols-2 gap-4 items-start",
								children: solarTechs.map((tech) => /* @__PURE__ */ jsx(TechCard, { tech }, tech.name))
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-16",
								children: [/* @__PURE__ */ jsxs("h3", {
									className: "font-display text-2xl md:text-3xl font-bold text-white mb-6",
									children: [
										"Additional",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "bg-gradient-to-r from-primary to-brand-gold bg-clip-text text-transparent",
											children: "Innovations"
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "grid grid-cols-1 sm:grid-cols-2 gap-5",
									children: innovations.map((item) => /* @__PURE__ */ jsxs("div", {
										className: "rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 flex gap-4 hover:border-primary/40 transition-colors duration-300",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-4xl leading-none",
											children: item.emoji
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
											className: "font-semibold text-white text-lg mb-1",
											children: item.title
										}), /* @__PURE__ */ jsx("p", {
											className: "text-white/65 text-sm leading-relaxed",
											children: item.desc
										})] })]
									}, item.title))
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-16",
								children: [/* @__PURE__ */ jsxs("h3", {
									className: "font-display text-2xl md:text-3xl font-bold text-white mb-6",
									children: [
										"Applications Across",
										" ",
										/* @__PURE__ */ jsx("span", {
											className: "bg-gradient-to-r from-primary to-brand-gold bg-clip-text text-transparent",
											children: "Sectors"
										})
									]
								}), /* @__PURE__ */ jsx("div", {
									className: "overflow-hidden rounded-2xl border border-white/10",
									children: sectorApplications.map((row, i) => /* @__PURE__ */ jsxs("div", {
										className: `flex flex-col sm:flex-row gap-2 sm:gap-6 px-6 py-4 ${i % 2 === 0 ? "bg-white/[0.03]" : "bg-white/[0.065]"} border-b border-white/10 last:border-b-0`,
										children: [/* @__PURE__ */ jsx("span", {
											className: "min-w-[200px] font-semibold text-primary text-sm uppercase tracking-widest",
											children: row.sector
										}), /* @__PURE__ */ jsx("span", {
											className: "text-white/70 text-sm leading-relaxed",
											children: row.apps
										})]
									}, row.sector))
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
export { ServicesPage as component };
