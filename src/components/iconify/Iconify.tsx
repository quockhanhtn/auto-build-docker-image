import { forwardRef } from 'react';
// icons
import { Icon } from '@iconify/react';
// @mui
import type { BoxProps } from '@mui/material';
import { Box } from '@mui/material';

// ------------------------------------------------------ ----------------

export type IconifyProps = BoxProps & {
  width?: number | string;
  icon: React.ReactNode | string;
};

const Iconify = forwardRef(({ icon, width = 20, sx, ...other }: IconifyProps, ref: any) => (
  <Box ref={ref} component={Icon} icon={icon} sx={{ width, height: width, ...sx }} {...other} />
));

export default Iconify;
