import { alpha } from '@mui/material/styles';

function createGradient(color1: string, color2: string) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

const Grey = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
};

// #region Color settings
const Blue = {
  lighter: '#CCDFFF',
  light: '#6697FF',
  main: '#0045FF',
  dark: '#0027B7',
  darker: '#00137A',
  contrastText: '#fff',
};
const Cyan = {
  lighter: '#D1FFFC',
  light: '#76F2FF',
  main: '#1CCAFF',
  dark: '#0E77B7',
  darker: '#053D7A',
  contrastText: Grey[800],
};
const Green = {
  lighter: '#C8FACD',
  light: '#5BE584',
  main: '#00AB55',
  dark: '#007B55',
  darker: '#005249',
  contrastText: '#fff',
};
const Orange = {
  lighter: '#FEF4D4',
  light: '#FED680',
  main: '#fda92d',
  dark: '#B66816',
  darker: '#793908',
  contrastText: Grey[800],
};
const Pink = {
  lighter: '#ffdeeb',
  light: '#ff99b9',
  main: '#ff5c8a',
  dark: '#ba1141',
  darker: '#8a0030',
  contrastText: '#fff',
};
const Purple = {
  lighter: '#EBD6FD',
  light: '#B985F4',
  main: '#7635dc',
  dark: '#431A9E',
  darker: '#200A69',
  contrastText: '#fff',
};
const Red = {
  lighter: '#FFE3D5',
  light: '#FFC1AC',
  main: '#FF3030',
  dark: '#B71833',
  darker: '#7A0930',
  contrastText: '#fff',
};
// #endregion

const Primary = {
  ...Green,
};
const Secondary = {
  lighter: '#D6E4FF',
  light: '#84A9FF',
  main: '#3366FF',
  dark: '#1939B7',
  darker: '#091A7A',
  contrastText: '#fff',
};
const Info = {
  lighter: '#D0F2FF',
  light: '#74CAFF',
  main: '#1890FF',
  dark: '#0C53B7',
  darker: '#04297A',
  contrastText: '#fff',
};
const Success = {
  lighter: '#E9FCD4',
  light: '#AAF27F',
  main: '#54D62C',
  dark: '#229A16',
  darker: '#08660D',
  contrastText: Grey[800],
};
const Warning = {
  lighter: '#FFF7CD',
  light: '#FFE16A',
  main: '#FFC107',
  dark: '#B78103',
  darker: '#7A4F01',
  contrastText: Grey[800],
};
const Error = {
  lighter: '#FFE7D9',
  light: '#FFA48D',
  main: '#FF4842',
  dark: '#B72136',
  darker: '#7A0C2E',
  contrastText: '#fff',
};
const Gradients = {
  primary: createGradient(Primary.light, Primary.main),
  info: createGradient(Info.light, Info.main),
  success: createGradient(Success.light, Success.main),
  warning: createGradient(Warning.light, Warning.main),
  error: createGradient(Error.light, Error.main),
};

const ColorCons = {
  Grey,

  Blue,
  Cyan,
  Green,
  Orange,
  Pink,
  Purple,
  Red,

  Primary,
  Secondary,
  Info,
  Success,
  Warning,
  Error,
  Gradients,
} as const;

export default ColorCons;
