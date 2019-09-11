import React from 'react';

import customTheme from '../../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import IllustrationPlaceholder from '.';

storiesOf('IllustrationPlaceholder', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <IllustrationPlaceholder />)
  .add('withLabelsNoAction', () => (
    <IllustrationPlaceholder
      title="Hi, I'm a title"
      subtitle="And I'm a subtitle"
    />
  ))
  .add('withLabelsAndAction', () => (
    <IllustrationPlaceholder
      title="Hi, I'm a title"
      subtitle="And I'm a subtitle"
      action={{ label: 'Greet' }}
    />
  ))
  .add('sm', () => (
    <IllustrationPlaceholder
      title="Hi, I'm a title"
      subtitle="And I'm a subtitle"
      action={{ label: 'Greet' }}
      size="sm"
    />
  ))
  .add('md', () => (
    <IllustrationPlaceholder
      title="Hi, I'm a title"
      subtitle="And I'm a subtitle"
      action={{ label: 'Greet' }}
      size="md"
    />
  ))
  .add('lg', () => (
    <IllustrationPlaceholder
      title="Hi, I'm a title"
      subtitle="And I'm a subtitle"
      action={{ label: 'Greet' }}
      size="lg"
    />
  ))
  .add('illustration', () => (
    <IllustrationPlaceholder
      title="Hi, I'm a title"
      subtitle="And I'm a subtitle"
      size="md"
      variant="illustration"
    />
  ));
