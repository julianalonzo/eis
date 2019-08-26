import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import customTheme from '../utilities/theme';

import Attachment from '../components/Attachment';

export const defaultAttachment = {
  id: '93ca00b6-43ab-43d7-b85d-a2f1583445d1',
  fileName: 'License.pdf',
  filePath: 'http://www.nearinc.com/pubs/DraftSLA_US.pdf',
  type: 'PDF',
  fileSize: 23811,
  dateUploaded: '1976-04-19T12:59-0500'
};

storiesOf('Attachment', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <Attachment attachment={defaultAttachment} />)
  .add('upload', () => (
    <Attachment attachment={defaultAttachment} variant="upload" />
  ));
