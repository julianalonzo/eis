import React from 'react';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

export default function PropertyForm({
  propertyFormData: { id, propertyName, defaultValue },
  onRemovePropertyForm
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
        <IconButton
          onClick={() => {
            onRemovePropertyForm(id);
          }}
        >
          <RemoveCircleOutlineIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

PropertyForm.propTypes = {
  propertyFormData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    propertyName: PropTypes.string.isRequired,
    defaultValue: PropTypes.string
  }),
  onRemovePropertyForm: PropTypes.func.isRequired
};
