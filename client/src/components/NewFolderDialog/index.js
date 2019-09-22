import React from 'react';

import { isRequired } from '../../util/validators';

import { Form, Field } from 'react-final-form';

import Button from '../UI/Button';
import Dialog from '../UI/Dialog';
import DialogActions from '../UI/Dialog/DialogActions';
import DialogContent from '../UI/Dialog/DialogContent';
import DialogTitle from '../UI/Dialog/DialogTitle';

import TextField from '@material-ui/core/TextField';

export default function NewFolderDialog({ isOpen, onClose }) {
  return (
    <Form
      onSubmit={values => {}}
      render={({ handleSubmit }) => {
        return (
          <Dialog
            isOpen={isOpen}
            onClose={onClose}
            maxWidth="sm"
            fullWidth={true}
          >
            <DialogTitle onClose={onClose}>New Folder</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <Field name="folderName" validate={isRequired}>
                  {({ input, meta }) => {
                    return (
                      <TextField
                        label="Folder Name"
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
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button color="primary">Create Folder</Button>
            </DialogActions>
          </Dialog>
        );
      }}
    />
  );
}
