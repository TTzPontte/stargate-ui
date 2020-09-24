import React from 'react';
import { addParameters, addDecorator } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import { DocsContainer } from '@pontte/stargate-ui-playground';
import { Theme } from '@pontte/stargate-ui-styles';

import sortStories from './helpers/sortStories';

/**
 * @todo needs to get dynamically
 */
import coreResults from '../../stargate-ui-core/jest-coverage.json';

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
      'Icons',
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
addDecorator(withTests({ results: coreResults }));
