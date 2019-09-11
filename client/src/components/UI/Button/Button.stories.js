import React from 'react';

import customTheme from '../../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import Button from '.';

storiesOf('Button', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <Button>Default Button</Button>)
  .add('primaryContained', () => (
    <Button variant="contained" color="primary">
      Primary
    </Button>
  ))
  .add('secondaryContained', () => (
    <Button variant="contained" color="secondary">
      Primary
    </Button>
  ))
  .add('primaryOutlined', () => (
    <Button variant="outlined" color="primary">
      Primary
    </Button>
  ))
  .add('secondaryOutlined', () => (
    <Button variant="outlined" color="secondary">
      Primary
    </Button>
  ));
