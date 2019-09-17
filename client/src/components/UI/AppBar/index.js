import React from 'react';

import { makeStyles } from '@material-ui/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

export default function AppBar() {
  const classes = useStyles();

  return (
    <MuiAppBar className={classes.root}>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          EIS
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
