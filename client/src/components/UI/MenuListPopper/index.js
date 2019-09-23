import React from 'react';

import { makeStyles } from '@material-ui/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer
  }
}));

export default function MenuListPopper({
  isOpen,
  anchorEl,
  onClose,
  children
}) {
  const classes = useStyles();

  return (
    <Popper
      open={isOpen}
      anchorEl={anchorEl}
      transition
      disablePortal
      placement="bottom-start"
      className={classes.root}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center bottom' : 'center top'
          }}
        >
          <Paper elevation={3}>
            <ClickAwayListener onClickAway={onClose}>
              {children}
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}
