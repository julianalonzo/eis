import React from 'react';

import List from '@material-ui/core/List';
import Attachment from './Attachment';

export default function Attachments({ attachments, primaryAction }) {
  return (
    <List>
      {attachments.map((attachment, index) => {
        return (
          <Attachment
            key={attachment.fileName + '_' + index}
            variant="upload"
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
