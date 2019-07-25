import React from 'react';

import { storiesOf } from '@storybook/react';

import PropertyGroup from '../components/PropertyGroup';

export const defaultPropertyGroups = {
  id: 'f0ee6fe8-c680-4aaf-90e2-0930e9b34179',
  propertyGroupName: 'General Information',
  properties: [
    {
      id: '8fdb0410-a30f-4920-bde8-6fd13b826618',
      name: 'Color',
      value: 'White'
    },
    {
      id: '1dda5c73-c461-4a80-ba63-4b293f5de0ec',
      name: 'Date Purchased',
      value: 'Apr 9 2019'
    },
    {
      id: 'b92d801a-c97e-432c-8a8d-11ffe0f7b184',
      name: 'Assigned to',
      value: 'John Doe'
    }
  ]
};

storiesOf('PropertyGroup', module).add('default', () => (
  <PropertyGroup propertyGroup={defaultPropertyGroups} />
));
