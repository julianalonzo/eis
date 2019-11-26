import React, { useEffect } from 'react';

import { isRequired } from '../../../util/validators';

import { Form, Field } from 'react-final-form';

import Button from '../../UI/Button';
import Dialog from '../../UI/Dialog';
import DialogActions from '../../UI/Dialog/DialogActions';
import DialogContent from '../../UI/Dialog/DialogContent';
import DialogTitle from '../../UI/Dialog/DialogTitle';
import TextField from '../../UI/TextField';

export default function EditPropertyDialogForm({
  isOpen,
  onClose,
  onSubmit,
  submitting,
  initialValues
}) {
  let newPropertyForm;

  useEffect(() => {
    if (isOpen) {
      newPropertyForm.initialize(initialValues);
    }
  }, [isOpen, newPropertyForm, initialValues]);

  const submitHandler = values => {
    onSubmit({
      _id: initialValues._id,
      name: values.name,
      value: values.value || ''
    });
  };

  return (
    <Form
      onSubmit={values => {
        submitHandler(values);
      }}
      render={({ handleSubmit, form }) => {
        newPropertyForm = form;

        return (
          <form onSubmit={handleSubmit}>
            <Dialog isOpen={isOpen} onClose={onClose} fullWidth>
              <DialogTitle onClose={onClose}>Edit Property</DialogTitle>
              <DialogContent>
                <Field name="name" validate={isRequired}>
                  {({ input, meta }) => {
                    return (
                      <TextField
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
                <Field name="value">
                  {({ input, meta }) => {
                    return (
                      <TextField label="Default Value" fullWidth {...input} />
                    );
                  }}
                </Field>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} disabled={submitting}>
                  Cancel
                </Button>
                <Button type="submit" color="primary" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Save'}
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        );
      }}
    />
  );
}
