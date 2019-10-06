import React from 'react';

import { makeStyles } from '@material-ui/styles';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  },
  propertyName: {
    fontWeight: theme.typography.fontWeightMedium
  },
  actionButton: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default function Property({ _id, name, value }) {
  const classes = useStyles();

  return (
    <Grid container alignItems="baseline" className={classes.root} spacing={2}>
      <Grid item xs={5}>
        <Typography
          variant="body1"
          color="textPrimary"
          className={classes.propertyName}
        >
          {name}
        </Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body2" color="textSecondary">
          {value}
        </Typography>
      </Grid>
      <Grid item xs={2} className={classes.actionButton}>
        <IconButton size="small" className={classes.button}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
