import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Attachment from '../components/Attachment';
import Button from '../components/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  uploadedAttachmentsContainer: {
    marginBotom: theme.spacing(4)
  },
  cloudUploadIcon: {
    marginRight: theme.spacing(1)
  }
}));

export default function AttachmentsForm({ attachments = [] }) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.uploadedAttachmentsContainer}>
        <Grid container>
          {attachments.map(attachment => {
            return (
              <Grid key={attachment.fileName} item xs={12}>
                <Attachment variant="upload" attachment={attachment} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button color="secondary" variant="outlined">
          <CloudUploadIcon className={classes.cloudUploadIcon} />
          Add Attachment
        </Button>
      </Grid>
    </Grid>
  );
}
