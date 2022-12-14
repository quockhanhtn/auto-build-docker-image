import type { CheckboxProps } from '@mui/material';
import { Checkbox } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { forwardRef } from 'react';
import { useCustomTheme } from '~/hooks';

// ----------------------------------------------------------------------

export type EerCheckboxProps = CheckboxProps & {};

const EerCheckbox = forwardRef(({ color = 'primary', sx, ...other }: EerCheckboxProps, ref: any) => {
  const theme = useCustomTheme();

  if (color === 'default' || color === 'primary' || color === 'secondary') {
    return <Checkbox ref={ref} color={color} sx={sx} {...other} />;
  }

  return (
    <Checkbox
      ref={ref}
      sx={{
        '&.Mui-checked': {
          color: theme.palette[color].main,
        },
        '&.MuiCheckbox-indeterminate': {
          color: theme.palette[color].main,
        },
        '&:hover, &.Mui-checked:hover': {
          backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
        },
        ...sx,
      }}
      {...other}
    />
  );
});

export default EerCheckbox;
