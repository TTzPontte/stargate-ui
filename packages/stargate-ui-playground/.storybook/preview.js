import React from 'react';
import { addParameters, addDecorator } from '@storybook/react';
import { DocsContainer } from '@pontte/stargate-ui-playground';
import { Theme } from '@pontte/stargate-ui-styles';

import sortStories from './helpers/sortStories';

const storyTheme = (storyFn) => (
  <Theme>
    {storyFn()}
  </Theme>
);

const docsTheme = ({ children, ...props }) => (
  <DocsContainer {...props}>
    <Theme>
      {children}
    </Theme>
  </DocsContainer>
);

const parameters = {
  layout: 'centered',
  options: {
    storySort: sortStories([
      'Getting Started',
      'Styles',
      'Core'
    ]),
  },
  docs: {
    container: docsTheme,
  },
};

addParameters(parameters);
addDecorator(storyTheme);
