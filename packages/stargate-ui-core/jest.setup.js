import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Theme } from '@pontte/stargate-ui-styles';

global.render = (Component, options) => (
  render(Component, {
    wrapper: Theme,
    ...options,
  })
);
