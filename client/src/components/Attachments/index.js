import React from 'react';

import Attachment from './Attachment';

import List from '@material-ui/core/List';

export default function Attachments({ attachments, variant, primaryAction }) {
  return (
    <List>
      {attachments.map((attachment, index) => {
        return (
          <Attachment
            key={attachment._id || attachment.name + '_' + index}
            variant={variant}
            attachment={attachment}
            primaryAction={() => {
              primaryAction(index);
            }}
          />
        );
      })}
    </List>
  );
}
