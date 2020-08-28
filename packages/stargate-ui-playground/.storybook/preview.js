import React from 'react';
import { addParameters, addDecorator } from '@storybook/react';
import { Theme } from '@pontte/stargate-ui-styles';

import sortStories from './helpers/sortStories';

const withTheme = (storyFn) => <Theme>{storyFn()}</Theme>;

addParameters({
  options: {
    storySort: sortStories([
      'Getting Started',
      'Styles',
      'Core'
    ]),
    showRoots: true
  },
});

addDecorator(withTheme);
