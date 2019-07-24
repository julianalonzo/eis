import React from 'react';

import { storiesOf } from '@storybook/react';

import ConditionDropdownOptions from '../components/ConditionDropdownOptions';

storiesOf('ConditionDropdownOptions', module)
  .add('default (working)', () => (
    <ConditionDropdownOptions currentCondition="Working" />
  ))
  .add('broken', () => <ConditionDropdownOptions currentCondition="Broken" />)
  .add('missing', () => <ConditionDropdownOptions currentCondition="Missing" />)
  .add('brokenParts', () => (
    <ConditionDropdownOptions currentCondition="Broken Parts" />
  ))
  .add('missingParts', () => (
    <ConditionDropdownOptions currentCondition="Missing Parts" />
  ));
