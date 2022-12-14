import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function MuiBackdrop(theme: any) {
  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(theme.palette.grey[800], 0.8),
        },
        invisible: {
          background: 'transparent',
        },
      },
    },
  };
}
