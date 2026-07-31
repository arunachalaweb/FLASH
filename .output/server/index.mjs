globalThis.__nitro_main__ = import.meta.url;
import { a as toEventHandler, c as serve, i as defineLazyEventHandler, n as HTTPError, r as defineHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon-flash.png": {
		"type": "image/png",
		"etag": "\"763d-32pQuAru7j8btLPuxsvBRqNryA8\"",
		"mtime": "2026-07-29T08:21:29.490Z",
		"size": 30269,
		"path": "../public/favicon-flash.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"16-iUOtJ2RsHfdY9DoQxaq0wz1LZCU\"",
		"mtime": "2026-07-29T08:21:29.502Z",
		"size": 22,
		"path": "../public/robots.txt"
	},
	"/assets/about-BLAJk6qC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c4e-qQNrsNR8O3FU53Y6+QXdUMr8daU\"",
		"mtime": "2026-07-31T18:35:02.570Z",
		"size": 11342,
		"path": "../public/assets/about-BLAJk6qC.js"
	},
	"/assets/about-engineers-DtZymbQi.jpg": {
		"type": "image/jpeg",
		"etag": "\"1770b-4PLRLUt+l0bLiam49pLJmocIU1Q\"",
		"mtime": "2026-07-31T18:35:02.582Z",
		"size": 96011,
		"path": "../public/assets/about-engineers-DtZymbQi.jpg"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"763d-32pQuAru7j8btLPuxsvBRqNryA8\"",
		"mtime": "2026-07-29T08:21:29.496Z",
		"size": 30269,
		"path": "../public/favicon.png"
	},
	"/assets/about-engineers-BTMOcvoU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-b5BAhwCS+t14wynTBPiYchQvr5o\"",
		"mtime": "2026-07-31T18:35:02.570Z",
		"size": 290,
		"path": "../public/assets/about-engineers-BTMOcvoU.js"
	},
	"/assets/AdminCrud-BIJh_LdV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2528-yq6hTuamtozK4l2dVMApwNi8QTc\"",
		"mtime": "2026-07-31T18:35:02.568Z",
		"size": 9512,
		"path": "../public/assets/AdminCrud-BIJh_LdV.js"
	},
	"/assets/chevron-right-D4HfA_sX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-F+2/wx63MFAMAW7wI8WaIxxkGIQ\"",
		"mtime": "2026-07-31T18:35:02.570Z",
		"size": 130,
		"path": "../public/assets/chevron-right-D4HfA_sX.js"
	},
	"/assets/circle-alert-VwI0JIJM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-nfO4cNYRbfLct3WBB/nCUXgfqYY\"",
		"mtime": "2026-07-31T18:35:02.571Z",
		"size": 250,
		"path": "../public/assets/circle-alert-VwI0JIJM.js"
	},
	"/assets/clock-C7buPgvu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-pq5aP8GX+4ARjBTg6J3Z0bwOvLY\"",
		"mtime": "2026-07-31T18:35:02.571Z",
		"size": 169,
		"path": "../public/assets/clock-C7buPgvu.js"
	},
	"/assets/cms.faqs-DZVGIFXS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe-Vs/eAEoIRWF4a8V+M1ydK5OresI\"",
		"mtime": "2026-07-31T18:35:02.571Z",
		"size": 766,
		"path": "../public/assets/cms.faqs-DZVGIFXS.js"
	},
	"/assets/cms.pages-V3VDGGBM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35a-m7WwJIOpd7CHmDqxy0AFtEMVKwA\"",
		"mtime": "2026-07-31T18:35:02.571Z",
		"size": 858,
		"path": "../public/assets/cms.pages-V3VDGGBM.js"
	},
	"/assets/cms.services-DxEPUNF-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44b-aZLDtgb+/kbbw1rOqwogArGFdBo\"",
		"mtime": "2026-07-31T18:35:02.571Z",
		"size": 1099,
		"path": "../public/assets/cms.services-DxEPUNF-.js"
	},
	"/assets/cms.projects-NB5bKfk5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d0-Qe/m1T1beTXLh0L/slBO7p/x2AA\"",
		"mtime": "2026-07-31T18:35:02.571Z",
		"size": 2512,
		"path": "../public/assets/cms.projects-NB5bKfk5.js"
	},
	"/assets/cms.slides-BmFm3ZOr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47c-584mRyKulMFfSfcJo1qCC5fTgQg\"",
		"mtime": "2026-07-31T18:35:02.572Z",
		"size": 1148,
		"path": "../public/assets/cms.slides-BmFm3ZOr.js"
	},
	"/assets/ContactForm-CD7KsEk_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22d3-GWFjW3qarN67EQlKL6k/nH0IuGE\"",
		"mtime": "2026-07-31T18:35:02.568Z",
		"size": 8915,
		"path": "../public/assets/ContactForm-CD7KsEk_.js"
	},
	"/assets/admin-fPcp9X83.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68ded-IQDIWHIGOYOTYDDo0idXMSG8Ioo\"",
		"mtime": "2026-07-31T18:35:02.570Z",
		"size": 429549,
		"path": "../public/assets/admin-fPcp9X83.js"
	},
	"/assets/cms.testimonials-BlsKTIPd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37e-+j0HXjdKXM0OS/iaKoZoO6vRRsI\"",
		"mtime": "2026-07-31T18:35:02.572Z",
		"size": 894,
		"path": "../public/assets/cms.testimonials-BlsKTIPd.js"
	},
	"/assets/createLucideIcon-CWahulxJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124b-f31ZOMl7pMKY/PqWkFAS64yzqQ8\"",
		"mtime": "2026-07-31T18:35:02.572Z",
		"size": 4683,
		"path": "../public/assets/createLucideIcon-CWahulxJ.js"
	},
	"/assets/contact-DWxd9Bio.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da6-9thFIdB4an+H7y0ugf0bALDrMeA\"",
		"mtime": "2026-07-31T18:35:02.572Z",
		"size": 3494,
		"path": "../public/assets/contact-DWxd9Bio.js"
	},
	"/assets/enquiries.contact-CNTBQ2Ff.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"81f-gjTeqNscq6373m7HFrRMUQLNbbY\"",
		"mtime": "2026-07-31T18:35:02.572Z",
		"size": 2079,
		"path": "../public/assets/enquiries.contact-CNTBQ2Ff.js"
	},
	"/assets/enquiries.quotes-YlR11I0a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a2-jcpvZL0j0dxIGI8UlqF/5RdDL3k\"",
		"mtime": "2026-07-31T18:35:02.573Z",
		"size": 2466,
		"path": "../public/assets/enquiries.quotes-YlR11I0a.js"
	},
	"/assets/enquiries.subscribers-FkYkS6_v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"292-iBZvwNggbhrAYa2xDD1JPqAO6nY\"",
		"mtime": "2026-07-31T18:35:02.573Z",
		"size": 658,
		"path": "../public/assets/enquiries.subscribers-FkYkS6_v.js"
	},
	"/assets/expertise-B4dlTK6A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e55-YqRrI6LIa7uEMysChY+RzqWLzYo\"",
		"mtime": "2026-07-31T18:35:02.573Z",
		"size": 11861,
		"path": "../public/assets/expertise-B4dlTK6A.js"
	},
	"/assets/file-text-CXPztK78.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-tMA6V8hAsqI4z3+qJAQVJV1pqV0\"",
		"mtime": "2026-07-31T18:35:02.573Z",
		"size": 385,
		"path": "../public/assets/file-text-CXPztK78.js"
	},
	"/assets/flash-logo-updated-CiBXSsp9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f-cQ7hy1e8/6a0hBNupytfjjcWI6o\"",
		"mtime": "2026-07-31T18:35:02.573Z",
		"size": 63,
		"path": "../public/assets/flash-logo-updated-CiBXSsp9.js"
	},
	"/assets/file-pen-BotDdzVo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-eMXbOLJHurru9V6wx+JPfb6tYUc\"",
		"mtime": "2026-07-31T18:35:02.573Z",
		"size": 620,
		"path": "../public/assets/file-pen-BotDdzVo.js"
	},
	"/assets/flash-logo-updated-BVDlTLu6.png": {
		"type": "image/png",
		"etag": "\"185da-bWMPy7xGzGIC2bN0WP0l/m1O67Y\"",
		"mtime": "2026-07-31T18:35:02.585Z",
		"size": 99802,
		"path": "../public/assets/flash-logo-updated-BVDlTLu6.png"
	},
	"/assets/headset-BtyPg_1j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a-00vyaaXU8tEzdYyoEQis0lrJgjM\"",
		"mtime": "2026-07-31T18:35:02.574Z",
		"size": 298,
		"path": "../public/assets/headset-BtyPg_1j.js"
	},
	"/assets/Footer-6NnjdbMT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f98-gbta7M28arg5Nepj1easHGncqZ4\"",
		"mtime": "2026-07-31T18:35:02.569Z",
		"size": 77720,
		"path": "../public/assets/Footer-6NnjdbMT.js"
	},
	"/assets/hero-2-BYbGfj6d.jpg": {
		"type": "image/jpeg",
		"etag": "\"30bed-JgqDdX9eFk17K8cOgnB/owgBo9o\"",
		"mtime": "2026-07-31T18:35:02.586Z",
		"size": 199661,
		"path": "../public/assets/hero-2-BYbGfj6d.jpg"
	},
	"/assets/hero-1-BkzO-lr0.jpg": {
		"type": "image/jpeg",
		"etag": "\"3841f-cKnyK/7Rq3nxeMKJMmLk/Rx378g\"",
		"mtime": "2026-07-31T18:35:02.586Z",
		"size": 230431,
		"path": "../public/assets/hero-1-BkzO-lr0.jpg"
	},
	"/assets/hero-solar-BDBlvGT4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-qQUi3asGwBOs+bJAVYF9MHLB8tQ\"",
		"mtime": "2026-07-31T18:35:02.574Z",
		"size": 55,
		"path": "../public/assets/hero-solar-BDBlvGT4.js"
	},
	"/assets/hero-3-wqFfPd7k.jpg": {
		"type": "image/jpeg",
		"etag": "\"30d9b-2miAMo2KJuiTUiirWIyH6RNyvzU\"",
		"mtime": "2026-07-31T18:35:02.586Z",
		"size": 200091,
		"path": "../public/assets/hero-3-wqFfPd7k.jpg"
	},
	"/assets/hero-solar-BVTPJKHP.jpg": {
		"type": "image/jpeg",
		"etag": "\"32052-vfSj/6gPRrIbGHA6LGXADXo+ysU\"",
		"mtime": "2026-07-31T18:35:02.586Z",
		"size": 204882,
		"path": "../public/assets/hero-solar-BVTPJKHP.jpg"
	},
	"/assets/jsx-runtime-KJkY8l8U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2157-uh2PnvJKYWZAlieFni6eRY8YAVs\"",
		"mtime": "2026-07-31T18:35:02.574Z",
		"size": 8535,
		"path": "../public/assets/jsx-runtime-KJkY8l8U.js"
	},
	"/assets/leaf-5uWwa_nb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e6-LA64hDBGJkQWWhoVdVBKB8smilI\"",
		"mtime": "2026-07-31T18:35:02.574Z",
		"size": 486,
		"path": "../public/assets/leaf-5uWwa_nb.js"
	},
	"/assets/link-DpSk_2iW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112a-IBEHU3z1Wtxp/Vf1IRDQb8FbEGs\"",
		"mtime": "2026-07-31T18:35:02.575Z",
		"size": 4394,
		"path": "../public/assets/link-DpSk_2iW.js"
	},
	"/assets/loader-circle-DMny3bGq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-8P8GElMAwhC19GrMxhUSgD70NXM\"",
		"mtime": "2026-07-31T18:35:02.575Z",
		"size": 144,
		"path": "../public/assets/loader-circle-DMny3bGq.js"
	},
	"/assets/index-BBipfZ2m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5da66-H9al7TFqtVfdY19ieAbfc5yy0tQ\"",
		"mtime": "2026-07-31T18:35:02.568Z",
		"size": 383590,
		"path": "../public/assets/index-BBipfZ2m.js"
	},
	"/assets/log-in-BQqzlL28.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7-UvVoVYL3prX/1NgimeJB9xzSZr8\"",
		"mtime": "2026-07-31T18:35:02.575Z",
		"size": 231,
		"path": "../public/assets/log-in-BQqzlL28.js"
	},
	"/assets/login-DhP0RDP-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f6e-wbEvldwDO+dyPgtoarSC6MkVdNM\"",
		"mtime": "2026-07-31T18:35:02.575Z",
		"size": 12142,
		"path": "../public/assets/login-DhP0RDP-.js"
	},
	"/assets/mail-BS1PrBTz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-rWyvH1DLVgIvUNel9wT7Ih7GG7A\"",
		"mtime": "2026-07-31T18:35:02.575Z",
		"size": 213,
		"path": "../public/assets/mail-BS1PrBTz.js"
	},
	"/assets/matchContext-iPIdbnzn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30a-jVOPhtTEwIrcg1NFFVWyP1L6bkk\"",
		"mtime": "2026-07-31T18:35:02.576Z",
		"size": 778,
		"path": "../public/assets/matchContext-iPIdbnzn.js"
	},
	"/assets/menu-BXvk8Enz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28e-kibpIMkzeF441Z99zgsWyaoEdXk\"",
		"mtime": "2026-07-31T18:35:02.576Z",
		"size": 654,
		"path": "../public/assets/menu-BXvk8Enz.js"
	},
	"/assets/message-square-BIqueKJf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-6DlaCOgltSiiBdiV/uV2NToitfc\"",
		"mtime": "2026-07-31T18:35:02.576Z",
		"size": 233,
		"path": "../public/assets/message-square-BIqueKJf.js"
	},
	"/assets/messages-BbOjF0WL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d3-3XtHjPBM5PU4a3pCdTNIJmdtT5I\"",
		"mtime": "2026-07-31T18:35:02.576Z",
		"size": 5587,
		"path": "../public/assets/messages-BbOjF0WL.js"
	},
	"/solar_panel_s.mp4": {
		"type": "video/mp4",
		"etag": "\"2a38af-87cO3mkyNuGD3vrbJTMa+K510gU\"",
		"mtime": "2026-07-29T08:21:29.529Z",
		"size": 2767023,
		"path": "../public/solar_panel_s.mp4"
	},
	"/assets/newspaper-DMbf_OU6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-oOXvD6/k8uhK4Rxbkd6DIs3zVq8\"",
		"mtime": "2026-07-31T18:35:02.576Z",
		"size": 994,
		"path": "../public/assets/newspaper-DMbf_OU6.js"
	},
	"/assets/project-commercial-c-39UIeu.jpg": {
		"type": "image/jpeg",
		"etag": "\"e581-rkGxepUEfq/CN6uufKKPL2aT6J0\"",
		"mtime": "2026-07-31T18:35:02.586Z",
		"size": 58753,
		"path": "../public/assets/project-commercial-c-39UIeu.jpg"
	},
	"/assets/PageHero-Ef7Zs_VP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c64-ps//BR4v44fgeNaKKxTg8fnRbCQ\"",
		"mtime": "2026-07-31T18:35:02.569Z",
		"size": 3172,
		"path": "../public/assets/PageHero-Ef7Zs_VP.js"
	},
	"/assets/project-residential-Dy4Avjjd.jpg": {
		"type": "image/jpeg",
		"etag": "\"1079d-FU1cmd1TBA5zeWapHOJPDpo0ESg\"",
		"mtime": "2026-07-31T18:35:02.588Z",
		"size": 67485,
		"path": "../public/assets/project-residential-Dy4Avjjd.jpg"
	},
	"/assets/project-industrial-BMMZALi8.jpg": {
		"type": "image/jpeg",
		"etag": "\"25c67-o3OcqxqMkN71gxXpqCbwt/vncYY\"",
		"mtime": "2026-07-31T18:35:02.588Z",
		"size": 154727,
		"path": "../public/assets/project-industrial-BMMZALi8.jpg"
	},
	"/assets/projects-BPRo1QzK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-HBf+nxjoBrIVT+KFHnkBIAVWEaw\"",
		"mtime": "2026-07-31T18:35:02.576Z",
		"size": 994,
		"path": "../public/assets/projects-BPRo1QzK.js"
	},
	"/assets/ProjectsGallery-CqXPwZQt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3691-XZgkV4L4v/tuYkwvP5Fd0uksU7I\"",
		"mtime": "2026-07-31T18:35:02.569Z",
		"size": 13969,
		"path": "../public/assets/ProjectsGallery-CqXPwZQt.js"
	},
	"/assets/quote-DYyKDbEF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba1-mcI4kHW57qt7wGpDPAwun2w0Hc8\"",
		"mtime": "2026-07-31T18:35:02.576Z",
		"size": 2977,
		"path": "../public/assets/quote-DYyKDbEF.js"
	},
	"/assets/project-utility-Bp1PP5W6.jpg": {
		"type": "image/jpeg",
		"etag": "\"27755-k9U7dIXP+ZjgaGkIeGg8jLwPTU4\"",
		"mtime": "2026-07-31T18:35:02.589Z",
		"size": 161621,
		"path": "../public/assets/project-utility-Bp1PP5W6.jpg"
	},
	"/assets/route-C3eziatt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e1f-ke0RJUaTPlxTHNXriCkpnTI3t1w\"",
		"mtime": "2026-07-31T18:35:02.576Z",
		"size": 7711,
		"path": "../public/assets/route-C3eziatt.js"
	},
	"/assets/route-CRhMg658.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-Mg9LtMWCHRKsfL5LeN+nFYTExB4\"",
		"mtime": "2026-07-31T18:35:02.577Z",
		"size": 141,
		"path": "../public/assets/route-CRhMg658.js"
	},
	"/assets/routes-BYEd3yF0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b168-iY/Q915436sqI02bs4I9nVFeSqw\"",
		"mtime": "2026-07-31T18:35:02.577Z",
		"size": 45416,
		"path": "../public/assets/routes-BYEd3yF0.js"
	},
	"/assets/save-4caWAmt7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-a2matxhPQgearC1YrTYqulxXass\"",
		"mtime": "2026-07-31T18:35:02.577Z",
		"size": 327,
		"path": "../public/assets/save-4caWAmt7.js"
	},
	"/assets/search-oeEsuPh2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-4j+mBH08HmklrEU1rYWImF2X+vE\"",
		"mtime": "2026-07-31T18:35:02.578Z",
		"size": 174,
		"path": "../public/assets/search-oeEsuPh2.js"
	},
	"/assets/send-CI_Pu7p9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-8ixNVzVebVQJd04dsR59n/p3ChQ\"",
		"mtime": "2026-07-31T18:35:02.578Z",
		"size": 290,
		"path": "../public/assets/send-CI_Pu7p9.js"
	},
	"/assets/service-battery-PmMY6z7N.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fdf9-1OT+nf0DqEI843W9W8nV7eunxYo\"",
		"mtime": "2026-07-31T18:35:02.589Z",
		"size": 130553,
		"path": "../public/assets/service-battery-PmMY6z7N.jpg"
	},
	"/assets/project-floating-solar-CI3AIgZP.png": {
		"type": "image/png",
		"etag": "\"d00aa-TBNcuvaQNdjnozVYHrti6pTvlaQ\"",
		"mtime": "2026-07-31T18:35:02.587Z",
		"size": 852138,
		"path": "../public/assets/project-floating-solar-CI3AIgZP.png"
	},
	"/assets/service-epc-CBLGbHY4.jpg": {
		"type": "image/jpeg",
		"etag": "\"1837e-97L77f/z8os4faGhbWcTvf0YUqs\"",
		"mtime": "2026-07-31T18:35:02.590Z",
		"size": 99198,
		"path": "../public/assets/service-epc-CBLGbHY4.jpg"
	},
	"/assets/project-glass-apartment-B3oepCoz.png": {
		"type": "image/png",
		"etag": "\"ee418-LXz+8RzeKyCswQlBUs0zMMBbf+Y\"",
		"mtime": "2026-07-31T18:35:02.588Z",
		"size": 975896,
		"path": "../public/assets/project-glass-apartment-B3oepCoz.png"
	},
	"/assets/service-ground-gd0JK-Jb.jpg": {
		"type": "image/jpeg",
		"etag": "\"12478-vT2ff299CIROE/ERhAk9wr/FbUM\"",
		"mtime": "2026-07-31T18:35:02.590Z",
		"size": 74872,
		"path": "../public/assets/service-ground-gd0JK-Jb.jpg"
	},
	"/assets/service-industrial-CWfGS4dZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"225d8-NwxLmJAz8LaHyNAV/NZJu4WUgl4\"",
		"mtime": "2026-07-31T18:35:02.590Z",
		"size": 140760,
		"path": "../public/assets/service-industrial-CWfGS4dZ.jpg"
	},
	"/assets/project-school-turbine-Cg31tDpi.png": {
		"type": "image/png",
		"etag": "\"d5698-iwRPkPQFKSTKutHdsDOowq73E+w\"",
		"mtime": "2026-07-31T18:35:02.589Z",
		"size": 874136,
		"path": "../public/assets/project-school-turbine-Cg31tDpi.png"
	},
	"/assets/project-commercial-offices-BxK_Iqh-.png": {
		"type": "image/png",
		"etag": "\"11318d-he6LLxf6SL0YbFqKBhRi864U6A0\"",
		"mtime": "2026-07-31T18:35:02.587Z",
		"size": 1126797,
		"path": "../public/assets/project-commercial-offices-BxK_Iqh-.png"
	},
	"/assets/project-warehouse-solar-C-WV8ewN.png": {
		"type": "image/png",
		"etag": "\"10a78e-Rhb3LGRGfnHYvJxD4NNgOcsMq3s\"",
		"mtime": "2026-07-31T18:35:02.589Z",
		"size": 1091470,
		"path": "../public/assets/project-warehouse-solar-C-WV8ewN.png"
	},
	"/assets/service-om-DWagKCiw.jpg": {
		"type": "image/jpeg",
		"etag": "\"12517-QnaBLeU9tCRUGTNqHq0i5AOIYFA\"",
		"mtime": "2026-07-31T18:35:02.590Z",
		"size": 75031,
		"path": "../public/assets/service-om-DWagKCiw.jpg"
	},
	"/assets/service-street-DKI3JlWO.jpg": {
		"type": "image/jpeg",
		"etag": "\"c9eb-R3BSasmltvOPbhcNCYmDo6OyQLk\"",
		"mtime": "2026-07-31T18:35:02.591Z",
		"size": 51691,
		"path": "../public/assets/service-street-DKI3JlWO.jpg"
	},
	"/assets/service-pump-DkKK3d5w.jpg": {
		"type": "image/jpeg",
		"etag": "\"16d93-9KGg+7vAZqw9Ea+4un+fjH10Td8\"",
		"mtime": "2026-07-31T18:35:02.590Z",
		"size": 93587,
		"path": "../public/assets/service-pump-DkKK3d5w.jpg"
	},
	"/assets/service-rooftop-CRIK4ilP.jpg": {
		"type": "image/jpeg",
		"etag": "\"15ba0-3uH9HBSbKOihWM/WU5aTnlzZHvw\"",
		"mtime": "2026-07-31T18:35:02.591Z",
		"size": 88992,
		"path": "../public/assets/service-rooftop-CRIK4ilP.jpg"
	},
	"/assets/services.index-CgnMqTta.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ae3-swB0ixM4nEMsry0ZZUhk1OZnHF4\"",
		"mtime": "2026-07-31T18:35:02.579Z",
		"size": 15075,
		"path": "../public/assets/services.index-CgnMqTta.js"
	},
	"/assets/services._slug-ffSaqpQU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"39f-FKco/TF2KWKSs/xMXa85GMczLf0\"",
		"mtime": "2026-07-31T18:35:02.579Z",
		"size": 927,
		"path": "../public/assets/services._slug-ffSaqpQU.js"
	},
	"/assets/services._slug-CcrrJanc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6acb-Xbmp88KikEjQObpHfsIt2GGNSBc\"",
		"mtime": "2026-07-31T18:35:02.578Z",
		"size": 27339,
		"path": "../public/assets/services._slug-CcrrJanc.js"
	},
	"/assets/settings-CB5NXsyb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3560-KU0VkICF/WR+XqYtFbB/0go7AwQ\"",
		"mtime": "2026-07-31T18:35:02.579Z",
		"size": 13664,
		"path": "../public/assets/settings-CB5NXsyb.js"
	},
	"/assets/shield-fTAqjCH-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-oTQ5AHy+z1EuLV4ka0PcpFbLsDQ\"",
		"mtime": "2026-07-31T18:35:02.579Z",
		"size": 272,
		"path": "../public/assets/shield-fTAqjCH-.js"
	},
	"/assets/solar-house-3d-CzI0yom9.jpg": {
		"type": "image/jpeg",
		"etag": "\"13663-KgCqgYeOe8cTLl+/0WoZvm5RhGo\"",
		"mtime": "2026-07-31T18:35:02.591Z",
		"size": 79459,
		"path": "../public/assets/solar-house-3d-CzI0yom9.jpg"
	},
	"/assets/staff-krXF3YKJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"756-zWGI2c31aFnjGL4uVU9VmXx1y9E\"",
		"mtime": "2026-07-31T18:35:02.579Z",
		"size": 1878,
		"path": "../public/assets/staff-krXF3YKJ.js"
	},
	"/assets/team-BCR4oVwL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c4-IVL0ShstiijpuuE/BLhxL/TIMmI\"",
		"mtime": "2026-07-31T18:35:02.579Z",
		"size": 1988,
		"path": "../public/assets/team-BCR4oVwL.js"
	},
	"/assets/trending-up-Cs-vKROT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-RwOCVcMpcZSm+VJAMKrAnSoljnE\"",
		"mtime": "2026-07-31T18:35:02.580Z",
		"size": 316,
		"path": "../public/assets/trending-up-Cs-vKROT.js"
	},
	"/assets/styles-Cd8YmkFy.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2a25c-hF/kIVNDpvAd+kqmtn0JRd6SJz4\"",
		"mtime": "2026-07-31T18:35:02.591Z",
		"size": 172636,
		"path": "../public/assets/styles-Cd8YmkFy.css"
	},
	"/assets/user-B0_pFpKH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-n95YObh5h3pdjfOotqklOLQioUk\"",
		"mtime": "2026-07-31T18:35:02.580Z",
		"size": 196,
		"path": "../public/assets/user-B0_pFpKH.js"
	},
	"/assets/users-BBKuJGv0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-iQATnASqCS0WSJW2Js5SLPBnDrE\"",
		"mtime": "2026-07-31T18:35:02.581Z",
		"size": 306,
		"path": "../public/assets/users-BBKuJGv0.js"
	},
	"/assets/useStore-CLdQSzdb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af0-K03dBhzbKiEAblIpd8dMUkJxUVU\"",
		"mtime": "2026-07-31T18:35:02.580Z",
		"size": 19184,
		"path": "../public/assets/useStore-CLdQSzdb.js"
	},
	"/assets/why-us-CnJIpPL0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3e-9jio14Bg/3mOwnP/6R0VJLeXU7s\"",
		"mtime": "2026-07-31T18:35:02.582Z",
		"size": 3390,
		"path": "../public/assets/why-us-CnJIpPL0.js"
	},
	"/assets/zap-CU94_qGf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-JmuMRDqFQFxZVoouqMk6KgO1V8Q\"",
		"mtime": "2026-07-31T18:35:02.582Z",
		"size": 262,
		"path": "../public/assets/zap-CU94_qGf.js"
	},
	"/assets/x-Cr0Gwe1f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-ljjDWYfA5qnH+vti2PbD4CCjm8c\"",
		"mtime": "2026-07-31T18:35:02.582Z",
		"size": 154,
		"path": "../public/assets/x-Cr0Gwe1f.js"
	},
	"/assets/flash-1-DdsvOgD_.png": {
		"type": "image/png",
		"etag": "\"8e9a55-vVZtPjEy26C66KdwRlVNTtN3FDs\"",
		"mtime": "2026-07-31T18:35:02.585Z",
		"size": 9345621,
		"path": "../public/assets/flash-1-DdsvOgD_.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_0cDnpX = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_0cDnpX
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
