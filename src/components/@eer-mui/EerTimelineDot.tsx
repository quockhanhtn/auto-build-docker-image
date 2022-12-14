import type { TimelineDotProps } from '@mui/lab';
import { TimelineDot } from '@mui/lab';

import { useCustomTheme } from '~/hooks';

// ----------------------------------------------------------------------

export type EerTimelineDotProps = TimelineDotProps & {};

export default function EerTimelineDot({ color = 'grey', variant = 'filled', sx, ...other }: EerTimelineDotProps) {
  const theme = useCustomTheme();

  if (color === 'grey' || color === 'inherit' || color === 'primary' || color === 'secondary') {
    return <TimelineDot color={color} variant={variant} sx={sx} {...other} />;
  }

  return (
    <TimelineDot
      variant={variant}
      sx={{
        ...(variant === 'filled' && {
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main,
        }),
        ...(variant === 'outlined' && {
          borderColor: theme.palette[color].main,
        }),
        ...sx,
      }}
      {...other}
    />
  );
}
