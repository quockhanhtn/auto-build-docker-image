import { Icon } from '@iconify/react';
import { alpha, Button } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

export default function SettingFullscreen() {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <Button
      fullWidth
      size="large"
      variant="outlined"
      color={isFullscreen ? 'primary' : 'inherit'}
      startIcon={<Icon icon={isFullscreen ? 'ic:round-fullscreen-exit' : 'ic:round-fullscreen'} />}
      onClick={toggleFullScreen}
      sx={{
        fontSize: 14,
        ...(isFullscreen && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        }),
      }}
    >
      {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
    </Button>
  );
}
