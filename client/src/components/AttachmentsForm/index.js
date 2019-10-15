import React from 'react';

import UploadAttachments from './UploadAttachments';
import UploadDropzone from '../UI/UploadDropzone';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

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
    let size = 0;

    if (attachment instanceof File) {
      name = attachment.name;
      size = attachment.size;
    } else {
      name = attachment.originalname;
      size = attachment.size;
    }

    const formattedAttachmentData = {
      name: name,
      size: size
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
          {formattedAttachments.length > 0 ? (
            <UploadAttachments
              attachments={formattedAttachments}
              onRemoveAttachment={onRemoveAttachment}
            />
          ) : null}
        </UploadDropzone>
      </Grid>
    </Grid>
  );
}
