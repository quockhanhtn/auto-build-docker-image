import type { RadioProps } from '@mui/material';
import { Radio } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type EerRadioProps = RadioProps & {};

export default function EerRadio({ color = 'primary', sx, ...other }: RadioProps) {
  const theme = useTheme();

  if (color === 'default' || color === 'primary' || color === 'secondary') {
    return <Radio color={color} sx={sx} {...other} />;
  }

  return (
    <Radio
      sx={{
        '&.Mui-checked': {
          color: theme.palette[color].main,
        },
        '&:hover, &.Mui-checked:hover': {
          bgcolor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
        },
        ...sx,
      }}
      {...other}
    />
  );
}
