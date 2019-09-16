import React from 'react';

import customTheme from '../../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import AppBar from '.';

storiesOf('AppBar', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <AppBar />);
