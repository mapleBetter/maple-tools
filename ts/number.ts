type NumberUnitResult = {
  num: string;
  unit: string;
  unitN: number;
  color: string;
};

type QueryParams = Record<string, string>;
const queryUrlParams = (url?: string): QueryParams => {
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
const urlParams: QueryParams = queryUrlParams();

/**
 * 检查输入是否为有效的Date对象
 * @param date - 需要检查的未知类型输入
 * @returns - 如果输入是有效的Date对象则返回true，否则返回false
 */
const isValidDate = (date: unknown): date is Date => {
  // 然后检查Date对象是否有效（无效的Date对象会返回NaN）
  return date instanceof Date && !Number.isNaN(date.getTime());
};

/**
 * 检查一个值是否为有效的数字
 * @param val - 需要检查的未知类型值
 * @returns 如果值是有效的数字则返回true，否则返回false
 */
const isNum = (val: unknown): val is number => {
  return typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
};

const numFixed = (number: unknown, fractionDigits: number = 2): string => {
  const f = Number.parseInt(fractionDigits.toString(), 10) || 0;
  if (f < -20 || f > 100) throw new RangeError(`Precision of ${f} fractional digits is out of range`);
  let x = Number(number);
  if (!isNum(x)) return '--';
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

const numToChUnit = (
  _num: unknown,
  full: boolean = true,
  isToFix: boolean = true,
  digits: number = 2
): string | NumberUnitResult => {
  if (!isNum(_num) || _num === -999999) {
    return full
      ? {
          num: '--',
          unit: '',
          unitN: 1,
          color: 'text-grey'
        }
      : '--';
  }
  const absNum = Math.abs(_num);
  let newNum = '0';
  let unit = '';
  let unitN = 1;
  if (absNum >= 1000000000000) {
    newNum = `${
      isToFix
        ? numFixed(absNum / 1000000000000, digits)
        : Math.floor((absNum / 1000000000000) * 10 ** digits) / 10 ** digits
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
    newNum = `${
      isToFix ? numFixed(absNum / 10000, digits) : Math.floor((absNum / 10000) * 10 ** digits) / 10 ** digits
    }`;
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
  return full
    ? {
        num: numFixed(Number.parseFloat(`${_num < 0 ? '-' : ''}${newNum}`), digits),
        unit,
        unitN,
        color: _num === 0 ? 'text-grey' : _num > 0 ? 'text-red' : 'text-green'
      }
    : `${_num < 0 ? '-' : ''}${newNum}${unit}`;
};

const numToSeparated = (num: unknown): string => {
  if (!isNum(num) || num === -999999) return '--';
  const parts = num.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
};

export { numToChUnit, numToSeparated, isValidDate, isNum, urlParams, numFixed, queryUrlParams };

