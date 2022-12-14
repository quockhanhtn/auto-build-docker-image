import { Box } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { motion } from 'framer-motion';
import NProgress from 'nprogress';
import { useEffect, useMemo, useState } from 'react';

import { IcLoading } from '~/components/@assets/icons';

const nprogressStyle = makeStyles((theme: any) => ({
  '@global': {
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        top: 0,
        left: 0,
        height: 2,
        width: '100%',
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 0 2px ${theme.palette.primary.main}`,
      },
      '& .peg': {
        right: 0,
        opacity: 1,
        width: 100,
        height: '100%',
        display: 'block',
        position: 'absolute',
        transform: 'rotate(3deg) translate(0px, -4px)',
        boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
      },
    },
  },
}));

const RootStyle = styled('div')(() => ({
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
}));

const CustomSpinner = () => {
  nprogressStyle();

  useMemo(() => {
    NProgress.start();
  }, []);

  useEffect(() => {
    NProgress.done();
  }, []);

  return (
    <RootStyle>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeatDelay: 1,
          repeat: Infinity,
        }}
      >
        <IcLoading sx={{ width: 64, height: 64 }} />
      </motion.div>

      <Box
        component={motion.div}
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        sx={{
          width: 100,
          height: 100,
          borderRadius: '25%',
          position: 'absolute',
          border: (theme) => `solid 3px ${alpha(theme.palette.primary.dark, 0.24)}`,
        }}
      />

      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%'],
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        sx={{
          width: 120,
          height: 120,
          borderRadius: '25%',
          position: 'absolute',
          border: (theme) => `solid 8px ${alpha(theme.palette.primary.dark, 0.24)}`,
        }}
      />
    </RootStyle>
  );
};

export type LoadingOverlayProps = {
  active: boolean;
};

export default function LoadingOverlay({ active }: LoadingOverlayProps) {
  const [show, setShow] = useState<boolean>(active);

  useEffect(() => {
    setShow(active);
  }, [active]);

  if (typeof window === 'undefined' || !show || !document) {
    return null;
  }

  return (
    <Box
      sx={{
        bgcolor: (theme) => alpha(theme.palette.background.default, 0.4),
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2147483647,
      }}
    >
      <CustomSpinner />
    </Box>
  );
}
