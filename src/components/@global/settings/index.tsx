import { useState, useEffect } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import { Box, Backdrop, Paper, Tooltip, Divider, Typography, Stack } from '@mui/material';
//
import { IcSettings } from '~/components/@assets/icons';
import { EerIconButton } from '~/components/@eer-mui';
import Scrollbar from '~/components/scrollbar';
import { SizesCons } from '~/constants';

import SettingMode from './SettingMode';
import SettingColor from './SettingColor';
import SettingDirection from './SettingDirection';
import SettingFullscreen from './SettingFullscreen';

// ----------------------------------------------------------------------

export default function Settings() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} />

      <Box
        sx={{
          top: 12,
          bottom: 12,
          right: open ? 12 : 0,
          position: 'fixed',
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            bottom: (theme) => theme.spacing(2),
            right: (theme) => theme.spacing(2.5),
            boxShadow: (theme: any) => theme.customShadows.z12,
            transition: (theme) => theme.transitions.create('all'),
            color: 'grey.800',
            bgcolor: 'common.white',
            borderRadius: '50%',
            ...(open && { zIndex: -1 }),
          }}
        >
          <Tooltip title="Settings">
            <EerIconButton
              color="inherit"
              onClick={handleToggle}
              sx={{
                p: 0,
                width: 40,
                height: 40,
                '&:hover': { color: 'primary.main', bgcolor: 'transparent' },
              }}
            >
              <IcSettings sx={{ width: 24, height: 24 }} />
            </EerIconButton>
          </Tooltip>
        </Box>

        <Paper
          sx={{
            height: 1,
            width: '0px',
            overflow: 'hidden',
            boxShadow: (theme: any) => theme.customShadows.z24,
            transition: (theme) => theme.transitions.create('width'),
            ...(open && { width: SizesCons.SETTINGS_DRAWER_WIDTH }),
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 0.5, pr: 0.5, pl: 2.5 }}>
            <Typography variant="subtitle1">Settings</Typography>
            <EerIconButton onClick={handleClose}>
              <Icon icon="eva:close-fill" width={20} height={20} />
            </EerIconButton>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Scrollbar sx={{ height: 1 }}>
            <Stack spacing={4} sx={{ pt: 3, px: 3, pb: 15 }}>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Mode</Typography>
                <SettingMode />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Direction</Typography>
                <SettingDirection />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Color</Typography>
                <SettingColor />
              </Stack>
              <SettingFullscreen />
            </Stack>
          </Scrollbar>
        </Paper>
      </Box>
    </>
  );
}
