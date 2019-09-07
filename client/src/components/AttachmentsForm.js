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
    let name = '';
    let size = '';

    if (attachment instanceof File) {
      name = attachment.name;
      size = attachment.size;
    } else {
      name = attachment.originalname;
      size = attachment.size;
    }

    const formattedAttachmentData = {
      fileName: name,
      fileSize: size
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
