import React from 'react';

import { isRequired } from '../../../util/validators';

import { Field } from 'react-final-form';

import { makeStyles } from '@material-ui/styles';
import { Grid, IconButton, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(0, 3, 3, 0)
  }
}));

export default function PropertyForm({
  fieldName,
  fieldIndex,
  onPropertyRemoved
}) {
  const classes = useStyles();

  return (
    <Grid container alignItems="baseline">
      <Grid item xs={12}>
        <Field name={`${fieldName}.name`} validate={isRequired}>
          {({ input, meta }) => {
            return (
              <TextField
                label="Property Name"
                variant="outlined"
                margin="dense"
                className={classes.textField}
                {...input}
                error={meta.error && meta.touched}
                helperText={meta.error && meta.touched ? meta.error : null}
              />
            );
          }}
        </Field>
        <Field name={`${fieldName}.value`}>
          {({ input, meta }) => {
            return (
              <TextField
                label="Default Value"
                variant="outlined"
                margin="dense"
                className={classes.textField}
                {...input}
              />
            );
          }}
        </Field>
        <IconButton size="small" onClick={() => onPropertyRemoved(fieldIndex)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
}
