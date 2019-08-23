import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import Items from '../components/Items';

const useStyles = makeStyles({
  temporarySidebar: {
    display: 'block',
    width: '100%',
    height: '100vh'
  }
});

export default function MainPage() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={3}>
        <div className={classes.temporarySidebar} />
      </Grid>
      <Grid item xs={9}>
        <Items />
      </Grid>
    </Grid>
  );
}
