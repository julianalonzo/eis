import React from 'react';

import Button from '../UI/Button';

import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

export default function MainPageToolBar({ onOpenNewButtonMenu }) {
  return (
    <Grid container justify="flex-end">
      <Grid item md={2}>
        <Button
          color="primary"
          variant="contained"
          onClick={onOpenNewButtonMenu}
        >
          <AddIcon /> New
        </Button>
      </Grid>
    </Grid>
  );
}
