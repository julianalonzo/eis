import React from 'react';

import { makeStyles } from '@material-ui/styles';

import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  actionButtonContainer: {
    paddingLeft: theme.space
  }
}));

export default function PropertyForm({ name, value }) {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item xs={10}>
        <TextField variant="outlined" label={name} value={value} fullWidth />
      </Grid>
      <Grid item xs={2} className={classes.actionButtonContainer}>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

PropertyForm.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string
};
