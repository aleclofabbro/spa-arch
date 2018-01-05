// tslint:disable-next-line:typedef
export default function b(a): string {
  return a
    // tslint:disable-next-line:no-bitwise
    ? (a ^ Math.random() * 16 >> a / 4).toString(16)
    : (String([1e7]) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
}