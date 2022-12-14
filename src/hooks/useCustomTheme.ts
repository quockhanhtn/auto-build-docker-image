import { useTheme } from '@mui/material/styles';
import { CustomTheme } from '~/types/theme.types';

const useCustomTheme = (): CustomTheme => {
  const theme: CustomTheme = useTheme();
  return theme;
};

export default useCustomTheme;
