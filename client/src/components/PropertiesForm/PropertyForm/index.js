import React from 'react';

import { isRequired } from '../../../util/validators';

import { Field } from 'react-final-form';

import { makeStyles } from '@material-ui/styles';
import CloseIcon from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  actionButtonContainer: {
    paddingLeft: theme.space
  }
}));

export default function PropertyForm({
  fieldName,
  fieldIndex,
  onPropertyRemoved
}) {
  const classes = useStyles();

  return (
    <Grid container alignItems="flex-start" spacing={2}>
      <Grid item xs={5}>
        <Field name={`${fieldName}.name`} validate={isRequired}>
          {({ input, meta }) => {
            return (
              <TextField
                label="Property Name"
                variant="outlined"
                {...input}
                fullWidth
                error={meta.error && meta.touched}
                helperText={meta.error && meta.touched ? meta.error : null}
              />
            );
          }}
        </Field>
      </Grid>
      <Grid item xs={5}>
        <Field name={`${fieldName}.value`}>
          {({ input, meta }) => {
            return (
              <TextField
                label="Default Value"
                variant="outlined"
                {...input}
                fullWidth
              />
            );
          }}
        </Field>
      </Grid>
      <Grid item xs={2} className={classes.actionButtonContainer}>
        <IconButton onClick={() => onPropertyRemoved(fieldIndex)}>
          <CloseIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
