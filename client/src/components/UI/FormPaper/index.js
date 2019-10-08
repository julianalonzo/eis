import React from 'react';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    marginBottom: theme.spacing(6)
  }
}));

export default function FormPaper({ title, subtitle, children }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12} md={5}>
          <Typography variant="h6" color="textSecondary">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {subtitle}
          </Typography>
        </Grid>
        <Grid item xs={12} md={7}>
          {children}
        </Grid>
      </Grid>
    </Paper>
  );
}
