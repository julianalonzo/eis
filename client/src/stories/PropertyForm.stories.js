import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PropertyForm from '../components/PropertyForm';

export const defaultPropertyFormData = {
  id: '7613d3b9-76e2-4e31-9548-979b097e9e3d',
  propertyName: 'Brand',
  defaultValue: ''
};

export const actions = {
  onRemovePropertyForm: action('onRemovePropertyForm')
};

storiesOf('PropertyForm', module).add('default', () => (
  <PropertyForm propertyFormData={defaultPropertyFormData} {...actions} />
));
