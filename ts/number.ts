import { isNumber } from './tool';

const numFixed = (number: unknown, fractionDigits: number = 2): string => {
  const f = Number.parseInt(fractionDigits.toString(), 10) || 0;
  if (f < -20 || f > 100) throw new RangeError(`Precision of ${f} fractional digits is out of range`);
  let x = Number(number);
  if (!isNumber(x)) return '--';
  let s = '';
  if (x < 0) {
    s = '-';
    x = -x;
  }
  if (x >= 10 ** 21) return s + x.toString();
  let m: string;
  const n = Math.round(x * 10 ** f);
  m = n === 0 ? '0' : n.toString();
  if (f === 0) return s + m;

  let k = m.length;
  if (k <= f) {
    const z = (10 ** (f + 1 - k)).toString().substring(1);
    m = z + m;
    k = f + 1;
  }
  if (f > 0) m = `${m.substring(0, k - f)}.${m.substring(k - f)}`;
  return s + m;
};

type NumberChUnit =
  | string
  | {
      num: string;
      unit: string;
      unitN: number;
      color: string;
    };

const numToChUnit = (_num: unknown, isFull: boolean = true, isToFix: boolean = true, digits: number = 2): NumberChUnit => {
  if (!isNumber(_num)) {
    return isFull
      ? {
          num: '--',
          unit: '',
          unitN: 1,
          color: 'text-grey',
        }
      : '--';
  }
  const absNum = Math.abs(_num);
  let newNum = '0';
  let unit = '';
  let unitN = 1;
  if (absNum >= 1000000000000) {
    newNum = `${
      isToFix ? numFixed(absNum / 1000000000000, digits) : Math.floor((absNum / 1000000000000) * 10 ** digits) / 10 ** digits
    }`;
    unit = '万亿';
    unitN = 1000000000000;
  }
  if (absNum < 1000000000000 && absNum >= 100000000) {
    newNum = `${
      isToFix ? numFixed(absNum / 100000000, digits) : Math.floor((absNum / 100000000) * 10 ** digits) / 10 ** digits
    }`;
    unit = '亿';
    unitN = 100000000;
  }
  if (absNum < 100000000 && absNum >= 10000) {
    newNum = `${isToFix ? numFixed(absNum / 10000, digits) : Math.floor((absNum / 10000) * 10 ** digits) / 10 ** digits}`;
    unit = '万';
    unitN = 10000;
  }
  if (absNum < 10000) {
    newNum = `${isToFix ? numFixed(absNum, digits) : Math.floor(absNum * 10 ** digits) / 10 ** digits}`;
  }
  if (Number.parseFloat(newNum) === 10000 && unit === '亿') {
    newNum = '1';
    unit = '万亿';
  }
  if (Number.parseFloat(newNum) === 10000 && unit === '万') {
    newNum = '1';
    unit = '亿';
  }
  return isFull
    ? {
        num: numFixed(Number.parseFloat(`${_num < 0 ? '-' : ''}${newNum}`), digits),
        unit,
        unitN,
        color: _num === 0 ? 'text-grey' : _num > 0 ? 'text-red' : 'text-green',
      }
    : `${_num < 0 ? '-' : ''}${newNum}${unit}`;
};

const numToSeparated = (num: unknown): string => {
  if (!isNumber(num)) return '--';
  const numberParts = num.toString().split('.');
  numberParts[0] = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return numberParts.join('.');
};

export { numToChUnit, numToSeparated, numFixed };

