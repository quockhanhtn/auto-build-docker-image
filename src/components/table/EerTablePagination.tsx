import type { TablePaginationProps } from '@mui/material';
import { TablePagination } from '@mui/material';

export type EerTablePaginationProps = TablePaginationProps & {
  component: any;
};

export default function EerTablePagination({
  rowsPerPageOptions = [5, 10, 25],
  component = 'div',
  ...other
}: EerTablePaginationProps) {
  return <TablePagination rowsPerPageOptions={rowsPerPageOptions} component={component} {...other} />;
}
