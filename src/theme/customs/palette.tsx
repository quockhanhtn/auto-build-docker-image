import type { PaletteOptions } from '@mui/material/styles';
import { ColorCons } from '~/constants';

// ----------------------------------------------------------------------

export type PaletteOptionsExtend = PaletteOptions & {
  background: {
    default: string;
    paper: string;
    neutral: string;
  };
};

export type PaletteConfig = {
  light: PaletteOptionsExtend;
  dark: PaletteOptionsExtend;
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...ColorCons.Primary },
  secondary: { ...ColorCons.Secondary },
  info: { ...ColorCons.Info },
  success: { ...ColorCons.Success },
  warning: { ...ColorCons.Warning },
  error: { ...ColorCons.Error },
  grey: ColorCons.Grey,
  gradients: ColorCons.Gradients,
  divider: ColorCons.Grey[500_24],
  action: {
    hover: ColorCons.Grey[500_8],
    selected: ColorCons.Grey[500_16],
    disabled: ColorCons.Grey[500_80],
    disabledBackground: ColorCons.Grey[500_24],
    focus: ColorCons.Grey[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

const palette: PaletteConfig = {
  light: {
    ...COMMON,
    text: { primary: ColorCons.Grey[800], secondary: ColorCons.Grey[600], disabled: ColorCons.Grey[500] },
    background: { paper: '#fff', default: '#fff', neutral: ColorCons.Grey[200] },
    action: { active: ColorCons.Grey[600], ...COMMON.action },
    mode: 'light',
  },
  dark: {
    ...COMMON,
    text: { primary: '#fff', secondary: ColorCons.Grey[500], disabled: ColorCons.Grey[600] },
    background: { paper: ColorCons.Grey[800], default: ColorCons.Grey[900], neutral: ColorCons.Grey[500_16] },
    action: { active: ColorCons.Grey[500], ...COMMON.action },
    mode: 'dark',
  },
};

export default palette;
