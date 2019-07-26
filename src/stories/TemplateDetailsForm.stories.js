import React from 'react';

import { storiesOf } from '@storybook/react';

import TemplateDetailsForm from '../components/TemplateDetailsForm';

export const defaultTemplateDetailsData = {
  templateName: 'Macbook Pro Template',
  templateDescription: 'This is a template for the 13" Macbook Pro Mid-2013'
};

storiesOf('TemplateDetailsForm', module).add('default', () => (
  <TemplateDetailsForm templateDetailsData={defaultTemplateDetailsData} />
));
