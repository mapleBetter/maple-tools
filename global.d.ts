/* export declare global {
  interface Number {
    fixPrecision: number;
  }
} */
declare let myGlobal: string;

interface Number {
  fixPrecision(): void;
}
