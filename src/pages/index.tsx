import type { NextPage } from 'next';

import { Button } from '@mui/material';
// hooks
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSettings, useModal } from '~/hooks';
import { LoadingOverlay } from '~/components/overlay';

const AppPage: NextPage = () => {
  const settings = useSettings();
  const [i, setI] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { enqueueSnackbar } = useSnackbar();
  const { showModal } = useModal();

  const handleOnClick = () => {
    let variant: 'info' | 'success' | 'warning' | 'error';
    let more = '';
    if (i % 4 === 0) {
      variant = 'info';
    } else if (i % 4 === 1) {
      variant = 'success';
    } else if (i % 4 === 2) {
      variant = 'warning';
    } else {
      variant = 'error';
      more = 'esa asmfkm asdkflk dsfakolk kafsm,dlk fasdkflkas ldfklmf lkflmasd adlfpl,sa plafd;l, dfa;slfl';
    }
    enqueueSnackbar(`That was easy!${variant}${i}${more}`, {
      variant,
      persist: true,
      hidden: false,
      action:
        i % 2 === 0 ? (
          <Button color="primary" onClick={handleOnClick}>
            test
          </Button>
        ) : null,
    });
    setI((p) => p + 1);
  };

  const handleShowAlert = () => {
    setInterval(() => {
      setIsLoading((prev) => !prev);
    }, 3000);
    setI((p) => p + 1);
    showModal({
      title: `ddd${i}`,
      content: 'sss',
      icon: 'info',
      buttons: [
        {
          label: `ddd${i}`,
        },
      ],
    });
  };

  return (
    <>
      <LoadingOverlay active={isLoading} />
      <Button color="primary" onClick={handleOnClick}>
        Show Snackbar
      </Button>
      <Button color="primary" onClick={handleShowAlert}>
        Show alert
      </Button>
      <h1>Home + env '{process.env.NEXT_PUBLIC_SAMPLE}'</h1>
      <pre>{JSON.stringify(settings, null, 2)}</pre>
    </>
  );
};

export default AppPage;
