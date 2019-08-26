import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import customTheme from '../utilities/theme';

import PrimaryButton from '../components/PrimaryButton';

storiesOf('PrimaryButton', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <PrimaryButton>Primary Button</PrimaryButton>);
