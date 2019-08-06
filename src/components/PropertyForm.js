import React from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function PropertyForm({
  propertyFormData: { propertyName, defaultValue }
}) {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={3}>
        <Typography>{propertyName}</Typography>
      </Grid>
      <Grid item xs={7}>
        <TextField
          label="Default Value"
          variant="outlined"
          fullWidth
          value={defaultValue}
        />
      </Grid>
      <Grid item xs={2}>
        <IconButton>
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
