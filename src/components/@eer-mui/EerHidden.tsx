// material
import type { Breakpoint, Theme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

// ----------------------------------------------------------------------

export type EerHiddenProps = {
  children: JSX.Element | JSX.Element[];
  breakPointKey: Breakpoint | number;
  type: 'up' | 'down';
};

export default function EerHidden({ breakPointKey, type, children }: EerHiddenProps) {
  const hidden = useMediaQuery((theme: Theme) =>
    type === 'up' ? theme.breakpoints.up(breakPointKey) : theme.breakpoints.down(breakPointKey),
  );

  return hidden ? null : children;
}
