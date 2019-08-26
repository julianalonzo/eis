import React from 'react';

import { storiesOf } from '@storybook/react';

import { muiTheme } from 'storybook-addon-material-ui';
import customTheme from '../utilities/theme';

import PropertyForm from '../components/PropertyForm';

export const propertyFormData = {
  _id: '3d089561-55ed-42ef-8fde-78e7ec9be282',
  name: 'Brand',
  value: 'Apple'
};

storiesOf('PropertyForm', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <PropertyForm item={{ ...propertyFormData }} />)
  .add('noValue', () => (
    <PropertyForm item={{ ...propertyFormData, value: '' }} />
  ));
