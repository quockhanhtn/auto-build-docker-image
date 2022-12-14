// @mui
import type { ThemeOptions } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { alpha, ThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
// hooks
import { useMemo } from 'react';
import { useSettings } from '~/hooks';
//
import shape from './customs/shape';
import palette from './customs/palette';
import typography from './customs/typography';
import breakpoints from './customs/breakpoints';
import GlobalStyles from './customs/globalStyles';
import shadows, { customShadows } from './customs/shadows';

import componentsOverride from './overrides';

// ----------------------------------------------------------------------

export type ThemeConfigProviderProps = {
  children?: React.ReactNode;
};

export default function ThemeConfigProvider({ children }: ThemeConfigProviderProps): JSX.Element {
  const { themeMode, themeDirection, selectedColor } = useSettings();
  const isLight = themeMode === 'light';

  const themeOptions = useMemo<ThemeOptions>(
    () => ({
      palette: {
        ...(isLight ? palette.light : palette.dark),
        primary: selectedColor,
      },
      shape,
      typography,
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: {
        ...(isLight ? customShadows.light : customShadows.dark),
        primary: `0 8px 16px 0 ${alpha(selectedColor.main, 0.24)}`,
      },
    }),
    [isLight, themeDirection, selectedColor],
  );

  const theme: Theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
