import React from 'react';

import { storiesOf } from '@storybook/react';

import IllustrationPlaceholder from '../components/IllustrationPlaceholder';

storiesOf('IllustrationPlaceholder', module)
  .add('default', () => <IllustrationPlaceholder />)
  .add('withLabelsNoAction', () => (
    <IllustrationPlaceholder
      primaryText="Hi, I'm a primary label"
      secondaryText="And I'm a secondarylabel"
    />
  ))
  .add('withLabelsAndAction', () => (
    <IllustrationPlaceholder
      primaryText="Hi, I'm a primary label"
      secondaryText="And I'm a secondarylabel"
      action={{ label: 'Greet' }}
    />
  ));
