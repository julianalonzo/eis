import React from 'react';

import MuiDialog from '@material-ui/core/Dialog';

export default function Dialog({ isOpen, onClose, children, ...otherProps }) {
  return (
    <MuiDialog open={isOpen} onClose={onClose} {...otherProps}>
      {children}
    </MuiDialog>
  );
}
