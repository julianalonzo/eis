import React from 'react';

import { storiesOf } from '@storybook/react';

import { muiTheme } from 'storybook-addon-material-ui';
import customTheme from '../utilities/theme';

import PropertiesForm from '../components/PropertiesForm';

export const properties = [
  {
    _id: '4945347d-8b86-4637-b5b0-860149f59e61',
    name: 'Brand',
    value: 'Apple'
  },
  {
    _id: '6098c461-d089-456f-a713-c69ea2cc19c0',
    name: 'Color',
    value: 'Space Gray'
  },
  {
    _id: '61058191-1fb1-4f27-b4a5-96ce3dc83717',
    name: 'Date Purchased',
    value: 'April 9, 2016'
  },
  {
    _id: '2007ed00-cb68-4bef-be41-0c0fd0ed2d69',
    name: 'Owner',
    value: 'SCIS'
  }
];

storiesOf('PropertiesForm', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <PropertiesForm properties={properties} />)
  .add('empty', () => <PropertiesForm properties={[]} />);
