import React from 'react';

import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function AppBar() {
  return (
    <MuiAppBar>
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit">
          EIS
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}
