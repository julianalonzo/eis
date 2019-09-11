import React from 'react';

import customTheme from '../../util/theme';

import { Form } from 'react-final-form';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import TemplateDetailsForm from '.';

export const mockTemplateDetailsFormData = {
  templateName: 'Macbook Pro Template',
  templateDescription: 'Template for the new Macbook Pro'
};

storiesOf('TemplateDetailsForm', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => (
    <Form
      initialValues={mockTemplateDetailsFormData}
      onSubmit={values => {}}
      render={({ handleSubmit }) => {
        return (
          <form>
            <TemplateDetailsForm />
          </form>
        );
      }}
    ></Form>
  ));
