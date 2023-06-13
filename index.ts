const echarts = require('echarts');

class InitMSChart {
  option: Object;
  $chartIns: any;

  constructor(option: Object, el: HTMLDivElement | HTMLCanvasElement, autoUpdate: boolean = true) {
    this.option = option;
    this.$chartIns = echarts.init(el);
    if (!autoUpdate) return;
    this.setOption(option);
  }

  setOption(option: Object, notMerge?: boolean, lazyUpdate?: boolean) {
    this.$chartIns.setOption(option, notMerge, lazyUpdate);
  }
  getOption() {
    return this.$chartIns.getOption();
  }
  clear() {
    this.$chartIns.clear();
  }
  dispose() {
    this.$chartIns.dispose();
  }
  resize() {
    this.$chartIns.resize();
  }
  action(name: string, params: object) {
    this.$chartIns.dispatchAction({
      type: name,
      ...params
    });
  }
}

export { InitMSChart as MSChart };
