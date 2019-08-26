import React from 'react';

import { storiesOf } from '@storybook/react';

import { muiTheme } from 'storybook-addon-material-ui';
import customTheme from '../utilities/theme';

import PropertyForm from '../components/PropertyForm';

export const propertyFormData = {
  _id: '',
  name: 'Brand',
  value: 'Apple'
};

storiesOf('PropertyForm', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <PropertyForm {...propertyFormData} />)
  .add('noValue', () => <PropertyForm {...propertyFormData} value="" />);
