import React from 'react';

import customTheme from '../../../util/theme';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';

import SectionPaper from '.';

storiesOf('SectionPaper', module)
  .addDecorator(muiTheme([customTheme]))
  .add('default', () => <SectionPaper title="Section Paper"></SectionPaper>);
