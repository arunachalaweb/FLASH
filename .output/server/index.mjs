globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
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
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"16-iUOtJ2RsHfdY9DoQxaq0wz1LZCU\"",
		"mtime": "2026-07-29T08:21:29.502Z",
		"size": 22,
		"path": "../public/robots.txt"
	},
	"/favicon-flash.png": {
		"type": "image/png",
		"etag": "\"763d-32pQuAru7j8btLPuxsvBRqNryA8\"",
		"mtime": "2026-07-29T08:21:29.490Z",
		"size": 30269,
		"path": "../public/favicon-flash.png"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"763d-32pQuAru7j8btLPuxsvBRqNryA8\"",
		"mtime": "2026-07-29T08:21:29.496Z",
		"size": 30269,
		"path": "../public/favicon.png"
	},
	"/assets/about-Dq5e9bEm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c4e-sJClob5rtjIf6Cgp2EzB5YryJow\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 11342,
		"path": "../public/assets/about-Dq5e9bEm.js"
	},
	"/assets/about-engineers-DtZymbQi.jpg": {
		"type": "image/jpeg",
		"etag": "\"1770b-4PLRLUt+l0bLiam49pLJmocIU1Q\"",
		"mtime": "2026-07-31T17:13:56.926Z",
		"size": 96011,
		"path": "../public/assets/about-engineers-DtZymbQi.jpg"
	},
	"/assets/about-engineers-BTMOcvoU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-b5BAhwCS+t14wynTBPiYchQvr5o\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 290,
		"path": "../public/assets/about-engineers-BTMOcvoU.js"
	},
	"/assets/AdminCrud-1UdZvb-K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"252a-neP0Lf5LGTlENhsvWDiPTJykQ8I\"",
		"mtime": "2026-07-31T17:13:56.898Z",
		"size": 9514,
		"path": "../public/assets/AdminCrud-1UdZvb-K.js"
	},
	"/assets/chevron-right-D4HfA_sX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-F+2/wx63MFAMAW7wI8WaIxxkGIQ\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 130,
		"path": "../public/assets/chevron-right-D4HfA_sX.js"
	},
	"/assets/circle-alert-VwI0JIJM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-nfO4cNYRbfLct3WBB/nCUXgfqYY\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 250,
		"path": "../public/assets/circle-alert-VwI0JIJM.js"
	},
	"/assets/clock-C7buPgvu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-pq5aP8GX+4ARjBTg6J3Z0bwOvLY\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 169,
		"path": "../public/assets/clock-C7buPgvu.js"
	},
	"/assets/cms.faqs-DKmobtnC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe-hQObU1MFH9BaoXZ4u9ZKGn6t26M\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 766,
		"path": "../public/assets/cms.faqs-DKmobtnC.js"
	},
	"/assets/cms.pages-CnsmFdxF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35a-l0qhx5v3G9/z6mG+2LENpsXEBdo\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 858,
		"path": "../public/assets/cms.pages-CnsmFdxF.js"
	},
	"/assets/cms.projects-D_LEmGUR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9d0-Lf7soK8YYj0+Cd8R++zZt0oLckE\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 2512,
		"path": "../public/assets/cms.projects-D_LEmGUR.js"
	},
	"/assets/cms.services-B1teKS73.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44b-Dktdvf3D2Q71i2fJ5Tn2wS6/D5A\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 1099,
		"path": "../public/assets/cms.services-B1teKS73.js"
	},
	"/assets/cms.testimonials-BysjYaWm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37e-u+KrVGvRQrUpba6JZ9VIuAO2s+4\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 894,
		"path": "../public/assets/cms.testimonials-BysjYaWm.js"
	},
	"/assets/contact-CzGb_C0C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da6-mXoJxu0l6kGtodlT4rBlnTQJF54\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 3494,
		"path": "../public/assets/contact-CzGb_C0C.js"
	},
	"/assets/admin-CKBbcT1h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68ded-qZ4HGMDiff7fd9BsFtJv3vBYktU\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 429549,
		"path": "../public/assets/admin-CKBbcT1h.js"
	},
	"/assets/ContactForm-DNbOH2fP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"22d5-ZjJQZZihP5CectD7CfnwWCL6H4w\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 8917,
		"path": "../public/assets/ContactForm-DNbOH2fP.js"
	},
	"/assets/enquiries.contact-BwsSxt7A.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57a-E8E8llBai5+5KxD23o8lEOqUdzY\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 1402,
		"path": "../public/assets/enquiries.contact-BwsSxt7A.js"
	},
	"/assets/createLucideIcon-CWahulxJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124b-f31ZOMl7pMKY/PqWkFAS64yzqQ8\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 4683,
		"path": "../public/assets/createLucideIcon-CWahulxJ.js"
	},
	"/assets/enquiries.quotes-DXVyOKBn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6fd-QhBS7WMoxgftWZ4L7gHLMEKenRk\"",
		"mtime": "2026-07-31T17:13:56.913Z",
		"size": 1789,
		"path": "../public/assets/enquiries.quotes-DXVyOKBn.js"
	},
	"/assets/enquiries.subscribers-BnX-a8_D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"292-JZNgzr3dBbAvciaku5oQPhgo+BA\"",
		"mtime": "2026-07-31T17:13:56.913Z",
		"size": 658,
		"path": "../public/assets/enquiries.subscribers-BnX-a8_D.js"
	},
	"/assets/expertise-6k7D037m.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e55-Tccg/0JB2dbmcCGcZwxejITk3Ts\"",
		"mtime": "2026-07-31T17:13:56.915Z",
		"size": 11861,
		"path": "../public/assets/expertise-6k7D037m.js"
	},
	"/assets/file-pen-BotDdzVo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-eMXbOLJHurru9V6wx+JPfb6tYUc\"",
		"mtime": "2026-07-31T17:13:56.915Z",
		"size": 620,
		"path": "../public/assets/file-pen-BotDdzVo.js"
	},
	"/assets/flash-logo-updated-CiBXSsp9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f-cQ7hy1e8/6a0hBNupytfjjcWI6o\"",
		"mtime": "2026-07-31T17:13:56.915Z",
		"size": 63,
		"path": "../public/assets/flash-logo-updated-CiBXSsp9.js"
	},
	"/assets/file-text-CXPztK78.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-tMA6V8hAsqI4z3+qJAQVJV1pqV0\"",
		"mtime": "2026-07-31T17:13:56.915Z",
		"size": 385,
		"path": "../public/assets/file-text-CXPztK78.js"
	},
	"/assets/headset-BtyPg_1j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a-00vyaaXU8tEzdYyoEQis0lrJgjM\"",
		"mtime": "2026-07-31T17:13:56.915Z",
		"size": 298,
		"path": "../public/assets/headset-BtyPg_1j.js"
	},
	"/assets/flash-logo-updated-BVDlTLu6.png": {
		"type": "image/png",
		"etag": "\"185da-bWMPy7xGzGIC2bN0WP0l/m1O67Y\"",
		"mtime": "2026-07-31T17:13:56.931Z",
		"size": 99802,
		"path": "../public/assets/flash-logo-updated-BVDlTLu6.png"
	},
	"/assets/Footer-B-KvZEBb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12f9a-dHIMKRqrpuSCNt9Df+eHEDTJePY\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 77722,
		"path": "../public/assets/Footer-B-KvZEBb.js"
	},
	"/assets/hero-1-BkzO-lr0.jpg": {
		"type": "image/jpeg",
		"etag": "\"3841f-cKnyK/7Rq3nxeMKJMmLk/Rx378g\"",
		"mtime": "2026-07-31T17:13:56.931Z",
		"size": 230431,
		"path": "../public/assets/hero-1-BkzO-lr0.jpg"
	},
	"/assets/hero-2-BYbGfj6d.jpg": {
		"type": "image/jpeg",
		"etag": "\"30bed-JgqDdX9eFk17K8cOgnB/owgBo9o\"",
		"mtime": "2026-07-31T17:13:56.931Z",
		"size": 199661,
		"path": "../public/assets/hero-2-BYbGfj6d.jpg"
	},
	"/assets/hero-solar-BDBlvGT4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-qQUi3asGwBOs+bJAVYF9MHLB8tQ\"",
		"mtime": "2026-07-31T17:13:56.915Z",
		"size": 55,
		"path": "../public/assets/hero-solar-BDBlvGT4.js"
	},
	"/assets/hero-solar-BVTPJKHP.jpg": {
		"type": "image/jpeg",
		"etag": "\"32052-vfSj/6gPRrIbGHA6LGXADXo+ysU\"",
		"mtime": "2026-07-31T17:13:56.931Z",
		"size": 204882,
		"path": "../public/assets/hero-solar-BVTPJKHP.jpg"
	},
	"/assets/jsx-runtime-KJkY8l8U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2157-uh2PnvJKYWZAlieFni6eRY8YAVs\"",
		"mtime": "2026-07-31T17:13:56.915Z",
		"size": 8535,
		"path": "../public/assets/jsx-runtime-KJkY8l8U.js"
	},
	"/assets/hero-3-wqFfPd7k.jpg": {
		"type": "image/jpeg",
		"etag": "\"30d9b-2miAMo2KJuiTUiirWIyH6RNyvzU\"",
		"mtime": "2026-07-31T17:13:56.931Z",
		"size": 200091,
		"path": "../public/assets/hero-3-wqFfPd7k.jpg"
	},
	"/assets/leaf-5uWwa_nb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e6-LA64hDBGJkQWWhoVdVBKB8smilI\"",
		"mtime": "2026-07-31T17:13:56.915Z",
		"size": 486,
		"path": "../public/assets/leaf-5uWwa_nb.js"
	},
	"/assets/link-DpSk_2iW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112a-IBEHU3z1Wtxp/Vf1IRDQb8FbEGs\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 4394,
		"path": "../public/assets/link-DpSk_2iW.js"
	},
	"/assets/loader-circle-DMny3bGq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-8P8GElMAwhC19GrMxhUSgD70NXM\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 144,
		"path": "../public/assets/loader-circle-DMny3bGq.js"
	},
	"/assets/log-in-BQqzlL28.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7-UvVoVYL3prX/1NgimeJB9xzSZr8\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 231,
		"path": "../public/assets/log-in-BQqzlL28.js"
	},
	"/assets/login-BZVMDTpB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2f6e-464dRKsVg2ji+76QJstGfiE7kKQ\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 12142,
		"path": "../public/assets/login-BZVMDTpB.js"
	},
	"/assets/mail-BS1PrBTz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-rWyvH1DLVgIvUNel9wT7Ih7GG7A\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 213,
		"path": "../public/assets/mail-BS1PrBTz.js"
	},
	"/assets/menu-BXvk8Enz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28e-kibpIMkzeF441Z99zgsWyaoEdXk\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 654,
		"path": "../public/assets/menu-BXvk8Enz.js"
	},
	"/assets/index-DkylOnJk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5d902-wZUJggZpLh7hDwF85/c2GzYA8q8\"",
		"mtime": "2026-07-31T17:13:56.898Z",
		"size": 383234,
		"path": "../public/assets/index-DkylOnJk.js"
	},
	"/assets/message-square-BIqueKJf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-6DlaCOgltSiiBdiV/uV2NToitfc\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 233,
		"path": "../public/assets/message-square-BIqueKJf.js"
	},
	"/assets/messages-DDY_rU4n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15d3-mHUWZP3MYe4XntIIsJx61k4zfrw\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 5587,
		"path": "../public/assets/messages-DDY_rU4n.js"
	},
	"/assets/matchContext-iPIdbnzn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30a-jVOPhtTEwIrcg1NFFVWyP1L6bkk\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 778,
		"path": "../public/assets/matchContext-iPIdbnzn.js"
	},
	"/assets/newspaper-DMbf_OU6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-oOXvD6/k8uhK4Rxbkd6DIs3zVq8\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 994,
		"path": "../public/assets/newspaper-DMbf_OU6.js"
	},
	"/solar_panel_s.mp4": {
		"type": "video/mp4",
		"etag": "\"2a38af-87cO3mkyNuGD3vrbJTMa+K510gU\"",
		"mtime": "2026-07-29T08:21:29.529Z",
		"size": 2767023,
		"path": "../public/solar_panel_s.mp4"
	},
	"/assets/PageHero-Ef7Zs_VP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c64-ps//BR4v44fgeNaKKxTg8fnRbCQ\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 3172,
		"path": "../public/assets/PageHero-Ef7Zs_VP.js"
	},
	"/assets/project-commercial-c-39UIeu.jpg": {
		"type": "image/jpeg",
		"etag": "\"e581-rkGxepUEfq/CN6uufKKPL2aT6J0\"",
		"mtime": "2026-07-31T17:13:56.931Z",
		"size": 58753,
		"path": "../public/assets/project-commercial-c-39UIeu.jpg"
	},
	"/assets/project-industrial-BMMZALi8.jpg": {
		"type": "image/jpeg",
		"etag": "\"25c67-o3OcqxqMkN71gxXpqCbwt/vncYY\"",
		"mtime": "2026-07-31T17:13:56.931Z",
		"size": 154727,
		"path": "../public/assets/project-industrial-BMMZALi8.jpg"
	},
	"/assets/project-residential-Dy4Avjjd.jpg": {
		"type": "image/jpeg",
		"etag": "\"1079d-FU1cmd1TBA5zeWapHOJPDpo0ESg\"",
		"mtime": "2026-07-31T17:13:56.931Z",
		"size": 67485,
		"path": "../public/assets/project-residential-Dy4Avjjd.jpg"
	},
	"/assets/project-utility-Bp1PP5W6.jpg": {
		"type": "image/jpeg",
		"etag": "\"27755-k9U7dIXP+ZjgaGkIeGg8jLwPTU4\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 161621,
		"path": "../public/assets/project-utility-Bp1PP5W6.jpg"
	},
	"/assets/projects-B87zWfBD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-i1BoAaHl1+0XV6AwmKGnj+1m+PE\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 994,
		"path": "../public/assets/projects-B87zWfBD.js"
	},
	"/assets/ProjectsGallery-zsPHNxFU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3693-y4ot4H91x9BalxZSMZVf0D4kutM\"",
		"mtime": "2026-07-31T17:13:56.907Z",
		"size": 13971,
		"path": "../public/assets/ProjectsGallery-zsPHNxFU.js"
	},
	"/assets/quote-yMbQJ60F.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ba1-UGXjpe41PaCfBVyE5PDdJ2JQ8Ag\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 2977,
		"path": "../public/assets/quote-yMbQJ60F.js"
	},
	"/assets/route-BPnNMx8v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d4e-xa/gOSAQLEReTdEOCqa99XDkUN0\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 7502,
		"path": "../public/assets/route-BPnNMx8v.js"
	},
	"/assets/route-D9pzRZtL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-QANsIvuWzY4p88O0nrv28wmIRN4\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 141,
		"path": "../public/assets/route-D9pzRZtL.js"
	},
	"/assets/routes-DXUaez8p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac82-Y5zfZFMnqFeSM7lNM3BEQOATsXs\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 44162,
		"path": "../public/assets/routes-DXUaez8p.js"
	},
	"/assets/save-4caWAmt7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-a2matxhPQgearC1YrTYqulxXass\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 327,
		"path": "../public/assets/save-4caWAmt7.js"
	},
	"/assets/search-oeEsuPh2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-4j+mBH08HmklrEU1rYWImF2X+vE\"",
		"mtime": "2026-07-31T17:13:56.917Z",
		"size": 174,
		"path": "../public/assets/search-oeEsuPh2.js"
	},
	"/assets/send-CI_Pu7p9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-8ixNVzVebVQJd04dsR59n/p3ChQ\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 290,
		"path": "../public/assets/send-CI_Pu7p9.js"
	},
	"/assets/service-battery-PmMY6z7N.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fdf9-1OT+nf0DqEI843W9W8nV7eunxYo\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 130553,
		"path": "../public/assets/service-battery-PmMY6z7N.jpg"
	},
	"/assets/service-epc-CBLGbHY4.jpg": {
		"type": "image/jpeg",
		"etag": "\"1837e-97L77f/z8os4faGhbWcTvf0YUqs\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 99198,
		"path": "../public/assets/service-epc-CBLGbHY4.jpg"
	},
	"/assets/service-ground-gd0JK-Jb.jpg": {
		"type": "image/jpeg",
		"etag": "\"12478-vT2ff299CIROE/ERhAk9wr/FbUM\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 74872,
		"path": "../public/assets/service-ground-gd0JK-Jb.jpg"
	},
	"/assets/project-glass-apartment-B3oepCoz.png": {
		"type": "image/png",
		"etag": "\"ee418-LXz+8RzeKyCswQlBUs0zMMBbf+Y\"",
		"mtime": "2026-07-31T17:13:56.931Z",
		"size": 975896,
		"path": "../public/assets/project-glass-apartment-B3oepCoz.png"
	},
	"/assets/service-industrial-CWfGS4dZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"225d8-NwxLmJAz8LaHyNAV/NZJu4WUgl4\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 140760,
		"path": "../public/assets/service-industrial-CWfGS4dZ.jpg"
	},
	"/assets/project-floating-solar-CI3AIgZP.png": {
		"type": "image/png",
		"etag": "\"d00aa-TBNcuvaQNdjnozVYHrti6pTvlaQ\"",
		"mtime": "2026-07-31T17:13:56.931Z",
		"size": 852138,
		"path": "../public/assets/project-floating-solar-CI3AIgZP.png"
	},
	"/assets/project-school-turbine-Cg31tDpi.png": {
		"type": "image/png",
		"etag": "\"d5698-iwRPkPQFKSTKutHdsDOowq73E+w\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 874136,
		"path": "../public/assets/project-school-turbine-Cg31tDpi.png"
	},
	"/assets/service-om-DWagKCiw.jpg": {
		"type": "image/jpeg",
		"etag": "\"12517-QnaBLeU9tCRUGTNqHq0i5AOIYFA\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 75031,
		"path": "../public/assets/service-om-DWagKCiw.jpg"
	},
	"/assets/project-commercial-offices-BxK_Iqh-.png": {
		"type": "image/png",
		"etag": "\"11318d-he6LLxf6SL0YbFqKBhRi864U6A0\"",
		"mtime": "2026-07-31T17:13:56.931Z",
		"size": 1126797,
		"path": "../public/assets/project-commercial-offices-BxK_Iqh-.png"
	},
	"/assets/project-warehouse-solar-C-WV8ewN.png": {
		"type": "image/png",
		"etag": "\"10a78e-Rhb3LGRGfnHYvJxD4NNgOcsMq3s\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 1091470,
		"path": "../public/assets/project-warehouse-solar-C-WV8ewN.png"
	},
	"/assets/service-pump-DkKK3d5w.jpg": {
		"type": "image/jpeg",
		"etag": "\"16d93-9KGg+7vAZqw9Ea+4un+fjH10Td8\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 93587,
		"path": "../public/assets/service-pump-DkKK3d5w.jpg"
	},
	"/assets/service-rooftop-CRIK4ilP.jpg": {
		"type": "image/jpeg",
		"etag": "\"15ba0-3uH9HBSbKOihWM/WU5aTnlzZHvw\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 88992,
		"path": "../public/assets/service-rooftop-CRIK4ilP.jpg"
	},
	"/assets/services._slug-CTYFYNyM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"39f-eOWI70Dr98enPPpyvHkIOm1rwsU\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 927,
		"path": "../public/assets/services._slug-CTYFYNyM.js"
	},
	"/assets/service-street-DKI3JlWO.jpg": {
		"type": "image/jpeg",
		"etag": "\"c9eb-R3BSasmltvOPbhcNCYmDo6OyQLk\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 51691,
		"path": "../public/assets/service-street-DKI3JlWO.jpg"
	},
	"/assets/services._slug-CXAT3iZo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6acb-MM2x5rYq2zxGefDhoWClvn/dOec\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 27339,
		"path": "../public/assets/services._slug-CXAT3iZo.js"
	},
	"/assets/services.index-CTS2rZ_5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ae3-9P25kqqUSCCyp4G8vOF+XSosw8w\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 15075,
		"path": "../public/assets/services.index-CTS2rZ_5.js"
	},
	"/assets/settings-4jDc94GY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3560-HaIqMMZrlBeArPIRq744P3eud08\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 13664,
		"path": "../public/assets/settings-4jDc94GY.js"
	},
	"/assets/shield-fTAqjCH-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-oTQ5AHy+z1EuLV4ka0PcpFbLsDQ\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 272,
		"path": "../public/assets/shield-fTAqjCH-.js"
	},
	"/assets/staff-kpbcbwMB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"756-MdTY+/7qvxbvA8XW4zoEUvYEK+k\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 1878,
		"path": "../public/assets/staff-kpbcbwMB.js"
	},
	"/assets/team-D_jrtriX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c4-6mscYUdWBwSlOQXKG8CYwKqzGY4\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 1988,
		"path": "../public/assets/team-D_jrtriX.js"
	},
	"/assets/styles-DAKv4lCS.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2a27c-KJ2uisrVEMaD/hcpaWycZGEVP10\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 172668,
		"path": "../public/assets/styles-DAKv4lCS.css"
	},
	"/assets/solar-house-3d-CzI0yom9.jpg": {
		"type": "image/jpeg",
		"etag": "\"13663-KgCqgYeOe8cTLl+/0WoZvm5RhGo\"",
		"mtime": "2026-07-31T17:13:56.937Z",
		"size": 79459,
		"path": "../public/assets/solar-house-3d-CzI0yom9.jpg"
	},
	"/assets/trending-up-Cs-vKROT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-RwOCVcMpcZSm+VJAMKrAnSoljnE\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 316,
		"path": "../public/assets/trending-up-Cs-vKROT.js"
	},
	"/assets/user-B0_pFpKH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-n95YObh5h3pdjfOotqklOLQioUk\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 196,
		"path": "../public/assets/user-B0_pFpKH.js"
	},
	"/assets/users-BBKuJGv0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-iQATnASqCS0WSJW2Js5SLPBnDrE\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 306,
		"path": "../public/assets/users-BBKuJGv0.js"
	},
	"/assets/useStore-CLdQSzdb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af0-K03dBhzbKiEAblIpd8dMUkJxUVU\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 19184,
		"path": "../public/assets/useStore-CLdQSzdb.js"
	},
	"/assets/why-us-DGYTLwgP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d3e-jj8vE64QsyrIMTiCQ9rkVI69Ka8\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 3390,
		"path": "../public/assets/why-us-DGYTLwgP.js"
	},
	"/assets/x-Cr0Gwe1f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-ljjDWYfA5qnH+vti2PbD4CCjm8c\"",
		"mtime": "2026-07-31T17:13:56.922Z",
		"size": 154,
		"path": "../public/assets/x-Cr0Gwe1f.js"
	},
	"/assets/zap-CU94_qGf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-JmuMRDqFQFxZVoouqMk6KgO1V8Q\"",
		"mtime": "2026-07-31T17:13:56.926Z",
		"size": 262,
		"path": "../public/assets/zap-CU94_qGf.js"
	},
	"/assets/flash-1-DdsvOgD_.png": {
		"type": "image/png",
		"etag": "\"8e9a55-vVZtPjEy26C66KdwRlVNTtN3FDs\"",
		"mtime": "2026-07-31T17:13:56.930Z",
		"size": 9345621,
		"path": "../public/assets/flash-1-DdsvOgD_.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
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
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
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
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
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
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
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
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
