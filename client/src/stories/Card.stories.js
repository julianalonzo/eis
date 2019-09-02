import React from 'react';

import { storiesOf } from '@storybook/react';

import { muiTheme } from 'storybook-addon-material-ui';
import customTheme from '../utilities/theme';

import Card from '../components/Card';

export const defaultData = {
  title: 'Template Template Template Template',
  subtitle:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ducimus omnis, nisi mollitia exercitationem aut magni deleniti expedita ea eos odit eveniet nesciunt placeat fugit vel voluptatum, nobis quo, temporibus ipsa!',
  image:
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp15touch-space-select-201807?wid=892&hei=820&&qlt=80&.v=1529520056969'
};

storiesOf('Card', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => (
    <Card
      title={defaultData.title}
      subtitle={defaultData.subtitle}
      image={defaultData.image}
    />
  ));