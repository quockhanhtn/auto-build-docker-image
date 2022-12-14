// icons
import alertCircleFill from '@iconify/icons-eva/alert-circle-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import infoFill from '@iconify/icons-eva/info-fill';
//
import { Box, Button, DialogContentText, Typography } from '@mui/material';
import { DraggableDialog } from '~/components/dialog';
import { EerVariantIcon } from '~/components/@eer-mui';

import { useCustomTheme, useModal } from '~/hooks';

const ariaLabelledBy = 'global-modal-title';
const ariaDescribedby = 'global-modal-description';

export default function GlobalModal() {
  const {
    openState: [open, setOpen],
    title,
    content,
    icon,
    buttons,
    clearPrevData,
  } = useModal();
  const theme = useCustomTheme();

  const handleClose = () => {
    setOpen(false);
    clearPrevData();
  };

  const renderTitle = (): React.ReactNode => {
    let titleElement: React.ReactNode;
    if (typeof title === 'string' || title instanceof String) {
      titleElement = (
        <Typography component="span" gutterBottom height="100%" variant="subtitle2" sx={{ margin: 'auto 0' }}>
          {title}
        </Typography>
      );
    } else {
      titleElement = title;
    }

    if (icon === undefined) {
      return title;
    }

    let iconElement: React.ReactNode;
    switch (icon) {
      case 'info':
        iconElement = <EerVariantIcon icon={alertCircleFill} color="info" boxSize={32} iconSize={20} />;
        break;
      case 'success':
        iconElement = <EerVariantIcon icon={checkmarkCircle2Fill} color="success" boxSize={32} iconSize={20} />;
        break;
      case 'warning':
        iconElement = <EerVariantIcon icon={infoFill} color="warning" boxSize={32} iconSize={20} />;
        break;
      case 'error':
        iconElement = <EerVariantIcon icon={alertTriangleFill} color="error" boxSize={32} iconSize={20} />;
        break;

      default:
        iconElement = icon;
        break;
    }

    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
        {iconElement}
        {titleElement}
      </Box>
    );
  };

  const renderContent = (): React.ReactNode => {
    if (typeof content === 'string' || content instanceof String) {
      return <DialogContentText id={ariaDescribedby}>{content}</DialogContentText>;
    }
    return content;
  };

  const renderActions = (): React.ReactNode =>
    buttons?.map((b, i) => (
      <Button
        key={`modal-button-${i}`}
        onClick={() => {
          if (b.onClick) {
            b.onClick();
          }
          handleClose();
        }}
        variant="outlined"
        color="primary"
        sx={{ padding: theme.spacing(1, 1.5) }}
        {...b.buttonProps}
      >
        {b.label}
      </Button>
    ));

  return (
    <DraggableDialog
      open={open}
      onClose={handleClose}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedby}
      TitleComponent={{
        children: renderTitle(),
        sx: {},
      }}
      ContentComponent={{
        children: (
          <Box
            sx={{
              minWidth: 300,
              padding: theme.spacing(2, 0.5),
            }}
          >
            {renderContent()}
          </Box>
        ),
        dividers: true,
        sx: {},
      }}
      ActionsComponent={{
        children: renderActions(),
      }}
    />
  );
}
