import React from 'react';

import { storiesOf } from '@storybook/react';

import { muiTheme } from 'storybook-addon-material-ui';

import customTheme from '../utilities/theme';

import ItemDetailsForm from '../components/ItemDetailsForm';

export const defaultItemDetailsData = {
  itemName: 'MBP',
  itemCategory: 'Laptop',
  itemCondition: 'In Stock',
  itemThumbnails: []
};

export const thumbnails = [
  {
    alt: 'Thumbnail',
    src:
      'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-201807?wid=892&hei=820&&qlt=80&.v=1529520060550',
    variant: 'THUMBNAIL_PRIMARY'
  },
  {
    alt: 'Thumbnail',
    src:
      'https://cnet2.cbsistatic.com/img/pHdVkP3meOIZlFY7If4vPnJ4J4U=/868x488/2017/06/27/13484418-bfd9-41e2-8f2d-9b4afb072da8/apple-macbook-pro-15-inch-2017-14.jpg',
    variant: 'THUMBNAIL_DEFAULT'
  },
  {
    alt: 'Thumbnail',
    src:
      'https://zdnet3.cbsistatic.com/hub/i/r/2018/08/23/ee30e744-889f-4df4-86db-cdac30453d08/thumbnail/770x433/2c2d7c9bb4b6131a1782b720a86ff32f/apple-mbp-15-header.jpg',
    variant: 'THUMBNAIL_DEFAULT'
  },
  {
    alt: 'Thumbnail',
    src:
      'https://icdn7.digitaltrends.com/image/macbook-pro-2016-keyboard-1500x1000.jpg',
    variant: 'THUMBNAIL_DEFAULT'
  }
];

storiesOf('ItemDetailsForm', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <ItemDetailsForm />)
  .add('withThumbnail', () => (
    <ItemDetailsForm
      itemDetailsFormData={{
        ...defaultItemDetailsData,
        itemThumbnails: thumbnails.slice(0, 3)
      }}
    />
  ))
  .add('withMaxThumbnails', () => (
    <ItemDetailsForm
      itemDetailsFormData={{
        ...defaultItemDetailsData,
        itemThumbnails: thumbnails
      }}
    />
  ));
