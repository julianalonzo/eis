import React from 'react';

import { makeStyles } from '@material-ui/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

export default function DialogContent({ children, withDividers = false }) {
  const classes = useStyles();

  return (
    <MuiDialogContent className={classes.root} dividers={withDividers}>
      {children}
    </MuiDialogContent>
  );
}
