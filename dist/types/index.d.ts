import * as echarts_2 from 'echarts';

declare interface AnyParams {
    [key: string]: unknown;
}

declare type ChartProperty = {
    el: HTMLElement;
    autoUpdate?: boolean;
    renderer?: 'canvas' | 'svg';
};

/**
 * 判断是否为数组
 */
export declare function isArray(value: unknown): value is unknown[];

/**
 * 判断是否为 BigInt
 */
export declare function isBigInt(value: unknown): value is bigint;

/**
 * 判断是否为布尔值
 */
export declare function isBoolean(value: unknown): value is boolean;

/**
 * 判断是否为日期对象
 */
export declare function isDate(value: unknown): value is Date;

/**
 * 判断是否为函数
 */
export declare function isFunction(value: unknown): value is (...args: unknown[]) => unknown;

/**
 * 判断是否为 Map
 */
export declare function isMap(value: unknown): value is Map<unknown, unknown>;

/**
 * 判断是否为 null
 */
export declare function isNull(value: unknown): value is null;

/**
 * 判断是否为数字
 */
export declare function isNumber(val: unknown): val is number;

/**
 * （可选）判断是否为数字或数字字符串
 */
export declare function isNumeric(value: unknown): boolean;

/**
 * 判断是否为普通对象（非数组、非日期等，由 {} 或 new Object() 创建）
 */
export declare function isObject(value: unknown): value is Record<string, unknown>;

/**
 * 判断是否为 Promise
 */
export declare function isPromise(value: unknown): value is Promise<unknown>;

/**
 * 判断是否为正则表达式
 */
export declare function isRegExp(value: unknown): value is RegExp;

/**
 * 判断是否为 Set
 */
export declare function isSet(value: unknown): value is Set<unknown>;

/**
 * 判断是否为字符串
 */
export declare function isString(value: unknown): value is string;

/**
 * 判断是否为 Symbol
 */
export declare function isSymbol(value: unknown): value is symbol;

/**
 * 判断是否为 undefined
 */
export declare function isUndefined(value: unknown): value is undefined;

export declare const MSCharts: (option: echarts_2.EChartsOption, property: ChartProperty) => {
    chartIns: echarts_2.ECharts;
    getOption: () => echarts_2.EChartsCoreOption;
    setOption: (newOption: echarts_2.EChartsOption, opts?: echarts_2.SetOptionOpts) => void;
    dispatch: (typeName: string, opts: AnyParams) => void;
    getChartInfo: () => {
        option: echarts_2.EChartsCoreOption;
        width: number;
        height: number;
        dom: HTMLElement;
        imgURL: string;
    };
    zrAction: (actionName: string, call: (params: unknown) => void) => void;
    action: (actionName: string, handler: (params: unknown) => void) => void;
    cancelAction: (actionName: string) => void;
};

declare type NumberChUnit = string | {
    num: string;
    unit: string;
    unitN: number;
    color: string;
};

export declare const numFixed: (number: unknown, fractionDigits?: number) => string;

export declare const numToChUnit: (_num: unknown, isFull?: boolean, isToFix?: boolean, digits?: number) => NumberChUnit;

export declare const numToSeparated: (num: unknown) => string;

declare type QueryParams = Record<string, string>;

export declare const queryUrlParams: (url?: string) => QueryParams;

export declare const urlParams: QueryParams;

export { }
