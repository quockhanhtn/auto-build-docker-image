import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const CloseDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function CustomDialogTitle(props: any) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2, mb: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

CustomDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

interface CloseDialogComponentProps {
  children: any;
  handleClose: any;
  id: string;
  isOpen: boolean;
  maxWidth: any;
  title: string;
}

export default function CloseDialogComponent({
  id,
  title,
  handleClose,
  isOpen,
  children,
  maxWidth = 'md',
}: CloseDialogComponentProps) {
  return (
    <CloseDialog
      id={id}
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      maxWidth={maxWidth}
    >
      <CustomDialogTitle onClose={handleClose}>{title}</CustomDialogTitle>
      {children}
    </CloseDialog>
  );
}

CloseDialogComponent.propTypes = {
  children: PropTypes.node,
  handleClose: PropTypes.func,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  maxWidth: PropTypes.string,
  title: PropTypes.string,
};
