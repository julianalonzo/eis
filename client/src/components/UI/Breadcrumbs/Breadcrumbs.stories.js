import React from 'react';

import customTheme from '../../../util/theme';
import { HOST } from '../../../util/constants';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import Breadcrumbs from '.';

export const defaultBreadcrumbs = [
  {
    link: `${HOST}/folders/5dae167d5d95b22ba3111415`,
    label: 'Silang'
  },
  {
    link: `${HOST}/folders/5dae16845d95b22ba3111416`,
    label: 'S521'
  },
  {
    link: `${HOST}/folders/5dae16905d95b22ba3111418`,
    label: 'S521-A'
  }
];

storiesOf('Breadcrumbs', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <Breadcrumbs breadcrumbs={defaultBreadcrumbs} />);
