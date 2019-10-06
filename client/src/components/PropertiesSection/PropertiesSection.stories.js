import React from 'react';

import customTheme from '../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import PropertiesSection from '.';

export const defaultProperties = [
  {
    _id: 'f425ab38-f111-4b41-9b78-1349473b76ff',
    name: 'Color',
    value: 'Space Gray'
  },
  {
    _id: 'f425ab38-f111-4b41-9b78-1349473b76fg',
    name: 'Weight',
    value: '1 gram'
  },
  {
    _id: 'f425ab38-f111-4b41-9b78-1349473b76fh',
    name: 'Warranty',
    value: '4 years'
  }
];

storiesOf('PropertiesSection', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <PropertiesSection properties={defaultProperties} />);
