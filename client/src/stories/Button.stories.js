import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import customTheme from '../utilities/theme';

import Button from '../components/Button';

storiesOf('Button', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <Button>Primary Button</Button>)
  .add('secondary', () => <Button color="secondary">Secondary Button</Button>)
  .add('outlinedPrimary', () => (
    <Button variant="outlined" color="primary">
      Outlined Primary
    </Button>
  ))
  .add('outlinedSecondary', () => (
    <Button variant="outlined" color="secondary">
      Outlined Secondary
    </Button>
  ));
