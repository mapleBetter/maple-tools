(function(global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("echarts")) : typeof define === "function" && define.amd ? define(["exports", "echarts"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.mapleTools = {}, global.echarts));
})(this, function(exports, echarts) {
	var __create = Object.create;
	var __defProp = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __copyProps = (to, from, except, desc) => {
		if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
			key = keys[i];
			if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
				get: ((k) => from[k]).bind(null, key),
				enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
			});
		}
		return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
		value: mod,
		enumerable: true
	}) : target, mod));
	echarts = __toESM(echarts);
	const queryUrlParams = (url) => {
		try {
			const params = new URLSearchParams(url ? new URL(url).search : window.location.search);
			const result = /* @__PURE__ */ new Map();
			for (const [key, value] of params.entries()) result.set(key, value);
			return Object.fromEntries(result);
		} catch (error) {
			console.warn("Failed to parse URL parameters:", error);
			return {};
		}
	};
	const urlParams = queryUrlParams();
	function isArray(value) {
		return Array.isArray(value);
	}
	function isObject(value) {
		return value !== null && typeof value === "object" && !isArray(value) && Object.prototype.toString.call(value) === "[object Object]";
	}
	function isString(value) {
		return typeof value === "string";
	}
	function isNumber(val) {
		return typeof val === "number" && !Number.isNaN(val) && Number.isFinite(val);
	}
	function isBoolean(value) {
		return typeof value === "boolean";
	}
	function isNull(value) {
		return value === null;
	}
	function isUndefined(value) {
		return value === void 0;
	}
	function isFunction(value) {
		return typeof value === "function";
	}
	function isDate(value) {
		return Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime());
	}
	function isRegExp(value) {
		return Object.prototype.toString.call(value) === "[object RegExp]";
	}
	function isMap(value) {
		return Object.prototype.toString.call(value) === "[object Map]";
	}
	function isSet(value) {
		return Object.prototype.toString.call(value) === "[object Set]";
	}
	function isPromise(value) {
		return typeof value === "object" && value !== null && typeof value.then === "function";
	}
	function isSymbol(value) {
		return typeof value === "symbol";
	}
	function isBigInt(value) {
		return typeof value === "bigint";
	}
	function isNumeric(value) {
		if (typeof value === "number") return !isNaN(value);
		if (typeof value === "string") return !isNaN(Number(value)) && value.trim() !== "";
		return false;
	}
	var numFixed = (number, fractionDigits = 2) => {
		const f = Number.parseInt(fractionDigits.toString(), 10) || 0;
		if (f < -20 || f > 100) throw new RangeError(`Precision of ${f} fractional digits is out of range`);
		let x = Number(number);
		if (!isNumber(x)) return "--";
		let s = "";
		if (x < 0) {
			s = "-";
			x = -x;
		}
		if (x >= 10 ** 21) return s + x.toString();
		let m;
		const n = Math.round(x * 10 ** f);
		m = n === 0 ? "0" : n.toString();
		if (f === 0) return s + m;
		let k = m.length;
		if (k <= f) {
			m = (10 ** (f + 1 - k)).toString().substring(1) + m;
			k = f + 1;
		}
		if (f > 0) m = `${m.substring(0, k - f)}.${m.substring(k - f)}`;
		return s + m;
	};
	var numToChUnit = (_num, isFull = true, isToFix = true, digits = 2) => {
		if (!isNumber(_num)) return isFull ? {
			num: "--",
			unit: "",
			unitN: 1,
			color: "text-grey"
		} : "--";
		const absNum = Math.abs(_num);
		let newNum = "0";
		let unit = "";
		let unitN = 1;
		if (absNum >= 0xe8d4a51000) {
			newNum = `${isToFix ? numFixed(absNum / 0xe8d4a51000, digits) : Math.floor(absNum / 0xe8d4a51000 * 10 ** digits) / 10 ** digits}`;
			unit = "万亿";
			unitN = 0xe8d4a51000;
		}
		if (absNum < 0xe8d4a51000 && absNum >= 1e8) {
			newNum = `${isToFix ? numFixed(absNum / 1e8, digits) : Math.floor(absNum / 1e8 * 10 ** digits) / 10 ** digits}`;
			unit = "亿";
			unitN = 1e8;
		}
		if (absNum < 1e8 && absNum >= 1e4) {
			newNum = `${isToFix ? numFixed(absNum / 1e4, digits) : Math.floor(absNum / 1e4 * 10 ** digits) / 10 ** digits}`;
			unit = "万";
			unitN = 1e4;
		}
		if (absNum < 1e4) newNum = `${isToFix ? numFixed(absNum, digits) : Math.floor(absNum * 10 ** digits) / 10 ** digits}`;
		if (Number.parseFloat(newNum) === 1e4 && unit === "亿") {
			newNum = "1";
			unit = "万亿";
		}
		if (Number.parseFloat(newNum) === 1e4 && unit === "万") {
			newNum = "1";
			unit = "亿";
		}
		return isFull ? {
			num: numFixed(Number.parseFloat(`${_num < 0 ? "-" : ""}${newNum}`), digits),
			unit,
			unitN,
			color: _num === 0 ? "text-grey" : _num > 0 ? "text-red" : "text-green"
		} : `${_num < 0 ? "-" : ""}${newNum}${unit}`;
	};
	var numToSeparated = (num) => {
		if (!isNumber(num)) return "--";
		const numberParts = num.toString().split(".");
		numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return numberParts.join(".");
	};
	var MSCharts = (option, property) => {
		if (!property?.el) throw new Error("Invalid property: element is required");
		if (!echarts) throw new Error("Echarts is not loaded");
		const finalProperty = {
			el: property.el,
			autoUpdate: true,
			renderer: "canvas",
			...property
		};
		const chartIns = echarts.init(finalProperty.el, null, { renderer: finalProperty.renderer });
		const isChartExist = () => {
			if (!chartIns) throw new Error("the chartInstance does not exist");
		};
		const getOption = () => {
			isChartExist();
			return chartIns.getOption();
		};
		const setOption = (newOption, opts) => {
			isChartExist();
			chartIns.setOption(newOption, opts);
		};
		const dispatch = (typeName, opts) => {
			isChartExist();
			chartIns.dispatchAction({
				type: typeName,
				...opts
			});
		};
		const zrAction = (actionName, call) => {
			isChartExist();
			chartIns.getZr().on(actionName, call);
		};
		const action = (actionName, handler) => {
			isChartExist();
			chartIns.on(actionName, handler);
		};
		const cancelAction = (actionName) => {
			isChartExist();
			chartIns.off(actionName);
		};
		const getChartInfo = () => {
			isChartExist();
			return {
				option: chartIns.getOption(),
				width: chartIns.getWidth(),
				height: chartIns.getHeight(),
				dom: chartIns.getDom(),
				imgURL: chartIns.getDataURL()
			};
		};
		if (finalProperty.autoUpdate) setOption(option);
		return {
			chartIns,
			getOption,
			setOption,
			dispatch,
			getChartInfo,
			zrAction,
			action,
			cancelAction
		};
	};
	exports.MSCharts = MSCharts;
	exports.isArray = isArray;
	exports.isBigInt = isBigInt;
	exports.isBoolean = isBoolean;
	exports.isDate = isDate;
	exports.isFunction = isFunction;
	exports.isMap = isMap;
	exports.isNull = isNull;
	exports.isNumber = isNumber;
	exports.isNumeric = isNumeric;
	exports.isObject = isObject;
	exports.isPromise = isPromise;
	exports.isRegExp = isRegExp;
	exports.isSet = isSet;
	exports.isString = isString;
	exports.isSymbol = isSymbol;
	exports.isUndefined = isUndefined;
	exports.numFixed = numFixed;
	exports.numToChUnit = numToChUnit;
	exports.numToSeparated = numToSeparated;
	exports.queryUrlParams = queryUrlParams;
	exports.urlParams = urlParams;
});
