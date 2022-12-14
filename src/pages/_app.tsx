import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { useEffect } from 'react';
// redux
import { Provider as ReduxProvider } from 'react-redux';
import { wrapper } from '~/redux/store';
// theme
import { ThemeConfigProvider, RtlThemeProvider } from '~/theme';
// contexts
import { SettingsProvider } from '~/components/@global/provider/SettingsProvider';
import NotiStackProvider from '~/components/@global/provider/NotiStackProvider';
// components
import Settings from '~/components/@global/settings';
import TopProgressBar from '~/components/TopProgressBar';
import Scrollbar from '~/components/scrollbar';
import { ModalProvider } from '~/components/@global/provider/ModalProvider';
import { GlobalModal } from '~/components/@global/modal';

import 'simplebar-react/dist/simplebar.min.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, ...rest }: AppPropsWithLayout) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;

  return (
    <ReduxProvider store={store}>
      <SettingsProvider>
        <ThemeConfigProvider>
          <RtlThemeProvider>
            <NotiStackProvider>
              <ModalProvider>
                <Settings />
                <GlobalModal />
                <TopProgressBar />
                <Scrollbar
                  style={{
                    maxHeight: '100vh',
                  }}
                >
                  {getLayout(<Component {...pageProps} />)}
                </Scrollbar>
              </ModalProvider>
            </NotiStackProvider>
          </RtlThemeProvider>
        </ThemeConfigProvider>
      </SettingsProvider>
    </ReduxProvider>
  );
}

export default MyApp;
