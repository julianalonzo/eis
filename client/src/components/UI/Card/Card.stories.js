import React from 'react';

import customTheme from '../../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import Truncate from 'react-truncate';

import FolderIcon from '@material-ui/icons/Folder';

import Card from '.';

export const defaultCardData = {
  title: 'Template Template Template Template',
  subtitle:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus omnis, nisi mollitia exercitationem aut magni deleniti expedita ea eos odit eveniet nesciunt placeat fugit vel voluptatum, nobis quo, temporibus ipsa!',
  image:
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp15touch-space-select-201807?wid=892&hei=820&&qlt=80&.v=1529520056969',
  chips: ['Category', 'Condition']
};

storiesOf('Card', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => (
    <Card
      variant="dense"
      thumbnailVariant="icon"
      icon={<FolderIcon />}
      title="Card Title"
    />
  ))
  .add('descriptive', () => (
    <Card variant="descriptive" title="Card Title" chip="Chip">
      <Truncate lines={2} ellipsis="...">
        {defaultCardData.subtitle}
      </Truncate>
    </Card>
  ));
