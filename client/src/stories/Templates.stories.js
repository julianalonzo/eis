import React from 'react';

import { storiesOf } from '@storybook/react';

import { muiTheme } from 'storybook-addon-material-ui';
import customTheme from '../utilities/theme';

import Templates from '../components/Templates';

export const templates = [
  {
    _id: '123456',
    name: 'Macbook Pro',
    description: 'Template for the brand new Macbook Pro 2019 version',
    item: {
      thumbnails: []
    }
  },
  {
    _id: '78910',
    name: 'Macbook Pro',
    description:
      'Template for the brand new Macbook Pro 2019 version. Template for the brand new Macbook Pro 2019 version',
    item: {
      thumbnails: []
    }
  }
];

storiesOf('Templates', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <Templates templates={[]} />)
  .add('withTemplates', () => <Templates templates={templates} />);
