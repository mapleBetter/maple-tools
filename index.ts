import echarts from 'echarts';
myGlobal = '3';
Number.prototype.toFixedPrecise = (digit: number) => {
  return 'ddd';
};

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
const isNumber = (val: any) => {
  return !Number.isNaN(parseFloat(val)) && Number.isFinite(val);
};

const formatNumberUnit = (
  number: number,
  round: boolean = true,
  unit: number = 2,
  en: boolean = false,
  preUnit: boolean = false,
  endUnit: boolean = true
) => {
  const num = '--';
  if (isNumber(number)) {
    const absNum: number = Math.abs(number);
    let tranNum: string = '0';
    if (absNum < 10000) {
      tranNum = `${round ? absNum.toFixed(unit) : (parseInt(String(absNum * 100)) / 10) * unit}`;
    } else if (absNum >= 10000 && absNum < 100000000) {
      tranNum = `${
        round ? (absNum / 10000).toFixed(unit) : (parseInt(String((absNum / 10000) * 10 * unit)) / 10) * unit
      }${endUnit ? (en ? 'W' : '万') : ''}`;
    } else if (absNum >= 10000) {
      tranNum = `${
        round ? (absNum / 100000000).toFixed(unit) : (parseInt(String((absNum / 100000000) * 10 * unit)) / 10) * unit
      }${endUnit ? (en ? 'Y' : '亿') : ''}`;
    }
    return `${number < 0 ? '-' : preUnit ? '+' : ''}${tranNum}`;
  }
  return num;
};

export { InitMSChart as MSChart, formatNumberUnit };
