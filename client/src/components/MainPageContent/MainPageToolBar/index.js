import React from 'react';

import Breadcrumbs from '../../UI/Breadcrumbs';
import Button from '../../UI/Button';

import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(4)
  },
  primaryActionGrid: {
    textAlign: 'right'
  }
}));

export default function MainPageToolBar({ onOpenNewButtonMenu, breadcrumbs }) {
  const classes = useStyles();

  return (
    <Grid container alignItems="center" spacing={4} className={classes.root}>
      <Grid item sm={12} md={9}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </Grid>
      <Hidden smDown>
        <Grid item md={3} className={classes.primaryActionGrid}>
          <div>
            <Button
              color="primary"
              variant="contained"
              onClick={event => {
                onOpenNewButtonMenu(event.currentTarget);
              }}
            >
              <AddIcon /> New
            </Button>
          </div>
        </Grid>
      </Hidden>
    </Grid>
  );
}
