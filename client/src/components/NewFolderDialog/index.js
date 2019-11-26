import React, { useEffect } from 'react';

import { isRequired } from '../../util/validators';

import { Form, Field } from 'react-final-form';

import Button from '../UI/Button';
import Dialog from '../UI/Dialog';
import DialogActions from '../UI/Dialog/DialogActions';
import DialogContent from '../UI/Dialog/DialogContent';
import DialogTitle from '../UI/Dialog/DialogTitle';
import TextField from '../UI/TextField';

export default function NewFolderDialog({
  isOpen,
  onClose,
  onSubmit,
  submitting
}) {
  let newFolderForm;

  useEffect(() => {
    if (isOpen) {
      newFolderForm.reset();
    }
  }, [isOpen, newFolderForm]);

  const submitHandler = async name => {
    await onSubmit(name);
    onClose();
  };

  return (
    <Form
      onSubmit={values => {
        submitHandler(values.name);
      }}
      render={({ handleSubmit, form }) => {
        newFolderForm = form;

        return (
          <form onSubmit={handleSubmit}>
            <Dialog isOpen={isOpen} onClose={onClose} fullWidth>
              <DialogTitle onClose={onClose}>New Folder</DialogTitle>
              <DialogContent>
                <Field name="name" validate={isRequired}>
                  {({ input, meta }) => {
                    return (
                      <TextField
                        label="Name"
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
