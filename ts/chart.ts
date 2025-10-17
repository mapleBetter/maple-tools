import * as echarts from 'echarts';
interface AnyParams {
  [key: string]: unknown;
}
type ChartProperty = {
  el: HTMLElement;
  autoUpdate?: boolean;
  renderer?: 'canvas' | 'svg';
};
const MSCharts = (option: echarts.EChartsOption, property: ChartProperty) => {
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

export { MSCharts };

