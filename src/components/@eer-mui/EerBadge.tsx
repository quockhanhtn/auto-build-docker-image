import type { BadgeProps } from '@mui/material';
import { Badge } from '@mui/material';

import { forwardRef } from 'react';
import { useCustomTheme } from '~/hooks';

// ----------------------------------------------------------------------

export type EerBadgeProps = BadgeProps & {};

const EerBadge = forwardRef(({ color = 'default', children, sx, ...other }: EerBadgeProps, ref: any) => {
  const theme = useCustomTheme();

  if (color === 'default' || color === 'error' || color === 'primary' || color === 'secondary') {
    return (
      <Badge ref={ref} color={color} sx={sx} {...other}>
        {children}
      </Badge>
    );
  }

  return (
    <Badge
      ref={ref}
      sx={{
        '& .MuiBadge-badge': {
          color: theme.palette[color].contrastText,
          bgcolor: theme.palette[color].main,
        },
        ...sx,
      }}
      {...other}
    >
      {children}
    </Badge>
  );
});

export default EerBadge;
