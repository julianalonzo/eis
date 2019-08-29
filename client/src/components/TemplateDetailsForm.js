import React from 'react';

import { makeStyles } from '@material-ui/styles';

import { Field } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import { isRequired } from '../utilities/validators';
import TextField from '@material-ui/core/TextField';

import PropTypes from 'prop-types';

const useStyles = makeStyles(theme => ({
  row: {
    marginBottom: theme.spacing(3)
  }
}));

export default function TemplateDetailsForm({
  templateDetails: { name, description }
}) {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.row}>
        <Grid container>
          <Grid item xs={12}>
            <Field name="name" validate={isRequired}>
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
            <Field name="description">
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

TemplateDetailsForm.propTypes = {
  templateDetailsData: PropTypes.shape({
    templateName: PropTypes.string.isRequired,
    templateDescription: PropTypes.string.isRequired
  })
};
