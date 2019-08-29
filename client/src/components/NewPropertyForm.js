import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Box from '@material-ui/core/Box';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { Form, Field } from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import { isRequired } from '../utilities/validators';

const useStyles = makeStyles(theme => ({
  actionButtonsContainer: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export default function NewPropertyForm({
  onPropertyAdded,
  onHideNewPropertyForm
}) {
  const classes = useStyles();

  return (
    <Form
      onSubmit={values => {
        onPropertyAdded('properties', { ...values });
        onHideNewPropertyForm();
      }}
      render={({ handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs={5}>
                <Field name="name" validate={isRequired}>
                  {({ input, meta }) => {
                    return (
                      <TextField
                        variant="outlined"
                        label="Property Name"
                        fullWidth
                        {...input}
                        error={meta.error && meta.touched}
                        helperText={
                          meta.error && meta.touched ? meta.error : null
                        }
                      />
                    );
                  }}
                </Field>
              </Grid>
              <Grid item xs={5}>
                <Field name="value">
                  {({ input, meta }) => {
                    return (
                      <TextField
                        variant="outlined"
                        label="Default Value"
                        fullWidth
                        {...input}
                      />
                    );
                  }}
                </Field>
              </Grid>
              <Grid item xs={2}>
                <Box className={classes.actionButtonsContainer}>
                  <IconButton color="primary" type="submit">
                    <CheckIcon />
                  </IconButton>
                  <IconButton onClick={onHideNewPropertyForm}>
                    <CloseIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        );
      }}
    ></Form>
  );
}
