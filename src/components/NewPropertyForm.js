import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  addPropertyButton: {
    marginRight: '8px'
  }
});

export default function PropertyForm() {
  const classes = useStyles();

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={5}>
        <TextField label="Property Name" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={5}>
        <TextField label="Default Value" variant="outlined" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.addPropertyButton}
        >
          Add Property
        </Button>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
