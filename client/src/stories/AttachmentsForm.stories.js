import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import customTheme from '../utilities/theme';

import AttachmentsForm from '../components/AttachmentsForm';

export const defaultAttachments = [
  {
    fileName: 'License.pdf',
    fileSize: 23811,
    dateUploaded: '1976-04-19T12:59-0500'
  }
];

storiesOf('AttachmentsForm', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <AttachmentsForm attachments={defaultAttachments} />);
