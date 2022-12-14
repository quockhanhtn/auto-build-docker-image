import type { ButtonGroupProps } from '@mui/material';
import { ButtonGroup } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

type ButtonGroupStyleProps = {
  theme?: any;
  styleProps: any;
};

const ButtonGroupStyle = styled(ButtonGroup)(({ theme, styleProps }: ButtonGroupStyleProps) => {
  const { color, variant } = styleProps;

  const styleContained = (color: string) => ({
    boxShadow: theme.customShadows[color],
    '& .MuiButtonGroup-grouped': {
      color: theme.palette[color].contrastText,
      backgroundColor: theme.palette[color].main,
      borderColor: `${theme.palette[color].dark} !important`,
      '&:hover': {
        backgroundColor: theme.palette[color].dark,
      },
    },
  });

  const styleOutlined = (color: string) => ({
    '& .MuiButtonGroup-grouped': {
      color: theme.palette[color].main,
      borderColor: `${alpha(theme.palette[color].main, 0.48)} !important`,
      '&:hover': {
        borderColor: `${theme.palette[color].main} !important`,
        backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
      },
    },
  });

  const styleText = (color: string) => ({
    '& .MuiButtonGroup-grouped': {
      color: theme.palette[color].main,
      borderColor: `${theme.palette[color].main} !important`,
      '&:hover': {
        backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
      },
    },
  });
  return {
    ...(variant === 'contained' && { ...styleContained(color) }),
    ...(variant === 'outlined' && { ...styleOutlined(color) }),
    ...(variant === 'text' && { ...styleText(color) }),
  };
});

// ----------------------------------------------------------------------

export type EerButtonGroupProps = ButtonGroupProps & {};

function EerButtonGroup({ color = 'primary', variant = 'outlined', children, ...other }: EerButtonGroupProps) {
  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return (
      <ButtonGroup color={color} variant={variant} {...other}>
        {children}
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroupStyle variant={variant} styleProps={{ color, variant }} {...other}>
      {children}
    </ButtonGroupStyle>
  );
}

export default EerButtonGroup;
