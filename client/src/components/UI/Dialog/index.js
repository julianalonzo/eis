import React from 'react';

import { useTheme } from '@material-ui/styles';
import { Dialog as MuiDialog, useMediaQuery } from '@material-ui/core';

export default function Dialog({
  isOpen,
  onClose,
  children,
  responsive = false,
  fullScreen,
  ...otherProps
}) {
  const theme = useTheme();
  const fullScreenOnMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MuiDialog
      open={isOpen}
      onClose={onClose}
      maxWidth="xs"
      fullScreen={(fullScreenOnMobile && responsive) || fullScreen}
      disablePortal
      {...otherProps}
    >
      {children}
    </MuiDialog>
  );
}
