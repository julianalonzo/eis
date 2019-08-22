import React from 'react';

import Grid from '@material-ui/core/Grid';
import IllustrationPlaceholder from './IllustrationPlaceholder';
import UploadFileIllustration from '../assets/illustrations/upload.svg';

export default function AttachmentsForm() {
  const primaryActionData = {
    label: 'Add attachments'
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <IllustrationPlaceholder
          sourceImage={UploadFileIllustration}
          alt="Upload"
          primaryText="No attachments yet"
          secondaryText="Upload attachments that are related to the item"
          action={primaryActionData}
        />
      </Grid>
      <Grid item xs={12} />
    </Grid>
  );
}
