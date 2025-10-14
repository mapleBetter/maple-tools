const isNumber = (val: unknown) => {
  return !Number.isNaN(parseFloat(String(val))) && Number.isFinite(Number(val));
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
export { isNumber, formatNumberUnit };
