import React from 'react';

import customTheme from '../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import Templates from '.';

export const templates = [
  {
    _id: '123456',
    name: 'Macbook Pro',
    description: 'Template for the brand new Macbook Pro 2019 version',
    item: {
      thumbnails: []
    }
  }
];

storiesOf('Templates', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <Templates templates={[]} />)
  .add('withTemplates', () => <Templates templates={templates} />);
