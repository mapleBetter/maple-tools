import * as echarts from "echarts";
var isNumber = (e) => !Number.isNaN(parseFloat(String(e))) && Number.isFinite(Number(e)), formatNumberUnit = (e, n = !0, r = 2, i = !1, a = !1, o = !0) => {
	if (isNumber(e)) {
		let t = Math.abs(e), s = "0";
		return t < 1e4 ? s = `${n ? t.toFixed(r) : parseInt(String(t * 100)) / 10 * r}` : t >= 1e4 && t < 1e8 ? s = `${n ? (t / 1e4).toFixed(r) : parseInt(String(t / 1e4 * 10 * r)) / 10 * r}${o ? i ? "W" : "万" : ""}` : t >= 1e4 && (s = `${n ? (t / 1e8).toFixed(r) : parseInt(String(t / 1e8 * 10 * r)) / 10 * r}${o ? i ? "Y" : "亿" : ""}`), `${e < 0 ? "-" : a ? "+" : ""}${s}`;
	}
	return "--";
};
function debounce(e, t) {
	let n = null;
	return function(...r) {
		n && clearTimeout(n), n = setTimeout(() => {
			e(...r);
		}, t);
	};
}
console.log("echarts", echarts);
export { debounce, formatNumberUnit, isNumber };

//# sourceMappingURL=index.js.map