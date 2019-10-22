import React, { useEffect } from 'react';

import { isRequired } from '../../util/validators';

import { Form, Field } from 'react-final-form';

import Button from '../UI/Button';
import Dialog from '../UI/Dialog';
import DialogActions from '../UI/Dialog/DialogActions';
import DialogContent from '../UI/Dialog/DialogContent';
import DialogTitle from '../UI/Dialog/DialogTitle';

import TextField from '@material-ui/core/TextField';

export default function NewFolderDialog({
  isOpen,
  onClose,
  currentFolder,
  onSubmit,
  submitting
}) {
  let newFolderForm;

  useEffect(() => {
    if (isOpen) {
      newFolderForm.reset();
    }
  }, [isOpen, newFolderForm]);

  const submitHandler = async (folderName, parentId) => {
    const folderData = {
      parent: parentId || null,
      name: folderName
    };

    await onSubmit(folderData);

    onClose();
  };

  return (
    <Form
      onSubmit={values => {
        submitHandler(values.folderName, currentFolder || '');
      }}
      render={({ handleSubmit, form }) => {
        newFolderForm = form;

        return (
          <form onSubmit={handleSubmit}>
            <Dialog
              isOpen={isOpen}
              onClose={onClose}
              maxWidth="sm"
              fullWidth={true}
            >
              <DialogTitle onClose={onClose}>New Folder</DialogTitle>
              <DialogContent>
                <Field name="folderName" validate={isRequired}>
                  {({ input, meta }) => {
                    return (
                      <TextField
                        margin="dense"
                        variant="outlined"
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
