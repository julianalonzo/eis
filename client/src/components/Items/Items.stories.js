import React from 'react';

import customTheme from '../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import Items from '.';

export const defaultItems = [
  {
    _id: '5d75e10927b78696bea6d60c',
    name: 'MBP',
    category: 'Laptop',
    condition: 'Broken',
    thumbnails: [
      {
        _id: '5d75e0cc27b78696bea6d604',
        type: 'thumbnail',
        originalname: 'macbook.jpg',
        mimetype: 'image/jpeg',
        filename: 'd32e138f-dc59-49d9-aee4-cd0ea1fea759-macbook.jpg',
        path: 'uploads/d32e138f-dc59-49d9-aee4-cd0ea1fea759-macbook.jpg',
        size: 572565
      }
    ]
  }
];

storiesOf('Items', module)
  .addDecorator(muiTheme([customTheme]))
  .add('empty', () => <Items items={[]} />)
  .add('withItems', () => <Items items={defaultItems} />);
