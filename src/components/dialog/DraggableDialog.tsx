// @mui
import type { DialogProps, PaperProps } from '@mui/material';
import { Dialog, DialogActions, DialogContent, DialogTitle, Paper } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

import Draggable from 'react-draggable';

import { useResponsive } from '~/hooks';

function PaperComponent(props: PaperProps) {
  return (
    <Draggable handle={`#${props['aria-labelledby']}`} cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

export type DraggableDialogProps = Omit<DialogProps, 'children'> & {
  'aria-labelledby': string;
  'aria-describedby': string;
  TitleComponent: {
    children: React.ReactNode;
    sx?: SxProps<Theme> | undefined;
  };
  ContentComponent: {
    children: React.ReactNode;
    dividers?: boolean;
    sx?: SxProps<Theme> | undefined;
  };
  ActionsComponent?: {
    children: React.ReactNode;
    sx?: SxProps<Theme> | undefined;
  };
};

export default function DraggableDialog({
  TitleComponent,
  ContentComponent,
  ActionsComponent,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}: DraggableDialogProps) {
  const fullScreen = useResponsive('down', 'md');

  return (
    <Dialog
      PaperComponent={PaperComponent}
      PaperProps={{ 'aria-labelledby': ariaLabelledby }}
      {...props}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      fullScreen={fullScreen}
    >
      <DialogTitle
        sx={{
          cursor: 'move',
          padding: (theme) => theme.spacing(1.5),
          ...TitleComponent.sx,
        }}
        id={ariaLabelledby}
      >
        {TitleComponent.children}
      </DialogTitle>
      <DialogContent dividers={ContentComponent.dividers ?? false} sx={ContentComponent.sx}>
        {ContentComponent.children}
      </DialogContent>
      {ActionsComponent && (
        <DialogActions
          sx={{
            padding: (theme) => theme.spacing(1, 2),
            ...ActionsComponent.sx,
          }}
        >
          {ActionsComponent.children}
        </DialogActions>
      )}
    </Dialog>
  );
}
