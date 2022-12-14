import type { SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const varSmallClick = {
  hover: { scale: 1.04 },
  tap: { scale: 0.96 },
};

const varMediumClick = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

// ----------------------------------------------------------------------

export type ButtonAnimateProps = {
  mediumClick?: boolean;
  children: JSX.Element;
  sx?: SxProps<Theme>;
};

export default function ButtonAnimate({ mediumClick = false, children, sx, ...other }: ButtonAnimateProps) {
  return (
    <Box
      component={motion.div}
      whileTap="tap"
      whileHover="hover"
      variants={mediumClick ? varMediumClick : varSmallClick}
      sx={{ display: 'inline-flex', ...sx }}
      {...other}
    >
      {children}
    </Box>
  );
}
