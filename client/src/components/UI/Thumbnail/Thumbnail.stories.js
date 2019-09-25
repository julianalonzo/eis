import React from 'react';

import customTheme from '../../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import Thumbnail from '.';

import FolderIcon from '@material-ui/icons/Folder';

export const mockImage =
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp13touch-space-select-201807?wid=892&hei=820&&qlt=80&.v=1529520060550';
export const mockIcon = <FolderIcon fontSize="large" />;
export const mockText = 'A';

storiesOf('Thumbnail', module)
  .addDecorator(muiTheme([customTheme]))
  .add('image', () => <Thumbnail variant="image" image={mockImage} />)
  .add('icon', () => <Thumbnail variant="icon" icon={mockIcon} />)
  .add('letter', () => <Thumbnail variant="text" text={mockText} />)
  .add('imageWithRemove', () => (
    <Thumbnail variant="image" image={mockImage} onRemoveThumbnail={() => {}} />
  ));
