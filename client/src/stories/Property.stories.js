import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Property from '../components/Property';

export const property = {
  id: 'fbf0b6de-74d7-4c04-acc1-adb0fda449dc',
  name: 'UUID',
  value: '303d4dad-0bf2-4856-b593-25119ab2c36a'
};

export const actions = {
  onOpenEditPropertyDialog: action('onOpenEditPropertyDialog'),
  onOpenDeletePropertyDialog: action('onOpenDeletePropertyDialog')
};

storiesOf('Property', module).add('default', () => (
  <Property property={property} {...actions} />
));
