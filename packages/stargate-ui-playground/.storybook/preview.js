import React from 'react';
import { addParameters, addDecorator } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import { DocsContainer } from '@pontte/stargate-ui-playground';
import { Theme } from '@pontte/stargate-ui-styles';
import { Baseline } from '@pontte/stargate-ui-core';

import { docs } from './theme';
import sortStories from './helpers/sortStories';

/**
 * @todo needs to get dynamically
 */
import coreResults from '../../stargate-ui-core/jest-coverage.json';

const storyTheme = (storyFn) => (
  <Theme>
    <Baseline />
    {storyFn()}
  </Theme>
);

const docsTheme = ({ children, ...props }) => (
  <DocsContainer {...props}>
    <Theme>
      <Baseline />
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
    ...docs,
    container: docsTheme,
  },
  controls: false,
  viewMode: 'docs',
};

addParameters(parameters);
addDecorator(storyTheme);
addDecorator(withTests({ results: coreResults }));
