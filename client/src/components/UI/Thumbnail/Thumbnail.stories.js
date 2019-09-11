import React from 'react';

import customTheme from '../../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import Thumbnail from '.';

export const mockImage =
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp13touch-space-select-201807?wid=892&hei=820&&qlt=80&.v=1529520060550';

storiesOf('Thumbnail', module)
  .addDecorator(muiTheme([customTheme]))
  .add('image', () => <Thumbnail src={mockImage} />)
  .add('imageWithRemove', () => (
    <Thumbnail src={mockImage} onRemoveThumbnail={() => {}} />
  ))
  .add('text', () => <Thumbnail>M</Thumbnail>);
