import * as echarts from "echarts";
const queryUrlParams = (e) => {
	try {
		let h = new URLSearchParams(e ? new URL(e).search : window.location.search), g = /* @__PURE__ */ new Map();
		for (let [e, _] of h.entries()) g.set(e, _);
		return Object.fromEntries(g);
	} catch (e) {
		return console.warn("Failed to parse URL parameters:", e), {};
	}
}, urlParams = queryUrlParams();
function isArray(e) {
	return Array.isArray(e);
}
function isObject(e) {
	return typeof e == "object" && !!e && !isArray(e) && Object.prototype.toString.call(e) === "[object Object]";
}
function isString(e) {
	return typeof e == "string";
}
function isNumber(e) {
	return typeof e == "number" && !Number.isNaN(e) && Number.isFinite(e);
}
function isBoolean(e) {
	return typeof e == "boolean";
}
function isNull(e) {
	return e === null;
}
function isUndefined(e) {
	return e === void 0;
}
function isFunction(e) {
	return typeof e == "function";
}
function isDate(e) {
	return Object.prototype.toString.call(e) === "[object Date]" && !isNaN(e.getTime());
}
function isRegExp(e) {
	return Object.prototype.toString.call(e) === "[object RegExp]";
}
function isMap(e) {
	return Object.prototype.toString.call(e) === "[object Map]";
}
function isSet(e) {
	return Object.prototype.toString.call(e) === "[object Set]";
}
function isPromise(e) {
	return typeof e == "object" && !!e && typeof e.then == "function";
}
function isSymbol(e) {
	return typeof e == "symbol";
}
function isBigInt(e) {
	return typeof e == "bigint";
}
function isNumeric(e) {
	return typeof e == "number" ? !isNaN(e) : typeof e == "string" ? !isNaN(Number(e)) && e.trim() !== "" : !1;
}
var numFixed = (e, h = 2) => {
	let g = Number.parseInt(h.toString(), 10) || 0;
	if (g < -20 || g > 100) throw RangeError(`Precision of ${g} fractional digits is out of range`);
	let _ = Number(e);
	if (!isNumber(_)) return "--";
	let v = "";
	if (_ < 0 && (v = "-", _ = -_), _ >= 10 ** 21) return v + _.toString();
	let y, x = Math.round(_ * 10 ** g);
	if (y = x === 0 ? "0" : x.toString(), g === 0) return v + y;
	let S = y.length;
	return S <= g && (y = (10 ** (g + 1 - S)).toString().substring(1) + y, S = g + 1), g > 0 && (y = `${y.substring(0, S - g)}.${y.substring(S - g)}`), v + y;
}, numToChUnit = (e, h = !0, g = !0, _ = 2) => {
	if (!isNumber(e)) return h ? {
		num: "--",
		unit: "",
		unitN: 1,
		color: "text-grey"
	} : "--";
	let v = Math.abs(e), y = "0", x = "", S = 1;
	return v >= 0xe8d4a51000 && (y = `${g ? numFixed(v / 0xe8d4a51000, _) : Math.floor(v / 0xe8d4a51000 * 10 ** _) / 10 ** _}`, x = "万亿", S = 0xe8d4a51000), v < 0xe8d4a51000 && v >= 1e8 && (y = `${g ? numFixed(v / 1e8, _) : Math.floor(v / 1e8 * 10 ** _) / 10 ** _}`, x = "亿", S = 1e8), v < 1e8 && v >= 1e4 && (y = `${g ? numFixed(v / 1e4, _) : Math.floor(v / 1e4 * 10 ** _) / 10 ** _}`, x = "万", S = 1e4), v < 1e4 && (y = `${g ? numFixed(v, _) : Math.floor(v * 10 ** _) / 10 ** _}`), Number.parseFloat(y) === 1e4 && x === "亿" && (y = "1", x = "万亿"), Number.parseFloat(y) === 1e4 && x === "万" && (y = "1", x = "亿"), h ? {
		num: numFixed(Number.parseFloat(`${e < 0 ? "-" : ""}${y}`), _),
		unit: x,
		unitN: S,
		color: e === 0 ? "text-grey" : e > 0 ? "text-red" : "text-green"
	} : `${e < 0 ? "-" : ""}${y}${x}`;
}, numToSeparated = (e) => {
	if (!isNumber(e)) return "--";
	let h = e.toString().split(".");
	return h[0] = h[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","), h.join(".");
};
const MSCharts = (h, g) => {
	if (!g?.el) throw Error("Invalid property: element is required");
	if (!echarts) throw Error("Echarts is not loaded");
	let _ = {
		el: g.el,
		autoUpdate: !0,
		renderer: "canvas",
		...g
	}, v = echarts.init(_.el, null, { renderer: _.renderer }), y = () => {
		if (!v) throw Error("the chartInstance does not exist");
	}, b = () => (y(), v.getOption()), x = (e, h) => {
		y(), v.setOption(e, h);
	};
	return _.autoUpdate && x(h), {
		chartIns: v,
		getOption: b,
		setOption: x,
		dispatch: (e, h) => {
			y(), v.dispatchAction({
				type: e,
				...h
			});
		},
		getChartInfo: () => (y(), {
			option: v.getOption(),
			width: v.getWidth(),
			height: v.getHeight(),
			dom: v.getDom(),
			imgURL: v.getDataURL()
		}),
		zrAction: (e, h) => {
			y(), v.getZr().on(e, h);
		},
		action: (e, h) => {
			y(), v.on(e, h);
		},
		cancelAction: (e) => {
			y(), v.off(e);
		}
	};
};
export { MSCharts, isArray, isBigInt, isBoolean, isDate, isFunction, isMap, isNull, isNumber, isNumeric, isObject, isPromise, isRegExp, isSet, isString, isSymbol, isUndefined, numFixed, numToChUnit, numToSeparated, queryUrlParams, urlParams };
