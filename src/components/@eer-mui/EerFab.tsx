import type { FabProps } from '@mui/material';
import { Fab } from '@mui/material';
//
import { forwardRef } from 'react';
//
import { ButtonAnimate } from '~/components/animate';
import { useCustomTheme } from '~/hooks';

// ----------------------------------------------------------------------

export type EerFabProps = FabProps & {};

const EerFab = forwardRef(({ color = 'primary', children, sx, ...other }: EerFabProps, ref: any) => {
  const theme = useCustomTheme();

  if (color === 'default' || color === 'inherit' || color === 'primary' || color === 'secondary') {
    return (
      <ButtonAnimate>
        <Fab ref={ref} color={color} sx={sx} {...other}>
          {children}
        </Fab>
      </ButtonAnimate>
    );
  }

  return (
    <ButtonAnimate>
      <Fab
        ref={ref}
        sx={{
          boxShadow: theme.customShadows[color],
          color: theme.palette[color].contrastText,
          bgcolor: theme.palette[color].main,
          '&:hover': {
            bgcolor: theme.palette[color].dark,
          },
          ...sx,
        }}
        {...other}
      >
        {children}
      </Fab>
    </ButtonAnimate>
  );
});

export default EerFab;
