import React from 'react';

import customTheme from '../../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import ItemDetailsSection from '.';

export const defaultItem = {
  _id: '5d75e10927b78696bea6d60c',
  name: 'MBP',
  category: 'Laptop',
  condition: 'Broken'
};

storiesOf('ItemDetailsSection', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <ItemDetailsSection item={defaultItem} />);
