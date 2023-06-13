var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var echarts = require('echarts');
var InitMSChart = /** @class */ (function () {
    function InitMSChart(option, el, autoUpdate) {
        if (autoUpdate === void 0) { autoUpdate = true; }
        this.option = option;
        this.$chartIns = echarts.init(el);
        if (!autoUpdate)
            return;
        this.setOption(option);
    }
    InitMSChart.prototype.setOption = function (option, notMerge, lazyUpdate) {
        this.$chartIns.setOption(option, notMerge, lazyUpdate);
    };
    InitMSChart.prototype.getOption = function () {
        return this.$chartIns.getOption();
    };
    InitMSChart.prototype.clear = function () {
        this.$chartIns.clear();
    };
    InitMSChart.prototype.dispose = function () {
        this.$chartIns.dispose();
    };
    InitMSChart.prototype.resize = function () {
        this.$chartIns.resize();
    };
    InitMSChart.prototype.action = function (name, params) {
        this.$chartIns.dispatchAction(__assign({ type: name }, params));
    };
    return InitMSChart;
}());
export { InitMSChart as MSChart };
