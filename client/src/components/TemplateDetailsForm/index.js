import React from 'react';

import { isRequired } from '../../util/validators';

import { Field } from 'react-final-form';

import TextField from '../UI/TextField';

export default function TemplateDetailsForm() {
  return (
    <div>
      <Field name="templateName" validate={isRequired}>
        {({ input, meta }) => {
          return (
            <TextField
              label="Template Name"
              fullWidth
              {...input}
              error={meta.error && meta.touched}
              helperText={meta.error && meta.touched ? meta.error : null}
            />
          );
        }}
      </Field>
      <Field name="templateDescription">
        {({ input, meta }) => {
          return (
            <TextField
              label="Template Description"
              fullWidth
              multiline
              rows={4}
              maxRows={4}
              {...input}
            />
          );
        }}
      </Field>
    </div>
  );
}
