import type { LinearProgressProps } from '@mui/material';
import { LinearProgress } from '@mui/material';
import { darken, lighten, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type EerLinearProgressProps = LinearProgressProps & {};

export default function EerLinearProgress({ color = 'primary', sx, ...other }: EerLinearProgressProps) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const gradientDashed = (color: string) => {
    const getColor = isLight ? lighten(color, 0.62) : darken(color, 0.5);
    return `radial-gradient(${getColor} 0%, ${getColor}  16%, transparent 42%)`;
  };

  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return <LinearProgress color={color} sx={sx} {...other} />;
  }

  return (
    <LinearProgress
      sx={{
        '& .MuiLinearProgress-bar': {
          bgcolor: theme.palette[color].main,
        },
        '& .MuiLinearProgress-dashed': {
          backgroundImage: gradientDashed(theme.palette[color].main),
        },
        '&.MuiLinearProgress-indeterminate, &.MuiLinearProgress-determinate, & .MuiLinearProgress-bar2Buffer, &.MuiLinearProgress-query':
          {
            // bgcolor: isLight ? theme.palette[color].lighter : theme.palette[color].darker,
            bgcolor: isLight ? theme.palette[color].light : theme.palette[color].dark,
          },
        ...sx,
      }}
      {...other}
    />
  );
}
