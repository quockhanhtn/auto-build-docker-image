import { useEffect } from 'react';
// rtl
import rtl from 'jss-rtl';
import { create } from 'jss';
import rtlPlugin from 'stylis-plugin-rtl';
// emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
// @mui
import { StylesProvider, jssPreset } from '@mui/styles';
import { useTheme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type RtlThemeProviderProps = {
  children?: React.ReactNode;
};

export default function RtlThemeProvider({ children }: RtlThemeProviderProps) {
  const theme = useTheme();

  const jss = create({
    plugins: [...jssPreset().plugins, rtl()],
  });

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cache = createCache({
    key: theme.direction === 'rtl' ? 'rtl' : 'css',
    prepend: true,
    stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : [],
  });

  cache.compat = true;

  return (
    <CacheProvider value={cache}>
      <StylesProvider jss={jss}>{children}</StylesProvider>
    </CacheProvider>
  );
}
