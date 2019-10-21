import React from 'react';

import customTheme from '../../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import Attachments from './';

export const defaultAttachments = [
  {
    _id: '93ca00b6-43ab-43d7-b85d-a2f1583445d1',
    name: 'License.pdf',
    path: 'http://www.nearinc.com/pubs/DraftSLA_US.pdf',
    type: 'PDF',
    size: 23811,
    dateUploaded: '1976-04-19T12:59-0500'
  },
  {
    _id: '93ca00b6-43ab-43d7-b85d-a2f1583445d2',
    name: 'Document.pdf',
    path: 'http://www.nearinc.com/pubs/DraftSLA_US.pdf',
    type: 'PDF',
    size: 23811,
    dateUploaded: '1976-04-19T12:59-0500'
  },
  {
    _id: '93ca00b6-43ab-43d7-b85d-a2f1583445d3',
    name: 'Contract.pdf',
    path: 'http://www.nearinc.com/pubs/DraftSLA_US.pdf',
    type: 'PDF',
    size: 23811,
    dateUploaded: '1976-04-19T12:59-0500'
  }
];

storiesOf('Attachments', module)
  .addDecorator(muiTheme([customTheme]))
  .add('upload', () => {
    return <Attachments variant="upload" attachments={defaultAttachments} />;
  })
  .add('file', () => {
    return <Attachments attachments={defaultAttachments} />;
  });
