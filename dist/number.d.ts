declare const numFixed: (number: unknown, fractionDigits?: number) => string;
type NumberChUnit = string | {
    num: string;
    unit: string;
    unitN: number;
    color: string;
};
declare const numToChUnit: (_num: unknown, isFull?: boolean, isToFix?: boolean, digits?: number) => NumberChUnit;
declare const numToSeparated: (num: unknown) => string;
export { numToChUnit, numToSeparated, numFixed };
