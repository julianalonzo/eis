import React from 'react';

import { makeStyles } from '@material-ui/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';

const useStyles = makeStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  }
}));

export default function DialogActions({ children }) {
  const classes = useStyles();

  return (
    <MuiDialogActions className={classes.root}>{children}</MuiDialogActions>
  );
}
