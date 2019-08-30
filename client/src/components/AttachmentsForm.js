import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Attachments from '../components/Attachments';
import Grid from '@material-ui/core/Grid';
import UploadDropzone from './UploadDropzone';

const useStyles = makeStyles(theme => ({
  uploadedAttachmentsContainer: {
    marginBottom: theme.spacing(4)
  },
  cloudUploadIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function AttachmentsForm({
  attachments,
  onAddAttachments,
  onRemoveAttachment
}) {
  const classes = useStyles();

  const formattedAttachments = attachments.map(attachment => {
    const formattedAttachmentData = {
      fileName: attachment.name,
      fileSize: attachment.size
    };

    return formattedAttachmentData;
  });

  return (
    <Grid container>
      <Grid item xs={12} className={classes.uploadDropzoneContainer}>
        <UploadDropzone
          showPlaceholder={attachments.length === 0}
          onAddFiles={onAddAttachments}
          label="attachments"
        >
          <Attachments
            attachments={formattedAttachments}
            primaryAction={onRemoveAttachment}
          />
        </UploadDropzone>
      </Grid>
    </Grid>
  );
}
