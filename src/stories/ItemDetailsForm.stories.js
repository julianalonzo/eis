import React from 'react';

import { storiesOf } from '@storybook/react';

import ItemDetailsForm from '../components/ItemDetailsForm';

export const defaultItemDetailsData = {
  itemName: 'MBP',
  itemCategory: 'Laptop',
  itemCondition: 'In Stock',
  itemThumbnail: [
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/mbp13touch-space-select-201807?wid=892&hei=820&&qlt=80&.v=1529520060550'
  ]
};

storiesOf('ItemDetailsForm', module).add('default', () => (
  <ItemDetailsForm itemDetailsData={defaultItemDetailsData} />
));
