import type { IconButtonProps } from '@mui/material';
import { IconButton } from '@mui/material';
import { alpha } from '@mui/material/styles';
//
import { forwardRef } from 'react';
import { useCustomTheme } from '~/hooks';
//
import { ButtonAnimate } from '../animate';

// ----------------------------------------------------------------------

export type EerIconButtonProps = IconButtonProps & {
  children: JSX.Element;
};

const EerIconButton = forwardRef(({ color = 'default', children, sx, ...other }: EerIconButtonProps, ref: any) => {
  const theme = useCustomTheme();

  if (color === 'default' || color === 'inherit' || color === 'primary' || color === 'secondary') {
    return (
      <ButtonAnimate>
        <IconButton ref={ref} color={color} sx={sx} {...other} size="large">
          {children}
        </IconButton>
      </ButtonAnimate>
    );
  }

  return (
    <ButtonAnimate>
      <IconButton
        ref={ref}
        sx={{
          color: theme.palette[color].main,
          '&:hover': {
            bgcolor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
          },
          ...sx,
        }}
        {...other}
        size="large"
      >
        {children}
      </IconButton>
    </ButtonAnimate>
  );
});

export default EerIconButton;
