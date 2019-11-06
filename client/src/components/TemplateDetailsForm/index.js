import React from "react";

import { isRequired } from "../../util/validators";

import { Field } from "react-final-form";

import { makeStyles } from "@material-ui/styles";
import { Grid, TextField } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(0, 3, 3, 0)
  },
  description: {
    width: "300px"
  }
}));

export default function TemplateDetailsForm() {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <div>
          <Field name="templateName" validate={isRequired}>
            {({ input, meta }) => {
              return (
                <TextField
                  label="Template Name"
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
          <br />
          <Field name="templateDescription">
            {({ input, meta }) => {
              return (
                <TextField
                  label="Template Description"
                  variant="outlined"
                  margin="dense"
                  className={`${classes.textField} ${classes.description}`}
                  multiline
                  rows={4}
                  maxRows={4}
                  {...input}
                />
              );
            }}
          </Field>
        </div>
      </Grid>
    </Grid>
  );
}
