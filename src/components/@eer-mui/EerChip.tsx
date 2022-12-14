import type { ChipProps } from '@mui/material';
import { Chip } from '@mui/material';
import { alpha, styled, emphasize } from '@mui/material/styles';

import { forwardRef } from 'react';

// ----------------------------------------------------------------------

type ChipStyleProps = {
  theme?: any;
  styleProps: any;
};

const ChipStyle = styled(Chip)(({ theme, styleProps }: ChipStyleProps) => {
  const { color, variant, clickable, onDelete } = styleProps;

  // Filled
  const styleFilled = (color: string) => ({
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
    '& .MuiChip-icon': { color: 'inherit' },
    '& .MuiChip-avatar': {
      color: theme.palette[color].lighter,
      backgroundColor: theme.palette[color].dark,
    },
    '& .MuiChip-deleteIcon': {
      color: alpha(theme.palette[color].contrastText, 0.7),
      '&:hover, &:active': { color: theme.palette[color].contrastText },
    },
  });

  const styleFilledClickable = (color: string) => ({
    '&:hover, &:focus': {
      backgroundColor: emphasize(theme.palette[color].main, theme.palette.action.hoverOpacity),
    },
  });

  const styleFilledDeletable = (color: string) => ({
    '&:focus': {
      backgroundColor: emphasize(theme.palette[color].main, theme.palette.action.focusOpacity),
    },
  });

  // Outlined
  const styleOutlined = (color: string) => ({
    color: theme.palette[color].main,
    border: `1px solid ${theme.palette[color].main}`,
    '&:focus, &.MuiChip-clickable:hover': {
      backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity),
    },
    '& .MuiChip-icon': { color: 'currentColor' },
    '& .MuiChip-avatar': {
      color: theme.palette[color].lighter,
      backgroundColor: theme.palette[color].dark,
    },
    '& .MuiChip-deleteIcon': {
      color: alpha(theme.palette[color].main, 0.7),
      '&:hover, &:active': { color: theme.palette[color].main },
    },
  });

  return {
    ...(variant === 'filled'
      ? {
          ...styleFilled(color),
          ...(clickable && { ...styleFilledClickable(color) }),
          ...(onDelete && { ...styleFilledDeletable(color) }),
        }
      : {
          ...styleOutlined(color),
        }),
  };
});

// ----------------------------------------------------------------------

export type EerChipProps = ChipProps & {};

const EerChip = forwardRef(
  (
    { color = 'default', variant = 'filled', clickable: clickableProp, onDelete: onDeleteProp, ...other }: EerChipProps,
    ref: any,
  ) => {
    if (color === 'default' || color === 'primary' || color === 'secondary') {
      return (
        <Chip
          ref={ref}
          color={color}
          variant={variant}
          clickable={clickableProp && clickableProp}
          onDelete={onDeleteProp && onDeleteProp}
          {...other}
        />
      );
    }

    return (
      <ChipStyle
        ref={ref}
        variant={variant}
        clickable={clickableProp && clickableProp}
        onDelete={onDeleteProp && onDeleteProp}
        styleProps={{
          color,
          variant,
          clickable: clickableProp && clickableProp,
          onDelete: onDeleteProp && onDeleteProp,
        }}
        {...other}
      />
    );
  },
);

export default EerChip;
