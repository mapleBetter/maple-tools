import * as echarts from 'echarts';

type QueryParams = Record<string, string>;
export const queryUrlParams = (url?: string): QueryParams => {
  try {
    const params = new URLSearchParams(url ? new URL(url).search : window.location.search);
    const result: Map<string, string> = new Map();

    for (const [key, value] of params.entries()) {
      result.set(key, value);
    }

    return Object.fromEntries(result);
  } catch (error) {
    console.warn('Failed to parse URL parameters:', error);
    return {};
  }
};
export const urlParams: QueryParams = queryUrlParams();

interface AnyParams {
  [key: string]: unknown;
}
type ChartProperty = {
  el: HTMLElement;
  autoUpdate?: boolean;
  renderer?: 'canvas' | 'svg';
};

export const MSCharts = (option: echarts.EChartsOption, property: ChartProperty) => {
  if (!property?.el) {
    throw new Error('Invalid property: element is required');
  }
  if (!echarts) {
    throw new Error('Echarts is not loaded');
  }

  const defaultProperty: ChartProperty = {
    el: property.el,
    autoUpdate: true,
    renderer: 'canvas',
  };
  const finalProperty = { ...defaultProperty, ...property };

  const chartIns = echarts.init(finalProperty.el, null, {
    renderer: finalProperty.renderer,
  });

  const isChartExist = () => {
    if (!chartIns) throw new Error('the chartInstance does not exist');
  };

  const getOption = (): echarts.EChartsCoreOption => {
    isChartExist();
    return chartIns.getOption();
  };
  const setOption = (newOption: echarts.EChartsOption, opts?: echarts.SetOptionOpts): void => {
    isChartExist();
    chartIns.setOption(newOption, opts);
  };

  const dispatch = (typeName: string, opts: AnyParams) => {
    isChartExist();
    chartIns.dispatchAction({ type: typeName, ...opts });
  };

  const zrAction = (actionName: string, call: (params: unknown) => void) => {
    isChartExist();
    chartIns.getZr().on(actionName, call);
  };

  const action = (actionName: string, handler: (params: unknown) => void) => {
    isChartExist();
    chartIns.on(actionName, handler);
  };

  const cancelAction = (actionName: string) => {
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
      imgURL: chartIns.getDataURL(),
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
    cancelAction,
  };
};

/**
 * 判断是否为数组
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * 判断是否为普通对象（非数组、非日期等，由 {} 或 new Object() 创建）
 */
export function isObject(value: unknown): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    !isArray(value) &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

/**
 * 判断是否为字符串
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * 判断是否为数字
 */
export function isNumber(val: unknown): val is number {
  return typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
}

/**
 * 判断是否为布尔值
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * 判断是否为 null
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * 判断是否为 undefined
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * 判断是否为函数
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return typeof value === 'function';
}

/**
 * 判断是否为日期对象
 */
export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]' && !isNaN((value as Date).getTime());
}

/**
 * 判断是否为正则表达式
 */
export function isRegExp(value: unknown): value is RegExp {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * 判断是否为 Map
 */
export function isMap(value: unknown): value is Map<unknown, unknown> {
  return Object.prototype.toString.call(value) === '[object Map]';
}

/**
 * 判断是否为 Set
 */
export function isSet(value: unknown): value is Set<unknown> {
  return Object.prototype.toString.call(value) === '[object Set]';
}

/**
 * 判断是否为 Promise
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return typeof value === 'object' && value !== null && typeof (value as Promise<unknown>).then === 'function';
}

/**
 * 判断是否为 Symbol
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

/**
 * 判断是否为 BigInt
 */
export function isBigInt(value: unknown): value is bigint {
  return typeof value === 'bigint';
}

/**
 * （可选）判断是否为数字或数字字符串
 */
export function isNumeric(value: unknown): boolean {
  if (typeof value === 'number') return !isNaN(value);
  if (typeof value === 'string') return !isNaN(Number(value)) && value.trim() !== '';
  return false;
}

