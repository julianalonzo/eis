import React, { useEffect } from 'react';

import { isRequired } from '../../../util/validators';

import { Form, Field } from 'react-final-form';

import Button from '../../UI/Button';
import Dialog from '../../UI/Dialog';
import DialogActions from '../../UI/Dialog/DialogActions';
import DialogContent from '../../UI/Dialog/DialogContent';
import DialogTitle from '../../UI/Dialog/DialogTitle';
import TextField from '../../UI/TextField';

export default function NewNoteDialogForm({
  isOpen,
  onClose,
  onSubmit,
  submitting
}) {
  let newNoteForm;

  useEffect(() => {
    if (isOpen) {
      newNoteForm.reset();
    }
  }, [isOpen, newNoteForm]);

  const submitHandler = values => {
    onSubmit(values.content);
  };

  return (
    <Form
      onSubmit={values => {
        submitHandler(values);
      }}
      render={({ handleSubmit, form }) => {
        newNoteForm = form;

        return (
          <form onSubmit={handleSubmit}>
            <Dialog
              isOpen={isOpen}
              onClose={onClose}
              maxWidth="sm"
              fullWidth={true}
            >
              <DialogTitle onClose={onClose}>New Note</DialogTitle>
              <DialogContent>
                <Field name="content" validate={isRequired}>
                  {({ input, meta }) => {
                    return (
                      <TextField
                        label="Message"
                        fullWidth
                        multiline
                        rows={4}
                        rowsMax={10}
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
