import React from 'react';

import customTheme from '../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { Form } from 'react-final-form';

import AttachmentsForm from './';

export const templateAttachments = [
  {
    _id: '93ca00b6-43ab-43d7-b85d-a2f1583445d1',
    originalname: 'License.pdf',
    type: 'PDF',
    size: 23811,
    dateUploaded: '1976-04-19T12:59-0500'
  }
];

storiesOf('AttachmentsForm', module)
  .addDecorator(muiTheme([customTheme]))
  .add('empty', () => {
    return (
      <Form
        onSubmit={values => {}}
        render={({ handleSubmit }) => {
          return (
            <form>
              <AttachmentsForm attachments={[]} />
            </form>
          );
        }}
      />
    );
  })
  .add('withAttachments', () => {
    return (
      <Form
        onSubmit={values => {}}
        render={({ handleSubmit }) => {
          return (
            <form>
              <AttachmentsForm attachments={templateAttachments} />
            </form>
          );
        }}
      />
    );
  });
