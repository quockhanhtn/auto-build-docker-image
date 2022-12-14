import type { AvatarProps } from '@mui/material';
import { Avatar } from '@mui/material';

import { forwardRef } from 'react';
import { useCustomTheme } from '~/hooks';

// ----------------------------------------------------------------------

export type EerAvatarProps = AvatarProps & {
  color: 'primary' | 'secondary' | 'default' | 'error' | 'info' | 'success' | 'warning';
  children: JSX.Element;
};

const EerAvatar = forwardRef(({ color = 'default', sx, children, ...other }: EerAvatarProps, ref: any) => {
  const theme = useCustomTheme();

  if (color === 'default' || color === 'error' || color === 'primary' || color === 'secondary') {
    return (
      <Avatar ref={ref} sx={sx} {...other}>
        {children}
      </Avatar>
    );
  }

  return (
    <Avatar
      ref={ref}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        ...sx,
      }}
      {...other}
    >
      {children}
    </Avatar>
  );
});

export default EerAvatar;
