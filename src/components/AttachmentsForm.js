import React from 'react';

import { makeStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import IllustrationPlaceholder from './IllustrationPlaceholder';
import PrimaryButton from './PrimaryButton';
import UploadFileIllustration from '../assets/illustrations/upload.svg';

const useStyles = makeStyles({
  actionButtonContainer: {
    textAlign: 'center',
    marginTop: '32px'
  }
});

export default function AttachmentsForm() {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <IllustrationPlaceholder
          sourceImage={UploadFileIllustration}
          alt="Upload"
          primaryText="No attachments yet"
          secondaryText="Upload attachments that are related to the item"
        />
        <div className={classes.actionButtonContainer}>
          <PrimaryButton label="New Attachment" />
        </div>
      </Grid>
      <Grid item xs={12} />
    </Grid>
  );
}
