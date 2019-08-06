import React from 'react';

import { storiesOf } from '@storybook/react';

import PropertyForm from '../components/PropertyForm';

export const defaultPropertyFormData = {
  propertyName: 'Brand',
  defaultValue: ''
};

storiesOf('PropertyForm', module).add('default', () => (
  <PropertyForm propertyFormData={defaultPropertyFormData} />
));
