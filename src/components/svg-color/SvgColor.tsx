import { forwardRef } from 'react';
// @mui
import { Box, SxProps } from '@mui/material';
import { Theme } from '@mui/system';

// ----------------------------------------------------------------------

export type SvgColorProps = {
  src: string;
  sx?: SxProps<Theme>;
};

const SvgColor = forwardRef(({ src, sx, ...other }: SvgColorProps, ref: any) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      bgcolor: 'currentColor',
      mask: `url(${src}) no-repeat center / contain`,
      WebkitMask: `url(${src}) no-repeat center / contain`,
      ...sx,
    }}
    {...other}
  />
));

export default SvgColor;
