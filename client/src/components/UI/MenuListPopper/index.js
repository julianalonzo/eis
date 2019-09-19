import React from 'react';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

export default function MenuListPopper({
  isOpen,
  anchorEl,
  onClose,
  children
}) {
  return (
    <Popper
      open={isOpen}
      anchorEl={anchorEl}
      transition
      disablePortal
      placement="bottom-start"
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center bottom' : 'center top'
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={onClose}>
              {children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
