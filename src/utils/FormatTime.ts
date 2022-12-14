import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export default class FormatTime {
  static fDate(date: string | number | Date | undefined, newFormat: string) {
    const fm = newFormat || 'dd MMM yyyy';

    return date ? format(new Date(date), fm) : '';
  }

  static fDateTime(date: string | number | Date | undefined, newFormat: string) {
    const fm = newFormat || 'dd MMM yyyy p';

    return date ? format(new Date(date), fm) : '';
  }

  static fTimestamp(date: string | number | Date | undefined) {
    return date ? getTime(new Date(date)) : '';
  }

  static fToNow(date: string | number | Date | undefined) {
    return date
      ? formatDistanceToNow(new Date(date), {
          addSuffix: true,
        })
      : '';
  }
}
