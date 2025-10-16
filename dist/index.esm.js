import * as echarts from "echarts";
var queryUrlParams = (e) => {
	try {
		let t = new URLSearchParams(e ? new URL(e).search : window.location.search), n = /* @__PURE__ */ new Map();
		for (let [e, r] of t.entries()) n.set(e, r);
		return Object.fromEntries(n);
	} catch (e) {
		return console.warn("Failed to parse URL parameters:", e), {};
	}
}, urlParams = queryUrlParams(), isValidDate = (e) => e instanceof Date && !Number.isNaN(e.getTime()), isNum = (e) => typeof e == "number" && !Number.isNaN(e) && Number.isFinite(e), numFixed = (e, t = 2) => {
	let n = Number.parseInt(t.toString(), 10) || 0;
	if (n < -20 || n > 100) throw RangeError(`Precision of ${n} fractional digits is out of range`);
	let r = Number(e);
	if (!isNum(r)) return "--";
	let a = "";
	if (r < 0 && (a = "-", r = -r), r >= 10 ** 21) return a + r.toString();
	let o, s = Math.round(r * 10 ** n);
	if (o = s === 0 ? "0" : s.toString(), n === 0) return a + o;
	let c = o.length;
	return c <= n && (o = (10 ** (n + 1 - c)).toString().substring(1) + o, c = n + 1), n > 0 && (o = `${o.substring(0, c - n)}.${o.substring(c - n)}`), a + o;
}, numToChUnit = (e, t = !0, n = !0, r = 2) => {
	if (!isNum(e) || e === -999999) return t ? {
		num: "--",
		unit: "",
		unitN: 1,
		color: "text-grey"
	} : "--";
	let o = Math.abs(e), s = "0", c = "", l = 1;
	return o >= 0xe8d4a51000 && (s = `${n ? numFixed(o / 0xe8d4a51000, r) : Math.floor(o / 0xe8d4a51000 * 10 ** r) / 10 ** r}`, c = "万亿", l = 0xe8d4a51000), o < 0xe8d4a51000 && o >= 1e8 && (s = `${n ? numFixed(o / 1e8, r) : Math.floor(o / 1e8 * 10 ** r) / 10 ** r}`, c = "亿", l = 1e8), o < 1e8 && o >= 1e4 && (s = `${n ? numFixed(o / 1e4, r) : Math.floor(o / 1e4 * 10 ** r) / 10 ** r}`, c = "万", l = 1e4), o < 1e4 && (s = `${n ? numFixed(o, r) : Math.floor(o * 10 ** r) / 10 ** r}`), Number.parseFloat(s) === 1e4 && c === "亿" && (s = "1", c = "万亿"), Number.parseFloat(s) === 1e4 && c === "万" && (s = "1", c = "亿"), t ? {
		num: numFixed(Number.parseFloat(`${e < 0 ? "-" : ""}${s}`), r),
		unit: c,
		unitN: l,
		color: e === 0 ? "text-grey" : e > 0 ? "text-red" : "text-green"
	} : `${e < 0 ? "-" : ""}${s}${c}`;
}, numToSeparated = (e) => {
	if (!isNum(e) || e === -999999) return "--";
	let t = e.toString().split(".");
	return t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), t.join(".");
}, MSCharts = (t, n) => {
	if (!n?.el) throw Error("Invalid property: element is required");
	if (!echarts) throw Error("Echarts is not loaded");
	let r = {
		el: n.el,
		autoUpdate: !0,
		renderer: "canvas",
		...n
	}, i = echarts.init(r.el, null, { renderer: r.renderer }), a = () => {
		if (!i) throw Error("the chartInstance does not exist");
	}, o = () => (a(), i.getOption()), s = (e, t) => {
		a(), i.setOption(e, t);
	};
	return r.autoUpdate && s(t), {
		chartIns: i,
		getOption: o,
		setOption: s,
		dispatch: (e, t) => {
			a(), i.dispatchAction({
				type: e,
				...t
			});
		},
		getChartInfo: () => (a(), {
			option: i.getOption(),
			width: i.getWidth(),
			height: i.getHeight(),
			dom: i.getDom(),
			imgURL: i.getDataURL()
		}),
		zrAction: (e, t) => {
			a(), i.getZr().on(e, t);
		},
		action: (e, t) => {
			a(), i.on(e, t);
		},
		cancelAction: (e) => {
			a(), i.off(e);
		}
	};
};
function debounce(e, t) {
	let n = null;
	return function(...r) {
		n && clearTimeout(n), n = setTimeout(() => {
			e(...r);
		}, t);
	};
}
export { MSCharts, debounce, isNum, isValidDate, numFixed, numToChUnit, numToSeparated, queryUrlParams, urlParams };
