import { addParameters } from '@storybook/react';

import sortStories from './helpers/sortStories';

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
