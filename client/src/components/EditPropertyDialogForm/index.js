import React, { useEffect } from 'react';

import { isRequired } from '../../util/validators';

import { Form, Field } from 'react-final-form';

import Button from '../UI/Button';
import Dialog from '../UI/Dialog';
import DialogActions from '../UI/Dialog/DialogActions';
import DialogContent from '../UI/Dialog/DialogContent';
import DialogTitle from '../UI/Dialog/DialogTitle';

import TextField from '@material-ui/core/TextField';

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
      name: values.propertyName,
      value: values.defaultValue || ''
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
            <Dialog
              isOpen={isOpen}
              onClose={onClose}
              maxWidth="sm"
              fullWidth={true}
            >
              <DialogTitle onClose={onClose}>Edit Property</DialogTitle>
              <DialogContent>
                <Field name="propertyName" validate={isRequired}>
                  {({ input, meta }) => {
                    return (
                      <TextField
                        label="Property Name"
                        variant="outlined"
                        margin="dense"
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
                <Field name="defaultValue">
                  {({ input, meta }) => {
                    return (
                      <TextField
                        label="Default Value"
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        {...input}
                      />
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
