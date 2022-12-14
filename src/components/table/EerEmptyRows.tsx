import { TableCell, TableRow } from '@mui/material';

export type EerEmptyRowsProps = {
  emptyRows: number;
  rowHeight?: number;
  colSpan: number;
  cellPadding?: 'checkbox' | 'none' | 'normal';
};
export default function EerEmptyRows({ emptyRows, rowHeight = 53, colSpan, cellPadding = 'none' }: EerEmptyRowsProps) {
  if (emptyRows < 1) {
    return null;
  }

  return (
    <TableRow style={{ height: rowHeight * emptyRows }}>
      <TableCell colSpan={colSpan} padding={cellPadding} />
    </TableRow>
  );
}
