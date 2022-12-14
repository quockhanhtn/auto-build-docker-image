import { filter } from 'lodash';

export default class TableUtils {
  static descendingComparator(a: any, b: any, orderBy: string): 1 | 0 | -1 {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  static getComparator<T>(order: 'asc' | 'desc', orderBy: string): (arg0: T, arg1: T) => number {
    return order === 'desc'
      ? (a: any, b: any) => this.descendingComparator(a, b, orderBy)
      : (a: any, b: any) => -this.descendingComparator(a, b, orderBy);
  }

  static applySortFilter<T>(array: Array<T>, comparator: any, query: any): Array<T> {
    const stabilizedThis = array.map((el: T, index: number) => ({ el, index }));
    stabilizedThis.sort(
      ({ el: elA, index: idxA }: { el: T; index: number }, { el: elB, index: idxB }: { el: T; index: number }) => {
        const order = comparator(elA, elB);
        if (order !== 0) return order;
        return idxA - idxB;
      },
    );
    if (query) {
      return filter(array, (_user: any) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map(({ el }: { el: T }) => el);
  }

  static applySortFilter2<T>(array: Array<T>, order: 'asc' | 'desc', orderBy: string, query: any): Array<T> {
    return this.applySortFilter<T>(array, this.getComparator<T>(order, orderBy), query);
  }
}
