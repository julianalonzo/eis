import React from 'react';

import Attachment from './Attachment';

import Grid from '@material-ui/core/Grid';

export default function Attachments({ attachments, variant, primaryAction }) {
  return (
    <Grid>
      {attachments.map((attachment, index) => {
        return (
          <Grid
            key={attachment._id ? attachment._id : index}
            item
            xs={12}
            md={variant === 'upload' ? 12 : 10}
            xl={9}
          >
            <Attachment
              key={attachment._id || attachment.name + '_' + index}
              variant={variant}
              attachment={attachment}
              primaryAction={event => {
                if (variant === 'upload') {
                  primaryAction(index);
                } else {
                  primaryAction(event, attachment);
                }
              }}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
