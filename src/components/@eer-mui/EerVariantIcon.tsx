import { Icon, IconifyIcon } from '@iconify/react';
import { Box } from '@mui/material';
import { alpha, Theme } from '@mui/material/styles';

type VariantIconProps = {
  color: 'info' | 'success' | 'warning' | 'error';
  icon: IconifyIcon | string;
  boxSize?: number;
  iconSize?: number;
};

export default function EerVariantIcon({ icon, color, boxSize = 40, iconSize = 24 }: VariantIconProps) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: boxSize,
        height: boxSize,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme: Theme) => alpha(theme.palette[color].main, 0.16),
      }}
    >
      <Icon icon={icon} width={iconSize} height={iconSize} />
    </Box>
  );
}
