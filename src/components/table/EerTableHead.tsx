// @mui
import { Box, Checkbox, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// ----------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

// ----------------------------------------------------------------------

export type EerTableHeadProps = {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  headLabels: Array<{
    id: string;
    label: string;
    align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
    padding?: 'checkbox' | 'none' | 'normal';
  }>;
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<HTMLAnchorElement>, propertyId: string) => void;
  onSelectAllClick?: (arg0: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

// ----------------------------------------------------------------------

export default function EerTableHead({
  order,
  orderBy,
  rowCount,
  headLabels,
  numSelected,
  onRequestSort,
  onSelectAllClick,
}: EerTableHeadProps) {
  const createSortHandler = (propertyId: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    onRequestSort(event, propertyId);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headLabels.map(({ id, align, padding = 'none', label, ...other }) => (
          <TableCell key={id} align={align} padding={padding} sortDirection={orderBy === id ? order : false}>
            <TableSortLabel
              hideSortIcon
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
              {...other}
              onClick={createSortHandler(id)}
            >
              {label}
              {orderBy === id ? (
                <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
