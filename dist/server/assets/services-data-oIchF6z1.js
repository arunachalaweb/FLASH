import { n as project_industrial_default, r as project_commercial_default, t as project_utility_default } from "./project-utility-CoJD2s69.js";
import { t as project_residential_default } from "./project-residential-BUNYnuq8.js";
import { BatteryCharging, Building2, Droplets, Factory, Home, Lightbulb, Sun, Wrench } from "lucide-react";
//#region src/assets/service-epc.jpg
var service_epc_default = "/assets/service-epc-CBLGbHY4.jpg";
//#endregion
//#region src/assets/service-rooftop.jpg
var service_rooftop_default = "/assets/service-rooftop-CRIK4ilP.jpg";
//#endregion
//#region src/assets/service-ground.jpg
var service_ground_default = "/assets/service-ground-gd0JK-Jb.jpg";
//#endregion
//#region src/assets/service-industrial.jpg
var service_industrial_default = "/assets/service-industrial-CWfGS4dZ.jpg";
//#endregion
//#region src/assets/service-pump.jpg
var service_pump_default = "/assets/service-pump-DkKK3d5w.jpg";
//#endregion
//#region src/assets/service-street.jpg
var service_street_default = "/assets/service-street-DKI3JlWO.jpg";
//#endregion
//#region src/assets/service-battery.jpg
var service_battery_default = "/assets/service-battery-PmMY6z7N.jpg";
//#endregion
//#region src/assets/service-om.jpg
var service_om_default = "/assets/service-om-DWagKCiw.jpg";
//#endregion
//#region src/assets/hero-1.jpg
var hero_1_default = "/assets/hero-1-BkzO-lr0.jpg";
//#endregion
//#region src/assets/hero-2.jpg
var hero_2_default = "/assets/hero-2-BYbGfj6d.jpg";
//#endregion
//#region src/assets/hero-3.jpg
var hero_3_default = "/assets/hero-3-wqFfPd7k.jpg";
//#endregion
//#region src/assets/solar-house-3d.jpg
var solar_house_3d_default = "/assets/solar-house-3d-CzI0yom9.jpg";
//#endregion
//#region src/lib/services-data.ts
var services = [
	{
		slug: "solar-epc",
		icon: Sun,
		label: "Solar EPC",
		tag: "Turnkey",
		desc: "End-to-end engineering, procurement and commissioning for turnkey solar plants of any scale.",
		image: service_epc_default,
		intro: "A single accountable partner for the full EPC lifecycle — from feasibility to commissioning and grid handover.",
		overview: [
			"Flash delivers turnkey solar EPC projects across residential, commercial, industrial and utility segments. Our in-house engineering, procurement and construction teams work as one — compressing timelines and eliminating hand-off risk.",
			"Every plant is engineered for maximum lifetime yield with Tier-1 modules, best-in-class inverters and MNRE-compliant BoS. We deliver documented performance guarantees and a clear ROI model before you sign.",
			"From single-point liability to a signed 25-year performance warranty, our EPC contracts are built to protect your capital and de-risk your renewable transition."
		],
		features: [
			"Feasibility studies, energy audits and shadow analysis",
			"Structural, electrical and SLD engineering (PVsyst / AutoCAD)",
			"Tier-1 module and inverter procurement at scale",
			"DISCOM liaison, net-metering and CEIG approvals",
			"Grid synchronisation and performance testing",
			"Post-commissioning O&M and remote monitoring"
		],
		benefits: [
			{
				title: "Single-point accountability",
				desc: "One contract, one team, one signature — no vendor finger-pointing."
			},
			{
				title: "Bankable engineering",
				desc: "PVsyst-modelled yield reports accepted by every major Indian lender."
			},
			{
				title: "Faster commissioning",
				desc: "Parallel engineering and procurement compress schedules by up to 30%."
			},
			{
				title: "Performance guaranteed",
				desc: "Written PR guarantee with liquidated damages if we miss the number."
			}
		],
		process: [
			{
				title: "Site Assessment",
				desc: "Free site visit, load audit and shadow analysis."
			},
			{
				title: "Engineering Design",
				desc: "Detailed PVsyst simulation and SLD drawings."
			},
			{
				title: "Procurement",
				desc: "Tier-1 components sourced through direct OEM tie-ups."
			},
			{
				title: "Installation",
				desc: "Certified crews with strict QA/QC at every milestone."
			},
			{
				title: "Commissioning",
				desc: "Grid sync, DISCOM handover and PR testing."
			}
		],
		specs: [
			{
				label: "Capacity",
				value: "3 kW – 10 MW+"
			},
			{
				label: "Warranty",
				value: "25 yrs modules / 10 yrs inverter"
			},
			{
				label: "Delivery",
				value: "30–120 days"
			},
			{
				label: "Payback",
				value: "3–5 years"
			}
		],
		techStack: [
			"Tier-1 mono-PERC / TOPCon modules",
			"String & central inverters (Sungrow, SMA, Solis)",
			"Hot-dip galvanised MMS",
			"PVsyst / AutoCAD / ETAP",
			"SCADA & IoT monitoring"
		],
		caseStudy: {
			title: "1.2 MW captive rooftop plant",
			location: "Tamil Nadu textile mill",
			capacity: "1.2 MW dc",
			result: "42% grid offset achieved in year one — 3.6 year payback with accelerated depreciation."
		},
		faqs: [
			{
				q: "How long does an EPC project take?",
				a: "Small rooftop plants ship in 30–45 days; MW-scale ground-mount typically takes 90–120 days from contract signing."
			},
			{
				q: "Do you handle DISCOM and CEIG approvals?",
				a: "Yes — end-to-end. Our liaison team handles all paperwork, drawings and inspections until you receive your net-meter."
			},
			{
				q: "What kind of performance guarantee do you offer?",
				a: "A written PR guarantee for the first 5 years with liquidated damages if the plant underperforms the modelled generation."
			}
		],
		gallery: [
			service_epc_default,
			hero_1_default,
			project_utility_default,
			hero_3_default,
			project_industrial_default,
			solar_house_3d_default
		]
	},
	{
		slug: "rooftop-solar",
		icon: Home,
		label: "Rooftop Solar",
		tag: "Residential",
		desc: "Grid-tied rooftop systems for homes and villas with net-metering and monitoring.",
		image: service_rooftop_default,
		intro: "Cut your monthly electricity bill by up to 90% with a certified rooftop solar system.",
		overview: [
			"Our residential rooftop solutions are designed for Indian homes — engineered to withstand wind loads, monsoon and dust while maximising generation. We handle DISCOM approvals, net-metering and subsidy paperwork end-to-end.",
			"Every home gets a mobile app to monitor daily generation, savings and CO₂ offset in real time.",
			"From 1 kW starter kits to 25 kW villa systems, Flash rooftop solar pays for itself in under 5 years and keeps generating for 25."
		],
		features: [
			"1 kW – 25 kW grid-tied rooftop systems",
			"MNRE-listed Tier-1 mono-PERC / TOPCon modules",
			"Cyclone-rated GI mounting structures",
			"Free subsidy processing (up to ₹78,000)",
			"Net-metering with DISCOM approval",
			"Live mobile monitoring app"
		],
		benefits: [
			{
				title: "Up to 90% bill savings",
				desc: "Zero to near-zero electricity bills from month one."
			},
			{
				title: "Government subsidy",
				desc: "PM Surya Ghar subsidy up to ₹78,000 — processed by us."
			},
			{
				title: "25-year warranty",
				desc: "Long-life mono-PERC modules with linear power warranty."
			},
			{
				title: "Boost resale value",
				desc: "Rooftop solar adds 3–5% to your property's market value."
			}
		],
		process: [
			{
				title: "Free Site Visit",
				desc: "Roof survey and shadow mapping within 48 hrs."
			},
			{
				title: "Custom Proposal",
				desc: "Detailed savings and ROI report."
			},
			{
				title: "Approvals",
				desc: "We file DISCOM and subsidy paperwork."
			},
			{
				title: "Installation",
				desc: "2–5 day install with zero disruption."
			},
			{
				title: "Handover",
				desc: "Net-meter installed, app configured, 25-yr support."
			}
		],
		specs: [
			{
				label: "Capacity",
				value: "1 kW – 25 kW"
			},
			{
				label: "Subsidy",
				value: "Up to ₹78,000"
			},
			{
				label: "Install time",
				value: "2–5 days"
			},
			{
				label: "Bill savings",
				value: "Up to 90%"
			}
		],
		techStack: [
			"Mono-PERC 550 Wp+ modules",
			"String inverters (Deye, Growatt, Solis)",
			"Cyclone-rated GI structures",
			"Bi-directional net-meter",
			"Cloud monitoring app"
		],
		caseStudy: {
			title: "10 kW villa rooftop",
			location: "Chennai residential home",
			capacity: "10 kW",
			result: "Monthly bill dropped from ₹12,000 to ₹250 — payback in 4.2 years after subsidy."
		},
		faqs: [
			{
				q: "Am I eligible for the PM Surya Ghar subsidy?",
				a: "Every residential home in India with a valid electricity connection is eligible. We handle the full application process."
			},
			{
				q: "Will my roof leak after installation?",
				a: "No. We use non-penetrating ballast or engineered mounts with waterproof sealing — with a workmanship warranty."
			},
			{
				q: "What happens on cloudy days?",
				a: "Grid-tied systems seamlessly draw from the grid when solar output is low, so you never lose power."
			}
		],
		gallery: [
			service_rooftop_default,
			solar_house_3d_default,
			project_residential_default,
			hero_2_default,
			hero_1_default,
			project_commercial_default
		]
	},
	{
		slug: "ground-mounted",
		icon: Factory,
		label: "Ground-Mounted",
		tag: "Utility",
		desc: "MW-scale ground arrays with structural design, trackers and grid synchronisation.",
		image: service_ground_default,
		intro: "Utility-scale ground-mounted solar farms engineered for maximum land productivity.",
		overview: [
			"We design and build MW-scale ground-mount plants with fixed-tilt or single-axis tracker systems — optimising GCR, string layout and land usage for the best LCOE.",
			"From CTU/STU liaison to substation integration, Flash delivers plants ready for open-access or PPA offtake.",
			"Our EPC-plus-O&M model means the same team that builds your plant runs it — with skin in the game for every year of the 25-year life."
		],
		features: [
			"500 kW – 10 MW+ utility plants",
			"Fixed-tilt & single-axis tracker options",
			"Geotech survey and pile foundation design",
			"Central & string inverter architecture",
			"33/66 kV substation and evacuation",
			"SCADA and remote plant monitoring"
		],
		benefits: [
			{
				title: "Lowest LCOE",
				desc: "Optimised GCR and tracker choice cuts levelised cost by 10–15%."
			},
			{
				title: "Bankable structure",
				desc: "PPA, group-captive and open-access ready — lender approved."
			},
			{
				title: "Land-agnostic design",
				desc: "Solutions for undulating, saline and low-bearing soils."
			},
			{
				title: "Fast evacuation",
				desc: "In-house HT / substation team commissions grid tie-ins in weeks, not months."
			}
		],
		process: [
			{
				title: "Land Study",
				desc: "Topography, soil and irradiance analysis."
			},
			{
				title: "PPA / OA Strategy",
				desc: "Open-access, group captive or PPA modelling."
			},
			{
				title: "Detailed Engineering",
				desc: "PVsyst yield, GCR and BoS optimisation."
			},
			{
				title: "Construction",
				desc: "Foundation, module mounting, cabling, HT works."
			},
			{
				title: "Grid Sync",
				desc: "STU/CTU approval and commissioning."
			}
		],
		specs: [
			{
				label: "Capacity",
				value: "500 kW – 10 MW+"
			},
			{
				label: "Type",
				value: "Fixed-tilt / Tracker"
			},
			{
				label: "Delivery",
				value: "4–9 months"
			},
			{
				label: "PR",
				value: "80%+ guaranteed"
			}
		],
		techStack: [
			"Bifacial 600 Wp+ modules",
			"Single-axis trackers (NEXTracker / Arctech)",
			"Central inverters 1500 V dc",
			"33/66 kV GIS substation",
			"Fibre + wireless SCADA"
		],
		caseStudy: {
			title: "5 MW open-access solar farm",
			location: "Karnataka wheeling site",
			capacity: "5 MW ac",
			result: "PR of 82.4% in year one — 6% above lender base case; open-access tariff locked for 25 years."
		},
		faqs: [
			{
				q: "How much land do I need per MW?",
				a: "Roughly 4–5 acres per MW for fixed-tilt and 5–6 acres for single-axis trackers, depending on latitude."
			},
			{
				q: "Do you handle PPA and open-access approvals?",
				a: "Yes — our commercial team structures, files and closes PPA and OA agreements with DISCOMs and off-takers."
			},
			{
				q: "What financing options do you support?",
				a: "Debt through IREDA, PSU and NBFC lenders, plus RESCO, BOOT and group-captive equity models."
			}
		],
		gallery: [
			service_ground_default,
			project_utility_default,
			hero_3_default,
			hero_1_default,
			project_industrial_default,
			service_epc_default
		]
	},
	{
		slug: "industrial-solar",
		icon: Building2,
		label: "Industrial Solar",
		tag: "C&I",
		desc: "Captive plants for factories and warehouses — HT integration and peak load offset.",
		image: service_industrial_default,
		intro: "Slash your industrial power bill and hedge against tariff hikes with captive solar.",
		overview: [
			"Our C&I solutions serve factories, warehouses, cold storage and data centres — with HT-side integration, peak-demand offset and open-access enablement.",
			"We deliver CAPEX, OPEX and RESCO models to match your CFO's balance-sheet strategy.",
			"Every industrial installation is engineered around your load curve and shift pattern — maximising self-consumption and minimising grid dependency."
		],
		features: [
			"100 kW – 5 MW captive plants",
			"HT / LT integration with load synchronisation",
			"Peak-demand and MD reduction analysis",
			"CAPEX, OPEX and RESCO commercial models",
			"Open-access and group-captive structuring",
			"ISO 14001 & IEC compliant engineering"
		],
		benefits: [
			{
				title: "Hedge tariff hikes",
				desc: "Lock 25-year power cost against 5–8% annual DISCOM inflation."
			},
			{
				title: "Tax benefits",
				desc: "80% accelerated depreciation in year one under Section 32."
			},
			{
				title: "ESG & RE100 credits",
				desc: "Reportable Scope 2 emissions reduction and green-power certification."
			},
			{
				title: "Zero downtime install",
				desc: "Weekend and shutdown-window cutovers with zero production impact."
			}
		],
		process: [
			{
				title: "Energy Audit",
				desc: "Load profile, tariff and demand analysis."
			},
			{
				title: "Commercial Model",
				desc: "CAPEX vs OPEX vs RESCO evaluation."
			},
			{
				title: "Engineering",
				desc: "HT single-line, protection and metering design."
			},
			{
				title: "Execution",
				desc: "Zero-disruption install with weekend cutovers."
			},
			{
				title: "O&M",
				desc: "24×7 SCADA monitoring and preventive AMC."
			}
		],
		specs: [
			{
				label: "Capacity",
				value: "100 kW – 5 MW"
			},
			{
				label: "Models",
				value: "CAPEX / OPEX / RESCO"
			},
			{
				label: "Bill offset",
				value: "Up to 70%"
			},
			{
				label: "Payback",
				value: "3–4 years"
			}
		],
		techStack: [
			"N-type TOPCon modules",
			"String inverters (Sungrow SG, Huawei)",
			"HT synchronisation panels",
			"Reverse-power relays",
			"IoT energy dashboards"
		],
		caseStudy: {
			title: "800 kW HT captive plant",
			location: "Andhra Pradesh auto-component factory",
			capacity: "800 kW dc",
			result: "68% daytime load offset, ₹1.4 crore annual savings, 3.1-year payback with AD benefit."
		},
		faqs: [
			{
				q: "CAPEX or OPEX — which is better?",
				a: "CAPEX suits companies with tax appetite (AD benefit); OPEX / RESCO suits those wanting zero investment with locked per-unit tariff."
			},
			{
				q: "Will solar affect my HT connection?",
				a: "No — we design reverse-power protection and synchronisation panels certified by every major DISCOM."
			},
			{
				q: "Can we scale up later?",
				a: "Yes — plants are engineered with expandable inverter and cable capacity so future additions are plug-and-play."
			}
		],
		gallery: [
			service_industrial_default,
			project_industrial_default,
			project_commercial_default,
			hero_2_default,
			service_epc_default,
			hero_3_default
		]
	},
	{
		slug: "solar-water-pumping",
		icon: Droplets,
		label: "Solar Water Pumping",
		tag: "Agriculture",
		desc: "MNRE-compliant agricultural and community pump sets with performance guarantee.",
		image: service_pump_default,
		intro: "PM-KUSUM compliant solar pumps that free farmers from diesel and grid uncertainty.",
		overview: [
			"Our solar water pumping systems are MNRE-empanelled and eligible under the PM-KUSUM scheme. We handle vendor listing, subsidy processing and installation across rural India.",
			"Every pump ships with a 5-year comprehensive warranty and remote performance monitoring.",
			"From 1 HP surface pumps to 15 HP AC submersibles, we've deployed thousands of systems across South and Central India — each one saving a farmer from diesel dependency."
		],
		features: [
			"1 HP – 15 HP AC/DC solar pumps",
			"PM-KUSUM Component B / C eligible",
			"MNRE-empanelled controllers and modules",
			"Bore-well, open-well and surface pumps",
			"Remote GPS-based monitoring",
			"5-year comprehensive warranty"
		],
		benefits: [
			{
				title: "Zero diesel",
				desc: "Eliminate ₹30,000+ annual diesel spend per pump."
			},
			{
				title: "60% subsidy",
				desc: "Up to 60% central+state subsidy under PM-KUSUM Component B."
			},
			{
				title: "Daytime irrigation",
				desc: "Reliable water access whenever the sun shines — no grid load-shedding."
			},
			{
				title: "Extra income",
				desc: "Component C variants let you sell surplus power back to the DISCOM."
			}
		],
		process: [
			{
				title: "Beneficiary Enrolment",
				desc: "PM-KUSUM registration support."
			},
			{
				title: "Site Survey",
				desc: "Bore depth, water yield and land audit."
			},
			{
				title: "Subsidy Processing",
				desc: "State + centre subsidy documentation."
			},
			{
				title: "Installation",
				desc: "Complete civil, structural and electrical works."
			},
			{
				title: "Handover",
				desc: "Training, warranty and remote monitoring."
			}
		],
		specs: [
			{
				label: "Capacity",
				value: "1 HP – 15 HP"
			},
			{
				label: "Subsidy",
				value: "Up to 60% (PM-KUSUM)"
			},
			{
				label: "Warranty",
				value: "5 years"
			},
			{
				label: "Payback",
				value: "2–3 years"
			}
		],
		techStack: [
			"Mono-PERC modules",
			"VFD-based AC pump controllers",
			"SS304 submersible pump-sets",
			"GI mounting with tracker option",
			"GSM-based remote monitoring"
		],
		caseStudy: {
			title: "5 HP AC submersible cluster",
			location: "24 farms, Andhra Pradesh",
			capacity: "5 HP × 24 pumps",
			result: "Diesel-free irrigation across 220 acres — ₹8 lakh annual community savings."
		},
		faqs: [
			{
				q: "Who is eligible for PM-KUSUM?",
				a: "Any farmer or FPO with agricultural land and a water source is eligible. We assist with land docs and registration."
			},
			{
				q: "How much water can a solar pump deliver?",
				a: "A 5 HP pump lifts around 40,000–60,000 litres per sunny day from 60 m — enough for 2 acres of drip-irrigated crops."
			},
			{
				q: "What if there is no sun?",
				a: "Systems are sized with autonomy buffer and water storage — for critical use, we add a hybrid grid backup mode."
			}
		],
		gallery: [
			service_pump_default,
			hero_2_default,
			hero_1_default,
			service_ground_default,
			project_residential_default,
			hero_3_default
		]
	},
	{
		slug: "street-lighting",
		icon: Lightbulb,
		label: "Street Lighting",
		tag: "Public",
		desc: "Standalone LED solar street lighting systems for townships, campuses and highways.",
		image: service_street_default,
		intro: "All-in-one solar LED street lights with dusk-to-dawn autonomy.",
		overview: [
			"Our integrated solar street lights combine mono-PERC modules, LiFePO₄ batteries and smart controllers into a single weatherproof unit — perfect for townships, highways, industrial estates and gram panchayats.",
			"Motion-sensing and dusk-to-dawn operation deliver 3-night battery autonomy with zero grid dependency.",
			"MNRE-certified luminaires with 5-year battery life and 25-year module warranty make lifetime cost dramatically lower than grid-tied poles."
		],
		features: [
			"12 W – 60 W integrated LED luminaires",
			"LiFePO₄ battery with 5-yr life",
			"Motion sensor + dusk-to-dawn auto operation",
			"IP66 weatherproof housing",
			"3-night autonomy backup",
			"GI galvanised poles with foundation"
		],
		benefits: [
			{
				title: "Zero electricity bill",
				desc: "Fully off-grid — no meter, no monthly cost."
			},
			{
				title: "Smart dimming",
				desc: "Motion sensors dim to 30% between activity — extending battery life."
			},
			{
				title: "Rapid deployment",
				desc: "Pole-and-play install in remote areas without trenching or wiring."
			},
			{
				title: "MNRE certified",
				desc: "Eligible for gram-panchayat and municipal procurement schemes."
			}
		],
		process: [
			{
				title: "Site Design",
				desc: "Pole spacing and lumen mapping."
			},
			{
				title: "Approvals",
				desc: "PWD / municipal clearance support."
			},
			{
				title: "Supply",
				desc: "Poles, luminaires and hardware kits."
			},
			{
				title: "Installation",
				desc: "Foundation, erection and commissioning."
			},
			{
				title: "AMC",
				desc: "Annual maintenance and battery health checks."
			}
		],
		specs: [
			{
				label: "Wattage",
				value: "12 W – 60 W LED"
			},
			{
				label: "Autonomy",
				value: "3 nights"
			},
			{
				label: "Battery",
				value: "LiFePO₄, 5-yr life"
			},
			{
				label: "IP rating",
				value: "IP66"
			}
		],
		techStack: [
			"Bridgelux / Osram LED chips",
			"LiFePO₄ 12.8 V batteries",
			"MPPT + PIR smart controllers",
			"6 m/9 m GI galvanised poles",
			"IP66 die-cast aluminium housing"
		],
		caseStudy: {
			title: "180-pole highway illumination",
			location: "Tamil Nadu district highway",
			capacity: "40 W × 180 poles",
			result: "Zero grid dependency, ₹18 lakh annual electricity saving vs conventional LED poles."
		},
		faqs: [
			{
				q: "How long do the batteries last?",
				a: "LiFePO₄ batteries deliver 2000+ cycles — typically 5 years before replacement."
			},
			{
				q: "What if it rains for a week?",
				a: "3-night autonomy handles most monsoons; controllers dim automatically to extend runtime further."
			},
			{
				q: "Do you offer AMC?",
				a: "Yes — annual AMC covers cleaning, battery health checks and free luminaire replacement in year one."
			}
		],
		gallery: [
			service_street_default,
			hero_1_default,
			hero_3_default,
			project_commercial_default,
			service_epc_default,
			hero_2_default
		]
	},
	{
		slug: "battery-storage",
		icon: BatteryCharging,
		label: "Battery Storage",
		tag: "BESS",
		desc: "Lithium BESS solutions for backup, peak shaving and hybrid firm renewable delivery.",
		image: service_battery_default,
		intro: "Lithium-ion BESS for backup, peak-shaving and firm renewable delivery.",
		overview: [
			"Flash designs and integrates lithium-ion Battery Energy Storage Systems (BESS) — from home hybrids to MWh-scale firm-power projects.",
			"Our systems use LFP chemistry with cloud-based BMS, thermal management and grid-forming inverters for round-the-clock renewable delivery.",
			"From residential 10 kWh hybrids to utility-scale MWh containers, every BESS we deploy is built for 6,000+ cycles and 10-year performance warranty."
		],
		features: [
			"5 kWh – 5 MWh scalable systems",
			"LFP (LiFePO₄) chemistry",
			"Cloud BMS with cell-level analytics",
			"Grid-forming hybrid inverters",
			"Peak-shaving and demand-response ready",
			"Fire suppression and thermal control"
		],
		benefits: [
			{
				title: "24×7 renewable",
				desc: "Shift solar generation into the evening peak — true green baseload."
			},
			{
				title: "Peak-shaving ROI",
				desc: "Cut MD charges by 20–40% for commercial and industrial consumers."
			},
			{
				title: "Blackout immunity",
				desc: "Grid-forming inverters keep critical loads live during outages."
			},
			{
				title: "Modular scalability",
				desc: "Add capacity in 100 kWh increments as your load grows."
			}
		],
		process: [
			{
				title: "Load Study",
				desc: "Backup and peak-shaving analysis."
			},
			{
				title: "System Sizing",
				desc: "kWh, C-rate and inverter matching."
			},
			{
				title: "Engineering",
				desc: "Enclosure, HVAC and safety design."
			},
			{
				title: "Installation",
				desc: "Turnkey civil, mechanical and electrical."
			},
			{
				title: "Monitoring",
				desc: "24×7 remote BMS and analytics."
			}
		],
		specs: [
			{
				label: "Capacity",
				value: "5 kWh – 5 MWh"
			},
			{
				label: "Chemistry",
				value: "LFP (LiFePO₄)"
			},
			{
				label: "Cycles",
				value: "6,000+ @ 80% DoD"
			},
			{
				label: "Warranty",
				value: "10 years"
			}
		],
		techStack: [
			"CATL / EVE LFP cells",
			"Active-balanced BMS w/ CAN bus",
			"Grid-forming hybrid inverters",
			"Liquid-cooled thermal management",
			"NOVEC 1230 fire suppression"
		],
		caseStudy: {
			title: "500 kWh commercial BESS",
			location: "Bengaluru IT campus",
			capacity: "500 kWh / 250 kW",
			result: "MD reduced 35%, diesel gensets decommissioned — 4.5-year payback on demand-charge savings alone."
		},
		faqs: [
			{
				q: "Why LFP and not NMC?",
				a: "LFP offers 3× the cycle life, better thermal safety and lower cost — ideal for stationary storage."
			},
			{
				q: "Can BESS pair with existing solar?",
				a: "Yes — we retrofit AC-coupled BESS to any existing solar plant without rewiring the array."
			},
			{
				q: "What's the round-trip efficiency?",
				a: "Typical system RTE is 90–92% including inverter and auxiliary losses."
			}
		],
		gallery: [
			service_battery_default,
			service_industrial_default,
			hero_3_default,
			project_industrial_default,
			hero_1_default,
			service_epc_default
		]
	},
	{
		slug: "om-amc",
		icon: Wrench,
		label: "O&M / AMC",
		tag: "Support",
		desc: "Preventive maintenance and 24×7 remote monitoring to protect your plant's yield.",
		image: service_om_default,
		intro: "Protect your plant's yield with expert O&M and 24×7 remote monitoring.",
		overview: [
			"Solar plants can lose 10-25% output without proper O&M. Our AMC packages combine scheduled preventive maintenance, thermal imaging, module cleaning and 24×7 SCADA monitoring.",
			"We service plants built by any EPC — with SLA-backed uptime and yield guarantees.",
			"From single-rooftop AMCs to portfolio-wide O&M contracts across multiple states, our field engineers operate under strict ISO-aligned processes."
		],
		features: [
			"24×7 remote monitoring & SCADA",
			"Scheduled module cleaning cycles",
			"Thermal imaging & IV-curve testing",
			"Preventive & breakdown maintenance",
			"Inverter health & firmware management",
			"Monthly PR & yield reports"
		],
		benefits: [
			{
				title: "Yield protection",
				desc: "Recover 8–15% generation loss from soiling, hotspots and inverter derating."
			},
			{
				title: "SLA-backed uptime",
				desc: "Guaranteed <24 hr breakdown response with financial penalties on miss."
			},
			{
				title: "Predictive alerts",
				desc: "AI-based analytics flag underperforming strings before yield drops."
			},
			{
				title: "Vendor-agnostic",
				desc: "We service plants built by any EPC — no lock-in, no exclusivity."
			}
		],
		process: [
			{
				title: "Audit",
				desc: "Baseline plant health and yield audit."
			},
			{
				title: "AMC Plan",
				desc: "Custom SLA with response commitments."
			},
			{
				title: "Monitoring Setup",
				desc: "SCADA integration and dashboards."
			},
			{
				title: "Preventive M&",
				desc: "Scheduled cleaning, inspection and testing."
			},
			{
				title: "Reporting",
				desc: "Monthly PR and yield reports."
			}
		],
		specs: [
			{
				label: "Response SLA",
				value: "< 24 hours"
			},
			{
				label: "Uptime",
				value: "99%+ guaranteed"
			},
			{
				label: "Cleaning",
				value: "Monthly / bi-monthly"
			},
			{
				label: "Monitoring",
				value: "24×7 SCADA"
			}
		],
		techStack: [
			"FLIR thermal cameras",
			"Seaward PV200 IV-curve tracer",
			"Robotic dry cleaning bots",
			"Cloud SCADA (Modbus / IEC-61850)",
			"AI performance analytics"
		],
		caseStudy: {
			title: "12 MW portfolio O&M",
			location: "6 sites across Tamil Nadu",
			capacity: "12 MW aggregate",
			result: "Portfolio PR restored from 74% to 82% within 6 months — additional 1.1M kWh generated annually."
		},
		faqs: [
			{
				q: "Can you take over an existing plant?",
				a: "Yes — most of our AMCs are takeovers. We start with a baseline audit and remediation plan."
			},
			{
				q: "What's the ideal cleaning frequency?",
				a: "Every 30–45 days for most Indian sites; every 15 days for dusty regions like Rajasthan and Gujarat."
			},
			{
				q: "Do you cover inverter replacement?",
				a: "Comprehensive AMC includes labour for inverter swap; parts are covered under OEM warranty for the first 5-10 years."
			}
		],
		gallery: [
			service_om_default,
			service_industrial_default,
			project_utility_default,
			hero_2_default,
			service_epc_default,
			hero_1_default
		]
	}
];
function getService(slug) {
	return services.find((s) => s.slug === slug);
}
//#endregion
export { hero_2_default as a, hero_3_default as i, services as n, solar_house_3d_default as r, getService as t };
