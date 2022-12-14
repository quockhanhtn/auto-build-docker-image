import type { SwitchProps } from '@mui/material';
import { Switch } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useCustomTheme } from '~/hooks';

// ----------------------------------------------------------------------

export type EerSwitchProps = SwitchProps & {};

export default function EerSwitch({ color = 'primary', sx, ...other }: EerSwitchProps) {
  const theme = useCustomTheme();

  if (color === 'default' || color === 'primary' || color === 'secondary') {
    return <Switch color={color} sx={sx} {...other} />;
  }

  return (
    <Switch
      sx={{
        '& .Mui-checked': {
          color: theme.palette[color].main,
          '&:hover': {
            bgcolor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
          },
        },
        '& .Mui-checked+.MuiSwitch-track': {
          bgcolor: theme.palette[color].main,
        },
        ...sx,
      }}
      {...other}
    />
  );
}
