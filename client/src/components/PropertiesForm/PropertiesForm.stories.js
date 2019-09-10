import React from 'react';

import customTheme from '../../util/theme';

import arrayMutators from 'final-form-arrays';
import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { Form } from 'react-final-form';

import PropertiesForm from '.';

export const properties = [
  {
    name: 'Brand',
    value: 'Apple'
  },
  {
    name: 'Color',
    value: 'Space Gray'
  },
  {
    name: 'Date Purchased',
    value: 'April 9, 2016'
  },
  {
    name: 'Owner',
    value: 'SCIS'
  }
];

storiesOf('PropertiesForm', module)
  .addDecorator(muiTheme([customTheme]))
  .add('empty', () => (
    <Form
      initialValues={{ properties: [] }}
      onSubmit={values => {}}
      mutators={{ ...arrayMutators }}
      render={({
        handleSubmit,
        form: {
          mutators: { push }
        }
      }) => {
        return (
          <form>
            <PropertiesForm />
          </form>
        );
      }}
    />
  ))
  .add('withProperties', () => (
    <Form
      initialValues={{ properties: properties }}
      onSubmit={values => {}}
      mutators={{ ...arrayMutators }}
      render={({
        handleSubmit,
        form: {
          mutators: { push }
        }
      }) => {
        return (
          <form>
            <PropertiesForm />
          </form>
        );
      }}
    />
  ));
