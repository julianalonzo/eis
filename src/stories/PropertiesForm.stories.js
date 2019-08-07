import React from 'react';

import { storiesOf } from '@storybook/react';

import PropertiesForm from '../components/PropertiesForm';

export const defaultPropertyGroups = [
  {
    id: 'f0ee6fe8-c680-4aaf-90e2-0930e9b34179',
    propertyGroupName: 'General Information',
    properties: [
      {
        id: '8fdb0410-a30f-4920-bde8-6fd13b826618',
        propertyName: 'Color',
        defaultValue: 'White'
      },
      {
        id: '1dda5c73-c461-4a80-ba63-4b293f5de0ec',
        propertyName: 'Date Purchased',
        defaultValue: 'Apr 9 2019'
      },
      {
        id: 'b92d801a-c97e-432c-8a8d-11ffe0f7b184',
        propertyName: 'Assigned to',
        defaultValue: 'John Doe'
      }
    ]
  }
];

storiesOf('PropertiesForm', module)
  .add('default', () => <PropertiesForm />)
  .add('withPropertyGroup', () => (
    <PropertiesForm propertyGroups={defaultPropertyGroups} />
  ));
