import React from 'react';

import Button from '../UI/Button';

import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4)
  },
  primaryActionGrid: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));

export default function MainPageToolBar({ onOpenNewButtonMenu }) {
  const classes = useStyles();

  return (
    <Grid container justify="flex-end" spacing={4} className={classes.root}>
      <Grid item md={2} className={classes.primaryActionGrid}>
        <Button
          color="primary"
          variant="contained"
          onClick={event => {
            onOpenNewButtonMenu(event.currentTarget);
          }}
        >
          <AddIcon /> New
        </Button>
      </Grid>
    </Grid>
  );
}
