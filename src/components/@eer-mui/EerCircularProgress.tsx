import type { CircularProgressProps } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useCustomTheme } from '~/hooks';

// ----------------------------------------------------------------------

export type EerCircularProgressProps = CircularProgressProps & {};

export default function EerCircularProgress({ color = 'primary', sx, ...other }: EerCircularProgressProps) {
  const theme = useCustomTheme();

  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return <CircularProgress color={color} sx={sx} {...other} />;
  }

  return (
    <CircularProgress
      sx={{
        color: theme.palette[color].main,
        ...sx,
      }}
      {...other}
    />
  );
}
