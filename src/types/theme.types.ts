import type { Shadows, Theme } from '@mui/material';
import type { Shape } from '@mui/system';

export type ThemeShadow = {
  light: Shadows;
  dark: Shadows;
};

export type ThemeCustomShadow = {
  z1: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  primary: string;
  secondary: string;
  info: string;
  success: string;
  warning: string;
  error: string;

  dropdown?: any;
  card?: any;
};

export type ThemeTypography = {
  fontFamily: string;
  fontWeightRegular: number;
  fontWeightMedium: number;
  fontWeightBold: number;
  [key: string]: any | undefined;
};

export type ThemeResponsiveFontSize = {
  sm: number;
  md: number;
  lg: number;
};

export type ThemShape = Shape & {
  borderRadiusSm: number;
  borderRadiusMd: number;
};

export type CustomTheme = Theme & {
  shape: ThemShape;
  customShadows: ThemeCustomShadow;
};
