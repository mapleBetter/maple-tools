import * as echarts from 'echarts';
interface AnyParams {
    [key: string]: unknown;
}
type ChartProperty = {
    el: HTMLElement;
    autoUpdate?: boolean;
    renderer?: 'canvas' | 'svg';
};
export declare const MSCharts: (option: echarts.EChartsOption, property: ChartProperty) => {
    chartIns: any;
    getOption: () => echarts.EChartsCoreOption;
    setOption: (newOption: echarts.EChartsOption, opts?: echarts.SetOptionOpts) => void;
    dispatch: (typeName: string, opts: AnyParams) => void;
    getChartInfo: () => {
        option: any;
        width: any;
        height: any;
        dom: any;
        imgURL: any;
    };
    zrAction: (actionName: string, call: (params: unknown) => void) => void;
    action: (actionName: string, handler: (params: unknown) => void) => void;
    cancelAction: (actionName: string) => void;
};
export {};
