import React from 'react';

import { isRequired } from '../../util/validators';

import { Field } from 'react-final-form';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  row: {
    marginBottom: theme.spacing(3)
  }
}));

export default function TemplateDetailsForm() {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <Field name="templateName" validate={isRequired}>
              {({ input, meta }) => {
                return (
                  <TextField
                    label="Template Name"
                    variant="outlined"
                    fullWidth
                    {...input}
                    error={meta.error && meta.touched}
                    helperText={meta.error && meta.touched ? meta.error : null}
                  />
                );
              }}
            </Field>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <Field name="templateDescription">
              {({ input, meta }) => {
                return (
                  <TextField
                    label="Template Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    maxRows={4}
                    rows={4}
                    {...input}
                  />
                );
              }}
            </Field>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
