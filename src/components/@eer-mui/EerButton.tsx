import type { ButtonProps } from '@mui/material';
import { Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

import { forwardRef } from 'react';

// ----------------------------------------------------------------------

type ButtonStyleProps = {
  theme?: any;
  styleProps: any;
};

const ButtonStyle = styled(Button)(({ theme, styleProps }: ButtonStyleProps) => {
  const { color, variant } = styleProps;

  const styleContained = (color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning') => ({
    boxShadow: theme.customShadows[color],
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
    '&:hover': {
      backgroundColor: theme.palette[color].dark,
    },
  });

  const styleOutlined = (color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning') => ({
    color: theme.palette[color].main,
    border: `1px solid ${alpha(theme.palette[color].main, 0.48)}`,
    '&:hover': {
      border: `1px solid ${theme.palette[color].main}`,
      backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
    },
  });

  const styleText = (color: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning') => ({
    color: theme.palette[color].main,
    '&:hover': {
      backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
    },
  });
  return {
    ...(variant === 'contained' && { ...styleContained(color) }),
    ...(variant === 'outlined' && { ...styleOutlined(color) }),
    ...(variant === 'text' && { ...styleText(color) }),
  };
});

// ----------------------------------------------------------------------

export type EerButtonProps = ButtonProps & {};

const EerButton = forwardRef(({ color = 'primary', variant = 'text', children, ...other }: ButtonProps, ref: any) => {
  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return (
      <Button ref={ref} color={color} variant={variant} {...other}>
        {children}
      </Button>
    );
  }

  return (
    <ButtonStyle ref={ref} variant={variant} styleProps={{ color, variant }} {...other}>
      {children}
    </ButtonStyle>
  );
});

export default EerButton;
