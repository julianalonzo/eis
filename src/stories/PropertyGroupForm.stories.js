import React from 'react';

import { storiesOf } from '@storybook/react';

import { actions } from './PropertyForm.stories';

import PropertyGroupForm from '../components/PropertyGroupForm';

export const defaultPropertyGroupFormData = {
  propertyGroupName: 'General Information',
  properties: [
    {
      id: '0fc2fc00-c4c6-4ba8-875f-db6da90c1e2e',
      propertyName: 'Color',
      defaultValue: ''
    },
    {
      id: 'a9578215-126d-4de8-9bc3-97f9d0ae876b',
      propertyName: 'Brand',
      defaultValue: 'Apple'
    },
    {
      id: '5cd2e2c7-6737-46ba-a91e-e3f8950bfa79',
      propertyName: 'Price',
      defaultValue: ''
    },
    {
      id: '335c3b76-0379-41fa-9473-babeea360fc4',
      propertyName: 'Date Purchased',
      defaultValue: ''
    }
  ]
};

storiesOf('PropertyGroupForm', module).add('default', () => (
  <PropertyGroupForm
    propertyGroupFormData={defaultPropertyGroupFormData}
    {...actions}
  />
));
