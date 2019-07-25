import React from 'react';

import { storiesOf } from '@storybook/react';

import { actions } from './Property.stories';
import Properties from '../components/Properties';

export const defaultPropertyGroups = [
  {
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
  },
  {
    id: 'ad4ff634-9923-453f-8204-bee86f63a6cc',
    propertyGroupName: 'Other Information',
    properties: [
      {
        id: 'bdfb662c-7a36-4b81-a749-401b903a73e9',
        name: 'Purchased from',
        value: 'Octagon'
      },
      {
        id: '38ae54e9-f844-46ad-8e84-32019d258e52',
        name: 'Warranty',
        value: '3 years'
      },
      {
        id: '5a2ece3e-254a-43b5-af1e-425025181364',
        name: 'Price',
        value: 'P100000'
      }
    ]
  }
];

storiesOf('Properties', module).add('default', () => (
  <Properties propertyGroups={defaultPropertyGroups} {...actions} />
));
