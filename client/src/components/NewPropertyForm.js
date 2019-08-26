import React from 'react';

import { makeStyles } from '@material-ui/styles';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  actionButtonsContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  addPropertyIcon: {
    color: theme.color.success
  }
}));

export default function NewPropertyForm() {
  const classes = useStyles();

  // @TODO: Add form state

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={5}>
        <TextField label="Property Name" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={5}>
        <TextField label="Default Value" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={2}>
        <div className={classes.actionButtonsContainer}>
          <IconButton>
            <CheckIcon className={classes.addPropertyIcon} />
          </IconButton>
          <IconButton>
            <CloseIcon />
          </IconButton>
        </div>
      </Grid>
    </Grid>
  );
}
