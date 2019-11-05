import React from 'react';

import Breadcrumbs from '../../UI/Breadcrumbs';
import Button from '../../UI/Button';

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

export default function MainPageToolBar({ onOpenNewButtonMenu, breadcrumbs }) {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="flex-end"
      alignItems="center"
      spacing={4}
      className={classes.root}
    >
      <Grid item md={10}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Grid>
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
