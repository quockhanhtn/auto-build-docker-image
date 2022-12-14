import type { SxProps, Theme } from '@mui/material';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, styled, alpha } from '@mui/material';
import Iconify from '~/components/iconify';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }: { theme: any }) => ({
  height: 64,
  display: 'flex',
  justifyContent: 'space-between',
  // padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }: { theme: any }) => ({
  width: 440,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 640,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

export type EerTableToolbarProps = {
  numSelected: number;
  filterName: string;
  onFilterName?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  sx?: SxProps<Theme>;
};

export default function EerTableToolbar({ numSelected, filterName, onFilterName, sx }: EerTableToolbarProps) {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
        ...sx,
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          size="small"
          placeholder="Search ..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete selected">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <Iconify icon="ic:round-filter-list" />
          </IconButton>
        </Tooltip>
      )}
    </StyledRoot>
  );
}
