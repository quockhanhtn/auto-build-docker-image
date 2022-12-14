import numeral from 'numeral';

// ----------------------------------------------------------------------

function result(format: string, key = '.00') {
  const isInteger = format.includes(key);
  return isInteger ? format.replace(key, '') : format;
}

export default class FormatNumber {
  static fNumber(number: any) {
    return numeral(number).format();
  }

  static fCurrency(number: any) {
    const format = number ? numeral(number).format('$0,0.00') : '';
    return result(format, '.00');
  }

  static fPercent(number: any) {
    const format = number ? numeral(Number(number) / 100).format('0.0%') : '';
    return result(format, '.0');
  }

  static fShortenNumber(number: any) {
    const format = number ? numeral(number).format('0.00a') : '';
    return result(format, '.00');
  }

  static fData(number: any) {
    const format = number ? numeral(number).format('0.0 b') : '';
    return result(format, '.0');
  }
}
