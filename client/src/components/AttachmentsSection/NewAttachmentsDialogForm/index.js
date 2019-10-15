import React, { useEffect } from 'react';

import useAttachmentsForm from '../../../hooks/useAttachmentsForm';

import AttachmentsForm from '../../AttachmentsForm';
import Button from '../../UI/Button';
import Dialog from '../../UI/Dialog';
import DialogTitle from '../../UI/Dialog/DialogTitle';
import DialogContent from '../../UI/Dialog/DialogContent';
import DialogActions from '../../UI/Dialog/DialogActions';
import EmptyAttachmentsIllustration from '../../../assets/illustrations/upload.svg';

import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  centered: {
    textAlign: 'center'
  },
  illustration: {
    width: '250px',
    height: '250px'
  }
}));

export default function NewAttachmentsDialogForm({
  isOpen,
  onClose,
  onSubmit,
  submitting
}) {
  const classes = useStyles();

  const [
    attachmentsForm,
    setAttachmentsForm,
    addAttachmentsHandler,
    removeAttachmentHandler
  ] = useAttachmentsForm([]);

  useEffect(() => {
    if (isOpen) {
      setAttachmentsForm([]);
    }
  }, [isOpen, setAttachmentsForm]);

  const submitHandler = () => {
    onSubmit(attachmentsForm);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} maxWidth="sm" fullWidth={true}>
      <DialogTitle onClose={onClose}>New Attachments</DialogTitle>
      <DialogContent>
        <Box className={attachmentsForm.length === 0 ? classes.centered : null}>
          {attachmentsForm.length === 0 ? (
            <img
              src={EmptyAttachmentsIllustration}
              className={classes.illustration}
              alt="No attachments"
            />
          ) : null}
          <AttachmentsForm
            attachments={attachmentsForm}
            onAddAttachments={addAttachmentsHandler}
            onRemoveAttachment={removeAttachmentHandler}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>
          Cancel
        </Button>
        <Button color="primary" onClick={submitHandler} disabled={submitting}>
          {submitting ? 'Uploading...' : 'Upload'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
