import React from 'react';

import customTheme from '../../util/theme';
import { muiTheme } from 'storybook-addon-material-ui';
import { storiesOf } from '@storybook/react';

import MainPageToolBar from '.';

storiesOf('MainPageToolBar', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <MainPageToolBar />);
