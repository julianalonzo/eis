import React from 'react';

import { storiesOf } from '@storybook/react';

import PropertyGroupForm from '../components/PropertyGroupForm';

export const defaultPropertyGroupFormData = {
  propertyGroupName: 'General Information',
  properties: [
    { propertyName: 'Color', defaultValue: '' },
    { propertyName: 'Brand', defaultValue: 'Apple' },
    { propertyName: 'Price', defaultValue: '' },
    { propertyName: 'Date Purchased', defaultValue: '' }
  ]
};

storiesOf('PropertyGroupForm', module).add('default', () => (
  <PropertyGroupForm propertyGroupFormData={defaultPropertyGroupFormData} />
));
