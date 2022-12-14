import type { TableContainerProps, TableProps } from '@mui/material';
import { TableContainer, Table } from '@mui/material';
import Scrollbar from '~/components/scrollbar';

export type EerTableContainerProps = {
  children: React.ReactNode;
  containerProps?: Omit<TableContainerProps, 'children'>;
  tableProps?: Omit<TableProps, 'children'>;
};

export default function EerTableContainer(props: EerTableContainerProps) {
  const { children, containerProps, tableProps } = props;

  return (
    <Scrollbar>
      <TableContainer sx={{ minWidth: 800 }} {...containerProps}>
        <Table stickyHeader {...tableProps}>
          {children}
        </Table>
      </TableContainer>
    </Scrollbar>
  );
}
