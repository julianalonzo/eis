import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import customTheme from '../utilities/theme';

import TemplateDetailsForm from '../components/TemplateDetailsForm';

export const defaultTemplateDetailsData = {
  templateName: 'Macbook Pro Template',
  templateDescription: 'This is a template for the 13" Macbook Pro Mid-2013'
};

storiesOf('TemplateDetailsForm', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => (
    <TemplateDetailsForm templateDetailsData={defaultTemplateDetailsData} />
  ));
