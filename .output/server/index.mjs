globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, i as defineLazyEventHandler, n as HTTPError, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
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
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"763d-32pQuAru7j8btLPuxsvBRqNryA8\"",
		"mtime": "2026-07-29T08:21:29.496Z",
		"size": 30269,
		"path": "../public/favicon.png"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"16-iUOtJ2RsHfdY9DoQxaq0wz1LZCU\"",
		"mtime": "2026-07-29T08:21:29.502Z",
		"size": 22,
		"path": "../public/robots.txt"
	},
	"/assets/about-engineers-BTMOcvoU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-b5BAhwCS+t14wynTBPiYchQvr5o\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 290,
		"path": "../public/assets/about-engineers-BTMOcvoU.js"
	},
	"/assets/about-DUdSlnSV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c4e-aSqz/W0BMVZ+q3qG57EnST68Gvo\"",
		"mtime": "2026-07-29T18:15:51.787Z",
		"size": 11342,
		"path": "../public/assets/about-DUdSlnSV.js"
	},
	"/assets/AdminCrud-CTtHlqra.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2543-A3999JPauHJ4msODeHsHobTm+Co\"",
		"mtime": "2026-07-29T18:15:51.787Z",
		"size": 9539,
		"path": "../public/assets/AdminCrud-CTtHlqra.js"
	},
	"/favicon-flash.png": {
		"type": "image/png",
		"etag": "\"763d-32pQuAru7j8btLPuxsvBRqNryA8\"",
		"mtime": "2026-07-29T08:21:29.490Z",
		"size": 30269,
		"path": "../public/favicon-flash.png"
	},
	"/assets/about-engineers-DtZymbQi.jpg": {
		"type": "image/jpeg",
		"etag": "\"1770b-4PLRLUt+l0bLiam49pLJmocIU1Q\"",
		"mtime": "2026-07-29T18:15:51.814Z",
		"size": 96011,
		"path": "../public/assets/about-engineers-DtZymbQi.jpg"
	},
	"/assets/arrow-left-DxM58_S8.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-W7FdMwdcvjgmS79EVt9wkw25NWE\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 165,
		"path": "../public/assets/arrow-left-DxM58_S8.js"
	},
	"/assets/chevron-right-D4HfA_sX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-F+2/wx63MFAMAW7wI8WaIxxkGIQ\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 130,
		"path": "../public/assets/chevron-right-D4HfA_sX.js"
	},
	"/assets/circle-alert-VwI0JIJM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa-nfO4cNYRbfLct3WBB/nCUXgfqYY\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 250,
		"path": "../public/assets/circle-alert-VwI0JIJM.js"
	},
	"/assets/clock-C7buPgvu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a9-pq5aP8GX+4ARjBTg6J3Z0bwOvLY\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 169,
		"path": "../public/assets/clock-C7buPgvu.js"
	},
	"/assets/cms.faqs-CUkXRw-v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2fe-xkT2aGAIFUnAVY1q+QogcZHE68o\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 766,
		"path": "../public/assets/cms.faqs-CUkXRw-v.js"
	},
	"/assets/cms.projects-Cv7TjV9Y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a0a-suSIB7K7c8YsgRQNV6OCCfWZ/gI\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 2570,
		"path": "../public/assets/cms.projects-Cv7TjV9Y.js"
	},
	"/assets/cms.pages-DDDTi-po.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"35a-bGBYiXyTmuDmKdXAi342zTeI2O0\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 858,
		"path": "../public/assets/cms.pages-DDDTi-po.js"
	},
	"/assets/cms.services-CgP-x1Rn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"44b-tQqyaCJifvKMjN/iuigABHxrR48\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 1099,
		"path": "../public/assets/cms.services-CgP-x1Rn.js"
	},
	"/assets/cms.testimonials-DVhlRx96.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37e-w4dwHMQbGWV+4tdLpchshB59ei8\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 894,
		"path": "../public/assets/cms.testimonials-DVhlRx96.js"
	},
	"/assets/admin-DhCzsl5x.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68dd2-euhpar3Eamab1w78FjeNbl3L2zw\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 429522,
		"path": "../public/assets/admin-DhCzsl5x.js"
	},
	"/assets/contact-T2qZhy6c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"da6-LWi6FbQ5qtfDSgV5a08nKmS/EXQ\"",
		"mtime": "2026-07-29T18:15:51.795Z",
		"size": 3494,
		"path": "../public/assets/contact-T2qZhy6c.js"
	},
	"/assets/ContactForm-KEodDvcU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"232c-dUOmzpbKdxIKS0pg0gTV8bkE7oo\"",
		"mtime": "2026-07-29T18:15:51.787Z",
		"size": 9004,
		"path": "../public/assets/ContactForm-KEodDvcU.js"
	},
	"/assets/createLucideIcon-CWahulxJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124b-f31ZOMl7pMKY/PqWkFAS64yzqQ8\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 4683,
		"path": "../public/assets/createLucideIcon-CWahulxJ.js"
	},
	"/assets/enquiries.contact-B6zLM3cK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"57a-PzlQch+QeDBzaFbkDwgZtH2/XSY\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 1402,
		"path": "../public/assets/enquiries.contact-B6zLM3cK.js"
	},
	"/assets/enquiries.quotes-DhCaMxkA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6fd-D5YG11/4A0bDn40Etl526GwGG28\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 1789,
		"path": "../public/assets/enquiries.quotes-DhCaMxkA.js"
	},
	"/assets/expertise-BkTJTuYW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e55-iQJmBrSeG9OLR1liWw5T83rueZA\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 11861,
		"path": "../public/assets/expertise-BkTJTuYW.js"
	},
	"/assets/enquiries.subscribers-jixdzpxY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"292-8hyorOvCuOKb0aNKkMZnhG1K3h8\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 658,
		"path": "../public/assets/enquiries.subscribers-jixdzpxY.js"
	},
	"/assets/eye-D-5k_hVX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"279-Kh6cPxFnPqkFxWINZwXqYONL/eQ\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 633,
		"path": "../public/assets/eye-D-5k_hVX.js"
	},
	"/assets/file-pen-BotDdzVo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-eMXbOLJHurru9V6wx+JPfb6tYUc\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 620,
		"path": "../public/assets/file-pen-BotDdzVo.js"
	},
	"/assets/file-text-CXPztK78.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-tMA6V8hAsqI4z3+qJAQVJV1pqV0\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 385,
		"path": "../public/assets/file-text-CXPztK78.js"
	},
	"/assets/flash-logo-updated-CiBXSsp9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3f-cQ7hy1e8/6a0hBNupytfjjcWI6o\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 63,
		"path": "../public/assets/flash-logo-updated-CiBXSsp9.js"
	},
	"/assets/Footer-DW9itBVS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13446-tzLdg4MAI5+G9vyhggnm2yX/LeM\"",
		"mtime": "2026-07-29T18:15:51.787Z",
		"size": 78918,
		"path": "../public/assets/Footer-DW9itBVS.js"
	},
	"/assets/flash-logo-updated-BVDlTLu6.png": {
		"type": "image/png",
		"etag": "\"185da-bWMPy7xGzGIC2bN0WP0l/m1O67Y\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 99802,
		"path": "../public/assets/flash-logo-updated-BVDlTLu6.png"
	},
	"/assets/forgot-password-BUNHkbhT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d27-eTkw45hTkLniD4+TKrjmqg5hRLs\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 3367,
		"path": "../public/assets/forgot-password-BUNHkbhT.js"
	},
	"/assets/headset-BtyPg_1j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"12a-00vyaaXU8tEzdYyoEQis0lrJgjM\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 298,
		"path": "../public/assets/headset-BtyPg_1j.js"
	},
	"/assets/hero-1-BkzO-lr0.jpg": {
		"type": "image/jpeg",
		"etag": "\"3841f-cKnyK/7Rq3nxeMKJMmLk/Rx378g\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 230431,
		"path": "../public/assets/hero-1-BkzO-lr0.jpg"
	},
	"/assets/hero-2-BYbGfj6d.jpg": {
		"type": "image/jpeg",
		"etag": "\"30bed-JgqDdX9eFk17K8cOgnB/owgBo9o\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 199661,
		"path": "../public/assets/hero-2-BYbGfj6d.jpg"
	},
	"/assets/hero-solar-BDBlvGT4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-qQUi3asGwBOs+bJAVYF9MHLB8tQ\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 55,
		"path": "../public/assets/hero-solar-BDBlvGT4.js"
	},
	"/assets/hero-3-wqFfPd7k.jpg": {
		"type": "image/jpeg",
		"etag": "\"30d9b-2miAMo2KJuiTUiirWIyH6RNyvzU\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 200091,
		"path": "../public/assets/hero-3-wqFfPd7k.jpg"
	},
	"/assets/hero-solar-BVTPJKHP.jpg": {
		"type": "image/jpeg",
		"etag": "\"32052-vfSj/6gPRrIbGHA6LGXADXo+ysU\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 204882,
		"path": "../public/assets/hero-solar-BVTPJKHP.jpg"
	},
	"/assets/jsx-runtime-KJkY8l8U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2157-uh2PnvJKYWZAlieFni6eRY8YAVs\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 8535,
		"path": "../public/assets/jsx-runtime-KJkY8l8U.js"
	},
	"/assets/key-round-DJe-Yjgu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"163-+fb4oY15yPKs1ZdHd6y6TkzPOwM\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 355,
		"path": "../public/assets/key-round-DJe-Yjgu.js"
	},
	"/assets/leaf-5uWwa_nb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e6-LA64hDBGJkQWWhoVdVBKB8smilI\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 486,
		"path": "../public/assets/leaf-5uWwa_nb.js"
	},
	"/assets/link-DpSk_2iW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"112a-IBEHU3z1Wtxp/Vf1IRDQb8FbEGs\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 4394,
		"path": "../public/assets/link-DpSk_2iW.js"
	},
	"/assets/loader-circle-DMny3bGq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"90-8P8GElMAwhC19GrMxhUSgD70NXM\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 144,
		"path": "../public/assets/loader-circle-DMny3bGq.js"
	},
	"/assets/lock-BZQoIpgi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ce-f95N7pcvBVxF8nkPnk9X08AZdrA\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 206,
		"path": "../public/assets/lock-BZQoIpgi.js"
	},
	"/assets/log-in-BQqzlL28.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7-UvVoVYL3prX/1NgimeJB9xzSZr8\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 231,
		"path": "../public/assets/log-in-BQqzlL28.js"
	},
	"/assets/login-D8BhGdq-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2c39-B85ffX0qp+9Boh6FESfoIIE93zI\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 11321,
		"path": "../public/assets/login-D8BhGdq-.js"
	},
	"/assets/mail-BS1PrBTz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d5-rWyvH1DLVgIvUNel9wT7Ih7GG7A\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 213,
		"path": "../public/assets/mail-BS1PrBTz.js"
	},
	"/assets/index-DnKyEAME.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"904ab-IhCIOVGEGupMCSUYIfP1m82ZLWk\"",
		"mtime": "2026-07-29T18:15:51.787Z",
		"size": 591019,
		"path": "../public/assets/index-DnKyEAME.js"
	},
	"/solar_panel_s.mp4": {
		"type": "video/mp4",
		"etag": "\"2a38af-87cO3mkyNuGD3vrbJTMa+K510gU\"",
		"mtime": "2026-07-29T08:21:29.529Z",
		"size": 2767023,
		"path": "../public/solar_panel_s.mp4"
	},
	"/assets/menu-BXvk8Enz.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"28e-kibpIMkzeF441Z99zgsWyaoEdXk\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 654,
		"path": "../public/assets/menu-BXvk8Enz.js"
	},
	"/assets/message-square-BIqueKJf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e9-6DlaCOgltSiiBdiV/uV2NToitfc\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 233,
		"path": "../public/assets/message-square-BIqueKJf.js"
	},
	"/assets/matchContext-iPIdbnzn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30a-jVOPhtTEwIrcg1NFFVWyP1L6bkk\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 778,
		"path": "../public/assets/matchContext-iPIdbnzn.js"
	},
	"/assets/messages-DOInNecD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15f1-SmDR9F52WNylM8mgHj4KFJUQyDk\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 5617,
		"path": "../public/assets/messages-DOInNecD.js"
	},
	"/assets/PageHero-Ef7Zs_VP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c64-ps//BR4v44fgeNaKKxTg8fnRbCQ\"",
		"mtime": "2026-07-29T18:15:51.787Z",
		"size": 3172,
		"path": "../public/assets/PageHero-Ef7Zs_VP.js"
	},
	"/assets/newspaper-DMbf_OU6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-oOXvD6/k8uhK4Rxbkd6DIs3zVq8\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 994,
		"path": "../public/assets/newspaper-DMbf_OU6.js"
	},
	"/assets/project-commercial-c-39UIeu.jpg": {
		"type": "image/jpeg",
		"etag": "\"e581-rkGxepUEfq/CN6uufKKPL2aT6J0\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 58753,
		"path": "../public/assets/project-commercial-c-39UIeu.jpg"
	},
	"/assets/project-industrial-BMMZALi8.jpg": {
		"type": "image/jpeg",
		"etag": "\"25c67-o3OcqxqMkN71gxXpqCbwt/vncYY\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 154727,
		"path": "../public/assets/project-industrial-BMMZALi8.jpg"
	},
	"/assets/project-residential-Dy4Avjjd.jpg": {
		"type": "image/jpeg",
		"etag": "\"1079d-FU1cmd1TBA5zeWapHOJPDpo0ESg\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 67485,
		"path": "../public/assets/project-residential-Dy4Avjjd.jpg"
	},
	"/assets/projects-Cm4ZcaAO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3e2-IXFLIPg3pkdkewWKIc24NbFp36k\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 994,
		"path": "../public/assets/projects-Cm4ZcaAO.js"
	},
	"/assets/ProjectsGallery-qAiP1-2b.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3693-aLp+RDObXqwCi66sFXcb+jYWmWg\"",
		"mtime": "2026-07-29T18:15:51.787Z",
		"size": 13971,
		"path": "../public/assets/ProjectsGallery-qAiP1-2b.js"
	},
	"/assets/project-utility-Bp1PP5W6.jpg": {
		"type": "image/jpeg",
		"etag": "\"27755-k9U7dIXP+ZjgaGkIeGg8jLwPTU4\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 161621,
		"path": "../public/assets/project-utility-Bp1PP5W6.jpg"
	},
	"/assets/quote-Cun5DDFG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bc6-LQD3xtDCIqjoyGV+EpxqMvzCDfY\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 3014,
		"path": "../public/assets/quote-Cun5DDFG.js"
	},
	"/assets/reset-password-DuAK1qOv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127e-g8LJ1TmlYrk/BJIsY5g0aPcpDCc\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 4734,
		"path": "../public/assets/reset-password-DuAK1qOv.js"
	},
	"/assets/route-1cxm8XZL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d64-1r4CZWb2BIPCP5ba5LTr35FLXP0\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 7524,
		"path": "../public/assets/route-1cxm8XZL.js"
	},
	"/assets/route-C-2pHbk5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-HFAES+aA6nTYkEcd2GDe1qKxbic\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 141,
		"path": "../public/assets/route-C-2pHbk5.js"
	},
	"/assets/routes-BWjTkuJ3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ac9d-NJn7Fh9Y+aHwz1KFKIslqOHkDro\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 44189,
		"path": "../public/assets/routes-BWjTkuJ3.js"
	},
	"/assets/save-4caWAmt7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"147-a2matxhPQgearC1YrTYqulxXass\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 327,
		"path": "../public/assets/save-4caWAmt7.js"
	},
	"/assets/project-floating-solar-CI3AIgZP.png": {
		"type": "image/png",
		"etag": "\"d00aa-TBNcuvaQNdjnozVYHrti6pTvlaQ\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 852138,
		"path": "../public/assets/project-floating-solar-CI3AIgZP.png"
	},
	"/assets/search-oeEsuPh2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-4j+mBH08HmklrEU1rYWImF2X+vE\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 174,
		"path": "../public/assets/search-oeEsuPh2.js"
	},
	"/assets/project-glass-apartment-B3oepCoz.png": {
		"type": "image/png",
		"etag": "\"ee418-LXz+8RzeKyCswQlBUs0zMMBbf+Y\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 975896,
		"path": "../public/assets/project-glass-apartment-B3oepCoz.png"
	},
	"/assets/project-school-turbine-Cg31tDpi.png": {
		"type": "image/png",
		"etag": "\"d5698-iwRPkPQFKSTKutHdsDOowq73E+w\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 874136,
		"path": "../public/assets/project-school-turbine-Cg31tDpi.png"
	},
	"/assets/project-commercial-offices-BxK_Iqh-.png": {
		"type": "image/png",
		"etag": "\"11318d-he6LLxf6SL0YbFqKBhRi864U6A0\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 1126797,
		"path": "../public/assets/project-commercial-offices-BxK_Iqh-.png"
	},
	"/assets/project-warehouse-solar-C-WV8ewN.png": {
		"type": "image/png",
		"etag": "\"10a78e-Rhb3LGRGfnHYvJxD4NNgOcsMq3s\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 1091470,
		"path": "../public/assets/project-warehouse-solar-C-WV8ewN.png"
	},
	"/assets/send-CI_Pu7p9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-8ixNVzVebVQJd04dsR59n/p3ChQ\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 290,
		"path": "../public/assets/send-CI_Pu7p9.js"
	},
	"/assets/service-epc-CBLGbHY4.jpg": {
		"type": "image/jpeg",
		"etag": "\"1837e-97L77f/z8os4faGhbWcTvf0YUqs\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 99198,
		"path": "../public/assets/service-epc-CBLGbHY4.jpg"
	},
	"/assets/service-battery-PmMY6z7N.jpg": {
		"type": "image/jpeg",
		"etag": "\"1fdf9-1OT+nf0DqEI843W9W8nV7eunxYo\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 130553,
		"path": "../public/assets/service-battery-PmMY6z7N.jpg"
	},
	"/assets/service-industrial-CWfGS4dZ.jpg": {
		"type": "image/jpeg",
		"etag": "\"225d8-NwxLmJAz8LaHyNAV/NZJu4WUgl4\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 140760,
		"path": "../public/assets/service-industrial-CWfGS4dZ.jpg"
	},
	"/assets/service-ground-gd0JK-Jb.jpg": {
		"type": "image/jpeg",
		"etag": "\"12478-vT2ff299CIROE/ERhAk9wr/FbUM\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 74872,
		"path": "../public/assets/service-ground-gd0JK-Jb.jpg"
	},
	"/assets/service-om-DWagKCiw.jpg": {
		"type": "image/jpeg",
		"etag": "\"12517-QnaBLeU9tCRUGTNqHq0i5AOIYFA\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 75031,
		"path": "../public/assets/service-om-DWagKCiw.jpg"
	},
	"/assets/service-rooftop-CRIK4ilP.jpg": {
		"type": "image/jpeg",
		"etag": "\"15ba0-3uH9HBSbKOihWM/WU5aTnlzZHvw\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 88992,
		"path": "../public/assets/service-rooftop-CRIK4ilP.jpg"
	},
	"/assets/service-pump-DkKK3d5w.jpg": {
		"type": "image/jpeg",
		"etag": "\"16d93-9KGg+7vAZqw9Ea+4un+fjH10Td8\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 93587,
		"path": "../public/assets/service-pump-DkKK3d5w.jpg"
	},
	"/assets/services._slug-2nzgXLMy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6acb-yBDGyzzNwFwdEKKTVxuvMt7q+U4\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 27339,
		"path": "../public/assets/services._slug-2nzgXLMy.js"
	},
	"/assets/services.index-DAbFGiWq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3ae3-CTGrZ1helOnokZIcTrOsk0h1nXE\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 15075,
		"path": "../public/assets/services.index-DAbFGiWq.js"
	},
	"/assets/services._slug-CvFUyd_s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"335-FWLwfcHg+70CsPQXobNcg+81rjA\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 821,
		"path": "../public/assets/services._slug-CvFUyd_s.js"
	},
	"/assets/service-street-DKI3JlWO.jpg": {
		"type": "image/jpeg",
		"etag": "\"c9eb-R3BSasmltvOPbhcNCYmDo6OyQLk\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 51691,
		"path": "../public/assets/service-street-DKI3JlWO.jpg"
	},
	"/assets/signup-B1JF0WbI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4872-BEkEw0yG7o9f4Uih8YtFOuUt45U\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 18546,
		"path": "../public/assets/signup-B1JF0WbI.js"
	},
	"/assets/settings-DIQLiVWo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2737-cbLw0LpLgTMLIUx1diqbk5Icu4s\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 10039,
		"path": "../public/assets/settings-DIQLiVWo.js"
	},
	"/assets/shield-fTAqjCH-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-oTQ5AHy+z1EuLV4ka0PcpFbLsDQ\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 272,
		"path": "../public/assets/shield-fTAqjCH-.js"
	},
	"/assets/solar-house-3d-CzI0yom9.jpg": {
		"type": "image/jpeg",
		"etag": "\"13663-KgCqgYeOe8cTLl+/0WoZvm5RhGo\"",
		"mtime": "2026-07-29T18:15:51.820Z",
		"size": 79459,
		"path": "../public/assets/solar-house-3d-CzI0yom9.jpg"
	},
	"/assets/staff-Drov6Q8L.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"756-fxzZbbfZ4NOy3HwBzgl9Md67gtw\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 1878,
		"path": "../public/assets/staff-Drov6Q8L.js"
	},
	"/assets/styles-CtgK54Z5.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"2a5bc-ofGOeWQzJI1tY+a8AD1v+OwswM8\"",
		"mtime": "2026-07-29T18:15:51.830Z",
		"size": 173500,
		"path": "../public/assets/styles-CtgK54Z5.css"
	},
	"/assets/team-Z2uDH2PI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c4-qG3Q9lOi56c7iiV7Qh6YnOE+IgI\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 1988,
		"path": "../public/assets/team-Z2uDH2PI.js"
	},
	"/assets/trending-up-Cs-vKROT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c-RwOCVcMpcZSm+VJAMKrAnSoljnE\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 316,
		"path": "../public/assets/trending-up-Cs-vKROT.js"
	},
	"/assets/user-B0_pFpKH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-n95YObh5h3pdjfOotqklOLQioUk\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 196,
		"path": "../public/assets/user-B0_pFpKH.js"
	},
	"/assets/user-plus-B008HbZg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1b3-Ap3Rqi+1OieJUR0v5bjGRP9OGrg\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 435,
		"path": "../public/assets/user-plus-B008HbZg.js"
	},
	"/assets/users-BBKuJGv0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-iQATnASqCS0WSJW2Js5SLPBnDrE\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 306,
		"path": "../public/assets/users-BBKuJGv0.js"
	},
	"/assets/useStore-CLdQSzdb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4af0-K03dBhzbKiEAblIpd8dMUkJxUVU\"",
		"mtime": "2026-07-29T18:15:51.798Z",
		"size": 19184,
		"path": "../public/assets/useStore-CLdQSzdb.js"
	},
	"/assets/why-us-CoNJmjNI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d63-guRTdgsY//5nivO7oNZ58olvjKs\"",
		"mtime": "2026-07-29T18:15:51.814Z",
		"size": 3427,
		"path": "../public/assets/why-us-CoNJmjNI.js"
	},
	"/assets/x-Cr0Gwe1f.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-ljjDWYfA5qnH+vti2PbD4CCjm8c\"",
		"mtime": "2026-07-29T18:15:51.814Z",
		"size": 154,
		"path": "../public/assets/x-Cr0Gwe1f.js"
	},
	"/assets/zap-CU94_qGf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-JmuMRDqFQFxZVoouqMk6KgO1V8Q\"",
		"mtime": "2026-07-29T18:15:51.814Z",
		"size": 262,
		"path": "../public/assets/zap-CU94_qGf.js"
	},
	"/assets/flash-1-DdsvOgD_.png": {
		"type": "image/png",
		"etag": "\"8e9a55-vVZtPjEy26C66KdwRlVNTtN3FDs\"",
		"mtime": "2026-07-29T18:15:51.814Z",
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
var _lazy_J90rjy = defineLazyEventHandler(() => import("./_chunks/renderer-template.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_J90rjy
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
